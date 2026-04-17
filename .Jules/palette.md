## 2026-04-17 - Password Visibility and Navigation Cleanup
**Learning:** In a multi-page vanilla HTML/JS application, centralizing accessibility and UI utility logic (like password toggles and keyboard listeners) in a globally shared script (e.g., `auth.js`) is more resilient than page-specific scripts. This ensures consistent behavior and reduces maintenance overhead when components are reused across different page contexts (Login, Admin, etc.).
**Action:** Always verify global availability of UI helpers across all entry points and prioritize shared utilities over duplicating logic in sub-page `<script>` blocks.

**Learning:** When using Playwright for visual verification in a sandbox, multiple elements with the same text (e.g., "Register" as a button and as a link) require precise locators like `page.get_by_role("link", name="Register")` to avoid ambiguity and test failures.
**Action:** Use role-based selectors and strict locators in verification scripts to mirror accessibility-best-practices and ensure test robustness.
