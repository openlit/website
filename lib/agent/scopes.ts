/**
 * Feature scopes from the OpenLIT API key access model.
 * Community keys may call every API-key endpoint. Enterprise keys can be
 * limited to a subset of these names.
 * https://docs.openlit.io/latest/openlit/developer-resources/api-reference/introduction
 */
export const API_SCOPES = [
  {
    name: 'ingest',
    description: 'Submit OTLP traces, metrics, and logs to a self-hosted OpenLIT receiver.',
  },
  {
    name: 'telemetry',
    description: 'Read traces, metrics, logs, exceptions, and span hierarchies.',
  },
  {
    name: 'prompts',
    description: 'Read and manage Prompt Hub prompts.',
  },
  {
    name: 'vault',
    description: 'Read Vault secrets granted to this credential.',
  },
  {
    name: 'rule_engine',
    description: 'Read and manage guardrail and automation rules.',
  },
  {
    name: 'evaluation',
    description: 'Run and read agent and LLM evaluations.',
  },
  {
    name: 'chat',
    description: 'Use Ask Otter conversations, widgets, and SQL.',
  },
  {
    name: 'controller',
    description: 'Manage the eBPF controller and zero-code instrumentation.',
  },
  {
    name: 'db_config',
    description: 'Read database connector configuration for the active project.',
  },
] as const

export type ApiScopeName = (typeof API_SCOPES)[number]['name']

export function scopeMap(): Record<string, string> {
  return Object.fromEntries(API_SCOPES.map((scope) => [scope.name, scope.description]))
}

export function scopeNames(): string[] {
  return API_SCOPES.map((scope) => scope.name)
}
