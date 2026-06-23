# Palette's Journal - Critical UX/Accessibility Learnings

## 2025-05-15 - [Deep Linking for Modal Navigation]
**Learning:** In multi-page applications where interactive features (History, Request Modal) are implemented as modals on the home page, sub-pages often end up with "dead-end" navigation links if they simply try to trigger the same modals.
**Action:** Implement a routing proxy (like `openHistory()`) that checks the current path. If on a sub-page, it should redirect to the home page with a URL hash (e.g., `index.html#history`). Use a `hashchange` listener on the home page to automatically trigger the modal upon landing.

## 2025-05-15 - [Consistency in Accessibility Labels]
**Learning:** Mixed-language ARIA labels (e.g., "Tutup Modal" in an English-centric UI) create a jarring experience for screen reader users and indicate a lack of polish.
**Action:** Standardize all `aria-label` and `title` attributes to English to match the primary UI language and ensure consistent accessibility across all components.

## 2025-05-15 - [Template Sanitization and Visual Artifacts]
**Learning:** Residual git conflict markers (`<<<<<<<`, `=======`) in HTML templates can lead to broken DOM structures and visible "ghost" text that degrades the professional feel of the UI.
**Action:** Always perform a full-text search for conflict markers before finalizing a UI change, especially when working with shared templates like navigation bars. Use visual regression testing (Playwright screenshots) to catch layout regressions caused by malformed HTML.
