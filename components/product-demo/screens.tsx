'use client'

import { Fragment, useState, type ReactNode } from 'react'
import {
  Activity,
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  BellRing,
  BookKey,
  BrainCircuit,
  BookOpen,
  Bot,
  Building2,
  Cable,
  Check,
  CircleDollarSign,
  ClipboardCheck,
  Clock,
  Component,
  Copy,
  Cpu,
  FileClock,
  AlertTriangle,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronsUpDown,
  DollarSign,
  FileText,
  FolderKanban,
  GitBranch,
  Hash,
  Info,
  Key,
  LayoutDashboard,
  Maximize2,
  MessageSquareText,
  MonitorPlay,
  Network,
  Plus,
  RefreshCw,
  Repeat,
  Shield,
  ShieldAlert,
  TimerReset,
  TrendingDown,
  TrendingUp,
  ScanSearch,
  Search,
  Server,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  User,
  X,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import {
  AGENTS,
  ALERTS,
  API_KEYS,
  AUDIT_LOG,
  CONNECTORS,
  EVAL_CASES,
  EVAL_RUN,
  FLEET,
  GPUS,
  MEMBERS,
  MODEL_COSTS,
  ORG_NAME,
  ORG_SPEND,
  PERMISSIONS,
  PROJECTS,
  PROMPTS,
  ROLES,
  RULES,
  SPEND_LABELS,
  SPEND_SERIES,
  TRACES,
  VAULT_SECRETS,
  compact,
  matchesQuery,
  money,
  type Alert,
  type ProjectId,
  type Trace,
  type TraceTab,
} from 'constants/product-demo'
import { cn } from 'lib/utils'
import type { DemoApi } from './types'

const PANEL =
  'overflow-hidden rounded-md border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-950'
const LABEL = 'text-[11px] font-medium uppercase tracking-wide text-stone-500 dark:text-stone-400'
const SERIES = ['#F36C06', '#8DA750', '#3b82f6', '#ED474A', '#a16207', '#0f766e']

const DELTA: Record<ProjectId, { cost: number; requests: number }> = {
  support: { cost: 18, requests: 6 },
  checkout: { cost: 9, requests: 4 },
  research: { cost: -12, requests: 2 },
}

export function DemoScreen({ api }: { api: DemoApi }) {
  if (api.screen === 'home') return <HomeScreen api={api} />
  if (api.screen === 'dashboards') return <DashboardsScreen api={api} />
  if (api.screen === 'organisation') return <OrganisationScreen api={api} />
  if (api.screen === 'telemetry') return <TelemetryScreen api={api} />
  if (api.screen === 'agents') return <AgentsScreen api={api} />
  if (api.screen === 'evaluations') return <EvaluationsScreen api={api} />
  if (api.screen === 'costs' || api.screen === 'models') return <CostsScreen api={api} />
  if (api.screen === 'alerts' || api.screen === 'alert') return <AlertsScreen api={api} />
  if (api.screen === 'gpus') return <GpusScreen />
  if (api.screen === 'audit') return <AuditScreen api={api} />
  if (api.screen === 'fleet') return <FleetScreen api={api} />
  if (api.screen === 'prompts') return <PromptsScreen api={api} />
  if (api.screen === 'vault') return <VaultScreen />
  if (api.screen === 'rules') return <RulesScreen />
  if (api.screen === 'connectors') return <ConnectorsScreen />
  if (api.screen === 'roles') return <RolesScreen api={api} />
  if (api.screen === 'keys') return <KeysScreen api={api} />
  if (api.screen === 'projects') return <ProjectsScreen api={api} />
  if (api.screen === 'profile') return <ProfileScreen />
  if (api.screen === 'contexts') return <ContextsScreen />
  if (api.screen === 'memory') return <MemoryScreen />
  if (api.screen === 'scanner') return <ScannerScreen />
  if (api.screen === 'openground') return <OpengroundScreen api={api} />
  if (api.screen === 'openapi') return <OpenApiScreen />
  return <HomeScreen api={api} />
}

function PageHeader({
  icon: Icon,
  eyebrow,
  title,
  description,
  tone = 'border-stone-200 bg-stone-50 text-stone-700 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200',
  actions,
}: {
  icon: LucideIcon
  eyebrow: string
  title: string
  description?: string
  tone?: string
  actions?: ReactNode
}) {
  return (
    <section className="border-b border-stone-200 px-4 py-3 dark:border-stone-800">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className={cn(
              'inline-flex size-7 shrink-0 items-center justify-center rounded-md border p-1.5',
              tone
            )}
          >
            <Icon className="size-4" />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-wide text-stone-500 dark:text-stone-400">
              {eyebrow}
            </p>
            <h1 className="truncate text-sm font-semibold leading-tight text-stone-950 dark:text-stone-50">
              {title}
            </h1>
            {description ? (
              <p className="mt-0.5 text-xs text-stone-600 dark:text-stone-300">{description}</p>
            ) : null}
          </div>
        </div>
        {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
      </div>
    </section>
  )
}

function TimeRange() {
  const [range, setRange] = useState('24H')
  const [refresh, setRefresh] = useState('1m')
  const [open, setOpen] = useState(false)
  return (
    <div className="flex min-w-0 shrink items-center gap-2">
      <div className="inline-flex h-[30px] shrink-0 overflow-hidden rounded-md border border-stone-200 dark:border-stone-800">
        {['24H', '7D', '1M', '3M', 'CUSTOM'].map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setRange(key)}
            className={cn(
              'px-2 text-xs',
              range === key
                ? 'bg-primary-600 text-stone-50 shadow-sm'
                : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            )}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-[30px] items-center gap-1 rounded-md border border-stone-200 px-2 text-xs text-stone-500 dark:border-stone-800 dark:bg-stone-800 dark:text-stone-400"
        >
          <TimerReset className="size-3 shrink-0" />
          <span>{refresh}</span>
          <ChevronsUpDown className="size-3" />
        </button>
        {open ? (
          <div className="absolute left-0 top-full z-20 mt-1 w-40 rounded-md border border-stone-200 bg-white p-1 shadow-lg dark:border-stone-800 dark:bg-stone-950">
            <p className="px-2 py-1 text-[11px] text-stone-500">Refresh Rate</p>
            {['Never', '30s', '1m', '5m', '15m'].map((key) => (
              <button
                key={key}
                type="button"
                className="block w-full rounded px-2 py-1 text-left text-xs hover:bg-stone-100 dark:hover:bg-stone-900"
                onClick={() => {
                  setRefresh(key)
                  setOpen(false)
                }}
              >
                {key}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

function HomeScreen({ api }: { api: DemoApi }) {
  const project = PROJECTS.find((item) => item.id === api.project) ?? PROJECTS[0]
  const [boardOpen, setBoardOpen] = useState(false)
  const avgTokens = project.requests ? Math.round(project.tokens / project.requests) : 0
  const avgCost = project.requests ? project.spend / project.requests : 0
  const promptTokens = Math.round(avgTokens * 0.72)
  const completionTokens = Math.max(avgTokens - promptTokens, 0)
  const requestSeries = [
    {
      name: 'Requests',
      color: '#F36C06',
      values: SPEND_SERIES[project.id].map((value) => value * 40),
    },
  ]
  const modelRows = MODEL_COSTS.filter((row) => row.project === project.id)
  const providerRows = Array.from(
    modelRows.reduce((map, row) => {
      map.set(row.provider, (map.get(row.provider) ?? 0) + row.requests)
      return map
    }, new Map<string, number>())
  ).map(([label, value]) => ({ label, value }))
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="mb-4 flex w-full items-center justify-between gap-4 px-4 pt-3">
        <TimeRange />
        <div className="relative">
          <button
            type="button"
            onClick={() => setBoardOpen((value) => !value)}
            className="inline-flex items-center gap-2 rounded-md border border-stone-200 px-2 py-1.5 text-xs font-normal text-stone-500 hover:bg-stone-700 hover:text-white dark:border-stone-800 dark:text-stone-300 dark:hover:bg-stone-600"
          >
            <LayoutDashboard className="size-3" />
            <span className="font-medium">Switch Dashboard</span>
            <ChevronsUpDown className="size-4" />
          </button>
          {boardOpen ? (
            <div className="absolute right-0 top-full z-20 mt-1 w-56 rounded-lg border border-stone-200 bg-white p-1 shadow-lg dark:border-stone-800 dark:bg-stone-950">
              <p className="px-2 py-1 text-xs text-stone-500">Pinned Dashboard</p>
              <div className="my-1 h-px bg-stone-200 dark:bg-stone-800" />
              {[
                ['Exceptions', 'telemetry'],
                ['GPU', 'gpus'],
              ].map(([title, screen]) => (
                <button
                  key={title}
                  type="button"
                  className="block w-full rounded px-2 py-1.5 text-left text-xs hover:bg-stone-100 dark:hover:bg-stone-900"
                  onClick={() => {
                    setBoardOpen(false)
                    api.go(screen as 'telemetry' | 'gpus')
                  }}
                >
                  {title}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <div className="grid min-h-0 flex-1 content-start gap-3 overflow-y-auto px-4 pb-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatWidget
          title="Total Requests"
          value={compact(project.requests)}
          trend="6%"
          up
          onClick={() => api.go('telemetry')}
        />
        <StatWidget title="Average Request Duration" value={project.p95} trend="4%" />
        <StatWidget title="Avg Tokens / Request" value={compact(avgTokens)} trend="3%" up />
        <StatWidget
          title="Total costs"
          value={money(project.spend)}
          trend={`${Math.abs(DELTA[project.id].cost)}%`}
          up={DELTA[project.id].cost >= 0}
          onClick={() => api.go('costs')}
        />
        <StatWidget title="Avg cost per request" value={`$${avgCost.toFixed(4)}`} trend="2%" />
        <StatWidget
          title="Total hallucination detected"
          value={project.id === 'support' ? '1' : '0'}
          trend="1"
          onClick={() => api.go('evaluations')}
        />
        <StatWidget title="Total bias detected" value="0" trend="0%" />
        <StatWidget title="Total toxicity detected" value="0" trend="0%" />
        <DashCard title="Requests per time" icon={Activity} className="sm:col-span-2 xl:col-span-4">
          <div className="h-36">
            <LineChart series={requestSeries} />
          </div>
        </DashCard>
        <DashCard title="Top models" icon={BarChart3} className="sm:col-span-2">
          <div className="h-32">
            <BarChart
              rows={modelRows.map((row) => ({ label: row.model, value: row.requests }))}
              color="#F36C06"
            />
          </div>
        </DashCard>
        <DashCard title="Generation by provider" icon={BarChart3} className="sm:col-span-2">
          <div className="h-32">
            <BarChart rows={providerRows} color="#8DA750" />
          </div>
        </DashCard>
        <StatWidget
          title="Avg prompt tokens / request"
          value={compact(promptTokens)}
          trend="2%"
          up
        />
        <StatWidget
          title="Avg completion tokens / request"
          value={compact(completionTokens)}
          trend="1%"
        />
        <DashCard title="Tokens Usage" icon={Activity} className="sm:col-span-2">
          <div className="h-28">
            <LineChart
              series={[
                { name: 'Prompt', color: '#F36C06', values: SPEND_SERIES[project.id] },
                {
                  name: 'Completion',
                  color: '#3b82f6',
                  values: SPEND_SERIES[project.id].map((value) => Math.round(value * 0.4)),
                },
              ]}
            />
          </div>
        </DashCard>
      </div>
    </div>
  )
}

function StatWidget({
  title,
  value,
  trend,
  up = false,
  onClick,
}: {
  title: string
  value: string
  trend?: string
  up?: boolean
  onClick?: () => void
}) {
  return (
    <DashCard title={title} icon={Activity} onClick={onClick}>
      <p className="truncate text-center text-3xl font-bold leading-tight text-[#F36C06]">
        {value}
      </p>
      {trend ? (
        <p
          className={cn(
            'mt-2 flex items-center justify-center gap-1 text-sm',
            up ? 'text-green-500' : 'text-red-500'
          )}
        >
          {trend}
          {up ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
        </p>
      ) : null}
    </DashCard>
  )
}

function DashCard({
  title,
  icon: Icon,
  children,
  className,
  onClick,
}: {
  title: string
  icon: LucideIcon
  children: ReactNode
  className?: string
  onClick?: () => void
}) {
  const classNameMerged = cn(
    'flex h-full flex-col rounded-lg border border-stone-200 bg-white text-left shadow-stone-200 hover:shadow-lg dark:border-stone-800 dark:bg-stone-950 dark:shadow-stone-800',
    className
  )
  const body = (
    <>
      <div className="flex items-center justify-between gap-2 px-4 pb-2 pt-4">
        <div className="flex min-w-0 items-center gap-2">
          <Icon className="size-4 shrink-0 text-stone-500" />
          <p className="truncate text-sm font-medium tracking-tight text-stone-600 dark:text-stone-300">
            {title}
          </p>
        </div>
        <Info className="size-3.5 shrink-0 text-stone-400" aria-hidden />
      </div>
      <div className="flex flex-1 flex-col justify-center px-3 pb-4">{children}</div>
    </>
  )
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={classNameMerged}>
        {body}
      </button>
    )
  }
  return <div className={classNameMerged}>{body}</div>
}

function DashboardsScreen({ api }: { api: DemoApi }) {
  const [view, setView] = useState<'explorer' | 'dashboard' | 'widget'>('explorer')
  const views = [
    {
      key: 'explorer' as const,
      label: 'Explorer',
      icon: FolderKanban,
      tone: 'border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-900/70 dark:bg-orange-950/40 dark:text-orange-300',
    },
    {
      key: 'dashboard' as const,
      label: 'Dashboard',
      icon: LayoutDashboard,
      tone: 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900/70 dark:bg-sky-950/40 dark:text-sky-300',
    },
    {
      key: 'widget' as const,
      label: 'Widget',
      icon: Component,
      tone: 'border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-900/70 dark:bg-violet-950/40 dark:text-violet-300',
    },
  ]
  const active = views.find((item) => item.key === view) ?? views[0]
  const boards = [
    ['LLM dashboard', 'home', 'Main board'],
    ['Exceptions', 'telemetry', 'Pinned'],
    ['GPU', 'gpus', 'Pinned'],
  ] as const
  const widgets = [
    'Total Requests',
    'Total costs',
    'Requests per time',
    'Top models',
    'Tokens Usage',
  ]
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <PageHeader
        icon={active.icon}
        eyebrow="Dashboards"
        title={active.label}
        tone={active.tone}
        actions={
          <div className="flex flex-wrap items-center justify-end gap-2">
            {views.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setView(item.key)}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-xs transition',
                    view === item.key
                      ? item.tone
                      : 'border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300'
                  )}
                >
                  <Icon className="size-4" />
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            })}
            <button
              type="button"
              aria-label="Create new dashboard"
              className="inline-flex h-8 items-center rounded-md bg-brandPrimary px-2 text-xs text-white"
            >
              <Plus className="size-3.5" />
            </button>
          </div>
        }
      />
      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        {view === 'widget' ? (
          <ul className="space-y-1 text-xs">
            {widgets.map((name) => (
              <li key={name}>
                <button
                  type="button"
                  className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left hover:bg-stone-100 dark:hover:bg-stone-900"
                  onClick={() => api.go('home')}
                >
                  <Activity className="size-4 text-stone-500" />
                  <span className="font-medium text-stone-950 dark:text-stone-50">{name}</span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="space-y-1 text-xs">
            {boards.map(([name, screen, note]) => (
              <li key={name}>
                <button
                  type="button"
                  className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left hover:bg-stone-100 dark:hover:bg-stone-900"
                  onClick={() => api.go(screen)}
                >
                  <LayoutDashboard className="size-4 text-stone-500" />
                  <span className="font-medium text-stone-950 dark:text-stone-50">{name}</span>
                  <span className="ml-auto text-stone-500">{note}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function OrganisationScreen({ api }: { api: DemoApi }) {
  const tabs = [
    { key: 'overview' as const, label: 'Overview', icon: LayoutDashboard },
    { key: 'details' as const, label: 'Details', icon: Settings },
    { key: 'projects' as const, label: `Projects (${PROJECTS.length})`, icon: FolderKanban },
    { key: 'licensing' as const, label: 'Licensing', icon: Key },
    { key: 'members' as const, label: `Members (${MEMBERS.length})`, icon: User },
    { key: 'pending' as const, label: 'Pending (2)', icon: Clock },
  ]
  const title =
    api.orgTab === 'projects'
      ? 'Projects'
      : api.orgTab === 'licensing'
        ? 'Licensing'
        : api.orgTab === 'overview'
          ? 'Overview'
          : api.orgTab === 'pending'
            ? 'Pending'
            : 'Organisation'
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <section className="border-b border-stone-200 px-4 py-3 dark:border-stone-800">
        <div className="flex flex-col gap-2 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-center gap-2">
            <span className="rounded-md border border-emerald-200 bg-emerald-50 p-1.5 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300">
              <Building2 className="size-4" />
            </span>
            <div>
              <p className="text-[11px] uppercase tracking-wide text-stone-500">Settings</p>
              <h1 className="text-sm font-semibold leading-tight text-stone-950 dark:text-stone-50">
                {title}
              </h1>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const active = api.orgTab === tab.key
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => api.setOrgTab(tab.key)}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-xs transition',
                    active
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300'
                      : 'border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 dark:hover:bg-stone-800'
                  )}
                >
                  <Icon className="size-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              )
            })}
            <button
              type="button"
              aria-label="New organisation"
              className="inline-flex h-8 items-center rounded-md bg-brandPrimary px-2 text-white"
            >
              <Plus className="size-4" />
            </button>
          </div>
        </div>
      </section>
      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <ContextChips projectId={api.project} />
        {api.orgTab === 'overview' ? <Overview api={api} /> : null}
        {api.orgTab === 'details' ? <OrgDetails /> : null}
        {api.orgTab === 'projects' ? <ProjectTable api={api} /> : null}
        {api.orgTab === 'licensing' ? <Licensing /> : null}
        {api.orgTab === 'members' ? <Members /> : null}
        {api.orgTab === 'pending' ? <PendingInvites /> : null}
      </div>
    </div>
  )
}

function Overview({ api }: { api: DemoApi }) {
  const [sortKey, setSortKey] = useState<'requests' | 'cost' | 'errorRate' | 'tokens'>('cost')
  const [sortDesc, setSortDesc] = useState(true)
  const [chips, setChips] = useState<Record<string, string>>({})
  const [savedNote, setSavedNote] = useState(false)
  const projects = PROJECTS.filter((project) => {
    if (api.overviewProject !== 'all' && project.id !== api.overviewProject) return false
    if (chips.environment && project.environment !== chips.environment) return false
    return true
  })
  const cost = projects.reduce((sum, project) => sum + project.spend, 0)
  const requests = projects.reduce((sum, project) => sum + project.requests, 0)
  const tokens = projects.reduce((sum, project) => sum + project.tokens, 0)
  const errors = projects.reduce(
    (sum, project) => sum + Math.round((project.errorRate / 100) * project.requests),
    0
  )
  const errorRate = requests ? (errors / requests) * 100 : 0
  const models = MODEL_COSTS.filter((row) =>
    projects.some((project) => project.id === row.project)
  ).filter((row) => !chips.model || row.model === chips.model)
  const users = [
    { user: 'jamie@northwind.example', cost: 1840 },
    { user: 'sam@northwind.example', cost: 1210 },
    { user: 'avery@northwind.example', cost: 890 },
    { user: 'priya@northwind.example', cost: 340 },
  ].filter((user) => !chips.user || user.user.startsWith(chips.user))
  const sorted = [...projects].sort((a, b) => {
    const diff = a[sortKey] - b[sortKey]
    return sortDesc ? -diff : diff
  })
  const percent = api.savedCap > 0 ? (ORG_SPEND / api.savedCap) * 100 : 0
  const series = projects.map((project, index) => ({
    name: project.name,
    color: SERIES[index % SERIES.length],
    values: SPEND_SERIES[project.id],
  }))
  const toggleSort = (key: typeof sortKey) => {
    if (sortKey === key) setSortDesc((value) => !value)
    else {
      setSortKey(key)
      setSortDesc(true)
    }
  }
  const exportCsv = () => {
    const header = 'project,requests,cost,error_rate,p95,tokens'
    const body = sorted
      .map(
        (project) =>
          `${project.name},${project.requests},${project.spend},${project.errorRate},${project.p95},${project.tokens}`
      )
      .join('\n')
    const blob = new Blob([`${header}\n${body}`], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'northwind-projects.csv'
    link.click()
    URL.revokeObjectURL(url)
  }
  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="truncate text-sm font-semibold text-stone-950 dark:text-stone-50">
            {ORG_NAME}
          </p>
          <p className="text-xs text-stone-500">
            See how every project in this organisation is doing. Requests, cost, latency, and errors
            in one place.
          </p>
        </div>
        <TimeRange />
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        <Chip
          title="Projects"
          value={api.overviewProject === 'all' ? '' : api.overviewProject}
          options={PROJECTS.map((project) => project.id)}
          onChange={(value) => api.setOverviewProject(value ? (value as ProjectId) : 'all')}
        />
        <Chip
          title="Users"
          value={chips.user}
          options={['jamie', 'sam', 'avery', 'priya']}
          onChange={(value) => setChips((current) => ({ ...current, user: value }))}
        />
        <Chip
          title="Environments"
          value={chips.environment}
          options={['production', 'staging']}
          onChange={(value) => setChips((current) => ({ ...current, environment: value }))}
        />
        <Chip
          title="Providers"
          value={chips.provider}
          options={['Anthropic', 'OpenAI', 'Google']}
          onChange={(value) => setChips((current) => ({ ...current, provider: value }))}
        />
        <Chip
          title="Models"
          value={chips.model}
          options={['claude-sonnet-4', 'gpt-4o', 'gpt-4o-mini']}
          onChange={(value) => setChips((current) => ({ ...current, model: value }))}
        />
        <Chip
          title="Applications"
          value={chips.application}
          options={['support-agent', 'checkout-api', 'research-agent']}
          onChange={(value) => setChips((current) => ({ ...current, application: value }))}
        />
        <Chip
          title="Services"
          value={chips.service}
          options={['support-agent', 'checkout-api', 'worker']}
          onChange={(value) => setChips((current) => ({ ...current, service: value }))}
        />
        <Chip
          title="Spans"
          value={chips.span}
          options={['support.triage', 'checkout.policy', 'research.notes']}
          onChange={(value) => setChips((current) => ({ ...current, span: value }))}
        />
        <Chip
          title="Types"
          value={chips.type}
          options={['chat', 'tool']}
          onChange={(value) => setChips((current) => ({ ...current, type: value }))}
        />
      </div>
      <div className={cn(PANEL, 'grid grid-cols-2 md:grid-cols-5')}>
        <Stat
          title="Total cost"
          value={money(cost || 0)}
          delta={projects.length === 3 ? 11 : undefined}
        />
        <Stat
          title="Total requests"
          value={compact(requests)}
          delta={projects.length === 3 ? 8 : undefined}
        />
        <Stat
          title="Error rate"
          value={`${errorRate.toFixed(1)}%`}
          hint={`${compact(errors)} / ${compact(requests)}`}
        />
        <Stat title="Avg duration" value="1.6s" delta={-4} />
        <Stat
          title="Tokens"
          value={compact(tokens)}
          hint={`${compact(Math.round(tokens * 0.21))} tokens read from cache`}
        />
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        <ChartPanel title="Cost over time" hint="How much each project spent">
          <LineChart series={series} />
        </ChartPanel>
        <ChartPanel title="Cost by model" hint="Which models the organisation is paying for">
          <BarChart
            rows={models.slice(0, 8).map((row) => ({ label: row.model, value: row.cost }))}
            color="#F36C06"
          />
        </ChartPanel>
        <ChartPanel title="Requests over time" hint="How many requests each project made">
          <LineChart
            series={series.map((item) => ({
              ...item,
              values: item.values.map((value) => value * 40),
            }))}
          />
        </ChartPanel>
        <ChartPanel title="Errors by project" hint="Requests that failed in this time range">
          <BarChart
            rows={projects.map((project) => ({
              label: project.name,
              value: Math.round((project.errorRate / 100) * project.requests),
            }))}
            color="#ED474A"
          />
        </ChartPanel>
      </div>
      <div className={cn(PANEL, 'grid grid-cols-2 lg:grid-cols-4')}>
        <Stat
          title="Top cost driver"
          value={projects[0]?.name ?? 'None'}
          hint={
            projects[0]
              ? money(Math.max(...projects.map((project) => project.spend)))
              : 'No cost in this time range'
          }
        />
        <Stat title="Biggest cost mover" value="support" hint={money(410)} />
        <Stat
          title="Projects with errors"
          value={String(projects.filter((project) => project.errorRate > 0).length)}
        />
        <Stat title="Projects missing a database" value="0" />
      </div>
      <div className="grid gap-3 lg:grid-cols-3">
        <section className={PANEL}>
          <header className="border-b border-stone-200 px-3 py-2 dark:border-stone-800">
            <h3 className="text-xs font-semibold text-stone-950 dark:text-stone-50">
              Monthly spend limit
            </h3>
            <p className="text-[11px] text-stone-500">
              A monthly budget for model spend. OpenLIT can warn you when you get close. It does not
              stop provider calls.
            </p>
          </header>
          <div className="space-y-2 p-3">
            <p className="text-xs">
              {api.savedCap <= 0
                ? 'No spend limit set'
                : `${money(ORG_SPEND)} / ${money(api.savedCap)} (${percent.toFixed(0)}%)`}
            </p>
            <p className="text-[11px] text-stone-500">Projected this month: {money(5768.04)}</p>
            {api.level === 'warning' ? (
              <p className="text-[11px] text-amber-700 dark:text-amber-300">
                Getting close to the limit.
              </p>
            ) : null}
            {api.level === 'limit' ? (
              <p className="text-[11px] text-red-700 dark:text-red-300">Over the limit.</p>
            ) : null}
            <div className="flex flex-wrap items-center gap-1.5">
              <input
                aria-label="Monthly spend limit"
                value={api.cap}
                onChange={(event) => api.setCap(Number(event.target.value) || 0)}
                className="h-7 w-24 rounded-md border border-stone-200 bg-white px-2 text-xs dark:border-stone-800 dark:bg-stone-950"
              />
              <select
                className="h-7 max-w-[9rem] rounded-md border border-stone-200 bg-white px-2 text-xs dark:border-stone-800 dark:bg-stone-950"
                defaultValue="slack"
              >
                <option value="">None</option>
                <option value="slack">Slack · #ai-oncall</option>
                <option value="email">Email · owners</option>
              </select>
              <button
                type="button"
                className="h-7 rounded-md bg-brandPrimary px-2 text-xs text-white"
                onClick={() => {
                  api.saveCap()
                  setSavedNote(true)
                }}
              >
                Save limit
              </button>
            </div>
            {savedNote ? <p className="text-[11px] text-stone-500">Spend limit saved</p> : null}
          </div>
        </section>
        <section className={cn(PANEL, 'space-y-1 p-3 text-xs')}>
          <h3 className="text-xs font-semibold text-stone-950 dark:text-stone-50">Adoption</h3>
          <p>Active projects: {projects.length}</p>
          <p>Silent projects: {3 - projects.length}</p>
          <p>Projects missing a database: 0</p>
          <p>Active users: {users.length}</p>
          <p>Seats: 12 / 25</p>
          <p>Cache efficiency: 21%</p>
        </section>
        <section className={cn(PANEL, 'space-y-1 p-3 text-xs')}>
          <h3 className="text-xs font-semibold text-stone-950 dark:text-stone-50">Top users</h3>
          {users.length === 0 ? (
            <p className="text-stone-500">None</p>
          ) : (
            users.map((user) => (
              <p key={user.user} className="flex justify-between gap-2">
                <span className="truncate">{user.user}</span>
                <span className="shrink-0 text-stone-500">{money(user.cost)}</span>
              </p>
            ))
          )}
        </section>
      </div>
      <section className={PANEL}>
        <header className="flex items-center justify-between gap-2 border-b border-stone-200 px-3 py-2 dark:border-stone-800">
          <div>
            <h3 className="text-xs font-semibold text-stone-950 dark:text-stone-50">
              Project comparison
            </h3>
            <p className="text-[11px] text-stone-500">Compare projects and sort by any column</p>
          </div>
          <button
            type="button"
            onClick={exportCsv}
            className="h-7 rounded-md border border-stone-200 px-2 text-xs dark:border-stone-800"
          >
            Export CSV
          </button>
        </header>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-800">
                <th className={cn('h-8 pl-3 text-left font-medium', LABEL)}>Project</th>
                <SortHead
                  label="Requests"
                  active={sortKey === 'requests'}
                  desc={sortDesc}
                  onSort={() => toggleSort('requests')}
                />
                <SortHead
                  label="Cost"
                  active={sortKey === 'cost'}
                  desc={sortDesc}
                  onSort={() => toggleSort('cost')}
                />
                <SortHead
                  label="Error rate"
                  active={sortKey === 'errorRate'}
                  desc={sortDesc}
                  onSort={() => toggleSort('errorRate')}
                />
                <th className={cn('h-8 px-2 text-right font-medium', LABEL)}>P95</th>
                <SortHead
                  label="Tokens"
                  active={sortKey === 'tokens'}
                  desc={sortDesc}
                  onSort={() => toggleSort('tokens')}
                />
                <th className={cn('h-8 pr-3 text-right font-medium', LABEL)}>Share of requests</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((project) => (
                <tr key={project.id} className="border-b border-stone-100 dark:border-stone-900">
                  <td className="py-1.5 pl-3">
                    <button
                      type="button"
                      className="font-medium text-stone-950 hover:underline dark:text-stone-50"
                      onClick={() => api.setProject(project.id)}
                    >
                      {project.name}
                    </button>
                  </td>
                  <td className="py-1.5 text-right tabular-nums">{compact(project.requests)}</td>
                  <td className="py-1.5 text-right tabular-nums">
                    {money(project.spend)}
                    <span className="ml-1 text-[11px] text-stone-500">
                      {DELTA[project.id].cost}%
                    </span>
                  </td>
                  <td className="py-1.5 text-right tabular-nums">
                    {project.errorRate.toFixed(1)}%
                  </td>
                  <td className="py-1.5 text-right tabular-nums">{project.p95}</td>
                  <td className="py-1.5 text-right tabular-nums">{compact(project.tokens)}</td>
                  <td className="py-1.5 pr-3 text-right tabular-nums">
                    {requests ? ((project.requests / 128420) * 100).toFixed(0) : 0}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

function OrgDetails() {
  const [name, setName] = useState(ORG_NAME)
  const [note, setNote] = useState('')
  return (
    <div className="max-w-lg space-y-3">
      <label className="block text-sm" htmlFor="org-name">
        Organisation name
        <div className="mt-1.5 flex gap-2">
          <input
            id="org-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="h-8 flex-1 rounded-md border border-stone-200 bg-white px-2 text-sm dark:border-stone-800 dark:bg-stone-950"
          />
          <button
            type="button"
            className="h-8 rounded-md bg-brandPrimary px-3 text-xs text-white"
            onClick={() => setNote('Not saved. This is sample data.')}
          >
            Save
          </button>
        </div>
      </label>
      {note ? <p className="text-xs text-stone-500">{note}</p> : null}
    </div>
  )
}

function Licensing() {
  return (
    <div className={cn(PANEL, 'max-w-lg space-y-2 p-3 text-xs')}>
      <p>
        <span className="text-stone-500">Plan</span> Enterprise
      </p>
      <p>
        <span className="text-stone-500">Seats</span> 12 / 25
      </p>
      <p>
        <span className="text-stone-500">License</span> ol-ent-••••-northwind
      </p>
      <p className="text-stone-500">
        The key is masked. This sample does not check a license server.
      </p>
    </div>
  )
}

function Members() {
  return (
    <table className="w-full text-xs">
      <thead>
        <tr className="border-b border-stone-200 text-left dark:border-stone-800">
          {['Name', 'Email', 'Role'].map((label) => (
            <th key={label} className={cn('h-8 font-medium', LABEL)}>
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {MEMBERS.map((member) => (
          <tr key={member.email} className="border-b border-stone-100 dark:border-stone-900">
            <td className="py-2 font-medium text-stone-950 dark:text-stone-50">{member.name}</td>
            <td className="py-2">{member.email}</td>
            <td className="py-2">{member.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function ContextChips({ projectId }: { projectId: ProjectId }) {
  const project = PROJECTS.find((item) => item.id === projectId) ?? PROJECTS[0]
  const items = [
    ['Organisation ID', 'org_northwind01'],
    ['Project ID', `prj_${project.id}_sample`],
    ['Environment', project.environment],
  ]
  return (
    <div className="mb-3 flex flex-wrap items-center gap-1.5">
      {items.map(([label, value]) => (
        <ContextChip key={label} label={label} value={value} />
      ))}
    </div>
  )
}

function ContextChip({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false)
  const shown = value.length <= 22 ? value : `${value.slice(0, 10)}…${value.slice(-6)}`
  return (
    <span className="inline-flex max-w-full items-center gap-1 rounded-md border border-stone-200 bg-stone-50 px-1.5 py-0.5 text-[11px] text-stone-600 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300">
      <span className="shrink-0 font-medium text-stone-500 dark:text-stone-400">{label}</span>
      <span className="min-w-0 truncate font-mono text-stone-800 dark:text-stone-100" title={value}>
        {shown}
      </span>
      <button
        type="button"
        aria-label={`Copy ${label}`}
        className="shrink-0 rounded p-0.5 text-stone-400 hover:bg-stone-200/80 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-200"
        onClick={() => {
          void navigator.clipboard?.writeText(value).then(() => {
            setCopied(true)
            window.setTimeout(() => setCopied(false), 1500)
          })
        }}
      >
        {copied ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
      </button>
    </span>
  )
}

function PendingInvites() {
  const rows = [
    ['riley@northwind.example', '2 days ago'],
    ['jordan@northwind.example', '5 days ago'],
  ]
  return (
    <table className="w-full text-xs">
      <thead>
        <tr className="border-b border-stone-200 text-left dark:border-stone-800">
          {['Email', 'Invited'].map((label) => (
            <th key={label} className={cn('h-8 font-medium', LABEL)}>
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(([email, when]) => (
          <tr key={email} className="border-b border-stone-100 dark:border-stone-900">
            <td className="py-2 font-medium text-stone-950 dark:text-stone-50">{email}</td>
            <td className="py-2 text-stone-500">{when}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function ProjectTable({ api }: { api: DemoApi }) {
  return (
    <table className="w-full text-xs">
      <thead>
        <tr className="border-b border-stone-200 text-left dark:border-stone-800">
          {['Project', 'Environment', 'Database'].map((label) => (
            <th key={label} className={cn('h-8 font-medium', LABEL)}>
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {PROJECTS.map((project) => (
          <tr key={project.id} className="border-b border-stone-100 dark:border-stone-900">
            <td className="py-2">
              <button
                type="button"
                className="font-medium text-stone-950 hover:underline dark:text-stone-50"
                onClick={() => api.setProject(project.id)}
              >
                {project.name}
              </button>
            </td>
            <td className="py-2">{project.environment}</td>
            <td className="py-2">{api.database}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function ProjectsScreen({ api }: { api: DemoApi }) {
  return (
    <div className="flex h-full flex-col">
      <PageHeader
        icon={FolderKanban}
        eyebrow="Settings"
        title="Projects"
        tone="border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300"
      />
      <div className="overflow-y-auto p-4">
        <ProjectTable api={api} />
      </div>
    </div>
  )
}

const SIGNALS = [
  {
    key: 'traces' as const,
    label: 'Traces',
    icon: GitBranch,
    tone: 'border-sky-200 bg-sky-50 text-sky-600 dark:border-sky-900 dark:bg-sky-950/40 dark:text-sky-400',
  },
  {
    key: 'spans' as const,
    label: 'Spans',
    icon: Activity,
    tone: 'border-cyan-200 bg-cyan-50 text-cyan-600 dark:border-cyan-900 dark:bg-cyan-950/40 dark:text-cyan-400',
  },
  {
    key: 'exceptions' as const,
    label: 'Exceptions',
    icon: ShieldAlert,
    tone: 'border-rose-200 bg-rose-50 text-rose-600 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-400',
  },
  {
    key: 'metrics' as const,
    label: 'Metrics',
    icon: BarChart3,
    tone: 'border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-400',
  },
  {
    key: 'logs' as const,
    label: 'Logs',
    icon: FileText,
    tone: 'border-amber-200 bg-amber-50 text-amber-600 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-400',
  },
]

function TelemetryScreen({ api }: { api: DemoApi }) {
  const [signal, setSignal] = useState<(typeof SIGNALS)[number]['key']>('traces')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const active = SIGNALS.find((item) => item.key === signal) ?? SIGNALS[0]
  const ActiveIcon = active.icon
  const projectRows = TRACES.filter((trace) => trace.project === api.project).filter((trace) =>
    matchesQuery(api.query, [trace.name, trace.id, trace.model, trace.application])
  )
  const rows =
    signal === 'exceptions'
      ? projectRows.filter((trace) => trace.status === 'error')
      : projectRows.filter((trace) =>
          api.statusFilter === 'all' ? true : trace.status === api.statusFilter
        )
  const selected =
    api.traceOpen && (signal === 'traces' || signal === 'spans' || signal === 'exceptions')
      ? rows.find((trace) => trace.id === api.focus) ??
        TRACES.find((trace) => trace.id === api.focus)
      : undefined
  const selectedIndex = selected ? rows.findIndex((trace) => trace.id === selected.id) : -1
  const volume = SPEND_LABELS.map((label, index) => ({
    label,
    value: SPEND_SERIES[api.project][index] ?? 0,
  }))
  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      <PageHeader
        icon={ActiveIcon}
        eyebrow="Monitor"
        title={active.label}
        tone={active.tone}
        actions={
          <div className="grid grid-cols-2 gap-2 md:flex md:flex-wrap md:justify-end">
            {SIGNALS.map((item) => {
              const Icon = item.icon
              const isActive = item.key === signal
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setSignal(item.key)}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-xs transition',
                    isActive
                      ? item.tone
                      : 'border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 dark:hover:bg-stone-800'
                  )}
                >
                  <Icon className="size-4" />
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            })}
          </div>
        }
      />
      <section className="min-h-0 flex-1 overflow-auto bg-white p-4 dark:bg-stone-950">
        {api.database === 'warehouse' ? (
          <p className="px-2 py-8 text-center text-xs text-stone-500">
            No requests in this database.
          </p>
        ) : (
          <>
            <section className="mb-3 rounded-md border border-stone-200 bg-stone-50/80 p-3 dark:border-stone-800 dark:bg-stone-900/40">
              <div className="mb-2 flex items-center justify-between gap-2">
                <div>
                  <p className="text-xs uppercase tracking-wide text-stone-500">Hour volume</p>
                  <h2 className="text-sm font-semibold text-stone-950 dark:text-stone-50">
                    {active.label}
                  </h2>
                </div>
                <span className="rounded-full border border-stone-300 px-2 py-1 text-xs font-medium text-stone-600 dark:border-stone-700 dark:text-stone-300">
                  Live
                </span>
              </div>
              <div className="h-28">
                <BarChart
                  rows={volume}
                  color={
                    signal === 'exceptions'
                      ? '#e11d48'
                      : signal === 'logs'
                        ? '#d97706'
                        : signal === 'metrics'
                          ? '#059669'
                          : '#0284c7'
                  }
                />
              </div>
            </section>
            {signal === 'traces' ? (
              <div className="mb-3 flex flex-wrap gap-1.5">
                {[
                  ['Truncated', '0'],
                  ['Filtered', projectRows.some((trace) => trace.status === 'error') ? '1' : '0'],
                  ['Empty', '0'],
                  ['Swapped', '0'],
                  ['Agent loop', '1'],
                ].map(([label, count]) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => label === 'Filtered' && api.setStatus('error')}
                    className="inline-flex items-center gap-1.5 rounded-md border border-stone-200 bg-white px-2 py-1 text-[11px] text-stone-600 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-300"
                  >
                    <span>{label}</span>
                    <span className="font-semibold tabular-nums text-stone-950 dark:text-stone-50">
                      {count}
                    </span>
                  </button>
                ))}
              </div>
            ) : null}
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <TimeRange />
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setFiltersOpen((value) => !value)}
                  className="inline-flex h-[30px] items-center gap-1 rounded-md border border-stone-200 px-2 text-xs dark:border-stone-800"
                >
                  <SlidersHorizontal className="size-3.5" />
                  Filters
                </button>
                {filtersOpen ? (
                  <div className="absolute left-0 top-full z-20 mt-1 w-44 rounded-md border border-stone-200 bg-white p-2 shadow-lg dark:border-stone-800 dark:bg-stone-950">
                    <label className="block text-[11px] text-stone-500">
                      Status
                      <select
                        value={api.statusFilter}
                        onChange={(event) =>
                          api.setStatus(event.target.value as 'all' | 'error' | 'ok')
                        }
                        className="mt-1 h-7 w-full rounded-md border border-stone-200 bg-white px-2 text-xs dark:border-stone-800 dark:bg-stone-950"
                      >
                        <option value="all">All</option>
                        <option value="error">Error</option>
                        <option value="ok">OK</option>
                      </select>
                    </label>
                    <input
                      value={api.query}
                      onChange={(event) => api.setQuery(event.target.value)}
                      placeholder="Span name"
                      className="mt-2 h-7 w-full rounded-md border border-stone-200 bg-white px-2 text-xs dark:border-stone-800 dark:bg-stone-950"
                    />
                  </div>
                ) : null}
              </div>
            </div>
            {signal === 'metrics' ? (
              <div className="flex flex-col gap-2">
                {[
                  ['gen_ai.client.token.usage', 'histogram', '18.4K', 'support-agent'],
                  ['gen_ai.client.operation.duration', 'histogram', '2.410s', 'support-agent'],
                  ['process.runtime.cpu.utilization', 'gauge', '41%', 'checkout-api'],
                ].map(([name, type, value, service]) => (
                  <button
                    key={name}
                    type="button"
                    className="w-full rounded-md border border-stone-200 bg-white p-3 text-left hover:border-brandPrimary/50 dark:border-stone-800 dark:bg-stone-950"
                  >
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-sky-500" />
                      <h3 className="truncate text-sm font-semibold text-stone-950 dark:text-stone-50">
                        {name}
                      </h3>
                      <span className="rounded bg-stone-100 px-1.5 py-0.5 text-[11px] text-stone-600 dark:bg-stone-900 dark:text-stone-300">
                        {type}
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-stone-100 dark:bg-stone-800">
                      <div className="h-full w-2/3 rounded-full bg-emerald-500" />
                    </div>
                    <p className="mt-2 text-xs text-stone-500">
                      latest {value} · {service}
                    </p>
                  </button>
                ))}
              </div>
            ) : signal === 'logs' ? (
              <div className="flex flex-col gap-2">
                {[
                  [
                    'ERROR',
                    '12 min ago',
                    'support-agent',
                    'lookup_order returned not_found',
                    'tr_4c21',
                  ],
                  ['INFO', '12 min ago', 'support-agent', 'rule.mask_email applied', 'tr_4c21'],
                  ['WARN', '28 min ago', 'checkout-api', 'retrying provider after 429', 'tr_1ab8'],
                ].map(([severity, when, service, body, traceId]) => (
                  <button
                    key={body}
                    type="button"
                    className="w-full rounded-md border border-stone-200 bg-white text-left font-mono hover:border-amber-400 dark:border-stone-800 dark:bg-stone-950"
                  >
                    <div className="grid grid-cols-[auto_auto_auto_1fr] items-center gap-2 px-3 py-2">
                      <span
                        className={cn(
                          'rounded-full px-2 py-0.5 text-[11px] font-semibold',
                          severity === 'ERROR'
                            ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                            : severity === 'WARN'
                              ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                              : 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300'
                        )}
                      >
                        {severity}
                      </span>
                      <span className="text-xs text-stone-500">{when}</span>
                      <span className="max-w-36 truncate text-xs text-stone-500">{service}</span>
                      <p className="truncate text-sm text-stone-900 dark:text-stone-100">{body}</p>
                    </div>
                    <div className="flex flex-wrap gap-x-3 border-t border-stone-100 px-3 py-1.5 text-[11px] text-stone-500 dark:border-stone-900">
                      <span>trace:{traceId}</span>
                      <span>env:production</span>
                      <span>attrs:4/6/1</span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex min-h-0 flex-col gap-2">
                {rows.length === 0 ? (
                  <p className="px-2 py-8 text-center text-xs text-stone-500">
                    No requests match this filter.
                  </p>
                ) : (
                  rows.map((trace) => {
                    const isSelected = selected?.id === trace.id
                    return (
                      <button
                        key={trace.id}
                        type="button"
                        onClick={() => api.openTrace(trace.id)}
                        className={cn(
                          'w-full rounded-md border p-3 text-left transition',
                          isSelected
                            ? 'border-brandPrimary bg-primary-50 shadow-sm ring-1 ring-brandPrimary/20 dark:bg-primary-950/30'
                            : 'border-stone-200 bg-white hover:border-brandPrimary/50 dark:border-stone-800 dark:bg-stone-950'
                        )}
                      >
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                          <div className="min-w-0">
                            <div className="flex min-w-0 items-center gap-2">
                              <span
                                className={cn(
                                  'h-2 w-2 shrink-0 rounded-full',
                                  trace.status === 'error' ? 'bg-rose-500' : 'bg-sky-500'
                                )}
                              />
                              <h3 className="truncate text-sm font-semibold text-stone-950 dark:text-stone-50">
                                {trace.name}
                              </h3>
                              {trace.status === 'error' ? (
                                <span className="inline-flex items-center rounded-md border border-rose-200 bg-rose-50 px-1.5 py-0.5 text-[10px] font-medium text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-200">
                                  Filtered
                                </span>
                              ) : null}
                              {trace.id === 'tr_4c21' ? (
                                <span className="inline-flex items-center rounded-md border border-violet-200 bg-violet-50 px-1.5 py-0.5 text-[10px] font-medium text-violet-800 dark:border-violet-900/50 dark:bg-violet-950/40 dark:text-violet-200">
                                  Agent loop
                                </span>
                              ) : null}
                            </div>
                            <div className="mt-1 flex flex-wrap gap-x-3 text-xs text-stone-500">
                              <span>{trace.when}</span>
                              <span className="font-mono">
                                {signal === 'spans' ? 'Span ID' : 'Trace ID'}: {trace.id}
                              </span>
                              <span>{trace.application}</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap justify-end gap-1.5">
                            <Mini
                              icon={GitBranch}
                              label="spans"
                              value={String(trace.spans.length)}
                            />
                            <Mini
                              icon={Clock}
                              label="duration"
                              value={`${(trace.latencyMs / 1000).toFixed(3)}s`}
                            />
                            <Mini icon={Zap} label="tokens" value={compact(trace.tokens)} />
                            <Mini icon={Hash} label="model" value={trace.model} />
                          </div>
                        </div>
                      </button>
                    )
                  })
                )}
              </div>
            )}
          </>
        )}
      </section>
      {selected ? (
        <aside className="absolute bottom-2 right-2 top-2 z-20 flex w-[min(68%,42rem)] min-w-[min(calc(100%-1rem),420px)] flex-col overflow-hidden rounded-md border border-stone-200 bg-white shadow-2xl dark:border-stone-800 dark:bg-stone-950">
          <div className="flex shrink-0 flex-col gap-2 border-b border-stone-200 bg-white/95 px-3 py-2 shadow-sm dark:border-stone-800 dark:bg-stone-950/95">
            <div className="flex items-start justify-between gap-2">
              <h2 className="truncate text-base font-semibold text-stone-950 dark:text-stone-50 md:text-lg">
                {selected.name}
              </h2>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 rounded-md border border-stone-200 bg-white p-0.5 dark:border-stone-800 dark:bg-stone-950">
                  <button
                    type="button"
                    aria-label="Previous span"
                    disabled={selectedIndex <= 0}
                    onClick={() => selectedIndex > 0 && api.openTrace(rows[selectedIndex - 1].id)}
                    className="rounded p-1 text-stone-500 hover:bg-stone-100 disabled:opacity-30 dark:hover:bg-stone-800"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <span className="min-w-[4.5rem] px-1 text-center text-xs tabular-nums text-stone-500">
                    {selectedIndex + 1} / {rows.length}
                  </span>
                  <button
                    type="button"
                    aria-label="Next span"
                    disabled={selectedIndex < 0 || selectedIndex >= rows.length - 1}
                    onClick={() =>
                      selectedIndex >= 0 &&
                      selectedIndex < rows.length - 1 &&
                      api.openTrace(rows[selectedIndex + 1].id)
                    }
                    className="rounded p-1 text-stone-500 hover:bg-stone-100 disabled:opacity-30 dark:hover:bg-stone-800"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </div>
                <button
                  type="button"
                  aria-label="Expand"
                  className="inline-flex h-7 items-center gap-1.5 rounded-md border border-stone-200 px-2 text-xs dark:border-stone-800"
                >
                  <Maximize2 className="size-3.5" />
                </button>
                <button
                  type="button"
                  aria-label="Close trace"
                  onClick={() => api.closeTrace()}
                  className="inline-flex size-7 items-center justify-center rounded-md border border-stone-200 bg-white text-stone-600 hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-300 dark:hover:bg-stone-800"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1.5 md:grid-cols-3 xl:grid-cols-5">
              <DetailStat icon={AlertTriangle} label="Status" value={selected.status} />
              <DetailStat
                icon={Clock}
                label="Duration"
                value={`${(selected.latencyMs / 1000).toFixed(3)}s`}
              />
              <DetailStat icon={Zap} label="Tokens" value={compact(selected.tokens)} />
              <DetailStat icon={DollarSign} label="Cost" value={money(selected.cost)} />
              <DetailStat icon={Cpu} label="Model" value={selected.model} />
            </div>
          </div>
          <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden p-2">
            <div className="flex shrink-0 flex-wrap gap-1.5">
              <MetaPill label="Trace ID" value={selected.id} />
              <MetaPill label="Span ID" value={`sp_${selected.id.replace(/^tr_/, '')}`} />
              <MetaPill label="Service" value={selected.application} />
              <MetaPill label="Service Namespace" value="northwind" />
              <MetaPill label="Deployment Environment" value={selected.environment} />
            </div>
            <TraceExplorer
              key={selected.id}
              trace={selected}
              tab={api.traceTab}
              onTab={api.setTraceTab}
            />
          </div>
        </aside>
      ) : null}
    </div>
  )
}

function DetailStat({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: string
}) {
  return (
    <div className="rounded-md bg-stone-100 px-2.5 py-1.5 dark:bg-stone-900">
      <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
        <Icon className="size-3.5" />
        {label}
      </div>
      <div className="mt-0.5 truncate text-xs font-semibold text-stone-900 dark:text-stone-100">
        {value}
      </div>
    </div>
  )
}

function MetaPill({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex max-w-full items-center gap-1 rounded-full border border-stone-200 px-2 py-0.5 text-[11px] dark:border-stone-800">
      <span className="text-stone-500">{label}</span>
      <span className="truncate font-medium text-stone-800 dark:text-stone-200">{value}</span>
    </span>
  )
}

const EXPLORER_VIEWS = [
  { key: 'tree', label: 'Tree', icon: GitBranch },
  { key: 'chat', label: 'Chat', icon: MessageSquareText },
  { key: 'loop', label: 'Agent loop', icon: Repeat },
  { key: 'governance', label: 'Governance', icon: Shield },
  { key: 'timeline', label: 'Timeline', icon: BarChart3 },
  { key: 'graph', label: 'Graph', icon: Network },
] as const

type ExplorerView = (typeof EXPLORER_VIEWS)[number]['key']

function TraceExplorer({
  trace,
  tab,
  onTab,
}: {
  trace: Trace
  tab: TraceTab
  onTab: (tab: TraceTab) => void
}) {
  const [view, setView] = useState<ExplorerView>('tree')
  const [spanName, setSpanName] = useState(trace.spans[0]?.name ?? trace.name)
  const root = trace.spans[0]
  const children = trace.spans.slice(1)
  const active = trace.spans.find((span) => span.name === spanName) ?? root

  return (
    <div className="grid min-h-0 flex-1 overflow-hidden rounded-md border border-stone-200 dark:border-stone-800 md:grid-cols-2">
      <div className="flex min-h-0 overflow-hidden border-b border-stone-200 dark:border-stone-800 md:border-b-0 md:border-r">
        <nav
          aria-label="Span explorer"
          className="flex w-9 shrink-0 flex-col items-center gap-0.5 border-r border-stone-200 bg-stone-50 py-1.5 dark:border-stone-800 dark:bg-stone-900"
        >
          {EXPLORER_VIEWS.map((mode) => {
            const Icon = mode.icon
            const selected = view === mode.key
            return (
              <button
                key={mode.key}
                type="button"
                aria-label={mode.label}
                title={mode.label}
                aria-pressed={selected}
                onClick={() => setView(mode.key)}
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded transition-colors',
                  selected
                    ? 'bg-primary-600 text-white'
                    : 'text-stone-500 hover:bg-stone-100 hover:text-stone-800 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-100'
                )}
              >
                <Icon className="size-4" />
              </button>
            )
          })}
        </nav>
        <div className="min-h-0 flex-1 overflow-auto p-2">
          {view === 'tree' ? (
            <div>
              {root ? (
                <button
                  type="button"
                  onClick={() => setSpanName(root.name)}
                  className={cn(
                    'flex w-full items-center gap-2 rounded px-1.5 py-1 text-left text-xs',
                    spanName === root.name
                      ? 'bg-stone-100 dark:bg-stone-900'
                      : 'hover:bg-stone-50 dark:hover:bg-stone-900'
                  )}
                >
                  <span
                    className={cn(
                      'size-1.5 shrink-0 rounded-full',
                      root.status === 'error' ? 'bg-rose-500' : 'bg-emerald-500'
                    )}
                  />
                  <span className="min-w-0 flex-1 truncate font-medium text-stone-900 dark:text-stone-100">
                    {root.name}
                  </span>
                  <span className="shrink-0 tabular-nums text-stone-500">{root.ms} ms</span>
                </button>
              ) : null}
              <div className="ml-2 border-l border-stone-200 pl-2 dark:border-stone-800">
                {children.map((span) => (
                  <button
                    key={span.name}
                    type="button"
                    onClick={() => setSpanName(span.name)}
                    className={cn(
                      'flex w-full items-center gap-2 rounded px-1.5 py-1 text-left text-xs',
                      spanName === span.name
                        ? 'bg-stone-100 dark:bg-stone-900'
                        : 'hover:bg-stone-50 dark:hover:bg-stone-900'
                    )}
                  >
                    <span
                      className={cn(
                        'size-1.5 shrink-0 rounded-full',
                        span.status === 'error' ? 'bg-rose-500' : 'bg-emerald-500'
                      )}
                    />
                    <span className="min-w-0 flex-1 truncate text-stone-800 dark:text-stone-200">
                      {span.name}
                    </span>
                    <span className="shrink-0 tabular-nums text-stone-500">{span.ms} ms</span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}
          {view === 'chat' ? (
            <div className="space-y-2 text-xs">
              <p className="rounded-md bg-stone-100 px-2 py-1.5 text-stone-800 dark:bg-stone-900 dark:text-stone-200">
                {trace.prompt}
              </p>
              <p className="rounded-md border border-stone-200 px-2 py-1.5 text-stone-700 dark:border-stone-800 dark:text-stone-300">
                {trace.reply}
              </p>
            </div>
          ) : null}
          {view === 'loop' ? (
            <ol className="space-y-1 text-xs">
              {trace.spans.map((span, index) => (
                <li key={span.name} className="flex items-center gap-2 rounded px-1.5 py-1">
                  <span className="w-4 shrink-0 tabular-nums text-stone-400">{index + 1}</span>
                  <span className="min-w-0 flex-1 truncate text-stone-800 dark:text-stone-200">
                    {span.name}
                  </span>
                  <span className="text-stone-500">{span.detail || span.status}</span>
                </li>
              ))}
            </ol>
          ) : null}
          {view === 'governance' ? (
            <div className="space-y-1 text-xs">
              {trace.guardrails.map((rule) => (
                <div
                  key={rule.ruleId}
                  className="flex items-center justify-between gap-2 rounded px-1.5 py-1"
                >
                  <span className="font-medium text-stone-800 dark:text-stone-200">
                    {rule.ruleId}
                  </span>
                  <span className="text-stone-500">{rule.result}</span>
                </div>
              ))}
            </div>
          ) : null}
          {view === 'timeline' ? (
            <div className="space-y-1.5">
              {trace.spans.map((span) => (
                <div key={span.name}>
                  <div className="flex items-center justify-between gap-2 text-[11px]">
                    <span className="truncate text-stone-700 dark:text-stone-300">{span.name}</span>
                    <span className="tabular-nums text-stone-500">{span.ms} ms</span>
                  </div>
                  <div className="mt-0.5 h-1.5 rounded-full bg-stone-100 dark:bg-stone-900">
                    <div
                      className={cn(
                        'h-1.5 rounded-full',
                        span.status === 'error' ? 'bg-rose-500' : 'bg-sky-500'
                      )}
                      style={{
                        width: `${Math.max(8, Math.min(100, (span.ms / trace.latencyMs) * 100))}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : null}
          {view === 'graph' ? (
            <div className="flex flex-col items-start gap-1 text-xs">
              {trace.spans.map((span, index) => (
                <Fragment key={span.name}>
                  {index > 0 ? <span className="pl-3 text-stone-400">↓</span> : null}
                  <span className="rounded border border-stone-200 px-2 py-1 text-stone-800 dark:border-stone-800 dark:text-stone-200">
                    {span.name}
                  </span>
                </Fragment>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex min-h-0 flex-col overflow-hidden">
        <div className="flex h-8 shrink-0 gap-0 border-b border-stone-200 dark:border-stone-800">
          {(
            [
              ['prompt', 'Prompt'],
              ['spans', 'Attributes'],
              ['guardrail', 'Guardrail'],
              ['eval', 'Evaluation'],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => onTab(key)}
              className={cn(
                '-mb-px h-8 shrink-0 border-b-2 px-2.5 text-xs',
                tab === key
                  ? 'border-stone-900 text-stone-900 dark:border-stone-100 dark:text-stone-50'
                  : 'border-transparent text-stone-500'
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="min-h-0 flex-1 overflow-auto">
          {tab === 'prompt' ? (
            <AttributeRows
              rows={[
                ['Sent', trace.prompt],
                ['Received', trace.received],
                ['Reply', trace.reply],
                ['Tool result', trace.toolResult],
                ['Selected span', active?.name ?? trace.name],
              ]}
            />
          ) : null}
          {tab === 'spans' ? (
            <AttributeRows
              rows={[
                ['gen_ai.system', trace.provider],
                ['gen_ai.request.model', trace.model],
                ['gen_ai.operation.name', trace.name],
                ['service.name', trace.application],
                ['span.name', active?.name ?? trace.name],
                ['span.status', active?.status ?? trace.status],
                ['span.detail', active?.detail || '—'],
              ]}
            />
          ) : null}
          {tab === 'guardrail' ? (
            <AttributeRows rows={trace.guardrails.map((rule) => [rule.ruleId, rule.result])} />
          ) : null}
          {tab === 'eval' ? (
            <AttributeRows
              rows={trace.evaluation.map((item) => [item.name, `${item.result}. ${item.note}`])}
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}

function AttributeRows({ rows }: { rows: [string, string][] }) {
  return (
    <div className="divide-y divide-stone-200 dark:divide-stone-800">
      {rows.map(([key, value], index) => (
        <div
          key={key}
          className={cn(
            'grid min-w-0 grid-cols-1 gap-1 px-3 py-2 md:grid-cols-[minmax(140px,32%)_minmax(0,1fr)]',
            index % 2 === 0 ? 'bg-white dark:bg-stone-950' : 'bg-stone-50 dark:bg-stone-900/70'
          )}
        >
          <div className="truncate font-mono text-xs font-medium text-stone-600 dark:text-stone-300">
            {key}
          </div>
          <pre className="max-h-24 overflow-auto whitespace-pre-wrap break-words font-mono text-xs leading-5 text-stone-800 dark:text-stone-200">
            {value}
          </pre>
        </div>
      ))}
    </div>
  )
}

function Mini({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-stone-200 px-1.5 py-1 text-[11px] text-stone-500 dark:border-stone-800">
      <Icon className="size-3.5" />
      <span className="sr-only">{label}</span>
      {value}
    </span>
  )
}

function AgentsScreen({ api }: { api: DemoApi }) {
  const [tab, setTab] = useState<'services' | 'coding'>('services')
  const rows = AGENTS.filter((agent) => agent.project === api.project)
  const tone =
    'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900/70 dark:bg-sky-950/40 dark:text-sky-300'
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <PageHeader
        icon={Bot}
        eyebrow="Monitor"
        title={tab === 'coding' ? 'Coding Agents' : 'Applications'}
        tone={tone}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            {(
              [
                ['services', 'Applications'],
                ['coding', 'Coding Agents'],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setTab(key)}
                className={cn(
                  'inline-flex items-center rounded-md border px-2.5 py-1.5 text-xs font-medium',
                  tab === key
                    ? tone
                    : 'border-stone-200 bg-stone-50 text-stone-600 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        }
      />
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4">
        <div className="flex items-center gap-2">
          <TimeRange />
          <button
            type="button"
            aria-label="Refresh"
            className="inline-flex size-[30px] items-center justify-center rounded-md border border-stone-200 text-stone-500 dark:border-stone-800"
          >
            <RefreshCw className="size-3.5" />
          </button>
        </div>
        {tab === 'coding' ? (
          <div className="grid grid-cols-3 gap-2">
            {[
              ['2', 'Total Coding Agents'],
              ['6', 'Total Users'],
              ['$418.20', 'Total Cost'],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-md border border-stone-200 px-3 py-2 dark:border-stone-800"
              >
                <div className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                  {value}
                </div>
                <div className="text-xs text-stone-500">{label}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-md border border-stone-200 px-3 py-2 dark:border-stone-800">
              <div className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                {rows.length}
              </div>
              <div className="text-xs text-stone-500">Discovered Agents</div>
            </div>
            <div className="rounded-md border border-stone-200 px-3 py-2 dark:border-stone-800">
              <div className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                {rows.filter((agent) => agent.status === 'healthy').length}
              </div>
              <div className="text-xs text-stone-500">Instrumented Agents</div>
            </div>
          </div>
        )}
        <ProductTable
          columns={[
            { header: 'Name', width: 'minmax(8rem, 1.4fr)' },
            { header: 'Framework', width: 'minmax(8rem, 1fr)' },
            { header: 'Status', width: '6rem' },
            { header: 'Cost', width: '6rem' },
          ]}
          onSelect={() => api.go('telemetry')}
          rows={rows.map((agent) => ({
            id: agent.id,
            cells: [
              agent.name,
              `${tab === 'coding' ? 'Claude Code' : agent.framework} · ${agent.tools}`,
              <StatusBadge key="status" ok={agent.status === 'healthy'} label={agent.status} />,
              agent.cost,
            ],
          }))}
        />
      </div>
    </div>
  )
}

function EvaluationsScreen({ api }: { api: DemoApi }) {
  const [tab, setTab] = useState<'analytics' | 'evaluators' | 'configuration'>('analytics')
  const tone =
    'border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-900/70 dark:bg-orange-950/40 dark:text-orange-300'
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <PageHeader
        icon={ClipboardCheck}
        eyebrow="Monitor"
        title="Evaluations"
        tone={tone}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            {(
              [
                ['analytics', 'Analytics'],
                ['evaluators', 'Evaluators'],
                ['configuration', 'Configuration'],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setTab(key)}
                className={cn(
                  'inline-flex items-center rounded-md border px-2.5 py-1.5 text-xs font-medium',
                  tab === key
                    ? 'border-orange-300 bg-orange-50 text-orange-800 dark:border-orange-800 dark:bg-orange-950/40 dark:text-orange-200'
                    : 'border-stone-200 bg-stone-50 text-stone-600 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        }
      />
      {tab === 'analytics' ? (
        <div className="flex justify-end border-b border-stone-200 px-4 py-2 dark:border-stone-800">
          <TimeRange />
        </div>
      ) : null}
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
        {tab === 'evaluators' ? (
          <ProductTable
            columns={[
              { header: 'Name', width: 'minmax(8rem, 1fr)' },
              { header: 'Type', width: 'minmax(8rem, 1fr)' },
              { header: 'Environment', width: '7rem' },
            ]}
            rows={['Hallucination', 'Bias', 'Toxicity', 'Relevance'].map((name) => ({
              id: name,
              cells: [name, 'LLM-as-a-judge', 'production'],
            }))}
          />
        ) : tab === 'configuration' ? (
          <ProductTable
            columns={[
              { header: 'Evaluator', width: 'minmax(8rem, 1fr)' },
              { header: 'Auto evaluation', width: '8rem' },
            ]}
            rows={[
              ['Hallucination', 'On'],
              ['Toxicity', 'Off'],
            ].map(([name, state]) => ({
              id: name,
              cells: [name, <StatusBadge key="state" ok={state === 'On'} label={state} />],
            }))}
          />
        ) : (
          <>
            <div className="grid grid-cols-3 gap-2">
              <Stat title="Run" value={EVAL_RUN.name} hint={EVAL_RUN.when} />
              <Stat title="Passed" value={String(EVAL_RUN.passed)} />
              <Stat title="Failed" value={String(EVAL_RUN.failed)} />
            </div>
            <ProductTable
              columns={[
                { header: 'Case', width: 'minmax(8rem, 1.2fr)' },
                { header: 'Scorer', width: '8rem' },
                { header: 'Result', width: 'minmax(10rem, 2fr)' },
              ]}
              onSelect={(id) => {
                const item = EVAL_CASES.find((entry) => entry.id === id)
                if (item) api.openTrace(item.traceId, 'eval')
              }}
              rows={EVAL_CASES.map((item) => ({
                id: item.id,
                cells: [item.name, item.scorer, `${item.result}. ${item.note}`],
              }))}
            />
          </>
        )}
      </div>
    </div>
  )
}

const MODEL_META: Record<string, { input: string; output: string; context: string }> = {
  'claude-sonnet-4': { input: '3', output: '15', context: '200000' },
  'gpt-4o-mini': { input: '0.15', output: '0.6', context: '128000' },
  'gpt-4o': { input: '2.5', output: '10', context: '128000' },
  'claude-haiku-4': { input: '0.8', output: '4', context: '200000' },
  'gemini-2.0-flash': { input: '0.1', output: '0.4', context: '1000000' },
}

function ManageModelsView({
  rows,
}: {
  rows: { model: string; provider: string; cost: number; requests: number }[]
}) {
  const [query, setQuery] = useState('')
  const [modelId, setModelId] = useState(rows[0]?.model ?? '')
  const [expanded, setExpanded] = useState<string | null>(rows[0]?.provider ?? null)
  const visible = rows.filter((row) => matchesQuery(query, [row.model, row.provider]))
  const providers = Array.from(new Set(visible.map((row) => row.provider)))
  const current = rows.find((row) => row.model === modelId) ?? visible[0]
  const meta = current
    ? MODEL_META[current.model] ?? { input: '1', output: '3', context: '128000' }
    : null

  return (
    <div className="flex h-full min-h-0">
      <div className="flex w-56 shrink-0 flex-col border-r border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-950 md:w-72">
        <div className="border-b border-stone-200 p-3 dark:border-stone-800">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-stone-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search models"
              aria-label="Search models"
              className="h-8 w-full rounded-md border border-stone-200 bg-white pl-7 pr-2 text-xs dark:border-stone-800 dark:bg-stone-950"
            />
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-2">
          {providers.length === 0 ? (
            <p className="px-2 py-3 text-xs text-stone-500">No models in this sample.</p>
          ) : (
            providers.map((provider) => {
              const models = visible.filter((row) => row.provider === provider)
              const open = expanded === provider
              return (
                <div key={provider} className="mb-1">
                  <button
                    type="button"
                    onClick={() => setExpanded(open ? null : provider)}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs hover:bg-stone-100 dark:hover:bg-stone-900"
                  >
                    <ChevronDown className={cn('size-3.5 text-stone-400', !open && '-rotate-90')} />
                    <span className="min-w-0 flex-1 truncate font-medium text-stone-900 dark:text-stone-100">
                      {provider}
                    </span>
                    <span className="rounded bg-stone-100 px-1.5 text-[10px] text-stone-500 dark:bg-stone-800">
                      {models.length}
                    </span>
                  </button>
                  {open
                    ? models.map((row) => (
                        <button
                          key={row.model}
                          type="button"
                          onClick={() => setModelId(row.model)}
                          className={cn(
                            'ml-4 block w-[calc(100%-1rem)] border-l-2 px-2 py-1.5 text-left text-xs',
                            current?.model === row.model
                              ? 'border-primary-600 bg-primary-50 text-stone-950 dark:bg-primary-950/40 dark:text-stone-50'
                              : 'border-transparent text-stone-600 hover:bg-stone-50 dark:text-stone-300 dark:hover:bg-stone-900'
                          )}
                        >
                          {row.model}
                        </button>
                      ))
                    : null}
                </div>
              )
            })
          )}
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        {current && meta ? (
          <div className="mx-auto max-w-lg space-y-3 text-xs">
            <h2 className="text-sm font-semibold text-stone-950 dark:text-stone-50">
              {current.model}
            </h2>
            <p className="text-stone-500">
              {current.provider} · sample pricing. Nothing here is saved.
            </p>
            <label className="block">
              <span className="text-stone-500">Model ID</span>
              <input
                readOnly
                value={current.model}
                className="mt-1 h-8 w-full rounded-md border border-stone-200 bg-stone-50 px-2 font-mono dark:border-stone-800 dark:bg-stone-900"
              />
            </label>
            <label className="block">
              <span className="text-stone-500">Display name</span>
              <input
                readOnly
                value={current.model}
                className="mt-1 h-8 w-full rounded-md border border-stone-200 bg-white px-2 dark:border-stone-800 dark:bg-stone-950"
              />
            </label>
            <label className="block">
              <span className="text-stone-500">Model type</span>
              <input
                readOnly
                value="Chat"
                className="mt-1 h-8 w-full rounded-md border border-stone-200 bg-white px-2 dark:border-stone-800 dark:bg-stone-950"
              />
            </label>
            <label className="block">
              <span className="text-stone-500">Context window</span>
              <input
                readOnly
                value={meta.context}
                className="mt-1 h-8 w-full rounded-md border border-stone-200 bg-white px-2 dark:border-stone-800 dark:bg-stone-950"
              />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="text-stone-500">Input price / 1M tokens</span>
                <input
                  readOnly
                  value={meta.input}
                  className="mt-1 h-8 w-full rounded-md border border-stone-200 bg-white px-2 dark:border-stone-800 dark:bg-stone-950"
                />
              </label>
              <label className="block">
                <span className="text-stone-500">Output price / 1M tokens</span>
                <input
                  readOnly
                  value={meta.output}
                  className="mt-1 h-8 w-full rounded-md border border-stone-200 bg-white px-2 dark:border-stone-800 dark:bg-stone-950"
                />
              </label>
            </div>
          </div>
        ) : (
          <p className="text-xs text-stone-500">Select a model.</p>
        )}
      </div>
    </div>
  )
}

function CostsScreen({ api }: { api: DemoApi }) {
  const rows = MODEL_COSTS.filter((row) => row.project === api.project)
  const [tab, setTab] = useState<'analytics' | 'models' | 'configuration'>('analytics')
  const modelsPage = api.screen === 'models'
  const table = (
    <ProductTable
      columns={[
        { header: 'Model', width: 'minmax(8rem, 1.4fr)' },
        { header: 'Provider', width: '8rem' },
        { header: 'Requests', width: '6rem' },
        { header: 'Cost', width: '6rem' },
      ]}
      rows={rows.map((row) => ({
        id: row.model,
        cells: [row.model, row.provider, compact(row.requests), money(row.cost)],
      }))}
    />
  )
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <PageHeader
        icon={modelsPage ? Cpu : CircleDollarSign}
        eyebrow="Monitor"
        title={modelsPage ? 'Manage Models' : 'Costs'}
        tone="border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300"
      />
      {modelsPage ? null : (
        <div className="flex flex-wrap items-end gap-1 border-b border-stone-200 px-4 dark:border-stone-800">
          {(
            [
              ['analytics', 'Analytics'],
              ['models', 'Manage models'],
              ['configuration', 'Configuration'],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              aria-pressed={tab === key}
              onClick={() => setTab(key)}
              className={cn(
                '-mb-px border-b-2 px-3 py-2 text-sm font-medium',
                tab === key
                  ? 'border-stone-900 text-stone-900 dark:border-stone-100 dark:text-stone-100'
                  : 'border-transparent text-stone-500 hover:text-stone-700 dark:text-stone-400'
              )}
            >
              {label}
            </button>
          ))}
        </div>
      )}
      <div
        className={cn(
          'min-h-0 flex-1',
          modelsPage || tab === 'models' ? 'overflow-hidden' : 'overflow-y-auto p-4'
        )}
      >
        {modelsPage || tab === 'models' ? (
          <ManageModelsView rows={modelsPage ? MODEL_COSTS : rows} />
        ) : tab === 'configuration' ? (
          <div className="space-y-2">
            <p className="text-xs text-stone-500">
              Prices for this project. This sample does not save changes.
            </p>
            <ProductTable
              columns={[
                { header: 'Model', width: 'minmax(8rem, 1fr)' },
                { header: 'Unit price', width: '8rem' },
              ]}
              rows={rows.map((row) => ({
                id: row.model,
                cells: [row.model, money(row.cost / Math.max(row.requests, 1))],
              }))}
            />
          </div>
        ) : (
          <div className="space-y-3">
            <div className={cn(PANEL, 'p-3')}>
              <p className="text-xs font-semibold text-stone-950 dark:text-stone-50">
                Cost by model
              </p>
              <div className="mt-2 h-32">
                <BarChart
                  rows={rows.map((row) => ({ label: row.model, value: row.cost }))}
                  color="#F36C06"
                />
              </div>
            </div>
            {table}
          </div>
        )}
      </div>
    </div>
  )
}

function alertsFor(api: DemoApi): Alert[] {
  const base = ALERTS.filter(
    (alert) => alert.project === api.project || alert.project === 'organisation'
  )
  if (api.level === 'ok') return base
  return [
    {
      id: 'al_spend',
      project: 'organisation',
      name: 'Spend limit',
      status: 'firing',
      condition: 'Monthly model spend at 80% or more of the limit',
      when: 'Just now',
      value: `${money(ORG_SPEND)} / ${money(api.savedCap)}`,
      detail: 'Warns owners. Provider calls are not stopped.',
      deliveries: [{ channel: 'Slack · #ai-oncall', result: 'Delivered' }],
    },
    ...base,
  ]
}

function AlertsScreen({ api }: { api: DemoApi }) {
  const rows = alertsFor(api)
  const selected = rows.find((alert) => alert.id === api.focus)
  const [section, setSection] = useState<'overview' | 'alerts'>(api.focus ? 'alerts' : 'overview')
  const firing = rows.filter((alert) => alert.status === 'firing').length
  const openAlert = (id: string) => {
    setSection('alerts')
    api.go('alerts', id)
  }
  return (
    <div className="relative flex h-full flex-col">
      <PageHeader
        icon={BellRing}
        eyebrow="Monitor"
        title="Alerts"
        tone="border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/70 dark:bg-rose-950/40 dark:text-rose-300"
        actions={
          <div className="flex flex-wrap items-center gap-2">
            {(
              [
                ['overview', 'Overview'],
                ['alerts', 'Alerts'],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                aria-pressed={section === key}
                onClick={() => {
                  setSection(key)
                  if (key === 'overview') api.go('alerts')
                }}
                className={cn(
                  'inline-flex items-center rounded-md border px-2.5 py-1.5 text-xs font-medium',
                  section === key
                    ? 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300'
                    : 'border-stone-200 bg-stone-50 text-stone-600 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300'
                )}
              >
                {label}
              </button>
            ))}
            <button
              type="button"
              className="inline-flex h-7 items-center rounded-md bg-brandPrimary px-2 text-xs text-white"
            >
              <Plus className="mr-1 size-3" />
              New alert
            </button>
          </div>
        }
      />
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
        {section === 'overview' ? (
          <>
            <div className="grid gap-px overflow-hidden rounded-md border border-stone-200 bg-stone-200 dark:border-stone-800 dark:bg-stone-800 sm:grid-cols-5">
              {[
                ['Alerts firing', String(firing), firing > 0],
                ['Firing groups', String(firing), false],
                ['Resolved 24h', '3', false],
                ['Enabled', String(rows.length), false],
                ['Total', String(rows.length), false],
              ].map(([label, value, hot]) => (
                <div key={String(label)} className="bg-white px-3 py-2 dark:bg-stone-950">
                  <p className="truncate text-[11px] uppercase tracking-wide text-stone-500">
                    {label}
                  </p>
                  <p
                    className={cn(
                      'mt-0.5 text-lg font-semibold tabular-nums',
                      hot ? 'text-red-600 dark:text-red-400' : 'text-stone-950 dark:text-stone-50'
                    )}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </div>
            <div className="rounded-md border border-stone-200 bg-white px-3 py-2 dark:border-stone-800 dark:bg-stone-950">
              <div className="flex items-center justify-between text-[11px] text-stone-500">
                <span className="font-medium uppercase tracking-wide">Firing by severity</span>
                <span>{firing ? `${firing} firing` : 'Nothing firing'}</span>
              </div>
              <div className="mt-2 flex h-2 overflow-hidden rounded-full bg-stone-100 dark:bg-stone-800">
                {firing ? <div className="h-full bg-red-500" style={{ width: '100%' }} /> : null}
              </div>
              <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
                <span className="rounded border border-red-200 bg-red-50 px-1.5 py-0.5 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
                  critical · {firing}
                </span>
                <span className="rounded border border-amber-200 bg-amber-50 px-1.5 py-0.5 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300">
                  warning · 0
                </span>
                <span className="rounded border border-sky-200 bg-sky-50 px-1.5 py-0.5 text-sky-700 dark:border-sky-900 dark:bg-sky-950/40 dark:text-sky-300">
                  info · 0
                </span>
              </div>
            </div>
            <div className="grid gap-3 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
              <section className="rounded-md border border-stone-200 dark:border-stone-800">
                <h2 className="border-b border-stone-200 px-3 py-2 text-xs font-semibold dark:border-stone-800">
                  Recent activity
                </h2>
                <ul>
                  {rows.map((alert) => (
                    <li key={alert.id}>
                      <button
                        type="button"
                        onClick={() => openAlert(alert.id)}
                        className="flex w-full items-center gap-3 px-3 py-2 text-left text-xs hover:bg-stone-50 dark:hover:bg-stone-900"
                      >
                        <StatusBadge
                          ok={alert.status !== 'firing'}
                          label={alert.status === 'firing' ? 'Firing' : 'OK'}
                        />
                        <span className="min-w-0 flex-1 truncate font-medium text-stone-950 dark:text-stone-50">
                          {alert.name}
                        </span>
                        <span className="shrink-0 tabular-nums text-stone-500">{alert.value}</span>
                        <span className="w-20 shrink-0 text-right text-stone-400">
                          {alert.when}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
              <section className="rounded-md border border-stone-200 dark:border-stone-800">
                <h2 className="border-b border-stone-200 px-3 py-2 text-xs font-semibold dark:border-stone-800">
                  Noisiest
                </h2>
                <ul>
                  {rows.slice(0, 3).map((alert) => (
                    <li key={alert.id}>
                      <button
                        type="button"
                        onClick={() => openAlert(alert.id)}
                        className="block w-full px-3 py-2 text-left text-xs hover:bg-stone-50 dark:hover:bg-stone-900"
                      >
                        <span className="block truncate font-medium text-stone-950 dark:text-stone-50">
                          {alert.name}
                        </span>
                        <span className="text-stone-500">{alert.value}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </>
        ) : (
          <ProductTable
            columns={[
              { header: 'Status', width: '6rem' },
              { header: 'Alert', width: 'minmax(8rem, 1.4fr)' },
              { header: 'Condition', width: 'minmax(10rem, 1.6fr)' },
              { header: 'Last triggered', width: '7rem' },
            ]}
            selectedId={selected?.id}
            onSelect={openAlert}
            rows={rows.map((alert) => ({
              id: alert.id,
              cells: [
                <StatusBadge
                  key="status"
                  ok={alert.status !== 'firing'}
                  label={alert.status === 'firing' ? 'Firing' : 'OK'}
                />,
                alert.name,
                alert.condition,
                alert.when,
              ],
            }))}
          />
        )}
      </div>
      {selected ? (
        <aside className="absolute inset-y-0 right-0 z-20 w-[min(28rem,100%)] overflow-y-auto border-l border-stone-200 bg-white p-4 text-xs shadow-xl dark:border-stone-800 dark:bg-stone-950">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[11px] uppercase tracking-wide text-stone-500">Threshold</p>
              <h2 className="text-sm font-semibold text-stone-950 dark:text-stone-50">
                {selected.name}
              </h2>
            </div>
            <button
              type="button"
              aria-label="Close alert"
              onClick={() => api.go('alerts')}
              className="inline-flex size-7 items-center justify-center rounded-md hover:bg-stone-100 dark:hover:bg-stone-900"
            >
              <X className="size-4" />
            </button>
          </div>
          <div className="mt-3">
            <StatusBadge ok={selected.status !== 'firing'} label={selected.status} />
          </div>
          <dl className="mt-4 space-y-2">
            <div>
              <dt className="text-stone-500">Condition</dt>
              <dd className="text-stone-800 dark:text-stone-200">{selected.condition}</dd>
            </div>
            <div>
              <dt className="text-stone-500">Value</dt>
              <dd className="font-medium text-stone-950 dark:text-stone-50">{selected.value}</dd>
            </div>
            <div>
              <dt className="text-stone-500">Detail</dt>
              <dd className="text-stone-800 dark:text-stone-200">{selected.detail}</dd>
            </div>
          </dl>
          <h3 className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-stone-500">
            Deliveries
          </h3>
          <ul className="mt-2 divide-y divide-stone-100 dark:divide-stone-900">
            {selected.deliveries.map((delivery) => (
              <li key={delivery.channel} className="flex justify-between gap-2 py-1.5">
                <span>{delivery.channel}</span>
                <span className="text-stone-500">{delivery.result}</span>
              </li>
            ))}
          </ul>
          {selected.traceId ? (
            <button
              type="button"
              className="mt-3 text-brandPrimary hover:underline"
              onClick={() => api.openTrace(selected.traceId!)}
            >
              Open trace
            </button>
          ) : null}
        </aside>
      ) : null}
    </div>
  )
}

const GPU_TABS = [
  'Overview',
  'Fleet',
  'Workloads',
  'Kernels',
  'Errors',
  'Costs',
  'Recommendations',
] as const

const GPU_MEMORY: Record<string, string> = {
  gpu_h100: '62 GB',
  gpu_a100: '28 GB',
  gpu_l40: '8 GB',
}

function GpusScreen() {
  const [tab, setTab] = useState<(typeof GPU_TABS)[number]>('Overview')
  const avg = Math.round(GPUS.reduce((sum, gpu) => sum + gpu.util, 0) / GPUS.length)
  const fleet = (
    <ProductTable
      columns={[
        { header: 'Name', width: 'minmax(8rem, 1.4fr)' },
        { header: 'Utilization', width: '7rem' },
        { header: 'Memory', width: '6rem' },
        { header: 'Temperature', width: '7rem' },
      ]}
      rows={GPUS.map((gpu) => ({
        id: gpu.id,
        cells: [gpu.name, `${gpu.util}%`, GPU_MEMORY[gpu.id] ?? '—', `${gpu.temp}°C`],
      }))}
    />
  )
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <PageHeader
        icon={Cpu}
        eyebrow="Monitor"
        title="GPUs"
        tone="border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900/70 dark:bg-sky-950/40 dark:text-sky-300"
        actions={<TimeRange />}
      />
      <div className="flex flex-wrap items-end gap-1 border-b border-stone-200 px-4 dark:border-stone-800">
        {GPU_TABS.map((label) => (
          <button
            key={label}
            type="button"
            aria-pressed={tab === label}
            onClick={() => setTab(label)}
            className={cn(
              '-mb-px border-b-2 px-3 py-2 text-sm font-medium',
              tab === label
                ? 'border-stone-900 text-stone-900 dark:border-stone-100 dark:text-stone-100'
                : 'border-transparent text-stone-500 hover:text-stone-700 dark:text-stone-400'
            )}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5 border-b border-stone-200 px-4 py-2 dark:border-stone-800">
        {['GPU', 'Region', 'Device', 'Cluster', 'Provider'].map((label) => (
          <span
            key={label}
            className="rounded-full border border-stone-200 px-2 py-0.5 text-[11px] text-stone-500 dark:border-stone-800"
          >
            {label}
          </span>
        ))}
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        {tab === 'Overview' ? (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
              {[
                ['Utilization', `${avg}%`],
                ['Memory', '98 GB'],
                ['Power', '3.0 kW'],
                ['Temperature', '61°C'],
                ['Devices', String(GPUS.length)],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-md border border-stone-200 px-3 py-2 dark:border-stone-800"
                >
                  <p className="text-[11px] text-stone-500">{label}</p>
                  <p className="text-sm font-semibold text-stone-950 dark:text-stone-50">{value}</p>
                </div>
              ))}
            </div>
            <div className="h-32 rounded-md border border-stone-200 p-2 dark:border-stone-800">
              <BarChart
                rows={GPUS.map((gpu) => ({ label: gpu.name, value: gpu.util }))}
                color="#0284c7"
              />
            </div>
          </div>
        ) : null}
        {tab === 'Fleet' ? fleet : null}
        {tab === 'Workloads' ? (
          <ProductTable
            columns={[
              { header: 'Workload', width: 'minmax(8rem, 1.4fr)' },
              { header: 'Device', width: 'minmax(6rem, 1fr)' },
              { header: 'Utilization', width: '7rem' },
            ]}
            rows={GPUS.map((gpu) => ({
              id: gpu.id,
              cells: [gpu.pool, gpu.name, `${gpu.util}%`],
            }))}
          />
        ) : null}
        {tab === 'Kernels' ? (
          <ProductTable
            columns={[
              { header: 'Device', width: 'minmax(8rem, 1.4fr)' },
              { header: 'Power', width: '6rem' },
              { header: 'Rate', width: '6rem' },
            ]}
            rows={GPUS.map((gpu) => ({
              id: gpu.id,
              cells: [gpu.name, gpu.power, gpu.rate],
            }))}
          />
        ) : null}
        {tab === 'Errors' ? (
          <p className="text-sm text-stone-500">No kernel errors in this sample.</p>
        ) : null}
        {tab === 'Costs' ? (
          <ProductTable
            columns={[
              { header: 'Device', width: 'minmax(8rem, 1.4fr)' },
              { header: 'Spend', width: '8rem' },
              { header: 'Rate', width: '6rem' },
            ]}
            rows={GPUS.map((gpu) => ({
              id: gpu.id,
              cells: [gpu.name, gpu.spend, gpu.rate],
            }))}
          />
        ) : null}
        {tab === 'Recommendations' ? (
          <ProductTable
            columns={[
              { header: 'Device', width: 'minmax(8rem, 1fr)' },
              { header: 'Note', width: 'minmax(12rem, 2fr)' },
            ]}
            rows={GPUS.map((gpu) => ({
              id: gpu.id,
              cells: [
                gpu.name,
                gpu.util > 70 ? 'Utilization is high on this sample.' : 'Headroom remains.',
              ],
            }))}
          />
        ) : null}
      </div>
    </div>
  )
}

function AuditScreen({ api }: { api: DemoApi }) {
  const rows = [...api.auditExtra, ...AUDIT_LOG]
  return (
    <div className="flex h-full flex-col">
      <PageHeader
        icon={FileClock}
        eyebrow="Monitor"
        title="Audit Logs"
        tone="border-stone-300 bg-stone-100 text-stone-700 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200"
      />
      <div className="border-b border-stone-200 px-4 py-2 dark:border-stone-800">
        <TimeRange />
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <ProductTable
          columns={[
            { header: 'When', width: '7rem' },
            { header: 'Actor', width: '8rem' },
            { header: 'Action', width: 'minmax(12rem, 2fr)' },
            { header: 'Area', width: '7rem' },
          ]}
          rows={rows.map((event) => ({
            id: event.id,
            cells: [
              event.when,
              event.actor,
              <span key="action">
                <span className="block font-medium text-stone-950 dark:text-stone-50">
                  {event.action}
                </span>
                <span className="text-xs text-stone-500">{event.detail}</span>
              </span>,
              event.area,
            ],
          }))}
        />
      </div>
    </div>
  )
}

const FLEET_META: Record<string, { version: string; os: string; started: string; arch: string }> = {
  svc_support: { version: '1.8.2', os: 'linux', started: '2 days ago', arch: 'amd64' },
  svc_checkout: { version: '0.9.4', os: 'linux', started: '6 hours ago', arch: 'arm64' },
  svc_worker: { version: '0.9.4', os: 'linux', started: '6 hours ago', arch: 'amd64' },
  svc_research: { version: '1.8.2', os: 'darwin', started: 'Yesterday', arch: 'arm64' },
}

function FleetScreen({ api }: { api: DemoApi }) {
  const rows = FLEET.filter((service) => service.project === api.project)
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <PageHeader
        icon={Server}
        eyebrow="Monitor"
        title="Fleet Hub"
        tone="border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900/70 dark:bg-sky-950/40 dark:text-sky-300"
      />
      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <ProductTable
          columns={[
            { header: 'ID', width: '7rem' },
            { header: 'Name', width: 'minmax(8rem, 1.2fr)' },
            { header: 'Version', width: '5rem' },
            { header: 'Operating System', width: '8rem' },
            { header: 'Started At', width: '7rem' },
            { header: 'Status', width: '6rem' },
            { header: 'Host Architecture', width: '8rem' },
          ]}
          rows={rows.map((service) => {
            const meta = FLEET_META[service.id] ?? {
              version: '—',
              os: 'linux',
              started: '—',
              arch: 'amd64',
            }
            return {
              id: service.id,
              cells: [
                service.id,
                service.name,
                meta.version,
                meta.os,
                meta.started,
                <StatusBadge
                  key="status"
                  ok={service.status === 'Healthy'}
                  label={service.status}
                />,
                meta.arch,
              ],
            }
          })}
        />
      </div>
    </div>
  )
}

function PromptsScreen({ api }: { api: DemoApi }) {
  const [selected, setSelected] = useState<string | null>(null)
  const rows = PROMPTS.filter((prompt) => prompt.project === api.project)
  const current = rows.find((prompt) => prompt.id === selected) ?? rows[0]
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <PageHeader
        icon={Component}
        eyebrow="Develop"
        title="Prompt Hub"
        tone="border-pink-200 bg-pink-50 text-pink-700 dark:border-pink-900/70 dark:bg-pink-950/40 dark:text-pink-300"
        actions={
          <button
            type="button"
            className="h-8 rounded-md bg-brandPrimary px-3 text-xs font-medium text-white"
          >
            Create prompt
          </button>
        }
      />
      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-4">
        <ProductTable
          columns={[
            { header: 'Name', width: 'minmax(8rem, 1.4fr)' },
            { header: 'Version', width: '5rem' },
            { header: 'Status', width: '6rem' },
            { header: 'Updated', width: '7rem' },
          ]}
          selectedId={current?.id}
          onSelect={setSelected}
          rows={rows.map((prompt) => ({
            id: prompt.id,
            cells: [
              prompt.name,
              prompt.version,
              <StatusBadge key="status" ok={prompt.status === 'Deployed'} label={prompt.status} />,
              prompt.updated,
            ],
          }))}
        />
        {current ? (
          <pre className="whitespace-pre-wrap rounded-md border border-stone-200 bg-stone-50 p-3 font-mono text-[11px] text-stone-700 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300">
            {current.note}
          </pre>
        ) : null}
      </div>
    </div>
  )
}

function VaultScreen() {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <PageHeader
        icon={BookKey}
        eyebrow="Develop"
        title="Vault"
        tone="border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300"
        actions={
          <button
            type="button"
            className="h-8 rounded-md bg-brandPrimary px-3 text-xs font-medium text-white"
          >
            Create
          </button>
        }
      />
      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <ProductTable
          columns={[
            { header: 'Key', width: 'minmax(10rem, 1.6fr)' },
            { header: 'Created by', width: '8rem' },
            { header: 'Updated', width: '8rem' },
            { header: '', width: '4rem' },
          ]}
          rows={VAULT_SECRETS.map((secret) => ({
            id: secret.id,
            cells: [
              <span key="key">
                <span className="block font-medium text-stone-950 dark:text-stone-50">
                  {secret.name}
                </span>
                <span className="font-mono text-xs text-stone-500">{secret.preview}</span>
              </span>,
              'Avery Chen',
              secret.updated,
              <span key="actions" className="text-stone-400">
                ···
              </span>,
            ],
          }))}
        />
      </div>
    </div>
  )
}

function RulesScreen() {
  return (
    <div className="flex h-full flex-col">
      <PageHeader
        icon={SlidersHorizontal}
        eyebrow="Develop"
        title="Rule Engine"
        tone="border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-900/70 dark:bg-purple-950/40 dark:text-purple-300"
        actions={
          <button
            type="button"
            className="h-8 rounded-md bg-brandPrimary px-3 text-xs font-medium text-white"
          >
            New rule
          </button>
        }
      />
      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <ProductTable
          columns={[
            { header: 'Name', width: 'minmax(8rem, 1.2fr)' },
            { header: 'Description', width: 'minmax(12rem, 2fr)' },
            { header: 'Group operator', width: '7rem' },
            { header: 'Status', width: '5rem' },
            { header: 'Created by', width: '7rem' },
            { header: 'Created at', width: '7rem' },
          ]}
          rows={RULES.map((rule) => ({
            id: rule.id,
            cells: [
              rule.name,
              rule.detail,
              rule.action,
              <StatusBadge key="status" ok label="Active" />,
              'Avery Chen',
              rule.fired,
            ],
          }))}
        />
      </div>
    </div>
  )
}

function ConnectorsScreen() {
  const [query, setQuery] = useState('')
  const catalog = CONNECTORS.filter((item) =>
    matchesQuery(query, [item.name, item.kind, item.detail])
  )
  const groups = Array.from(new Set(catalog.map((item) => item.kind)))
  const connected = CONNECTORS.filter((item) => item.status === 'Connected')
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <PageHeader
        icon={Cable}
        eyebrow="Project"
        title="Connectors"
        tone="border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-900/70 dark:bg-cyan-950/40 dark:text-cyan-300"
        actions={
          <button
            type="button"
            className="inline-flex h-8 items-center gap-1.5 rounded-md bg-brandPrimary px-3 text-xs font-medium text-white"
          >
            <Cable className="size-3.5" />
            Add connector
          </button>
        }
      />
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
        <section>
          <h2 className="text-sm font-semibold text-stone-950 dark:text-stone-50">
            Connected sources
          </h2>
          <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {connected.map((item) => (
              <div
                key={item.id}
                className="rounded-md border border-stone-200 bg-white p-3 dark:border-stone-800 dark:bg-stone-950"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-medium text-stone-950 dark:text-stone-50">
                    {item.name}
                  </p>
                  <StatusBadge ok label="Connected" />
                </div>
                <p className="mt-1 text-[11px] text-stone-500">{item.kind}</p>
                <p className="mt-2 text-xs text-stone-600 dark:text-stone-300">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-950">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-stone-950 dark:text-stone-50">Catalog</h2>
              <p className="mt-1 text-xs text-stone-500">
                Sources you can connect for this project.
              </p>
            </div>
          </div>
          <div className="relative mt-3 max-w-sm">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-stone-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search catalog"
              aria-label="Search catalog"
              className="h-9 w-full rounded-md border border-stone-200 bg-white pl-8 pr-2 text-xs dark:border-stone-800 dark:bg-stone-950"
            />
          </div>
          <div className="mt-4 space-y-4">
            {groups.map((kind) => {
              const items = catalog.filter((item) => item.kind === kind)
              return (
                <div key={kind}>
                  <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-stone-950 dark:text-stone-50">
                    {kind}
                    <span className="rounded border border-stone-200 px-1.5 text-[10px] font-normal text-stone-500 dark:border-stone-700">
                      {items.length}
                    </span>
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex min-h-[140px] flex-col rounded-md border border-stone-200 p-3 dark:border-stone-800"
                      >
                        <p className="text-sm font-medium text-stone-950 dark:text-stone-50">
                          {item.name}
                        </p>
                        <p className="mt-1 flex-1 text-xs text-stone-500">{item.detail}</p>
                        <div className="mt-3">
                          <StatusBadge ok={item.status === 'Connected'} label={item.status} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
            {groups.length === 0 ? (
              <p className="text-xs text-stone-500">No connectors match that search.</p>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  )
}

function RolesScreen({ api }: { api: DemoApi }) {
  const [tab, setTab] = useState<'users' | 'roles'>('roles')
  const role = ROLES.find((item) => item.id === api.roleId) ?? ROLES[0]
  const groups = Array.from(new Set(PERMISSIONS.map((permission) => permission.group)))
  const pill =
    'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300'
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <PageHeader
        icon={ShieldCheck}
        eyebrow="Settings"
        title="Roles"
        tone={pill}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            {(
              [
                ['users', 'User permissions'],
                ['roles', 'Role groups'],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                aria-pressed={tab === key}
                onClick={() => setTab(key)}
                className={cn(
                  'inline-flex items-center rounded-md border px-2.5 py-1.5 text-xs font-medium',
                  tab === key
                    ? pill
                    : 'border-stone-200 bg-stone-50 text-stone-600 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        }
      />
      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        {tab === 'users' ? (
          <section className="rounded-md border border-stone-200 bg-white p-3 dark:border-stone-800 dark:bg-stone-950">
            <h2 className="text-sm font-medium text-stone-950 dark:text-stone-50">User access</h2>
            <p className="text-xs text-stone-500">
              People in Northwind and the role group they use.
            </p>
            <div className="mt-3">
              <ProductTable
                columns={[
                  { header: 'User', width: 'minmax(8rem, 1.4fr)' },
                  { header: 'Role group', width: '8rem' },
                  { header: 'Direct permissions', width: '8rem' },
                ]}
                rows={MEMBERS.map((member) => ({
                  id: member.email,
                  cells: [
                    <span key="user">
                      <span className="block font-medium text-stone-950 dark:text-stone-50">
                        {member.name}
                      </span>
                      <span className="text-xs text-stone-500">{member.email}</span>
                    </span>,
                    member.role,
                    'Using role group',
                  ],
                }))}
              />
            </div>
          </section>
        ) : (
          <div className="space-y-3">
            <section className="rounded-md border border-stone-200 bg-white p-3 dark:border-stone-800 dark:bg-stone-950">
              <h2 className="text-sm font-medium text-stone-950 dark:text-stone-50">Role groups</h2>
              <p className="text-xs text-stone-500">{ROLES.length} roles</p>
              <div className="mt-3">
                <ProductTable
                  columns={[
                    { header: 'Role', width: 'minmax(6rem, 1fr)' },
                    { header: 'Members', width: '5rem' },
                    { header: 'Permissions', width: '6rem' },
                  ]}
                  selectedId={role.id}
                  onSelect={api.setRole}
                  rows={ROLES.map((item) => ({
                    id: item.id,
                    cells: [item.name, String(item.members), item.locked ? 'System' : 'Custom'],
                  }))}
                />
              </div>
            </section>
            <section className="space-y-3">
              <h2 className="text-sm font-medium text-stone-950 dark:text-stone-50">
                {role.name} permissions
              </h2>
              {groups.map((group) => {
                const items = PERMISSIONS.filter((permission) => permission.group === group)
                const allowedCount = items.filter((permission) =>
                  Boolean(api.grants[`${role.id}:${permission.id}`])
                ).length
                return (
                  <div
                    key={group}
                    className="overflow-hidden rounded-md border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-950"
                  >
                    <div className="flex items-center justify-between border-b border-stone-200 bg-stone-50 px-3 py-2 dark:border-stone-800 dark:bg-stone-900/40">
                      <div>
                        <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
                          {group}
                        </p>
                        <p className="text-[11px] text-stone-500">
                          {allowedCount} / {items.length}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 px-3 py-2">
                      {items.map((permission) => {
                        const allowed = Boolean(api.grants[`${role.id}:${permission.id}`])
                        return (
                          <label
                            key={permission.id}
                            className="inline-flex h-7 items-center gap-1.5 rounded-md border border-stone-200 bg-white px-2 text-xs text-stone-700 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-300"
                          >
                            <input
                              type="checkbox"
                              aria-label={`${permission.group} ${permission.label}`}
                              checked={allowed}
                              disabled={role.locked}
                              onChange={() => api.toggleGrant(role.id, permission.id)}
                            />
                            {permission.label}
                          </label>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </section>
          </div>
        )}
      </div>
    </div>
  )
}

function KeysScreen({ api }: { api: DemoApi }) {
  return (
    <div className="flex h-full flex-col">
      <PageHeader
        icon={Key}
        eyebrow="Settings"
        title="API Keys"
        tone="border-stone-300 bg-stone-100 text-stone-700 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200"
        actions={
          <button
            type="button"
            className="h-8 rounded-md bg-brandPrimary px-3 text-xs font-medium text-white"
          >
            Create key
          </button>
        }
      />
      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <ProductTable
          columns={[
            { header: 'Name', width: 'minmax(8rem, 1.2fr)' },
            { header: 'Preview', width: '8rem' },
            { header: 'Access', width: '6rem' },
            { header: 'Action', width: '6rem' },
          ]}
          rows={API_KEYS.map((key) => {
            const restricted = key.access === 'Restricted' || api.restrictedKeys.includes(key.id)
            return {
              id: key.id,
              cells: [
                key.name,
                <span key="preview" className="font-mono">
                  {key.preview}
                </span>,
                restricted ? 'Restricted' : 'Full',
                key.access === 'Full' ? (
                  <button
                    key="restrict"
                    type="button"
                    disabled={api.restrictedKeys.includes(key.id)}
                    onClick={() => api.restrictKey(key.id)}
                    className="h-7 rounded-md border border-stone-200 px-2 disabled:opacity-40 dark:border-stone-800"
                  >
                    Restrict
                  </button>
                ) : (
                  '—'
                ),
              ],
            }
          })}
        />
      </div>
    </div>
  )
}

function ProfileScreen() {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <PageHeader
        icon={User}
        eyebrow="Settings"
        title="User Profile"
        tone="border-primary-200 bg-primary-50 text-primary-700 dark:border-primary-900/70 dark:bg-primary-950/40 dark:text-primary-300"
      />
      <form className="max-w-md space-y-3 overflow-y-auto p-4 text-xs">
        <label className="block">
          <span className="text-stone-500">Name</span>
          <input
            defaultValue="Avery Chen"
            className="mt-1 h-8 w-full rounded-md border border-stone-200 bg-white px-2 dark:border-stone-800 dark:bg-stone-950"
          />
        </label>
        <label className="block">
          <span className="text-stone-500">Email</span>
          <input
            defaultValue="avery@northwind.example"
            className="mt-1 h-8 w-full rounded-md border border-stone-200 bg-white px-2 dark:border-stone-800 dark:bg-stone-950"
          />
        </label>
        <p className="text-stone-500">Admin · sample user. Changes stay in this browser.</p>
        <button type="button" className="h-8 rounded-md bg-brandPrimary px-3 text-white">
          Save profile
        </button>
      </form>
    </div>
  )
}

function ContextsScreen() {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <PageHeader
        icon={BookOpen}
        eyebrow="Develop"
        title="Contexts"
        tone="border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/70 dark:bg-blue-950/40 dark:text-blue-300"
        actions={
          <button type="button" className="h-8 rounded-md bg-brandPrimary px-3 text-xs text-white">
            Create context
          </button>
        }
      />
      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <ProductTable
          columns={[
            { header: 'Name', width: 'minmax(8rem, 1fr)' },
            { header: 'Description', width: 'minmax(12rem, 2fr)' },
            { header: 'Status', width: '6rem' },
            { header: 'Created by', width: '8rem' },
            { header: 'Created at', width: '7rem' },
          ]}
          rows={[
            {
              id: 'refund-policy',
              name: 'refund-policy',
              body: 'Return window, exceptions, and the tool the agent must call.',
              when: 'Yesterday',
            },
            {
              id: 'shipping-sla',
              name: 'shipping-sla',
              body: 'Carrier cutoffs used before the model quotes a date.',
              when: '3 days ago',
            },
          ].map((item) => ({
            id: item.id,
            cells: [
              item.name,
              item.body,
              <StatusBadge key="status" ok label="Active" />,
              'Avery Chen',
              item.when,
            ],
          }))}
        />
      </div>
    </div>
  )
}

const MEMORIES = [
  {
    id: 'mem_profile',
    kind: 'profile' as const,
    title: 'customer-4412',
    scope: 'support-agent',
    body: 'Prefers email. Last order was a replacement.',
  },
  {
    id: 'mem_summary',
    kind: 'summary' as const,
    title: 'cart-session',
    scope: 'checkout-agent',
    body: 'Cart holds two items. Discount code was rejected.',
  },
  {
    id: 'mem_temporal',
    kind: 'temporal' as const,
    title: 'lookup-4412',
    scope: 'support-agent',
    body: 'lookup_order returned not_found 12 minutes ago.',
  },
]

const MEMORY_DOT = {
  temporal: 'bg-teal-500',
  profile: 'bg-orange-500',
  summary: 'bg-lime-500',
}

function MemoryScreen() {
  const [selectedId, setSelectedId] = useState(MEMORIES[0].id)
  const selected = MEMORIES.find((item) => item.id === selectedId) ?? MEMORIES[0]
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <PageHeader
        icon={BrainCircuit}
        eyebrow="Develop"
        title="Memory"
        tone="border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-900/70 dark:bg-violet-950/40 dark:text-violet-300"
        actions={
          <button
            type="button"
            aria-label="Refresh"
            className="inline-flex size-8 items-center justify-center rounded-md border border-stone-200 text-stone-500 dark:border-stone-800"
          >
            <RefreshCw className="size-3.5" />
          </button>
        }
      />
      <div className="flex items-center gap-2 border-b border-stone-200 px-4 py-2 text-xs dark:border-stone-800">
        <span className="text-stone-500">Connector</span>
        <span className="rounded-md border border-stone-200 bg-white px-2 py-1 font-medium text-stone-800 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-200">
          Mem0
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2 border-b border-stone-200 px-4 py-3 dark:border-stone-800">
        {[
          ['Memories', String(MEMORIES.length)],
          ['Profile', '1'],
          ['Summary', '1'],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-md border border-stone-200 px-3 py-2 dark:border-stone-800"
          >
            <p className="text-[11px] text-stone-500">{label}</p>
            <p className="text-sm font-semibold text-stone-950 dark:text-stone-50">{value}</p>
          </div>
        ))}
      </div>
      <div className="grid min-h-0 flex-1 md:grid-cols-[16rem_1fr]">
        <div className="overflow-y-auto border-b border-stone-200 dark:border-stone-800 md:border-b-0 md:border-r">
          {MEMORIES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedId(item.id)}
              className={cn(
                'flex w-full items-center gap-2 border-b border-stone-100 px-3 py-2 text-left text-xs dark:border-stone-900',
                selected.id === item.id
                  ? 'bg-stone-100 dark:bg-stone-900'
                  : 'hover:bg-stone-50 dark:hover:bg-stone-900'
              )}
            >
              <span className={cn('size-2 shrink-0 rounded-full', MEMORY_DOT[item.kind])} />
              <span className="min-w-0">
                <span className="block truncate font-medium text-stone-950 dark:text-stone-50">
                  {item.title}
                </span>
                <span className="text-stone-500">{item.kind}</span>
              </span>
            </button>
          ))}
        </div>
        <div className="overflow-y-auto p-4 text-xs">
          <p className="text-sm font-semibold text-stone-950 dark:text-stone-50">
            {selected.title}
          </p>
          <p className="mt-1 text-stone-500">
            {selected.kind} · {selected.scope}
          </p>
          <p className="mt-3 text-stone-800 dark:text-stone-200">{selected.body}</p>
        </div>
      </div>
    </div>
  )
}

const FINDINGS = [
  {
    id: 'find_secret',
    name: 'support.triage input',
    result: 'Secret blocked',
    when: '12 min ago',
    detail: 'A key-shaped string was blocked before the model call.',
  },
  {
    id: 'find_clean',
    name: 'checkout.policy output',
    result: 'Clean',
    when: '28 min ago',
    detail: 'No secret or email in the model output.',
  },
]

function ScannerScreen() {
  const [selectedId, setSelectedId] = useState(FINDINGS[0].id)
  const selected = FINDINGS.find((item) => item.id === selectedId) ?? FINDINGS[0]
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <PageHeader
        icon={ScanSearch}
        eyebrow="Develop"
        title="Scanner"
        tone="border-teal-200 bg-teal-50 text-teal-700 dark:border-teal-900/70 dark:bg-teal-950/40 dark:text-teal-300"
        actions={
          <div className="flex items-center gap-2">
            <div className="flex">
              <button
                type="button"
                className="h-8 rounded-l-md rounded-r-none bg-brandPrimary px-3 text-xs font-medium text-white"
              >
                Run
              </button>
              <button
                type="button"
                aria-label="Run options"
                className="inline-flex h-8 items-center rounded-l-none rounded-r-md border-l border-white/30 bg-brandPrimary px-2 text-white"
              >
                <ChevronDown className="size-3.5" />
              </button>
            </div>
            <button
              type="button"
              aria-label="Refresh"
              className="inline-flex size-8 items-center justify-center rounded-md border border-stone-200 text-stone-500 dark:border-stone-800"
            >
              <RefreshCw className="size-3.5" />
            </button>
          </div>
        }
      />
      <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 px-4 py-2 text-xs dark:border-stone-800">
        <span className="text-stone-500">Connector</span>
        <span className="rounded-md border border-stone-200 bg-white px-2 py-1 font-medium text-stone-800 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-200">
          Trustabl
        </span>
        <select
          aria-label="Repository"
          defaultValue="support"
          className="h-8 rounded-md border border-stone-200 bg-white px-2 text-xs dark:border-stone-800 dark:bg-stone-950"
        >
          <option value="support">northwind/support</option>
          <option value="checkout">northwind/checkout</option>
        </select>
      </div>
      <div className="grid min-h-0 flex-1 md:grid-cols-[18rem_1fr]">
        <div className="overflow-y-auto border-b border-stone-200 dark:border-stone-800 md:border-b-0 md:border-r">
          {FINDINGS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedId(item.id)}
              className={cn(
                'block w-full border-b border-stone-100 px-3 py-2 text-left text-xs dark:border-stone-900',
                selected.id === item.id
                  ? 'bg-stone-100 dark:bg-stone-900'
                  : 'hover:bg-stone-50 dark:hover:bg-stone-900'
              )}
            >
              <span className="font-medium text-stone-950 dark:text-stone-50">{item.name}</span>
              <span className="mt-0.5 flex items-center justify-between gap-2 text-stone-500">
                <span>{item.when}</span>
                <StatusBadge ok={item.result === 'Clean'} label={item.result} />
              </span>
            </button>
          ))}
        </div>
        <div className="overflow-y-auto p-4 text-xs">
          <p className="text-sm font-semibold text-stone-950 dark:text-stone-50">{selected.name}</p>
          <p className="mt-1 text-stone-500">{selected.result}</p>
          <p className="mt-3 text-stone-800 dark:text-stone-200">{selected.detail}</p>
        </div>
      </div>
    </div>
  )
}

const OPENGROUND_RUNS = [
  {
    id: 'og_order',
    prompt: 'Where is order 4412?',
    ok: 1,
    fail: 1,
    bestCost: '$0.002100',
    bestCostProvider: 'OpenAI',
    bestSpeed: '0.80s',
    bestSpeedProvider: 'OpenAI',
    created: 'Oct 26, 12:04',
    providers: [
      {
        provider: 'Anthropic',
        model: 'claude-sonnet-4',
        time: '1.10s',
        tokens: '1,240',
        cost: '$0.008400',
        response: 'I could not confirm order 4412. The lookup returned not found.',
        error: false,
      },
      {
        provider: 'OpenAI',
        model: 'gpt-4o',
        time: '0.80s',
        tokens: '980',
        cost: '$0.002100',
        response: 'The tool says the order was delivered.',
        error: true,
      },
    ],
  },
  {
    id: 'og_refund',
    prompt: 'What is the refund window?',
    ok: 2,
    fail: 0,
    bestCost: '$0.000400',
    bestCostProvider: 'OpenAI',
    bestSpeed: '0.40s',
    bestSpeedProvider: 'OpenAI',
    created: 'Oct 25, 16:18',
    providers: [
      {
        provider: 'OpenAI',
        model: 'gpt-4o-mini',
        time: '0.40s',
        tokens: '420',
        cost: '$0.000400',
        response: 'Refunds are accepted for 30 days after delivery.',
        error: false,
      },
      {
        provider: 'OpenAI',
        model: 'gpt-4o',
        time: '0.60s',
        tokens: '510',
        cost: '$0.001200',
        response: 'The refund window is 30 days from the delivery date.',
        error: false,
      },
    ],
  },
]

function OpengroundScreen({ api }: { api: DemoApi }) {
  const [runId, setRunId] = useState<string | null>(null)
  const run = OPENGROUND_RUNS.find((item) => item.id === runId)
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <PageHeader
        icon={MonitorPlay}
        eyebrow="Develop"
        title={run ? 'Run details' : 'Openground'}
        tone="border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-900/70 dark:bg-indigo-950/40 dark:text-indigo-300"
        actions={
          <div className="flex items-center gap-2">
            {run ? (
              <button
                type="button"
                onClick={() => setRunId(null)}
                className="h-8 rounded-md border border-stone-200 px-3 text-xs dark:border-stone-800"
              >
                Back
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => api.go('models')}
              className="h-8 rounded-md border border-stone-200 px-3 text-xs dark:border-stone-800"
            >
              Manage models
            </button>
          </div>
        }
      />
      {run ? (
        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
          <section className="overflow-hidden rounded-md border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-950">
            <h2 className="px-4 pt-3 text-sm font-semibold text-stone-950 dark:text-stone-50">
              Run details
            </h2>
            <p className="px-4 pb-3 pt-1 text-sm text-stone-800 dark:text-stone-200">
              {run.prompt}
            </p>
            <div className="grid border-t border-stone-100 dark:border-stone-800 sm:grid-cols-3">
              <p className="px-4 py-2 text-xs text-stone-500">
                Providers <span className="font-semibold text-emerald-600">{run.ok}</span>
                <span className="px-1 text-stone-300">|</span>
                <span className="font-semibold text-red-500">{run.fail}</span>
              </p>
              <p className="px-4 py-2 text-xs text-stone-500">
                Created <span className="text-stone-800 dark:text-stone-200">{run.created}</span>
              </p>
              <p className="px-4 py-2 text-xs text-stone-500">
                Best cost <span className="text-emerald-600">{run.bestCost}</span> ·{' '}
                {run.bestCostProvider}
              </p>
            </div>
          </section>
          <div className="grid gap-2 sm:grid-cols-3">
            {[
              ['Fastest', `${run.bestSpeed} · ${run.bestSpeedProvider}`],
              ['Cheapest', `${run.bestCost} · ${run.bestCostProvider}`],
              ['Providers', String(run.providers.length)],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-md border border-stone-200 px-3 py-2 dark:border-stone-800"
              >
                <p className="text-[11px] text-stone-500">{label}</p>
                <p className="text-sm font-semibold text-stone-950 dark:text-stone-50">{value}</p>
              </div>
            ))}
          </div>
          <section className="space-y-2">
            <h2 className="text-sm font-semibold text-stone-950 dark:text-stone-50">
              Provider response
            </h2>
            {run.providers.map((result) => (
              <article
                key={`${result.provider}-${result.model}`}
                className={cn(
                  'overflow-hidden rounded-md border bg-white dark:bg-stone-950',
                  result.error
                    ? 'border-red-200 dark:border-red-900'
                    : 'border-stone-200 dark:border-stone-800'
                )}
              >
                <div className="flex items-center justify-between gap-2 border-b border-stone-200 bg-stone-50 px-3 py-2 dark:border-stone-800 dark:bg-stone-900">
                  <div>
                    <p className="text-sm font-semibold text-stone-950 dark:text-stone-50">
                      {result.provider}/{result.model}
                    </p>
                    <p className="text-[11px] text-stone-500">
                      {result.time} · {result.tokens} tokens · {result.cost}
                    </p>
                  </div>
                  <StatusBadge ok={!result.error} label={result.error ? 'Error' : 'Success'} />
                </div>
                <p className="whitespace-pre-wrap px-3 py-3 text-xs text-stone-700 dark:text-stone-300">
                  {result.response}
                </p>
              </article>
            ))}
          </section>
        </div>
      ) : (
        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          <ProductTable
            columns={[
              { header: 'Prompt', width: 'minmax(8rem, 1.6fr)' },
              { header: 'Providers', width: '5rem' },
              { header: 'Best cost', width: '7rem' },
              { header: 'Best speed', width: '6rem' },
              { header: 'Created', width: '7rem' },
            ]}
            onSelect={setRunId}
            rows={OPENGROUND_RUNS.map((item) => ({
              id: item.id,
              cells: [
                item.prompt,
                <span key="providers">
                  <span className="text-emerald-600">{item.ok}</span>
                  <span className="px-1 text-stone-300">|</span>
                  <span className="text-red-500">{item.fail}</span>
                </span>,
                <span key="cost">
                  <span className="block text-emerald-600">{item.bestCost}</span>
                  <span className="text-[11px] text-stone-500">{item.bestCostProvider}</span>
                </span>,
                <span key="speed">
                  <span className="block text-sky-600">{item.bestSpeed}</span>
                  <span className="text-[11px] text-stone-500">{item.bestSpeedProvider}</span>
                </span>,
                item.created,
              ],
            }))}
          />
        </div>
      )}
    </div>
  )
}

const API_ENDPOINTS = [
  {
    id: 'list-traces',
    group: 'Telemetry',
    method: 'GET',
    path: '/v1/traces',
    summary: 'List traces',
    description: 'Returns recent traces for the project on the API key.',
    params: [
      ['limit', 'query', 'number', 'No', 'Page size. Sample uses 50.'],
      ['project', 'query', 'string', 'No', 'Project slug. Injected from the key when omitted.'],
    ],
  },
  {
    id: 'list-prompts',
    group: 'Prompt Hub',
    method: 'GET',
    path: '/v1/prompts',
    summary: 'List prompts',
    description: 'Returns prompt versions stored in Prompt Hub.',
    params: [['name', 'query', 'string', 'No', 'Filter by prompt name.']],
  },
  {
    id: 'upsert-secret',
    group: 'Vault',
    method: 'POST',
    path: '/v1/vault/secrets',
    summary: 'Store a secret',
    description: 'Writes a masked provider key. The value is not returned on later reads.',
    params: [
      ['key', 'body', 'string', 'Yes', 'Secret name, such as OPENAI_API_KEY.'],
      ['value', 'body', 'string', 'Yes', 'Secret value. Stored masked.'],
    ],
  },
] as const

function OpenApiScreen() {
  const [endpointId, setEndpointId] = useState<(typeof API_ENDPOINTS)[number]['id']>(
    API_ENDPOINTS[0].id
  )
  const endpoint = API_ENDPOINTS.find((item) => item.id === endpointId) ?? API_ENDPOINTS[0]
  const groups = Array.from(new Set(API_ENDPOINTS.map((item) => item.group)))
  const methodClass =
    endpoint.method === 'POST'
      ? 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300'
      : 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300'
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <PageHeader
        icon={BookOpen}
        eyebrow="Documentation"
        title="OpenAPI Specification"
        tone="border-primary-200 bg-primary-50 text-primary-700 dark:border-primary-900/70 dark:bg-primary-950/40 dark:text-primary-300"
      />
      <div className="min-h-0 flex-1 p-4">
        <div className="flex h-full flex-col overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-950">
          <div className="flex items-center gap-2 border-b border-stone-200 bg-stone-50 px-4 py-3 dark:border-stone-800 dark:bg-stone-900">
            <FileText className="size-4 text-stone-500" />
            <h2 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Interactive API reference
            </h2>
            <span className="ml-auto hidden text-[11px] text-stone-500 sm:inline">
              OpenAPI 3.0 · Bearer auth
            </span>
          </div>
          <div className="grid min-h-0 flex-1 md:grid-cols-[16rem_1fr]">
            <div className="overflow-y-auto border-b border-stone-200 bg-stone-50/60 py-2 dark:border-stone-800 dark:bg-stone-900/40 md:border-b-0 md:border-r">
              {groups.map((group) => (
                <div key={group} className="px-2">
                  <p className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-stone-500">
                    {group}
                  </p>
                  {API_ENDPOINTS.filter((item) => item.group === group).map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setEndpointId(item.id)}
                      className={cn(
                        'mb-0.5 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs',
                        endpoint.id === item.id
                          ? 'bg-stone-100 font-medium text-stone-950 dark:bg-stone-800 dark:text-stone-50'
                          : 'text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800'
                      )}
                    >
                      <span
                        className={cn(
                          'rounded border px-1 text-[10px] font-bold',
                          item.method === 'POST'
                            ? 'border-amber-200 text-amber-700 dark:border-amber-900 dark:text-amber-300'
                            : 'border-emerald-200 text-emerald-700 dark:border-emerald-900 dark:text-emerald-300'
                        )}
                      >
                        {item.method}
                      </span>
                      <span className="truncate">{item.summary}</span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
            <div className="min-h-0 overflow-y-auto p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={cn('rounded border px-1.5 py-0.5 text-[11px] font-bold', methodClass)}
                >
                  {endpoint.method}
                </span>
                <code className="rounded bg-stone-100 px-2 py-1 font-mono text-xs dark:bg-stone-800">
                  {endpoint.path}
                </code>
              </div>
              <h3 className="mt-3 text-sm font-semibold text-stone-950 dark:text-stone-50">
                {endpoint.summary}
              </h3>
              <p className="mt-1 text-xs text-stone-500">{endpoint.description}</p>
              <div className="mt-4 overflow-hidden rounded-md border border-stone-200 dark:border-stone-800">
                <p className="border-b border-stone-200 px-3 py-2 text-xs font-semibold dark:border-stone-800">
                  Parameters ({endpoint.params.length})
                </p>
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-stone-500">
                      {['Parameter', 'In', 'Type', 'Required', 'Description'].map((label) => (
                        <th key={label} className="px-3 py-2 font-medium">
                          {label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {endpoint.params.map((row) => (
                      <tr key={row[0]} className="border-t border-stone-100 dark:border-stone-900">
                        {row.map((cell) => (
                          <td key={cell} className="px-3 py-2 font-mono text-[11px]">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <pre className="mt-4 overflow-auto rounded-md bg-stone-950 p-3 font-mono text-[11px] text-stone-100">
                {`curl -H "Authorization: Bearer ol-••••" \\\n  https://api.openlit.io${endpoint.path}`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductTable({
  columns,
  rows,
  selectedId,
  onSelect,
}: {
  columns: { header: string; width?: string }[]
  rows: { id: string; cells: ReactNode[] }[]
  selectedId?: string
  onSelect?: (id: string) => void
}) {
  const template = columns.map((column) => column.width || 'minmax(0, 1fr)').join(' ')
  return (
    <div className="flex min-h-0 w-full grow flex-col overflow-auto rounded-md border border-stone-200 dark:border-stone-800">
      <div
        className="sticky top-0 z-10 grid bg-stone-100 text-sm text-stone-500 dark:bg-stone-900 dark:text-stone-400"
        style={{ gridTemplateColumns: template }}
      >
        {columns.map((column) => (
          <div
            key={column.header}
            className="overflow-hidden whitespace-nowrap border-b border-stone-200 px-3 py-3 dark:border-stone-800"
          >
            {column.header}
          </div>
        ))}
      </div>
      {rows.map((row) => {
        const className = cn(
          'grid w-full text-left text-sm text-stone-800 hover:bg-stone-50 dark:text-stone-200 dark:hover:bg-stone-900',
          selectedId === row.id && 'bg-stone-100 dark:bg-stone-900'
        )
        const cells = row.cells.map((cell, index) => (
          <div
            key={columns[index]?.header ?? index}
            className="overflow-hidden border-b border-stone-200 px-3 py-3 dark:border-stone-800"
          >
            {cell}
          </div>
        ))
        if (onSelect) {
          return (
            <button
              key={row.id}
              type="button"
              onClick={() => onSelect(row.id)}
              className={className}
              style={{ gridTemplateColumns: template }}
            >
              {cells}
            </button>
          )
        }
        return (
          <div key={row.id} className={className} style={{ gridTemplateColumns: template }}>
            {cells}
          </div>
        )
      })}
    </div>
  )
}

function StatusBadge({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium',
        ok
          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
          : 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300'
      )}
    >
      {label}
    </span>
  )
}

function SimpleTableScreen({
  icon,
  eyebrow,
  title,
  columns,
  rows,
}: {
  icon: LucideIcon
  eyebrow: string
  title: string
  columns: string[]
  rows: string[][]
}) {
  return (
    <div className="flex h-full flex-col">
      <PageHeader icon={icon} eyebrow={eyebrow} title={title} />
      <div className="overflow-y-auto p-4">
        <SimpleRows columns={columns} rows={rows} />
      </div>
    </div>
  )
}

function SimpleRows({ columns, rows }: { columns: string[]; rows: string[][] }) {
  return (
    <table className="w-full text-xs">
      <thead>
        <tr className="border-b border-stone-200 text-left dark:border-stone-800">
          {columns.map((label) => (
            <th key={label} className={cn('h-8 font-medium', LABEL)}>
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.join('-')} className="border-b border-stone-100 dark:border-stone-900">
            {row.map((cell) => (
              <td key={cell} className="py-2 pr-3">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function Stat({
  title,
  value,
  hint,
  delta,
}: {
  title: string
  value: string
  hint?: string
  delta?: number
}) {
  return (
    <div className="border-b border-r border-stone-200 px-3 py-2 dark:border-stone-800">
      <p className={LABEL}>{title}</p>
      <p className="mt-0.5 truncate text-base font-semibold text-stone-950 dark:text-stone-50">
        {value}
      </p>
      <div className="flex items-center gap-2">
        {delta != null ? (
          <span
            className={cn(
              'text-[11px]',
              delta >= 0
                ? 'text-emerald-700 dark:text-emerald-300'
                : 'text-red-700 dark:text-red-300'
            )}
          >
            {delta >= 0 ? '+' : ''}
            {delta}%
          </span>
        ) : null}
        {hint ? <p className="truncate text-[11px] text-stone-500">{hint}</p> : null}
      </div>
    </div>
  )
}

function ChartPanel({
  title,
  hint,
  children,
}: {
  title: string
  hint: string
  children: ReactNode
}) {
  return (
    <section className={PANEL}>
      <header className="border-b border-stone-200 px-3 py-2 dark:border-stone-800">
        <h3 className="text-xs font-semibold text-stone-950 dark:text-stone-50">{title}</h3>
        <p className="text-[11px] text-stone-500">{hint}</p>
      </header>
      <div className="h-36 px-1 py-1">{children}</div>
    </section>
  )
}

function SortHead({
  label,
  active,
  desc,
  onSort,
}: {
  label: string
  active: boolean
  desc: boolean
  onSort: () => void
}) {
  const Icon = !active ? ArrowUpDown : desc ? ArrowDown : ArrowUp
  return (
    <th className="h-8 p-0 text-right">
      <button
        type="button"
        onClick={onSort}
        className={cn(
          'inline-flex h-8 w-full items-center justify-end gap-1 px-2',
          LABEL,
          active && 'text-stone-900 dark:text-stone-100'
        )}
      >
        {label}
        <Icon className="h-3 w-3 opacity-60" />
      </button>
    </th>
  )
}

function Chip({
  title,
  value,
  options,
  onChange,
}: {
  title: string
  value?: string
  options: string[]
  onChange: (value: string) => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="inline-flex h-7 items-center gap-1 rounded-md border border-stone-200 bg-white px-2 text-xs dark:border-stone-800 dark:bg-stone-950"
      >
        {title}
        {value ? <span className="text-stone-950 dark:text-stone-50">{value}</span> : null}
      </button>
      {open ? (
        <div className="absolute left-0 top-full z-20 mt-1 w-44 rounded-md border border-stone-200 bg-white p-1 shadow-lg dark:border-stone-800 dark:bg-stone-950">
          <button
            type="button"
            className="block w-full rounded px-2 py-1 text-left text-xs hover:bg-stone-100 dark:hover:bg-stone-900"
            onClick={() => {
              onChange('')
              setOpen(false)
            }}
          >
            All
          </button>
          {options
            .filter((option) => option !== 'all')
            .map((option) => (
              <button
                key={option}
                type="button"
                className="block w-full rounded px-2 py-1 text-left text-xs hover:bg-stone-100 dark:hover:bg-stone-900"
                onClick={() => {
                  onChange(option)
                  setOpen(false)
                }}
              >
                {option}
              </button>
            ))}
        </div>
      ) : null}
    </div>
  )
}

function LineChart({ series }: { series: { name: string; color: string; values: number[] }[] }) {
  const width = 320
  const height = 120
  const pad = 16
  const max = Math.max(1, ...series.flatMap((item) => item.values))
  const path = (values: number[]) =>
    values
      .map((value, index) => {
        const x = pad + (index / Math.max(values.length - 1, 1)) * (width - pad * 2)
        const y = height - pad - (value / max) * (height - pad * 2)
        return `${index === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
      })
      .join(' ')
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-full w-full"
      role="img"
      aria-label="Line chart"
    >
      {[0, 1, 2].map((index) => {
        const y = pad + index * ((height - pad * 2) / 2)
        return (
          <line
            key={index}
            x1={pad}
            x2={width - pad}
            y1={y}
            y2={y}
            className="text-stone-200 dark:text-stone-800"
            stroke="currentColor"
            strokeDasharray="3 3"
          />
        )
      })}
      {series.map((item) => (
        <path
          key={item.name}
          d={path(item.values)}
          fill="none"
          stroke={item.color}
          strokeWidth="1.5"
        />
      ))}
      {SPEND_LABELS.filter((_, index) => index % 3 === 0).map((label, index) => (
        <text
          key={label}
          x={pad + index * 3 * ((width - pad * 2) / (SPEND_LABELS.length - 1))}
          y={height - 2}
          className="fill-stone-400"
          fontSize="9"
        >
          {label}
        </text>
      ))}
    </svg>
  )
}

function BarChart({ rows, color }: { rows: { label: string; value: number }[]; color: string }) {
  const width = 320
  const height = 120
  const max = Math.max(1, ...rows.map((row) => row.value))
  const gap = 8
  const barWidth = rows.length ? (width - 24 - gap * rows.length) / rows.length : 0
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-full w-full"
      role="img"
      aria-label="Bar chart"
    >
      {rows.map((row, index) => {
        const barHeight = (row.value / max) * 78
        const x = 12 + index * (barWidth + gap)
        return (
          <g key={row.label}>
            <rect
              x={x}
              y={96 - barHeight}
              width={Math.max(barWidth, 4)}
              height={barHeight}
              rx="2"
              fill={color}
            />
            <text x={x} y={110} className="fill-stone-400" fontSize="8">
              {row.label.slice(0, 8)}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
