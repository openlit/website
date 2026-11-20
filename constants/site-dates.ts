/**
 * Date the homepage copy was last reviewed. Feeds the homepage WebPage
 * `dateModified`, the visible "Updated" line, and the sitemap lastmod.
 * Bump it only when homepage content actually changes.
 */
export const HOME_UPDATED = '2026-11-20'

/** Last real content change to data/comparisons.ts (the /compare/* pages). */
export const COMPARE_UPDATED = '2026-10-01'

/** Last real content change to data/glossary.ts (the /glossary/* pages). */
export const GLOSSARY_UPDATED = '2026-11-20'

/** "2026-11-20" -> "November 20, 2026", timezone-stable. */
export function formatSiteDate(value: string) {
  return new Date(`${value}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
