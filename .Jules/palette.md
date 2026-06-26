## 2024-11-20 - Sub-page Navigation & Mobile UX
**Learning:** In a multi-page vanilla JS application, inconsistent relative paths and lack of shared navigation proxies can break features (like modals) when accessed from sub-pages. Corrupted HTML from merge conflicts (e.g., "fix-navigation-regression") is a high-risk factor for DOM breakage.
**Action:** Centralize navigation logic into global proxies in `auth.js` that handle redirection to `index.html#hash` if needed. Always include `nav-backdrop` in all templates to ensure mobile menu functionality is consistent.

## 2024-11-20 - Password Visibility Pattern
**Learning:** To ensure vertical centering and layout stability, password visibility toggle buttons (absolute-positioned) must be wrapped in a dedicated `relative` container that excludes labels. Including labels in the same container breaks the `-translate-y-1/2` alignment.
**Action:** Use a `<div class="relative"><input...><button...></div>` structure for all password fields.

## 2024-11-20 - Deep Linking Micro-UX
**Learning:** Users returning from sub-pages expect interactive states (like modals) to persist or trigger based on intent. URL hashes are an effective, lightweight way to handle this in vanilla JS.
**Action:** Implement a `handleDeepLink` function triggered on `window.onload` and `hashchange` to automatically open relevant modals.

## 2024-11-20 - EscapeHTML Standardization
**Learning:** To maintain a consistent security posture while allowing for flexible UI updates, use a global `escapeHTML` utility with `innerHTML` rather than `textContent` for dynamic content. This allows for a single, auditable sanitization point.
**Action:** Use `esc()` (from `window.escapeHTML`) for all template literal injections in `app.js`.
