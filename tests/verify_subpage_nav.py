from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 375, 'height': 667})
        page = context.new_page()

        # Test login page mobile nav
        try:
            page.goto("http://localhost:3000/pages/login.html")
            print("✅ Navigated to Login Page")

            page.wait_for_selector('button[aria-label="Toggle Menu"]')
            page.click('button[aria-label="Toggle Menu"]')
            page.wait_for_timeout(500)

            overlay = page.locator('#nav-backdrop.active')
            if overlay.is_visible():
                print("✅ Login Page: Backdrop is visible")
            else:
                print("❌ Login Page: Backdrop is NOT visible")

            page.screenshot(path="tests/login_mobile_menu.png")

            # Click backdrop to close - use force to ignore interception since we're testing the backdrop's clickability
            page.click('#nav-backdrop', force=True)
            page.wait_for_timeout(500)
            if not overlay.is_visible():
                print("✅ Login Page: Backdrop closed on click")
            else:
                print("❌ Login Page: Backdrop still visible after click")

        except Exception as e:
            print(f"❌ Login Page Test Error: {e}")

        browser.close()

if __name__ == "__main__":
    run()
