from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Test Password Toggle
        try:
            page.goto("http://localhost:3000/pages/login.html")
            print("✅ Navigated to Login page")

            # Target the one in loginForm
            password_input = page.locator("#loginForm #password")
            toggle_btn = page.locator("#loginForm button[aria-label='Show password']")

            # Type something
            password_input.fill("secret123")
            print(f"Typed password, type is: {password_input.get_attribute('type')}")

            # Click toggle
            toggle_btn.click()
            time.sleep(0.5)
            print(f"Clicked toggle, type is now: {password_input.get_attribute('type')}")

            if password_input.get_attribute('type') == 'text':
                print("✅ Password toggle worked (password to text)")
            else:
                print("❌ Password toggle FAILED (not text)")

            # Click again (aria-label changes to 'Hide password')
            page.locator("#loginForm button[aria-label='Hide password']").click()
            time.sleep(0.5)
            if password_input.get_attribute('type') == 'password':
                print("✅ Password toggle worked (text to password)")
            else:
                print("❌ Password toggle FAILED (not password)")

        except Exception as e:
            print(f"❌ Error testing password toggle: {e}")

        # 2. Test Deep Linking
        try:
            print("\nTesting Deep Linking...")
            # Navigate to HISTORY from dashboard (which redirects to index.html#history)
            page.goto("http://localhost:3000/pages/dashboard.html")
            # Wait for auth links to render
            page.wait_for_selector("#auth-links a")

            # Click HISTORY in nav
            page.click("text=📋 HISTORY")

            # Should be on index.html and modal should be visible
            page.wait_for_selector("#historyModal.show", timeout=5000)
            if page.is_visible("#historyModal") and "index.html" in page.url and "#history" in page.url:
                print("✅ Deep linking to #history worked")
            else:
                print(f"❌ Deep linking to #history FAILED. URL: {page.url}")

        except Exception as e:
            print(f"❌ Error testing deep linking: {e}")

        # 3. Test Admin Login Entrapment (Close Button)
        try:
            print("\nTesting Admin Login Close Button...")
            page.goto("http://localhost:3000/index.html")
            # Trigger admin login via footer click (or just open it via script)
            page.evaluate("window.openModal('adminLoginModal')")
            page.wait_for_selector("#adminLoginModal.show")

            close_btn = page.locator("#adminLoginModal .close-modal")
            if close_btn.is_visible():
                print("✅ Admin Login close button is visible")
                close_btn.click()
                time.sleep(0.5)
                if not page.is_visible("#adminLoginModal.show"):
                    print("✅ Admin Login modal closed via close button")
                else:
                    print("❌ Admin Login modal failed to close")
            else:
                print("❌ Admin Login close button NOT found")
        except Exception as e:
            print(f"❌ Error testing admin login close: {e}")

        browser.close()

if __name__ == "__main__":
    run()
