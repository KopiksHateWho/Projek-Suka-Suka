from playwright.sync_api import sync_playwright
import time
import os

def verify_password_toggle():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Start server
        os.system("python3 -m http.server 3000 &")
        time.sleep(2)

        try:
            print("Testing Login Page Password Toggle...")
            page.goto("http://localhost:3000/pages/login.html")

            password_input = page.locator("#password")
            toggle_btn = page.locator("#loginForm .password-toggle")

            print(f"Initial type: {password_input.get_attribute('type')}")
            if password_input.get_attribute("type") != "password":
                raise Exception("Initial type should be password")

            toggle_btn.click()
            print(f"After click type: {password_input.get_attribute('type')}")
            if password_input.get_attribute("type") != "text":
                raise Exception("Type should be text after click")

            if toggle_btn.inner_text() != "👁️":
                raise Exception("Icon should be 👁️")

            toggle_btn.click()
            print(f"After second click type: {password_input.get_attribute('type')}")
            if password_input.get_attribute("type") != "password":
                raise Exception("Type should be password after second click")

            # Check Admin Modal in index.html
            print("Testing Admin Login Password Toggle...")
            page.goto("http://localhost:3000/index.html")

            # Trigger admin modal (click owner name 10 times)
            owner_name = page.locator("#ownerName")
            for _ in range(10):
                owner_name.click()

            admin_input = page.locator("#adminPassInput")
            admin_toggle = page.locator("#adminLoginModal .password-toggle")

            page.wait_for_selector("#adminLoginModal.show")

            print(f"Admin Initial type: {admin_input.get_attribute('type')}")
            admin_toggle.click()
            print(f"Admin After click type: {admin_input.get_attribute('type')}")
            if admin_input.get_attribute("type") != "text":
                raise Exception("Admin password type should be text after click")

            print("✅ Password visibility toggles verified successfully!")

        finally:
            browser.close()
            os.system("kill $(lsof -t -i :3000) 2>/dev/null || true")

if __name__ == "__main__":
    verify_password_toggle()
