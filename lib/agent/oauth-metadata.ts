import { scopeMap, scopeNames } from './scopes'

const ISSUER = 'https://openlit.io'
const DOCS = 'https://docs.openlit.io/latest/openlit/developer-resources/api-reference/introduction'

/** RFC 8414 OAuth 2.0 Authorization Server Metadata. */
export function authorizationServerMetadata() {
  return {
    issuer: ISSUER,
    authorization_endpoint: `${ISSUER}/oauth/authorize`,
    token_endpoint: `${ISSUER}/oauth/token`,
    scopes_supported: scopeNames(),
    response_types_supported: ['code'],
    grant_types_supported: ['authorization_code', 'client_credentials'],
    code_challenge_methods_supported: ['S256'],
    token_endpoint_auth_methods_supported: ['none', 'client_secret_basic'],
    service_documentation: DOCS,
    scopes_documentation: `${ISSUER}/openapi.json`,
  }
}

/**
 * RFC 9728 OAuth 2.0 Protected Resource Metadata.
 * The resource identifier is the site origin, so this document is served at
 * `/.well-known/oauth-protected-resource`.
 */
export function protectedResourceMetadata() {
  return {
    resource: ISSUER,
    authorization_servers: [ISSUER],
    scopes_supported: scopeNames(),
    bearer_methods_supported: ['header'],
    resource_documentation: `${ISSUER}/openapi.json`,
    scopes: scopeMap(),
  }
}
