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

## 2026-05-22 - Shortcut Discoverability & Robust Modal Logic
**Learning:** Keyboard shortcuts like '/' significantly improve speed for power users, but they must be discoverable via visual hints (e.g., `[/]`) and protected from accidental triggering (e.g., checking for modifier keys like Ctrl/Cmd). Furthermore, global UI functions should be explicitly attached to `window` and include fallbacks (like triggering a WhatsApp redirect if a specific modal element is missing) to ensure site-wide reliability across different page structures.
**Action:** Always pair keyboard shortcuts with a subtle visual cue. When implementing global UI handlers, use a "Robustness Pattern" that checks for element existence before attempting modal operations, falling back to a default action to prevent broken links.
