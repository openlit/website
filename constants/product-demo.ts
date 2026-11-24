export type ProjectId = 'support' | 'checkout' | 'research'
export type ScreenId =
  | 'home'
  | 'dashboards'
  | 'telemetry'
  | 'trace'
  | 'agents'
  | 'evaluations'
  | 'costs'
  | 'models'
  | 'alerts'
  | 'alert'
  | 'gpus'
  | 'audit'
  | 'fleet'
  | 'prompts'
  | 'vault'
  | 'contexts'
  | 'memory'
  | 'scanner'
  | 'rules'
  | 'openground'
  | 'connectors'
  | 'roles'
  | 'keys'
  | 'organisation'
  | 'projects'
  | 'profile'
  | 'openapi'

export type TraceTab = 'spans' | 'prompt' | 'guardrail' | 'eval'
export type StatusFilter = 'all' | 'error' | 'ok'
export type SpendLevel = 'ok' | 'warning' | 'limit'

export type FlowStep = {
  id: string
  label: string
  screen: ScreenId
  focus?: string
  traceTab?: TraceTab
  roleId?: string
  title: string
  body: string
}

export const EXPLORE_PATH = '/explore'
export const EXPLORE_URL = 'https://openlit.io/explore'

export const EXPLORE_SEO = {
  title: 'Explore OpenLIT Enterprise',
  description:
    'Use the OpenLIT Enterprise UI with sample data from Northwind. Open telemetry, the organisation overview, alerts, roles, and the audit log. Fictional data. Nothing you change is saved.',
  keywords: [
    'OpenLIT Enterprise demo',
    'OpenLIT product UI',
    'LLM observability demo',
    'enterprise AI observability',
    'OpenLIT audit log',
    'OpenLIT RBAC',
  ],
} as const

export const ORG_NAME = 'Northwind'
export const ORG_SPEND = 4280.16
export const DEFAULT_CAP = 6000
export const WARNING_PERCENT = 80

export const DEMO_NOTE =
  'Sample workspace. Northwind is fictional, and nothing you change is saved.'

export const PROJECTS: {
  id: ProjectId
  name: string
  environment: string
  color: string
  spend: number
  requests: number
  errorRate: number
  tokens: number
  p95: string
}[] = [
  {
    id: 'support',
    name: 'support',
    environment: 'production',
    color: '#F36C06',
    spend: 2410.4,
    requests: 74200,
    errorRate: 2.4,
    tokens: 48_200_000,
    p95: '2.4s',
  },
  {
    id: 'checkout',
    name: 'checkout',
    environment: 'production',
    color: '#3b82f6',
    spend: 1519.22,
    requests: 41800,
    errorRate: 1.1,
    tokens: 31_400_000,
    p95: '1.1s',
  },
  {
    id: 'research',
    name: 'research',
    environment: 'staging',
    color: '#8DA750',
    spend: 350.54,
    requests: 12420,
    errorRate: 0.4,
    tokens: 6_800_000,
    p95: '3.2s',
  },
]

export const SPEND_LABELS = [
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
]

export const SPEND_SERIES: Record<ProjectId, number[]> = {
  support: [150, 162, 148, 171, 188, 176, 160, 190, 184, 172, 168, 195, 181, 165],
  checkout: [96, 110, 102, 118, 124, 108, 99, 130, 121, 115, 109, 128, 122, 117],
  research: [18, 22, 16, 28, 24, 20, 19, 32, 26, 21, 18, 30, 25, 22],
}

export type Span = {
  name: string
  offset: number
  ms: number
  status: 'ok' | 'error'
  detail?: string
}

export type Trace = {
  id: string
  project: ProjectId
  name: string
  status: 'ok' | 'error'
  model: string
  provider: string
  user: string
  environment: string
  cost: number
  latencyMs: number
  tokens: number
  when: string
  application: string
  prompt: string
  received: string
  reply: string
  toolResult: string
  guardrails: { ruleId: string; result: string }[]
  evaluation: { name: string; result: 'pass' | 'fail'; note: string }[]
  spans: Span[]
}

export const STORY_TRACE_ID = 'tr_4c21'

export const TRACES: Trace[] = [
  {
    id: STORY_TRACE_ID,
    project: 'support',
    name: 'support.triage',
    status: 'error',
    model: 'claude-sonnet-4',
    provider: 'Anthropic',
    user: 'jamie@northwind.example',
    environment: 'production',
    cost: 0.084,
    latencyMs: 2410,
    tokens: 18420,
    when: '12 min ago',
    application: 'support-agent',
    prompt:
      'Where is order 4412 for alex.morgan@northwind.example? I can pay with the key sk-live-••••••••.',
    received: 'Where is order 4412 for [email]? I can pay with the key [blocked secret].',
    reply: 'Order 4412 was delivered yesterday.',
    toolResult: '{ "id": "4412", "status": "not_found" }',
    guardrails: [
      { ruleId: 'mask_email', result: 'Masked 1 email address' },
      { ruleId: 'block_secret', result: 'Blocked 1 secret. The span was dropped.' },
      { ruleId: 'block_injection', result: 'No match' },
    ],
    evaluation: [
      {
        name: 'Hallucination',
        result: 'fail',
        note: 'The reply says the order was delivered. lookup_order returned not_found.',
      },
      {
        name: 'PII in output',
        result: 'pass',
        note: 'The reply has no email address and no secret.',
      },
    ],
    spans: [
      { name: 'support.triage', offset: 0, ms: 2410, status: 'error' },
      { name: 'rule.mask_email', offset: 40, ms: 12, status: 'ok', detail: 'Masked 1 email' },
      {
        name: 'rule.block_secret',
        offset: 58,
        ms: 8,
        status: 'ok',
        detail: 'Blocked a key-shaped string',
      },
      { name: 'gen_ai.chat', offset: 80, ms: 1980, status: 'ok', detail: 'claude-sonnet-4' },
      {
        name: 'tool.lookup_order',
        offset: 2060,
        ms: 310,
        status: 'error',
        detail: 'status not_found',
      },
    ],
  },
  {
    id: 'tr_1ab8',
    project: 'support',
    name: 'support.triage',
    status: 'ok',
    model: 'gpt-4o',
    provider: 'OpenAI',
    user: 'sam@northwind.example',
    environment: 'production',
    cost: 0.021,
    latencyMs: 980,
    tokens: 4200,
    when: '28 min ago',
    application: 'support-agent',
    prompt: 'What is the refund window for a damaged mug?',
    received: 'What is the refund window for a damaged mug?',
    reply: 'Damaged items can be refunded within 30 days of delivery.',
    toolResult: '{ "policy": "damaged", "window_days": 30 }',
    guardrails: [{ ruleId: 'mask_email', result: 'No match' }],
    evaluation: [{ name: 'Relevance', result: 'pass', note: 'Answer stays on the refund policy.' }],
    spans: [
      { name: 'support.triage', offset: 0, ms: 980, status: 'ok' },
      { name: 'gen_ai.chat', offset: 30, ms: 760, status: 'ok' },
      { name: 'tool.search_help', offset: 800, ms: 150, status: 'ok' },
    ],
  },
  {
    id: 'tr_18aa',
    project: 'support',
    name: 'support.triage',
    status: 'ok',
    model: 'claude-sonnet-4',
    provider: 'Anthropic',
    user: 'jamie@northwind.example',
    environment: 'production',
    cost: 0.062,
    latencyMs: 1640,
    tokens: 12110,
    when: '1 hr ago',
    application: 'support-agent',
    prompt: 'Write a short apology for a late reply.',
    received: 'Write a short apology for a late reply.',
    reply: 'Sorry for the delay. I am looking at this now.',
    toolResult: 'No tool call',
    guardrails: [],
    evaluation: [
      {
        name: 'Tone',
        result: 'fail',
        note: 'The reply is correct and colder than the rubric allows.',
      },
    ],
    spans: [
      { name: 'support.triage', offset: 0, ms: 1640, status: 'ok' },
      { name: 'gen_ai.chat', offset: 20, ms: 1500, status: 'ok' },
    ],
  },
  {
    id: 'tr_77e0',
    project: 'checkout',
    name: 'checkout.policy',
    status: 'ok',
    model: 'gpt-4o-mini',
    provider: 'OpenAI',
    user: 'sam@northwind.example',
    environment: 'production',
    cost: 0.004,
    latencyMs: 420,
    tokens: 2104,
    when: '34 min ago',
    application: 'checkout-agent',
    prompt: 'Can this cart use the welcome discount twice?',
    received: 'Can this cart use the welcome discount twice?',
    reply: 'No. The welcome discount applies once per account.',
    toolResult: '{ "discount": "welcome", "already_used": true }',
    guardrails: [],
    evaluation: [],
    spans: [
      { name: 'checkout.policy', offset: 0, ms: 420, status: 'ok' },
      { name: 'gen_ai.chat', offset: 16, ms: 280, status: 'ok' },
      { name: 'tool.price_cart', offset: 300, ms: 100, status: 'ok' },
    ],
  },
  {
    id: 'tr_90c2',
    project: 'checkout',
    name: 'checkout.policy',
    status: 'error',
    model: 'claude-haiku-4',
    provider: 'Anthropic',
    user: 'sam@northwind.example',
    environment: 'production',
    cost: 0.011,
    latencyMs: 5100,
    tokens: 6400,
    when: '2 hr ago',
    application: 'checkout-agent',
    prompt: 'Score this checkout for fraud and explain the score.',
    received: 'Score this checkout for fraud and explain the score.',
    reply: 'The fraud tool timed out, so no score was returned.',
    toolResult: 'timeout after 5000ms',
    guardrails: [],
    evaluation: [],
    spans: [
      { name: 'checkout.policy', offset: 0, ms: 5100, status: 'error' },
      { name: 'gen_ai.chat', offset: 20, ms: 80, status: 'ok' },
      { name: 'tool.fraud_score', offset: 100, ms: 5000, status: 'error', detail: 'timeout' },
    ],
  },
  {
    id: 'tr_33d4',
    project: 'research',
    name: 'research.notes',
    status: 'ok',
    model: 'gemini-2.0-flash',
    provider: 'Google',
    user: 'priya@northwind.example',
    environment: 'staging',
    cost: 0.002,
    latencyMs: 760,
    tokens: 3050,
    when: '3 hr ago',
    application: 'research-agent',
    prompt: 'Summarise the staging notes on cache hit rate.',
    received: 'Summarise the staging notes on cache hit rate.',
    reply: 'Cache hit rate on staging was 61 percent over the last day.',
    toolResult: '{ "cache_hit_rate": 0.61 }',
    guardrails: [],
    evaluation: [],
    spans: [
      { name: 'research.notes', offset: 0, ms: 760, status: 'ok' },
      { name: 'gen_ai.chat', offset: 24, ms: 600, status: 'ok' },
    ],
  },
]

export const AGENTS = [
  {
    id: 'support-agent',
    project: 'support' as ProjectId,
    name: 'Support triage',
    framework: 'LangGraph',
    tools: 'lookup_order, search_help',
    status: 'degraded' as const,
    requests: '74.2k',
    cost: '$2,410',
  },
  {
    id: 'checkout-agent',
    project: 'checkout' as ProjectId,
    name: 'Checkout policy',
    framework: 'Vercel AI SDK',
    tools: 'price_cart, fraud_score',
    status: 'healthy' as const,
    requests: '41.8k',
    cost: '$1,519',
  },
  {
    id: 'research-agent',
    project: 'research' as ProjectId,
    name: 'Research notes',
    framework: 'OpenAI Agents',
    tools: 'search_docs',
    status: 'healthy' as const,
    requests: '12.4k',
    cost: '$351',
  },
]

export const EVAL_RUN = {
  name: 'support-gold',
  when: '2 hours ago',
  cases: 12,
  passed: 10,
  failed: 2,
}

export const EVAL_CASES = [
  {
    id: 'case_hallucination',
    traceId: STORY_TRACE_ID,
    name: 'Order status when the tool returns not found',
    scorer: 'Hallucination',
    result: 'fail' as const,
    note: 'Reply says the order was delivered. lookup_order returned not_found.',
  },
  {
    id: 'case_pii',
    traceId: STORY_TRACE_ID,
    name: 'Email and secret stayed out of the model reply',
    scorer: 'PII in output',
    result: 'pass' as const,
    note: 'The reply has no email address and no secret.',
  },
  {
    id: 'case_relevance',
    traceId: 'tr_1ab8',
    name: 'Refund window question',
    scorer: 'Relevance',
    result: 'pass' as const,
    note: 'Answer stays on the refund policy.',
  },
  {
    id: 'case_tone',
    traceId: 'tr_18aa',
    name: 'Short apology for a late reply',
    scorer: 'Tone',
    result: 'fail' as const,
    note: 'The reply is correct and colder than the rubric allows.',
  },
]

export const MODEL_COSTS = [
  {
    model: 'claude-sonnet-4',
    provider: 'Anthropic',
    project: 'support' as ProjectId,
    cost: 2180.4,
    requests: 40210,
  },
  {
    model: 'gpt-4o-mini',
    provider: 'OpenAI',
    project: 'support' as ProjectId,
    cost: 230,
    requests: 8400,
  },
  {
    model: 'gpt-4o',
    provider: 'OpenAI',
    project: 'checkout' as ProjectId,
    cost: 980.22,
    requests: 22100,
  },
  {
    model: 'gpt-4o-mini',
    provider: 'OpenAI',
    project: 'checkout' as ProjectId,
    cost: 410,
    requests: 18400,
  },
  {
    model: 'claude-haiku-4',
    provider: 'Anthropic',
    project: 'checkout' as ProjectId,
    cost: 129,
    requests: 1300,
  },
  {
    model: 'gemini-2.0-flash',
    provider: 'Google',
    project: 'research' as ProjectId,
    cost: 350.54,
    requests: 12420,
  },
]

export type Alert = {
  id: string
  project: ProjectId | 'organisation'
  name: string
  status: 'firing' | 'ok'
  condition: string
  when: string
  value: string
  detail: string
  deliveries: { channel: string; result: string }[]
  traceId?: string
}

export const ALERTS: Alert[] = [
  {
    id: 'al_support_errors',
    project: 'support',
    name: 'Support error rate',
    status: 'firing',
    condition: 'Error rate above 2% for 15 minutes',
    when: '14 min ago',
    value: '4.6%',
    detail: 'support-agent error rate is 4.6%. The latest failed run is the order-status trace.',
    deliveries: [
      { channel: 'Slack · #ai-oncall', result: 'Delivered' },
      { channel: 'PagerDuty', result: 'Incident opened' },
    ],
    traceId: STORY_TRACE_ID,
  },
  {
    id: 'al_checkout_latency',
    project: 'checkout',
    name: 'Checkout p95 latency',
    status: 'ok',
    condition: 'p95 above 4s for 10 minutes',
    when: '3 hr ago',
    value: '1.1s',
    detail: 'Cleared. p95 is back under the threshold.',
    deliveries: [{ channel: 'Slack · #ai-oncall', result: 'Delivered' }],
  },
  {
    id: 'al_key',
    project: 'organisation',
    name: 'API key access changed',
    status: 'ok',
    condition: 'When an API key is created or its scopes change',
    when: '5 hr ago',
    value: 'analytics-read',
    detail:
      'Fired because analytics-read was restricted. This is a platform event, not a model metric.',
    deliveries: [{ channel: 'Email · owners', result: 'Delivered' }],
  },
]

export const AUDIT_LOG = [
  {
    id: 'au_role',
    actor: 'Avery Chen',
    action: 'Updated role On-call',
    when: '2 hours ago',
    area: 'Roles',
    detail: 'Removed Prompts · Export. On-call can still view prompts and telemetry.',
  },
  {
    id: 'au_key',
    actor: 'Avery Chen',
    action: 'Restricted API key analytics-read',
    when: '5 hours ago',
    area: 'API keys',
    detail: 'Scopes set to telemetry. The key no longer has full access.',
  },
  {
    id: 'au_spend',
    actor: 'Priya Shah',
    action: 'Set monthly spend limit to $6,000',
    when: 'Yesterday',
    area: 'Organisation',
    detail:
      'Warning at 80%. Reaching the warning or the limit notifies owners. Provider calls are not stopped.',
  },
  {
    id: 'au_connector',
    actor: 'Priya Shah',
    action: 'Bound connector Slack',
    when: 'Yesterday',
    area: 'Connectors',
    detail: 'Notification destination for alert rules. Channel #ai-oncall.',
  },
  {
    id: 'au_export',
    actor: 'Jamie Okonkwo',
    action: 'Viewed a trace governance report',
    when: '3 days ago',
    area: 'Audit log',
    detail: 'Metadata only. Prompt text and secrets are not stored in the audit event.',
  },
]

export const PERMISSIONS = [
  { id: 'telemetry.view', group: 'Telemetry', label: 'View' },
  { id: 'telemetry.export', group: 'Telemetry', label: 'Export' },
  { id: 'prompts.view', group: 'Prompts', label: 'View' },
  { id: 'prompts.export', group: 'Prompts', label: 'Export' },
  { id: 'vault.view', group: 'Vault', label: 'View' },
  { id: 'vault.update', group: 'Vault', label: 'Update' },
  { id: 'roles.manage', group: 'Roles', label: 'Manage' },
  { id: 'audit.view', group: 'Audit log', label: 'View' },
  { id: 'keys.manage', group: 'API keys', label: 'Manage' },
]

export const ROLES = [
  {
    id: 'admin',
    name: 'Admin',
    locked: true,
    members: 2,
    grants: PERMISSIONS.map((permission) => permission.id),
  },
  {
    id: 'member',
    name: 'Member',
    locked: false,
    members: 6,
    grants: ['telemetry.view', 'prompts.view'],
  },
  {
    id: 'oncall',
    name: 'On-call',
    locked: false,
    members: 3,
    grants: ['telemetry.view', 'prompts.view', 'vault.view', 'audit.view'],
  },
  {
    id: 'auditor',
    name: 'Auditor',
    locked: false,
    members: 1,
    grants: ['telemetry.view', 'audit.view'],
  },
]

export const API_KEYS = [
  {
    id: 'key_ingest',
    name: 'support-ingest',
    preview: 'ol-••••7f3a',
    access: 'Restricted' as const,
    scopes: ['ingest'],
    created: 'Apr 2',
  },
  {
    id: 'key_read',
    name: 'analytics-read',
    preview: 'ol-••••22b1',
    access: 'Restricted' as const,
    scopes: ['telemetry'],
    created: 'Jun 18',
  },
  {
    id: 'key_admin',
    name: 'break-glass',
    preview: 'ol-••••90c4',
    access: 'Full' as const,
    scopes: ['ingest', 'telemetry', 'prompts', 'vault', 'evaluation', 'rule_engine'],
    created: 'Jan 9',
  },
]

export const GPUS = [
  {
    id: 'gpu_h100',
    name: 'H100 × 4',
    pool: 'checkout inference',
    util: 78,
    temp: 71,
    power: '2.1 kW',
    rate: '$2.40/hr',
    spend: '$186 today',
  },
  {
    id: 'gpu_a100',
    name: 'A100 × 2',
    pool: 'support',
    util: 41,
    temp: 64,
    power: '0.7 kW',
    rate: '$1.10/hr',
    spend: '$42 today',
  },
  {
    id: 'gpu_l40',
    name: 'L40S × 1',
    pool: 'research',
    util: 12,
    temp: 48,
    power: '0.2 kW',
    rate: '$0.40/hr',
    spend: '$6 today',
  },
]

export const FLEET = [
  {
    id: 'svc_support',
    project: 'support' as ProjectId,
    name: 'support-agent',
    source: 'SDK',
    language: 'Python',
    status: 'Healthy',
    detail: 'openlit.init() in the agent process.',
  },
  {
    id: 'svc_checkout',
    project: 'checkout' as ProjectId,
    name: 'checkout-api',
    source: 'eBPF',
    language: 'Python',
    status: 'No SDK',
    detail: 'The controller attached on Kubernetes. Traces use the same pipeline as the SDK.',
  },
  {
    id: 'svc_worker',
    project: 'checkout' as ProjectId,
    name: 'worker',
    source: 'eBPF',
    language: 'Go',
    status: 'Partial',
    detail: 'HTTP client spans are present. The model call is not identified yet.',
  },
  {
    id: 'svc_research',
    project: 'research' as ProjectId,
    name: 'research-nb',
    source: 'SDK',
    language: 'Python',
    status: 'Healthy',
    detail: 'Notebook jobs export OTLP to this project.',
  },
]

export const PROMPTS = [
  {
    id: 'pr_support',
    project: 'support' as ProjectId,
    name: 'support.triage',
    version: 'v12',
    status: 'Deployed',
    updated: 'Yesterday',
    note: 'Asks the model to quote the tool result before it answers.',
  },
  {
    id: 'pr_support_old',
    project: 'support' as ProjectId,
    name: 'support.triage',
    version: 'v11',
    status: 'Previous',
    updated: '6 days ago',
    note: 'No instruction to trust the tool over a guess.',
  },
  {
    id: 'pr_checkout',
    project: 'checkout' as ProjectId,
    name: 'checkout.policy',
    version: 'v4',
    status: 'Deployed',
    updated: '3 days ago',
    note: 'Refuses to invent a discount.',
  },
]

export const VAULT_SECRETS = [
  {
    id: 'vault_openai',
    name: 'OPENAI_API_KEY',
    provider: 'OpenAI',
    preview: 'sk-••••91af',
    updated: '12 days ago',
  },
  {
    id: 'vault_anthropic',
    name: 'ANTHROPIC_API_KEY',
    provider: 'Anthropic',
    preview: 'sk-ant-••••c02e',
    updated: '3 days ago',
  },
  {
    id: 'vault_google',
    name: 'GOOGLE_API_KEY',
    provider: 'Google',
    preview: 'AIza••••k18',
    updated: '1 month ago',
  },
]

export const RULES = [
  {
    id: 'mask_email',
    name: 'Mask email addresses',
    action: 'Mask',
    target: 'Input and output',
    fired: '1,284 this month',
    detail: 'Replaces an email with [email] before the model call.',
  },
  {
    id: 'block_secret',
    name: 'Block secrets',
    action: 'Block',
    target: 'Input',
    fired: '36 this month',
    detail: 'Drops a provider key. The model receives [blocked secret].',
  },
  {
    id: 'block_injection',
    name: 'Block prompt injection',
    action: 'Block',
    target: 'Input',
    fired: '4 this month',
    detail: 'Stops instructions that try to override the system prompt.',
  },
]

export const CONNECTORS = [
  {
    id: 'cx_datadog',
    name: 'Datadog',
    kind: 'Datasource',
    status: 'Connected',
    detail: 'Query traces that already live in Datadog.',
  },
  {
    id: 'cx_slack',
    name: 'Slack',
    kind: 'Notification',
    status: 'Connected',
    detail: '#ai-oncall receives alert deliveries.',
  },
  {
    id: 'cx_pager',
    name: 'PagerDuty',
    kind: 'Notification',
    status: 'Connected',
    detail: 'Opens an incident when a rule is critical.',
  },
  {
    id: 'cx_ops',
    name: 'Opsgenie',
    kind: 'Notification',
    status: 'Not connected',
    detail: 'Available on Enterprise. Not bound in this sample.',
  },
]

export const MEMBERS = [
  { name: 'Avery Chen', role: 'Admin', email: 'avery@northwind.example' },
  { name: 'Priya Shah', role: 'Admin', email: 'priya@northwind.example' },
  { name: 'Sam Rivera', role: 'On-call', email: 'sam@northwind.example' },
  { name: 'Jamie Okonkwo', role: 'Member', email: 'jamie@northwind.example' },
]

export const FLOW: FlowStep[] = [
  {
    id: 'org',
    label: 'Organisation',
    screen: 'home',
    title: 'See every project',
    body: 'Cost, requests, and errors for the whole organisation. The monthly spend limit warns owners. It does not stop provider calls.',
  },
  {
    id: 'trace',
    label: 'Trace',
    screen: 'trace',
    focus: STORY_TRACE_ID,
    traceTab: 'spans',
    title: 'Open the failed run',
    body: 'Support triage failed in production. The tool returned not found, and the model still answered.',
  },
  {
    id: 'guard',
    label: 'Guardrail',
    screen: 'trace',
    focus: STORY_TRACE_ID,
    traceTab: 'guardrail',
    title: 'See what was stopped',
    body: 'A rule masked the email and blocked a secret before the model call. The original stays on the trace.',
  },
  {
    id: 'eval',
    label: 'Evaluation',
    screen: 'evaluations',
    focus: 'case_hallucination',
    title: 'Grade the answer',
    body: 'The same run failed the hallucination check. The reply claims a delivery. The tool said not found.',
  },
  {
    id: 'alert',
    label: 'Alert',
    screen: 'alert',
    focus: 'al_support_errors',
    title: 'Follow the page',
    body: 'The support error rate crossed 2 percent. One rule notified Slack and PagerDuty.',
  },
  {
    id: 'access',
    label: 'Access',
    screen: 'roles',
    focus: 'prompts.export',
    roleId: 'oncall',
    title: 'Limit who can do what',
    body: 'On-call can view telemetry and prompts. Export is off. Toggle a permission and it lands in the audit log.',
  },
  {
    id: 'audit',
    label: 'Audit',
    screen: 'audit',
    focus: 'au_role',
    title: 'Keep the record',
    body: 'Role edits, API key scopes, connector changes, and spend-limit updates record who did what.',
  },
  {
    id: 'fleet',
    label: 'Fleet',
    screen: 'fleet',
    focus: 'svc_checkout',
    title: 'Instrument without an SDK',
    body: 'checkout-api never installed an SDK. The eBPF controller still sent its traces into this project.',
  },
]

export const SCREEN_COPY: Record<ScreenId, { title: string; description: string }> = {
  home: {
    title: 'Organisation',
    description: 'Requests, cost, and errors across every project this month.',
  },
  telemetry: {
    title: 'Telemetry',
    description: 'Latest requests. Open one to see spans, the prompt, and the tool result.',
  },
  trace: {
    title: 'Trace',
    description: 'One agent run, from the first span to the model reply.',
  },
  agents: {
    title: 'Agents',
    description: 'The agents this organisation runs, and which project they write to.',
  },
  evaluations: {
    title: 'Evaluations',
    description: 'Production requests scored against support-gold.',
  },
  costs: {
    title: 'Costs',
    description: 'Model spend for the month, split by provider.',
  },
  models: {
    title: 'Manage Models',
    description: 'Models this organisation calls.',
  },
  alerts: {
    title: 'Alerts',
    description: 'Rules on telemetry and on platform events, routed to shared destinations.',
  },
  alert: {
    title: 'Alert',
    description: 'What fired, where it was delivered, and the request behind it.',
  },
  gpus: {
    title: 'GPUs',
    description: 'Utilization, temperature, and hourly cost for the inference fleet.',
  },
  audit: {
    title: 'Audit Logs',
    description: 'Privileged changes in this organisation. Prompt text is not stored here.',
  },
  fleet: {
    title: 'Fleet Hub',
    description: 'Services sending traces, including ones the eBPF controller found.',
  },
  prompts: {
    title: 'Prompt Hub',
    description: 'Prompt versions. The deployed version is what production calls.',
  },
  vault: {
    title: 'Vault',
    description: 'Provider keys stored in this deployment. The secret value is not shown.',
  },
  rules: {
    title: 'Rule Engine',
    description: 'Guardrails that mask or block text before it reaches a model.',
  },
  connectors: {
    title: 'Connectors',
    description: 'Datasources and notification destinations, including Enterprise ones.',
  },
  roles: {
    title: 'Roles',
    description: 'Custom roles. Permissions are enforced in the UI and on the server.',
  },
  keys: {
    title: 'API keys',
    description: 'Full access, or a key limited to the scopes it needs.',
  },
  organisation: {
    title: 'Organisation',
    description: 'Members, the license, and the monthly spend limit.',
  },
  dashboards: {
    title: 'Dashboards',
    description: 'Saved boards.',
  },
  contexts: {
    title: 'Contexts',
    description: 'Reusable context documents.',
  },
  memory: {
    title: 'Memory',
    description: 'Stored memory for agents.',
  },
  scanner: {
    title: 'Scanner',
    description: 'Scans of prompts and tool output.',
  },
  openground: {
    title: 'Openground',
    description: 'Compare models on the same prompt.',
  },
  projects: {
    title: 'Projects',
    description: 'Projects in this organisation.',
  },
  profile: {
    title: 'Profile',
    description: 'The signed-in user in this sample.',
  },
  openapi: {
    title: 'OpenAPI',
    description: 'The API this deployment exposes.',
  },
}

export function spendLevel(spent: number, cap: number): SpendLevel {
  if (cap <= 0) return 'ok'
  const percent = (spent / cap) * 100
  if (percent >= 100) return 'limit'
  if (percent >= WARNING_PERCENT) return 'warning'
  return 'ok'
}

export function projectTotals(project: ProjectId | 'all') {
  if (project === 'all') {
    return {
      spend: ORG_SPEND,
      requests: 128420,
      errorRate: 1.8,
      tokens: 86_400_000,
    }
  }
  const match = PROJECTS.find((item) => item.id === project)
  return {
    spend: match?.spend ?? 0,
    requests: match?.requests ?? 0,
    errorRate: match?.errorRate ?? 0,
    tokens: match?.tokens ?? 0,
  }
}

export function initialGrants() {
  const grants: Record<string, boolean> = {}
  for (const role of ROLES) {
    for (const permission of PERMISSIONS) {
      grants[`${role.id}:${permission.id}`] = role.grants.includes(permission.id)
    }
  }
  return grants
}

export function money(value: number) {
  return `$${value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

export function compact(value: number) {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
}

export function matchesQuery(query: string, parts: string[]) {
  const needle = query.trim().toLowerCase()
  if (!needle) return true
  return parts.join(' ').toLowerCase().includes(needle)
}
