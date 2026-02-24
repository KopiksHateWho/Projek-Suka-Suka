from playwright.sync_api import sync_playwright

def verify_palette():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:3000/index.html")

        # 1. Verify Search Hint
        hint = page.locator('span:has-text("[/]")')
        if hint.is_visible():
            print("✅ Search hint [/] is visible")
        else:
            print("❌ Search hint [/] NOT visible")

        # 2. Verify Search Shortcut
        page.keyboard.press("/")
        # Check if #gameSearch is focused
        is_focused = page.evaluate("document.activeElement.id === 'gameSearch'")
        if is_focused:
            print("✅ Search shortcut '/' focuses the search input")
        else:
            print(f"❌ Search shortcut '/' did NOT focus the search input. Focused element: {page.evaluate('document.activeElement.id')}")

        # 3. Verify Hint Hides on Focus
        page.wait_for_timeout(500)
        # Use XPath or filter to find the element in JS
        opacity = page.evaluate("""() => {
            const spans = Array.from(document.querySelectorAll('span'));
            const hint = spans.find(s => s.textContent === '[/]');
            return hint ? getComputedStyle(hint).opacity : 'null';
        }""")
        if opacity == '0':
             print("✅ Search hint [/] has opacity 0 on focus")
        else:
             print(f"❌ Search hint [/] opacity is {opacity} on focus")

        # 4. Verify Form Labels in index.html
        labels = [
            ("gameIdInput", "ID Game"),
            ("nicknameInput", "Nickname"),
            ("whatsappInput", "WhatsApp"),
            ("reqGameName", "Nama Game"),
            ("reqPlatform", "Platform"),
            ("reqNotes", "Catatan (Optional)")
        ]
        for input_id, text in labels:
            has_for = page.evaluate(f"document.querySelector('label[for=\"{input_id}\"]') !== null")
            if has_for:
                print(f"✅ Label for '{input_id}' exists")
            else:
                print(f"❌ Label for '{input_id}' is MISSING for attribute")

        # 5. Verify pages/login.html labels
        page.goto("http://localhost:3000/pages/login.html")
        login_labels = ["email", "password", "regEmail", "regPassword"]
        for input_id in login_labels:
            has_for = page.evaluate(f"document.querySelector('label[for=\"{input_id}\"]') !== null")
            if has_for:
                print(f"✅ Label for '{input_id}' exists in login.html")
            else:
                print(f"❌ Label for '{input_id}' is MISSING for attribute in login.html")

        # 6. Verify Navigation Cleanup in login.html
        nav_containers = page.locator(".nav-links-container").count()
        if nav_containers == 1:
            print("✅ Only one nav-links-container in login.html")
        else:
            print(f"❌ Found {nav_containers} nav-links-container in login.html")

        # 7. Verify pages/dashboard.html
        page.goto("http://localhost:3000/pages/dashboard.html")
        nav_containers = page.locator(".nav-links-container").count()
        if nav_containers == 1:
            print("✅ Only one nav-links-container in dashboard.html")
        else:
            print(f"❌ Found {nav_containers} nav-links-container in dashboard.html")

        browser.close()

if __name__ == "__main__":
    verify_palette()
