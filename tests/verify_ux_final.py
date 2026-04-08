from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1280, 'height': 800})

        # 1. Verify Login Page ARIA Labels
        try:
            page.goto("http://localhost:3000/pages/login.html")
            print("✅ Navigated to Login Page")

            # Check password toggle labels
            show_btn = page.locator('button[aria-label="Show password"]').first
            if show_btn.is_visible():
                print("✅ Found 'Show password' ARIA label")
            else:
                # If already toggled for some reason
                hide_btn = page.locator('button[aria-label="Hide password"]').first
                if hide_btn.is_visible():
                    print("✅ Found 'Hide password' ARIA label")
                else:
                    print("❌ Password toggle ARIA label is incorrect or missing")

            page.screenshot(path="tests/login_ux_verify.png")
        except Exception as e:
            print(f"❌ Error verifying Login UX: {e}")

        # 2. Verify Admin Panel Branding and Links
        try:
            page.goto("http://localhost:3000/pages/admin.html")
            print("✅ Navigated to Admin Page")

            # Check Branding
            logo_text = page.locator('.logo-text').text_content()
            if logo_text == "Admin Panel":
                print(f"✅ Logo text correctly restored to: {logo_text}")
            else:
                print(f"❌ Logo text is: {logo_text}")

            # Check Request Game Link
            req_link = page.locator('a:has-text("REQUEST GAME")')
            onclick = req_link.get_attribute('onclick')
            if onclick and 'window.requestGame()' in onclick:
                print(f"✅ 'REQUEST GAME' link has correct onclick: {onclick}")
            else:
                print(f"❌ 'REQUEST GAME' link missing onclick or incorrect: {onclick}")

            # Check History Link
            hist_link = page.locator('a:has-text("HISTORY")')
            hist_onclick = hist_link.get_attribute('onclick')
            if hist_onclick and 'window.openHistory()' in hist_onclick:
                print(f"✅ 'HISTORY' link has correct onclick: {hist_onclick}")

            page.screenshot(path="tests/admin_ux_verify.png")
        except Exception as e:
            print(f"❌ Error verifying Admin UX: {e}")

        browser.close()

if __name__ == "__main__":
    run()
