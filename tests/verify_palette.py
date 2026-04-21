import time
import subprocess
from playwright.sync_api import sync_playwright, expect

def run_verification():
    # Start server
    server = subprocess.Popen(["python3", "-m", "http.server", "3000"])
    time.sleep(2)  # Wait for server to start

    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()

            # 1. Verify Home Page Navigation & Admin Toggle
            print("Verifying Home Page...")
            page.goto("http://localhost:3000/index.html")

            expect(page.locator("#navLinks")).to_contain_text("🏠 HOME")

            footer_owner = page.locator("#ownerName")
            footer_owner.scroll_into_view_if_needed()
            for _ in range(10):
                footer_owner.click()

            expect(page.locator("#adminLoginModal")).to_be_visible()

            admin_pass = page.locator("#adminPassInput")
            toggle_btn = page.locator("#adminLoginModal .relative button")

            expect(admin_pass).to_have_attribute("type", "password")
            toggle_btn.click()
            expect(admin_pass).to_have_attribute("type", "text")

            page.screenshot(path="verification/admin_toggle.png")
            page.locator("#adminLoginModal .close-modal").click()

            # 2. Verify Login Page Navigation & Toggles
            print("Verifying Login Page...")
            page.goto("http://localhost:3000/pages/login.html")

            expect(page.locator("#navLinks")).to_contain_text("🏠 HOME")

            login_pass = page.locator("#password")
            login_toggle = page.locator("#loginForm .relative button")

            expect(login_pass).to_have_attribute("type", "password")
            login_toggle.click()
            expect(login_pass).to_have_attribute("type", "text")

            # Switch to Register
            page.get_by_role("link", name="Register").click()
            expect(page.locator("#registerForm")).to_be_visible()

            reg_pass = page.locator("#regPassword")
            reg_toggle = page.locator("#registerForm .relative button")

            expect(reg_pass).to_have_attribute("type", "password")
            reg_toggle.click()
            expect(reg_pass).to_have_attribute("type", "text")

            page.screenshot(path="verification/login_register_toggles.png")

            # 3. Verify Dashboard Navigation
            print("Verifying Dashboard...")
            page.evaluate("localStorage.setItem('ks_current_user', JSON.stringify({email: 'test@example.com'}))")
            page.goto("http://localhost:3000/pages/dashboard.html")

            expect(page.locator("#navLinks")).to_contain_text("🏠 HOME")

            page.screenshot(path="verification/dashboard_nav.png")

            print("Verification successful!")
            browser.close()
    finally:
        server.terminate()

if __name__ == "__main__":
    import os
    if not os.path.exists("verification"):
        os.makedirs("verification")
    run_verification()
