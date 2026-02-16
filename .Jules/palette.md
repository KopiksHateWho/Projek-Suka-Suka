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

## 2024-05-18 - Visual Feedback & Layout Stability
**Learning:** Adding visual indicators (like checkmarks) to selected states improves clarity. However, to prevent "layout jumps" when switching states, ensure the base element and the selected state share the same layout model (e.g., both use flexbox) so that the addition of the indicator doesn't shift other content.
**Action:** Use `display: flex` and `justify-content: space-between` for both base and selected states of interactive buttons that will contain dynamic indicators.

## 2024-05-18 - Keyboard Listeners in Vanilla JS
**Learning:** When using `role="button"` and `tabindex="0"` for accessibility in vanilla JS, a centralized global keyboard listener (Enter/Space) is more maintainable than adding listeners to every individual element. Ensure this listener is initialized early in the app lifecycle.
**Action:** Implement a global `keydown` listener that checks for `role="button"` and triggers `.click()` for Enter and Space keys.
