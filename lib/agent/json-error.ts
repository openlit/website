export type ApiErrorBody = {
  error: {
    code: string
    message: string
    hint: string
  }
}

export function apiError(code: string, message: string, hint: string): ApiErrorBody {
  return {
    error: {
      code,
      message,
      hint,
    },
  }
}

export const JSON_ERROR_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
  'X-Robots-Tag': 'noindex',
} as const

export const OPENAPI_HINT =
  'See https://openlit.io/openapi.json for operations, scopes, and schemas.'
