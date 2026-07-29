export type DemoTab =
  | 'observe'
  | 'develop'
  | 'coding-agents'
  | 'improve'
  | 'manage'
  | 'otter'

type DemoPreview =
  | { type: 'image'; src: string; alt: string }
  | { type: 'video'; src: string; alt: string }

export const STATIC_PREVIEWS: Record<DemoTab, DemoPreview> = {
  observe: {
    type: 'video',
    src: 'https://mintlify.s3.us-west-1.amazonaws.com/openlit/images/observe-overview.mp4',
    alt: 'Demo of OpenLIT observability and traces',
  },
  develop: {
    type: 'video',
    src: 'https://mintlify.s3.us-west-1.amazonaws.com/openlit/images/prompts-overview.mp4',
    alt: 'Demo of managing prompts in Prompt Hub',
  },
  'coding-agents': {
    type: 'video',
    src: 'https://mintlify.s3.us-west-1.amazonaws.com/openlit/images/coding-agents-overview.mp4',
    alt: 'Demo of OpenLIT coding agents monitoring',
  },
  improve: {
    type: 'video',
    src: 'https://mintlify.s3.us-west-1.amazonaws.com/openlit/images/evaluations-overview.mp4',
    alt: 'Demo of OpenLIT evaluations',
  },
  manage: {
    type: 'video',
    src: 'https://mintlify.s3.us-west-1.amazonaws.com/openlit/images/secrets-overview.mp4',
    alt: 'Demo of managing secrets in Vault',
  },
  otter: {
    type: 'video',
    src: 'https://mintlify.s3.us-west-1.amazonaws.com/openlit/images/otter-overview.mp4',
    alt: 'Demo of Otter, the OpenLIT AI chat copilot',
  },
}
