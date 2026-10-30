export type HarnessStage = {
  label: string
  phase: 'develop' | 'produce'
  items: string[]
  video?: string
  icon?: string
}

export const HARNESS_PHASES: { id: HarnessStage['phase']; title: string }[] = [
  { id: 'develop', title: 'Development' },
  { id: 'produce', title: 'Production' },
]

export const HARNESS_STAGES: HarnessStage[] = [
  {
    label: 'Instrument',
    phase: 'develop',
    items: ['No-code instrumentation', 'GPU Collector', 'OTel Native SDKs'],
    video: 'https://mintlify.s3.us-west-1.amazonaws.com/openlit/images/observe-overview.mp4',
    icon: '/static/images/integrations/opentelemetry.svg',
  },
  {
    label: 'Develop',
    phase: 'develop',
    items: ['Prompt Hub', 'Openground'],
    video: 'https://mintlify.s3.us-west-1.amazonaws.com/openlit/images/prompts-overview.mp4',
  },
  {
    label: 'Manage',
    phase: 'develop',
    items: ['Vault', 'API Keys'],
    video: 'https://mintlify.s3.us-west-1.amazonaws.com/openlit/images/secrets-overview.mp4',
  },
  {
    label: 'Observe',
    phase: 'produce',
    items: ['Coding Agents', 'Cost', 'Tools'],
    video: 'https://mintlify.s3.us-west-1.amazonaws.com/openlit/images/observe-overview.mp4',
  },
  {
    label: 'Improve',
    phase: 'produce',
    items: ['Evals', 'Guardrails', 'Otter'],
    video: 'https://mintlify.s3.us-west-1.amazonaws.com/openlit/images/evaluations-overview.mp4',
  },
]

export function harnessStagesMarkdown() {
  return HARNESS_PHASES.map((phase) => {
    const stages = HARNESS_STAGES.filter((stage) => stage.phase === phase.id)
      .map((stage) => `- **${stage.label}.** ${stage.items.join(', ')}.`)
      .join('\n')
    return `### ${phase.title}\n\n${stages}`
  }).join('\n\n')
}
