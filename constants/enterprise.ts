export type EnterpriseFeature = {
  id: string
  name: string
  summary: string
  points: string[]
  docsHref?: string
}

export type EnterpriseFaqItem = {
  question: string
  answer: string
}

export const ENTERPRISE_URL = 'https://openlit.io/enterprise'
export const ENTERPRISE_CONTACT_HREF =
  'mailto:contact@openlit.io?subject=OpenLIT%20Enterprise%20Edition'

export const ENTERPRISE_SEO = {
  title: 'OpenLIT Enterprise Edition: RBAC, Audit Logs, Alerts & More',
  description:
    'OpenLIT Enterprise Edition adds RBAC, scoped API keys, audit logs, alerting, premium connectors, GPU cost insights, and the eBPF controller to the self-hosted agent harness engineering platform.',
  keywords: [
    'OpenLIT Enterprise',
    'OpenLIT Enterprise Edition',
    'enterprise LLM observability',
    'self-hosted AI observability enterprise',
    'LLM observability RBAC',
    'AI observability audit logs',
    'LLM alerting',
    'eBPF LLM instrumentation',
    'GPU cost monitoring',
    'enterprise agent harness engineering',
  ],
} as const

export const ENTERPRISE_FEATURES: EnterpriseFeature[] = [
  {
    id: 'rbac',
    name: 'Role-based access control',
    summary:
      'Custom role groups and fine-grained permissions per organisation, enforced in the UI and on the server.',
    points: [
      'Dedicated Roles page for custom role groups',
      'Direct per-user permission overrides',
      'View, create, update, delete, and operate permissions per resource',
      'Built-in Admin and Member roles keep working as before',
    ],
  },
  {
    id: 'api-key-access',
    name: 'Scoped API keys',
    summary: 'Restrict each API key to the features it needs instead of granting full access.',
    points: [
      'Full-access or restricted keys, set at creation or edited later',
      'Scope keys to features such as telemetry ingestion',
      'Access changes recorded in the audit log and alert triggers',
    ],
  },
  {
    id: 'audit-logs',
    name: 'Audit logs',
    summary: 'An organisation and project audit trail for privileged and sensitive operations.',
    points: [
      'Role, permission, and license changes',
      'Connector create, update, delete, test, bind, and unbind events',
      'API key creation and access updates',
      'Trace governance report views and evidence exports (metadata only)',
    ],
  },
  {
    id: 'alerts',
    name: 'Alerts',
    summary: 'Rule-driven alerting on your AI telemetry with reusable notification providers.',
    points: [
      'Define alert rules once and route them to shared providers',
      'Trigger on platform events such as API key access changes',
      'Deliver to Slack, email, webhooks, Discord, PagerDuty, and Opsgenie',
    ],
  },
  {
    id: 'connectors',
    name: 'Premium connectors',
    summary:
      'Paid observability backends and notification destinations, managed as OpenLIT connectors.',
    points: [
      'Datasources: query traces, logs, and metrics from Datadog and New Relic',
      'Notifications: Slack, email, custom HTTPS webhooks, Discord, PagerDuty, Opsgenie',
      'Same connector permissions and audit trail as built-in connectors',
    ],
    docsHref: 'https://docs.openlit.io/latest/openlit/connectors/overview',
  },
  {
    id: 'gpu',
    name: 'GPU observability and cost',
    summary: 'A dedicated GPUs view for utilization, health, and spend across your fleet.',
    points: [
      'Utilization, temperature, power, and error time series',
      'Per-SKU GPU spend with configurable hourly rates',
      'Fleet, workload, and error breakdowns with Otter insights',
    ],
  },
  {
    id: 'ebpf-controller',
    name: 'eBPF controller',
    summary: 'Zero-code instrumentation for any language. No SDK and no application changes.',
    points: [
      'Kubernetes, Docker, and Linux',
      'Installs with the OpenLIT Helm chart',
      'Sends OpenTelemetry traces into the same OpenLIT stack',
    ],
  },
]

export const ENTERPRISE_FAQ_ITEMS: EnterpriseFaqItem[] = [
  {
    question: 'What is OpenLIT Enterprise Edition?',
    answer:
      'OpenLIT Enterprise Edition is the self-hosted OpenLIT platform with licensed features for teams running AI agents in production: role-based access control, scoped API keys, audit logs, alerting, premium connectors, GPU cost insights, and the eBPF controller.',
  },
  {
    question: 'How is Enterprise Edition different from OpenLIT OSS?',
    answer:
      'Enterprise Edition includes everything in OpenLIT OSS, including tracing, evaluations, guardrails, Prompt Hub, Vault, OpenGround, and dashboards, plus the enterprise features listed on this page. OSS stays free under Apache 2.0.',
  },
  {
    question: 'Is OpenLIT Enterprise Edition self-hosted?',
    answer:
      'Yes. Enterprise Edition runs on your own infrastructure, so telemetry, prompts, and secrets stay in your environment. Features are unlocked with a signed license for your organisation.',
  },
  {
    question: 'What happens to existing roles and API keys when I upgrade?',
    answer:
      'They keep working. Built-in Admin and Member roles continue as before, and existing API keys keep full access until you restrict them.',
  },
  {
    question: 'How much does OpenLIT Enterprise Edition cost?',
    answer:
      'Enterprise pricing depends on your deployment. Email contact@openlit.io to talk to the OpenLIT team about licensing for your organisation.',
  },
]
