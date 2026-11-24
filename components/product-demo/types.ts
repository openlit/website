import type {
  ProjectId,
  ScreenId,
  SpendLevel,
  StatusFilter,
  TraceTab,
} from 'constants/product-demo'

export type LocalAudit = {
  id: string
  actor: string
  action: string
  when: string
  area: string
  detail: string
}

export type OrgTab = 'overview' | 'details' | 'projects' | 'licensing' | 'members' | 'pending'
export type DatabaseId = 'primary' | 'warehouse'

export type DemoApi = {
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
  spent: number
  level: SpendLevel
  roleId: string
  grants: Record<string, boolean>
  restrictedKeys: string[]
  auditExtra: LocalAudit[]
  orgTab: OrgTab
  go: (screen: ScreenId, focus?: string | null, traceTab?: TraceTab) => void
  setProject: (project: ProjectId) => void
  setOverviewProject: (project: ProjectId | 'all') => void
  setDatabase: (database: DatabaseId) => void
  setQuery: (query: string) => void
  setStatus: (status: StatusFilter) => void
  setTraceTab: (tab: TraceTab) => void
  setCap: (cap: number) => void
  saveCap: () => void
  setRole: (roleId: string) => void
  toggleGrant: (roleId: string, permissionId: string) => void
  restrictKey: (keyId: string) => void
  setOrgTab: (tab: OrgTab) => void
  openTrace: (traceId: string, tab?: TraceTab) => void
  closeTrace: () => void
  reset: () => void
}
