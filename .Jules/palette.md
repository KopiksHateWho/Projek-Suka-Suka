## 2026-03-09 - Global Accessibility Listeners in Multi-Page Apps
**Learning:** In a vanilla JS multi-page application, global event listeners (like keyboard accessibility for `role="button"`) should be placed in a shared script (e.g., `auth.js`) that is loaded on every page. This prevents "accessibility regression" where subpages lose interactivity that exists on the homepage.
**Action:** Always identify a shared initialization script for global accessibility enhancements.

## 2026-03-09 - ARIA Label Masking
**Learning:** Using `aria-label="Owner Name"` on an element containing "Dio Rezky Maulana" causes screen readers to announce "Owner Name" instead of the person's name.
**Action:** Use descriptive labels that include the data, such as `aria-label="Owner: Dio Rezky Maulana"`, or use `aria-labelledby` if the label text exists elsewhere.

## 2026-03-09 - Conflict Marker Hygiene
**Learning:** Git conflict markers left in the code can be rendered as visible text in the UI, severely damaging trust and professionalism.
**Action:** Proactively scan for `<<<<<<<`, `=======`, and `>>>>>>>` after any merge or complex fix, even if the build passes.
