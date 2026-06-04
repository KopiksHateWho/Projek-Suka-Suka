## 2025-05-14 - Retrofitting Accessibility in Vanilla JS/HTML
**Learning:** In projects without a framework or semantic HTML for interactive elements (using divs as buttons), a global keyboard listener combined with static ARIA roles/tabindex is a clean way to ensure accessibility without breaking custom CSS layouts.
**Action:** Always check if interactive elements are semantically correct (e.g., <button> or <a>). If not, add role="button", tabindex="0", and a keyboard listener for Enter/Space. Match :focus-visible styles with :hover effects for visual consistency.
 palette/search-enhancement-and-cleanup-4472390093947769525

## 2025-05-15 - Search Feedback & Nav Consistency
**Learning:** In multi-page vanilla JS applications, "dead-end" states (empty search results) and placeholder-corrupted navigation are major UX blockers. Restoring navigation consistency across all entry points is a prerequisite for any meaningful UX polish.
**Action:** Audit search functionality for empty states. Use a dedicated hidden element with a call-to-action (like "Request Game") to guide users when no results match. Ensure navigation components are identical across all HTML files if a shared template engine is absent.

## 2026-02-12 - Actionable Empty States & Search Polish
**Learning:** Preventing UX "dead-ends" by providing clear actions (like "Clear Search" or "Request Item") in empty states significantly improves user retention and satisfaction. Additionally, a "Clear" button in search inputs is a small but high-impact convenience that users expect.
**Action:** When implementing search or filters, always include a visual clear button and an actionable empty state. Ensure that clearing search also resets any related UI states (like "No results" messages).

## 2026-02-21 - Destructive Cleanup & CSS Regression
**Learning:** When cleaning up Git conflict markers or branch-related labels, it's crucial to identify which code belongs to which branch and ensure that essential structure (like @media queries) is not accidentally removed. A broken media query can make mobile-only styles global, ruining the desktop UX.
**Action:** Always verify brace balance and media query integrity after a multi-line cleanup. Use specific Playwright tests to check that mobile-specific styles do not "leak" into the desktop view.

## 2026-05-20 - Global Proxies & Cross-Page Navigation
**Learning:** When using modals for core features (like History or Request Game), sub-pages must use proxy functions that handle the context. If the user is on a sub-page, the proxy should redirect to the home page with a hash (e.g., `index.html#history`), which the home page then consumes to open the modal. This maintains feature parity across the app without duplicating modal code.
**Action:** Centralize UI interaction logic in global proxies. Ensure these proxies are aware of `window.location` and handle redirection vs. direct modal opening correctly. Always use the `window.` prefix for these global handlers to ensure consistency and visibility.
