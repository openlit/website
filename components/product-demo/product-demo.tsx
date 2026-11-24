'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import {
  Activity,
  BellRing,
  BookKey,
  BookOpen,
  Bot,
  Boxes,
  BrainCircuit,
  Building2,
  Cable,
  ChevronDown,
  ChevronRight,
  Check,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  CircleDollarSign,
  ClipboardCheck,
  Component,
  Cpu,
  FileClock,
  FolderKanban,
  Home,
  Key,
  LayoutDashboard,
  LineChart,
  MonitorPlay,
  Pencil,
  Phone,
  RotateCcw,
  ScanSearch,
  Search,
  Server,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  User,
  X,
  type LucideIcon,
} from 'lucide-react'
import Otter from '@/components/icons/otter'
import {
  DEFAULT_CAP,
  ORG_NAME,
  ORG_SPEND,
  PERMISSIONS,
  PROJECTS,
  ROLES,
  SCREEN_COPY,
  initialGrants,
  money,
  spendLevel,
  type ProjectId,
  type ScreenId,
  type StatusFilter,
  type TraceTab,
} from 'constants/product-demo'
import { cn } from 'lib/utils'
import { DemoScreen } from './screens'
import type { DatabaseId, DemoApi, LocalAudit, OrgTab } from './types'

type SectionId = 'apps' | 'settings'

type DemoState = {
  screen: ScreenId
  project: ProjectId
  overviewProject: ProjectId | 'all'
  database: DatabaseId
  focus: string | null
  traceTab: TraceTab
  traceOpen: boolean
  statusFilter: StatusFilter
  query: string
  cap: number
  savedCap: number
  roleId: string
  grants: Record<string, boolean>
  restrictedKeys: string[]
  auditExtra: LocalAudit[]
  orgTab: OrgTab
}

type NavItem = {
  id: ScreenId | 'docs'
  label: string
  icon: LucideIcon
  href?: string
}

const SETTINGS_SCREENS = new Set<ScreenId>([
  'organisation',
  'projects',
  'profile',
  'keys',
  'openapi',
])

const MONITOR: NavItem[] = [
  { id: 'telemetry', label: 'Telemetry', icon: Activity },
  { id: 'gpus', label: 'GPUs', icon: Cpu },
  { id: 'audit', label: 'Audit Logs', icon: FileClock },
  { id: 'fleet', label: 'Fleet Hub', icon: Server },
  { id: 'agents', label: 'Agents', icon: Bot },
  { id: 'evaluations', label: 'Evaluations', icon: ClipboardCheck },
  { id: 'models', label: 'Manage Models', icon: Cpu },
  { id: 'connectors', label: 'Connectors', icon: Cable },
  { id: 'costs', label: 'Costs', icon: CircleDollarSign },
  { id: 'alerts', label: 'Alerts', icon: BellRing },
]

const DEVELOP: NavItem[] = [
  { id: 'prompts', label: 'Prompt Hub', icon: Component },
  { id: 'vault', label: 'Vault', icon: BookKey },
  { id: 'contexts', label: 'Contexts', icon: BookOpen },
  { id: 'memory', label: 'Memory', icon: BrainCircuit },
  { id: 'scanner', label: 'Scanner', icon: ScanSearch },
  { id: 'rules', label: 'Rule Engine', icon: SlidersHorizontal },
  { id: 'openground', label: 'Openground', icon: MonitorPlay },
]

const CONFIGURE: NavItem[] = [
  { id: 'connectors', label: 'Connectors', icon: Cable },
  { id: 'roles', label: 'Roles', icon: ShieldCheck },
]

const SETTINGS: NavItem[] = [
  { id: 'organisation', label: 'Organisation', icon: Building2 },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'keys', label: 'API Keys', icon: Key },
  { id: 'openapi', label: 'OpenAPI', icon: BookOpen },
]

const ALL_NAV: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'dashboards', label: 'Dashboards', icon: LayoutDashboard },
  ...MONITOR,
  ...DEVELOP.filter((item) => item.id !== 'connectors'),
  ...CONFIGURE.filter((item) => item.id !== 'connectors'),
  ...SETTINGS,
  { id: 'docs', label: 'Documentation', icon: BookOpen, href: 'https://docs.openlit.io' },
]

const linkClass = (active: boolean, compact = false) =>
  cn(
    'flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[13px] font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-stone-300 dark:focus-visible:ring-offset-stone-950',
    compact && 'justify-center px-2',
    active
      ? 'bg-stone-200 text-stone-950 dark:bg-stone-800 dark:text-white'
      : 'text-stone-600 hover:bg-stone-200/70 hover:text-stone-950 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white'
  )

const scopeClass =
  'inline-flex h-auto min-w-0 max-w-40 shrink-0 items-center gap-1 rounded-sm border-0 bg-transparent p-0 text-xs font-medium text-stone-700 hover:text-stone-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandPrimary/30 dark:text-stone-300 dark:hover:text-stone-100'

function permissionLabel(permissionId: string) {
  const permission = PERMISSIONS.find((item) => item.id === permissionId)
  return permission ? `${permission.group} · ${permission.label}` : permissionId
}

function initialState(): DemoState {
  return {
    screen: 'home',
    project: 'support',
    overviewProject: 'all',
    database: 'primary',
    focus: null,
    traceTab: 'spans',
    traceOpen: false,
    statusFilter: 'all',
    query: '',
    cap: DEFAULT_CAP,
    savedCap: DEFAULT_CAP,
    roleId: 'oncall',
    grants: initialGrants(),
    restrictedKeys: [],
    auditExtra: [],
    orgTab: 'overview',
  }
}

function pageLabel(screen: ScreenId) {
  if (screen === 'home') return null
  return SCREEN_COPY[screen]?.title ?? screen
}

export default function ProductDemo() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState(true)
  const [section, setSection] = useState<SectionId | null>(null)
  const [otter, setOtter] = useState(false)
  const [commandOpen, setCommandOpen] = useState(false)
  const [commandQuery, setCommandQuery] = useState('')
  const [menu, setMenu] = useState<'org' | 'project' | 'db' | 'user' | null>(null)
  const [editingApps, setEditingApps] = useState(false)
  const [hiddenApps, setHiddenApps] = useState<ScreenId[]>([])
  const [state, setState] = useState<DemoState>(initialState)

  const level = spendLevel(ORG_SPEND, state.savedCap)
  const project = PROJECTS.find((item) => item.id === state.project) ?? PROJECTS[0]

  const api = useMemo<DemoApi>(() => {
    const go = (screen: ScreenId, focus?: string | null, traceTab?: TraceTab) => {
      setSection(null)
      setOtter(false)
      setMenu(null)
      setCommandOpen(false)
      setState((current) => ({
        ...current,
        screen,
        focus: focus === undefined ? null : focus,
        traceTab: traceTab ?? (screen === 'telemetry' ? current.traceTab : 'spans'),
        traceOpen: screen === 'telemetry' && Boolean(focus),
        orgTab: screen === 'organisation' ? current.orgTab : current.orgTab,
      }))
    }

    return {
      screen: state.screen,
      project: state.project,
      overviewProject: state.overviewProject,
      database: state.database,
      focus: state.focus,
      traceTab: state.traceTab,
      traceOpen: state.traceOpen,
      statusFilter: state.statusFilter,
      query: state.query,
      cap: state.cap,
      savedCap: state.savedCap,
      spent: ORG_SPEND,
      level,
      roleId: state.roleId,
      grants: state.grants,
      restrictedKeys: state.restrictedKeys,
      auditExtra: state.auditExtra,
      orgTab: state.orgTab,
      go,
      setProject: (next) => setState((current) => ({ ...current, project: next })),
      setOverviewProject: (next) => setState((current) => ({ ...current, overviewProject: next })),
      setDatabase: (database) => setState((current) => ({ ...current, database })),
      setQuery: (query) => setState((current) => ({ ...current, query })),
      setStatus: (statusFilter) => setState((current) => ({ ...current, statusFilter })),
      setTraceTab: (traceTab) => setState((current) => ({ ...current, traceTab })),
      setCap: (cap) => setState((current) => ({ ...current, cap })),
      saveCap: () => {
        setState((current) => {
          if (current.cap === current.savedCap) return current
          return {
            ...current,
            savedCap: current.cap,
            auditExtra: [
              {
                id: `local-cap-${current.cap}-${current.auditExtra.length}`,
                actor: 'You',
                action: `Set monthly spend limit to ${money(current.cap)}`,
                when: 'Just now',
                area: 'Organisation',
                detail:
                  'Warning stays at 80%. Reaching it notifies owners. Provider calls are not stopped.',
              },
              ...current.auditExtra,
            ],
          }
        })
      },
      setRole: (roleId) => setState((current) => ({ ...current, roleId })),
      toggleGrant: (roleId, permissionId) => {
        setState((current) => {
          const key = `${roleId}:${permissionId}`
          const next = !current.grants[key]
          const role = ROLES.find((item) => item.id === roleId)
          return {
            ...current,
            grants: { ...current.grants, [key]: next },
            auditExtra: [
              {
                id: `local-role-${current.auditExtra.length}-${permissionId}`,
                actor: 'You',
                action: `${next ? 'Allowed' : 'Removed'} ${permissionLabel(permissionId)} on ${role?.name ?? roleId}`,
                when: 'Just now',
                area: 'Roles',
                detail: 'Sample change in this browser. Reset the sample to restore it.',
              },
              ...current.auditExtra,
            ],
          }
        })
      },
      restrictKey: (keyId) => {
        setState((current) => {
          if (current.restrictedKeys.includes(keyId)) return current
          const keyName = keyId === 'key_admin' ? 'break-glass' : keyId
          return {
            ...current,
            restrictedKeys: [...current.restrictedKeys, keyId],
            auditExtra: [
              {
                id: `local-key-${current.auditExtra.length}`,
                actor: 'You',
                action: `Restricted API key ${keyName}`,
                when: 'Just now',
                area: 'API keys',
                detail: 'Scopes set to telemetry. Full access is gone for this sample session.',
              },
              ...current.auditExtra,
            ],
          }
        })
      },
      setOrgTab: (orgTab) => {
        setState((current) => ({
          ...current,
          screen: 'organisation',
          orgTab,
          focus: null,
          traceOpen: false,
        }))
        setSection(null)
        setOtter(false)
      },
      openTrace: (traceId, tab) => go('telemetry', traceId, tab ?? 'spans'),
      closeTrace: () => setState((current) => ({ ...current, traceOpen: false, focus: null })),
      reset: () => {
        setState(initialState())
        setSection(null)
        setOtter(false)
        setMenu(null)
        setCommandOpen(false)
        setEditingApps(false)
        setHiddenApps([])
      },
    }
  }, [level, state])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const root = rootRef.current
      if (!root) return
      const target = event.target
      const inside = target instanceof Node && root.contains(target)
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k' && inside) {
        event.preventDefault()
        setCommandOpen(true)
        setSection(null)
      }
      if (event.key === 'Escape') {
        setSection(null)
        setCommandOpen(false)
        setMenu(null)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const openScreen = (screen: ScreenId) => {
    api.go(screen)
  }

  const trailPage = state.screen === 'home' ? 'Home' : pageLabel(state.screen)
  const width = expanded ? 'w-64' : 'w-16'
  const commandItems = ALL_NAV.filter((item) =>
    item.label.toLowerCase().includes(commandQuery.trim().toLowerCase())
  )

  return (
    <div
      ref={rootRef}
      className="relative flex h-full w-full flex-col overflow-hidden border border-stone-200 bg-stone-50 text-stone-700 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-300"
    >
      <div className="flex shrink-0 border-b border-stone-200 dark:border-stone-800">
        <div
          className={cn('relative shrink-0 border-r border-stone-200 dark:border-stone-800', width)}
        >
          <div className="relative flex h-11 items-center gap-2 px-3">
            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              aria-label={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
              aria-expanded={expanded}
              className="absolute -right-3 top-1/2 z-50 inline-flex size-6 -translate-y-1/2 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-600 shadow-sm hover:bg-stone-100 hover:text-stone-950 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white"
            >
              {expanded ? (
                <ChevronsLeft className="size-3.5" />
              ) : (
                <ChevronsRight className="size-3.5" />
              )}
            </button>
            <Image
              className="size-9 shrink-0 object-contain"
              src="/images/logo.png"
              alt="OpenLIT logo"
              priority
              width={36}
              height={36}
            />
            <div
              className={cn('flex min-w-0 flex-1 items-center gap-1.5', !expanded && 'invisible')}
            >
              <p className="truncate text-lg font-semibold text-stone-900 dark:text-white">
                OpenLIT
              </p>
              <p className="shrink-0 text-[10px] text-stone-500">v2.1.1</p>
            </div>
          </div>
        </div>
        <div className="flex h-11 min-w-0 flex-1 items-center gap-x-3 pl-6 pr-3">
          <ScopeMenu
            open={menu === 'org'}
            onToggle={() => setMenu(menu === 'org' ? null : 'org')}
            label={ORG_NAME}
          >
            <p className="px-2 py-1.5 text-xs text-stone-500">
              Northwind is the only organisation in this sample.
            </p>
          </ScopeMenu>
          <span className="shrink-0 text-xs text-stone-400 dark:text-stone-600">/</span>
          <ScopeMenu
            open={menu === 'project'}
            onToggle={() => setMenu(menu === 'project' ? null : 'project')}
            label={project.name}
          >
            {PROJECTS.map((item) => (
              <MenuButton
                key={item.id}
                active={item.id === state.project}
                onClick={() => {
                  api.setProject(item.id)
                  setMenu(null)
                }}
              >
                {item.name}
                <span className="ml-auto text-[11px] text-stone-400">{item.environment}</span>
              </MenuButton>
            ))}
          </ScopeMenu>
          <span className="shrink-0 text-xs text-stone-400 dark:text-stone-600">/</span>
          <ScopeMenu
            open={menu === 'db'}
            onToggle={() => setMenu(menu === 'db' ? null : 'db')}
            label={state.database}
          >
            {(['primary', 'warehouse'] as const).map((id) => (
              <MenuButton
                key={id}
                active={state.database === id}
                onClick={() => {
                  api.setDatabase(id)
                  setMenu(null)
                }}
              >
                {id}
              </MenuButton>
            ))}
          </ScopeMenu>
          {trailPage ? (
            <>
              <span className="hidden shrink-0 text-xs text-stone-400 dark:text-stone-600 sm:inline">
                /
              </span>
              <span className="hidden truncate text-xs font-medium text-stone-700 dark:text-stone-300 sm:inline">
                {trailPage}
              </span>
            </>
          ) : null}
          {state.screen === 'home' ? (
            <>
              <span className="hidden shrink-0 text-xs text-stone-400 dark:text-stone-600 md:inline">
                /
              </span>
              <span className="hidden truncate text-xs font-semibold text-stone-900 dark:text-white md:inline">
                LLM dashboard
              </span>
            </>
          ) : null}
          {SETTINGS_SCREENS.has(state.screen) ? (
            <>
              <span className="hidden shrink-0 text-xs text-stone-400 dark:text-stone-600 md:inline">
                /
              </span>
              <span className="hidden truncate text-xs font-medium text-stone-500 dark:text-stone-400 md:inline">
                Settings
              </span>
            </>
          ) : null}
          <div className="ml-auto flex items-center gap-2">
            <a
              href="https://cal.com/aman.openlit/30min"
              target="_blank"
              rel="noreferrer"
              aria-label="Talk to founder"
              className="inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-stone-200 bg-white text-stone-700 shadow-sm hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:bg-stone-800"
            >
              <Phone className="size-3.5" />
            </a>
            <button
              type="button"
              onClick={() => {
                setOtter(true)
                setSection(null)
              }}
              className="inline-flex h-8 items-center gap-1.5 rounded-md bg-brandPrimary px-2.5 text-xs font-semibold text-white shadow-sm hover:bg-brandPrimary/90"
              aria-label="Ask Otter"
            >
              <Otter className="size-5 text-white" />
              <span className="hidden sm:inline">Ask Otter</span>
            </button>
          </div>
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1">
        <div
          className={cn(
            'relative z-30 flex shrink-0 flex-col border-r border-stone-200 bg-stone-50 dark:border-stone-800 dark:bg-stone-950',
            width
          )}
        >
          <div className="px-2 pb-3 pt-3">
            <button
              type="button"
              onClick={() => {
                setCommandOpen(true)
                setSection(null)
              }}
              aria-label="Search navigation"
              className={cn(
                'flex h-9 w-full items-center gap-2 rounded-md border border-stone-200 bg-transparent px-2.5 text-[13px] text-stone-500 hover:bg-stone-200/60 dark:border-stone-800 dark:hover:bg-stone-800/60',
                !expanded && 'justify-center px-2'
              )}
            >
              <Search className="size-4 shrink-0" />
              <span className={cn('flex-1 text-left', !expanded && 'hidden')}>Search data</span>
              <kbd
                className={cn(
                  'rounded border border-stone-200 px-1 py-0.5 text-[10px] dark:border-stone-700',
                  !expanded && 'hidden'
                )}
              >
                ⌘K
              </kbd>
            </button>
          </div>
          {expanded ? (
            <div className="mx-2 grid grid-cols-2 gap-1 rounded-lg border border-stone-200 bg-stone-100 p-1 dark:border-stone-800 dark:bg-stone-900">
              <button
                type="button"
                onClick={() => {
                  setOtter(false)
                  setSection(null)
                  openScreen('home')
                }}
                className={cn(
                  'h-8 rounded-md px-2 text-[13px] text-stone-600 hover:bg-white/70 hover:text-stone-950 dark:text-stone-300 dark:hover:bg-stone-800/70 dark:hover:text-white',
                  !otter &&
                    !section &&
                    'bg-white text-stone-950 shadow-sm dark:bg-stone-800 dark:text-white'
                )}
              >
                Browse
              </button>
              <button
                type="button"
                onClick={() => {
                  setOtter(true)
                  setSection(null)
                }}
                className={cn(
                  'flex h-8 items-center justify-center gap-1.5 rounded-md px-2 text-[13px] font-medium text-stone-600 hover:bg-white/70 hover:text-stone-950 dark:text-stone-300 dark:hover:bg-stone-800/70 dark:hover:text-white',
                  otter &&
                    !section &&
                    'bg-white text-stone-950 shadow-sm dark:bg-stone-800 dark:text-white'
                )}
              >
                <Otter className="size-4 shrink-0" />
                Otter
              </button>
            </div>
          ) : null}

          {otter && expanded ? (
            <div className="min-h-0 grow overflow-y-auto px-3 py-3 text-xs text-stone-500">
              <p className="font-medium text-stone-800 dark:text-stone-200">
                Ask about this sample
              </p>
              <p className="mt-1">
                Otter can open a page. It does not call a model from the website.
              </p>
            </div>
          ) : (
            <nav
              className="flex grow flex-col gap-1 overflow-y-auto px-2 py-2"
              aria-label="Product navigation"
            >
              <NavButton
                item={{ id: 'home', label: 'Home', icon: Home }}
                active={!section && !otter && state.screen === 'home'}
                compact={!expanded}
                onClick={() => openScreen('home')}
              />
              <NavButton
                item={{ id: 'dashboards', label: 'Dashboards', icon: LayoutDashboard }}
                active={!section && !otter && state.screen === 'dashboards'}
                compact={!expanded}
                onClick={() => openScreen('dashboards')}
              />
              <SectionButton
                title="Apps"
                icon={Boxes}
                open={section === 'apps'}
                compact={!expanded}
                onClick={() => setSection(section === 'apps' ? null : 'apps')}
              />
              <SectionButton
                title="Settings"
                icon={Settings}
                open={section === 'settings'}
                compact={!expanded}
                onClick={() => setSection(section === 'settings' ? null : 'settings')}
              />
              <a
                href="https://docs.openlit.io"
                target="_blank"
                rel="noreferrer"
                className={linkClass(false, !expanded)}
              >
                <BookOpen className="size-4 shrink-0" />
                <span className={cn(!expanded && 'sr-only')}>Documentation</span>
              </a>
              {expanded ? (
                <div className="mt-2 border-t border-stone-200 pt-2 dark:border-stone-800">
                  <div className="flex items-center justify-between px-2 pb-1">
                    <p className="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
                      My apps
                    </p>
                    <button
                      type="button"
                      aria-label={editingApps ? 'Done editing my apps' : 'Edit my apps'}
                      aria-pressed={editingApps}
                      onClick={() => setEditingApps((value) => !value)}
                      className="inline-flex size-7 items-center justify-center rounded-md text-stone-400 hover:bg-stone-200 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-200"
                    >
                      {editingApps ? <Check className="size-4" /> : <Pencil className="size-4" />}
                    </button>
                  </div>
                  {(
                    [
                      ['Monitor', MONITOR],
                      ['Develop', DEVELOP],
                      ['Configuration', CONFIGURE],
                    ] as const
                  ).map(([title, items]) => {
                    const visible = editingApps
                      ? items
                      : items.filter((item) => !hiddenApps.includes(item.id as ScreenId))
                    if (!visible.length) return null
                    return (
                      <div key={title} className="mb-1.5">
                        <p className="px-2.5 pb-0.5 pt-1 text-xs font-medium text-stone-500 dark:text-stone-400">
                          {title}
                        </p>
                        {visible.map((item) => {
                          const Icon = item.icon
                          return editingApps ? (
                            <button
                              key={`${title}-${item.id}`}
                              type="button"
                              className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[13px] font-medium text-stone-600 hover:bg-stone-200/70 dark:text-stone-300 dark:hover:bg-stone-800"
                              onClick={() =>
                                setHiddenApps((current) =>
                                  current.includes(item.id as ScreenId)
                                    ? current.filter((id) => id !== item.id)
                                    : [...current, item.id as ScreenId]
                                )
                              }
                            >
                              <span
                                className={cn(
                                  'inline-flex size-3.5 items-center justify-center rounded border border-stone-300 dark:border-stone-600',
                                  !hiddenApps.includes(item.id as ScreenId) &&
                                    'border-stone-950 bg-stone-950 text-white dark:border-white dark:bg-white dark:text-stone-950'
                                )}
                              >
                                {hiddenApps.includes(item.id as ScreenId) ? null : (
                                  <Check className="size-3" />
                                )}
                              </span>
                              <Icon className="size-4 shrink-0" />
                              <span className="truncate">{item.label}</span>
                            </button>
                          ) : (
                            <NavButton
                              key={`${title}-${item.id}`}
                              item={item}
                              active={!section && state.screen === item.id}
                              onClick={() => openScreen(item.id as ScreenId)}
                            />
                          )
                        })}
                      </div>
                    )
                  })}
                </div>
              ) : null}
            </nav>
          )}

          <div className="relative border-t border-stone-200 p-2 dark:border-stone-800">
            <button
              type="button"
              onClick={() => setMenu(menu === 'user' ? null : 'user')}
              className={cn(
                'flex w-full items-center gap-2 rounded-md p-1.5 text-left text-stone-500 hover:bg-stone-200/70 hover:text-stone-950 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white',
                !expanded && 'justify-center'
              )}
            >
              <span className="inline-flex size-5 items-center justify-center rounded-lg text-[10px] font-medium">
                AC
              </span>
              <span className={cn('min-w-0 flex-1', !expanded && 'sr-only')}>
                <span className="block truncate text-[13px] font-medium">Avery Chen</span>
                <span className="block truncate text-xs">avery@northwind.example</span>
              </span>
              <ChevronsUpDown className={cn('size-4 shrink-0', !expanded && 'hidden')} />
            </button>
            {menu === 'user' ? (
              <div className="absolute bottom-12 left-2 z-50 w-56 rounded-lg border border-stone-200 bg-white p-1 shadow-lg dark:border-stone-800 dark:bg-stone-950">
                <button
                  type="button"
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-[13px] hover:bg-stone-100 dark:hover:bg-stone-900"
                  onClick={() => openScreen('profile')}
                >
                  <Pencil className="size-4" />
                  Profile
                </button>
                <button
                  type="button"
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-[13px] hover:bg-stone-100 dark:hover:bg-stone-900"
                  onClick={() => api.reset()}
                >
                  <RotateCcw className="size-4" />
                  Reset sample
                </button>
              </div>
            ) : null}
          </div>
        </div>

        <main className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-white dark:bg-stone-950">
          {otter ? <OtterPane api={api} /> : <DemoScreen api={api} />}
        </main>

        {section ? (
          <button
            type="button"
            aria-label="Close navigation panel"
            className={cn(
              'absolute inset-y-0 right-0 z-20 bg-black/20 dark:bg-stone-900/40',
              expanded ? 'left-64' : 'left-16'
            )}
            onClick={() => setSection(null)}
          />
        ) : null}
        {section ? (
          <div
            className="absolute inset-y-0 z-40 flex flex-col border-y border-r border-stone-200 bg-stone-50 shadow-xl dark:border-stone-800 dark:bg-stone-950"
            style={{ left: expanded ? '16rem' : '4rem', width: 'min(20rem, calc(100% - 5rem))' }}
          >
            <div className="flex items-center justify-between border-b border-stone-200 px-3 py-2.5 dark:border-stone-800">
              <div className="flex items-center gap-2 text-stone-900 dark:text-white">
                {section === 'apps' ? (
                  <Boxes className="size-4" />
                ) : (
                  <Settings className="size-4" />
                )}
                <p className="text-[15px] font-semibold">
                  {section === 'apps' ? 'Apps' : 'Settings'}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close navigation panel"
                onClick={() => setSection(null)}
                className="inline-flex size-8 items-center justify-center rounded-md text-stone-700 hover:bg-stone-200 dark:text-stone-200 dark:hover:bg-stone-800"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="overflow-y-auto p-2">
              {section === 'apps' ? (
                <div className="space-y-3">
                  <FlyoutGroup
                    title="Monitor"
                    items={MONITOR}
                    active={state.screen}
                    onOpen={openScreen}
                  />
                  <FlyoutGroup
                    title="Develop"
                    items={DEVELOP}
                    active={state.screen}
                    onOpen={openScreen}
                  />
                  <FlyoutGroup
                    title="Configuration"
                    items={CONFIGURE}
                    active={state.screen}
                    onOpen={openScreen}
                  />
                </div>
              ) : (
                <div className="space-y-0.5">
                  {SETTINGS.map((item) => (
                    <NavButton
                      key={item.id}
                      item={item}
                      active={state.screen === item.id}
                      onClick={() => item.id !== 'docs' && openScreen(item.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : null}

        {commandOpen ? (
          <div className="absolute inset-0 z-50 flex items-start justify-center bg-black/30 p-6 pt-16">
            <div className="w-full max-w-md overflow-hidden rounded-lg border border-stone-200 bg-white shadow-xl dark:border-stone-800 dark:bg-stone-950">
              <div className="flex items-center gap-2 border-b border-stone-200 px-3 dark:border-stone-800">
                <Search className="size-4 text-stone-400" />
                <input
                  value={commandQuery}
                  onChange={(event) => setCommandQuery(event.target.value)}
                  placeholder="Search OpenLIT navigation..."
                  className="h-10 w-full bg-transparent text-sm outline-none"
                />
              </div>
              <div className="max-h-72 overflow-y-auto p-1">
                {commandItems.length === 0 ? (
                  <p className="px-2 py-6 text-center text-xs text-stone-500">
                    No navigation items found.
                  </p>
                ) : (
                  commandItems.map((item) =>
                    item.href ? (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[13px] hover:bg-stone-100 dark:hover:bg-stone-900"
                      >
                        <item.icon className="size-4" />
                        {item.label}
                      </a>
                    ) : (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => item.id !== 'docs' && openScreen(item.id)}
                        className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] hover:bg-stone-100 dark:hover:bg-stone-900"
                      >
                        <item.icon className="size-4" />
                        {item.label}
                      </button>
                    )
                  )
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

function NavButton({
  item,
  active,
  compact,
  onClick,
}: {
  item: NavItem
  active?: boolean
  compact?: boolean
  onClick: () => void
}) {
  const Icon = item.icon
  return (
    <button
      type="button"
      onClick={onClick}
      className={linkClass(Boolean(active), compact)}
      title={item.label}
    >
      <Icon className="size-4 shrink-0" />
      <span className={cn('truncate', compact && 'sr-only')}>{item.label}</span>
    </button>
  )
}

function SectionButton({
  title,
  icon: Icon,
  open,
  compact,
  onClick,
}: {
  title: string
  icon: LucideIcon
  open: boolean
  compact: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-expanded={open}
      onClick={onClick}
      className={cn(linkClass(open, compact), 'h-9')}
    >
      <Icon className="size-4 shrink-0" />
      {compact ? (
        <span className="sr-only">{title}</span>
      ) : (
        <>
          <span>{title}</span>
          <ChevronRight className="ml-auto size-4" />
        </>
      )}
    </button>
  )
}

function FlyoutGroup({
  title,
  items,
  active,
  onOpen,
}: {
  title: string
  items: NavItem[]
  active: ScreenId
  onOpen: (screen: ScreenId) => void
}) {
  return (
    <div className="space-y-0.5">
      <p className="px-2.5 pb-0.5 pt-1 text-xs font-semibold tracking-wide text-stone-500 dark:text-stone-400">
        {title}
      </p>
      {items.map((item) => (
        <NavButton
          key={`${title}-${item.id}`}
          item={item}
          active={active === item.id}
          onClick={() => item.id !== 'docs' && onOpen(item.id)}
        />
      ))}
    </div>
  )
}

function ScopeMenu({
  open,
  onToggle,
  label,
  badge,
  children,
}: {
  open: boolean
  onToggle: () => void
  label: string
  badge?: string
  children: ReactNode
}) {
  return (
    <div className="relative">
      <button type="button" className={scopeClass} onClick={onToggle} aria-expanded={open}>
        <span className="truncate">{label}</span>
        {badge ? (
          <span className="rounded bg-stone-200 px-1 py-0.5 text-[10px] font-medium uppercase tracking-wide text-stone-600 dark:bg-stone-800 dark:text-stone-300">
            {badge}
          </span>
        ) : null}
        <ChevronDown className="size-3 shrink-0 opacity-60" />
      </button>
      {open ? (
        <div className="absolute left-0 top-full z-50 mt-1 w-56 rounded-md border border-stone-200 bg-white p-1 shadow-lg dark:border-stone-800 dark:bg-stone-950">
          {children}
        </div>
      ) : null}
    </div>
  )
}

function MenuButton({
  active,
  onClick,
  children,
}: {
  active?: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs',
        active
          ? 'bg-stone-100 text-stone-950 dark:bg-stone-900 dark:text-white'
          : 'hover:bg-stone-50 dark:hover:bg-stone-900'
      )}
    >
      {children}
    </button>
  )
}

function OtterPane({ api }: { api: DemoApi }) {
  const [thread, setThread] = useState<{ question: string; answer: string } | null>(null)
  const examples = [
    {
      icon: LayoutDashboard,
      question:
        'Analyze the slowest traces from the last 24 hours and explain what is causing latency',
      answer:
        'support.triage is the slowest run in this sample, at 2.410s. lookup_order returned not_found.',
      go: () => api.openTrace('tr_4c21'),
    },
    {
      icon: CircleDollarSign,
      question:
        'Show token usage and cost by model for this week, then highlight the biggest spend drivers',
      answer: 'claude-sonnet-4 is the largest cost in support. Organisation spend is $4,280.16.',
      go: () => api.go('costs'),
    },
    {
      icon: SlidersHorizontal,
      question:
        'Find recent errors for my busiest service and summarize the related traces and logs',
      answer: 'support-agent error rate is 2.4%. The latest failed trace is tr_4c21.',
      go: () => api.openTrace('tr_4c21', 'eval'),
    },
  ]
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center overflow-y-auto px-6 py-12">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-stone-200 dark:bg-stone-200">
        <Otter className="h-12 w-12 text-stone-800" />
      </div>
      <h2 className="mb-1.5 text-xl font-semibold text-stone-900 dark:text-stone-100">
        Your AI-Powered Observability Copilot
      </h2>
      <p className="mb-8 max-w-lg text-center text-sm text-stone-500 dark:text-stone-400">
        Query your telemetry data, create dashboards, manage rules, prompts, and more — all through
        natural language. What would you like to explore?
      </p>
      {thread ? (
        <div className="mb-6 w-full max-w-3xl space-y-3 text-sm">
          <p className="rounded-md border border-stone-200 px-3 py-2 dark:border-stone-800">
            {thread.question}
          </p>
          <p className="rounded-md bg-stone-50 px-3 py-2 text-stone-700 dark:bg-stone-900 dark:text-stone-200">
            {thread.answer}
          </p>
        </div>
      ) : null}
      <div className="grid w-full max-w-3xl grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {examples.map((example) => {
          const Icon = example.icon
          return (
            <button
              key={example.question}
              type="button"
              onClick={() => {
                setThread({ question: example.question, answer: example.answer })
                example.go()
              }}
              className="flex h-auto items-start justify-start gap-2.5 whitespace-normal rounded-md border border-stone-200 px-3.5 py-3 text-left text-sm font-normal text-stone-600 hover:border-stone-300 hover:bg-stone-50 dark:border-stone-700 dark:text-stone-300 dark:hover:border-stone-600 dark:hover:bg-stone-800"
            >
              <Icon className="mt-0.5 size-4 shrink-0" />
              {example.question}
            </button>
          )
        })}
      </div>
    </div>
  )
}
