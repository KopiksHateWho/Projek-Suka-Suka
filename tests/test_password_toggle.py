import os
from playwright.sync_api import sync_playwright

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Mock SDK and external requests
        page.route("**/_sdk/**", lambda route: route.fulfill(body=""))
        page.route("**/cdn.tailwindcss.com", lambda route: route.fulfill(body=""))

        print("Navigating to login page...")
        page.goto("http://localhost:3000/pages/login.html", wait_until="domcontentloaded")

        def test_toggle(input_id, form_id):
            print(f"Testing {input_id} toggle in {form_id}...")
            # Check initial state
            assert page.eval_on_selector(f"#{input_id}", "el => el.type") == "password"

            # Click toggle (use specific form locator)
            toggle_selector = f"#{form_id} button[aria-label='Show password']"
            page.click(toggle_selector)
            assert page.eval_on_selector(f"#{input_id}", "el => el.type") == "text"

            # Click again
            hide_selector = f"#{form_id} button[aria-label='Hide password']"
            page.click(hide_selector)
            assert page.eval_on_selector(f"#{input_id}", "el => el.type") == "password"
            print(f"✅ {input_id} toggle working")

        test_toggle("password", "loginForm")

        # Switch to register
        page.click("text=Register")
        page.wait_for_selector("#registerForm", state="visible")
        test_toggle("regPassword", "registerForm")

        # Admin Login Modal on index.html
        print("Navigating to home page...")
        page.goto("http://localhost:3000/index.html", wait_until="domcontentloaded")

        # 10 clicks on owner name
        for _ in range(10):
            page.click("#ownerName")

        page.wait_for_selector("#adminLoginModal.show")
        test_toggle("adminPassInput", "adminLoginModal")

        # Screenshots
        os.makedirs("verification", exist_ok=True)
        page.goto("http://localhost:3000/pages/login.html", wait_until="domcontentloaded")
        page.type("#password", "secret123")
        page.click("#loginForm button[aria-label='Show password']")
        page.screenshot(path="verification/login_toggle_final.png")

        page.goto("http://localhost:3000/index.html", wait_until="domcontentloaded")
        for _ in range(10): page.click("#ownerName")
        page.wait_for_selector("#adminLoginModal.show")
        page.type("#adminPassInput", "admin123")
        page.click("#adminLoginModal button[aria-label='Show password']")
        page.screenshot(path="verification/admin_toggle_final.png")

        browser.close()

if __name__ == "__main__":
    run_verification()
