# Palette's UX Journal

## 2025-05-15 - [Destructive Cleanup]
**Learning:** Cleaning up debris like merge conflict markers in a "quick fix" can accidentally delete important media queries if not careful. Always verify responsive behavior after purging "dead" code.
**Action:** Use a side-by-side diff or visual regression tool when doing bulk cleanup of navigation components.

## 2026-05-17 - [Accessible Label Language Consistency]
**Learning:** In projects with localized content, mixing languages in `aria-label` attributes (e.g., "Tutup Modal" vs "Close Modal") creates an inconsistent experience for screen reader users. Standardizing on English for UI controls is a safer default for global accessibility.
**Action:** Audit all interactive elements for label language consistency during UX polish phases.

## 2026-05-17 - [Attribute-Safe XSS Protection]
**Learning:** Using `textContent` as a quick XSS filter is unsafe if the escaped string is subsequently used within an HTML attribute (like `aria-label`). A regex-based replacement that includes quotes (`"` and `'`) is necessary to prevent attribute injection.
**Action:** Always use a robust escaping utility that handles both bracket and quote characters for dynamic attribute values.
