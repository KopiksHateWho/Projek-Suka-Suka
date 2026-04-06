from playwright.sync_api import sync_playwright, expect
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 720})
        page = context.new_page()

        # Helper to take screenshot
        def snap(name):
            page.screenshot(path=f"verification/{name}.png")

        # Test Dashboard Navigation
        print("Testing Dashboard Navigation...")
        page.goto("http://localhost:3000/pages/dashboard.html")
        # Since we might not be logged in, it might redirect to login.html.
        # But for UI structure check, it's fine if it redirects or if we mock the user.
        # Let's mock the user in localStorage
        page.evaluate("localStorage.setItem('ks_current_user', JSON.stringify({email: 'test@example.com'}))")
        page.reload()

        snap("dashboard_nav_verified")

        # Test Toast for History
        history_link = page.get_by_role("link", name="📋 HISTORY")
        history_link.click()
        # Expect toast to appear
        expect(page.locator(".toast")).to_be_visible()
        expect(page.locator(".toast")).to_have_text("This feature is only available on the Home page")
        snap("dashboard_toast_verified")

        # Test Admin Navigation
        print("Testing Admin Navigation...")
        page.goto("http://localhost:3000/pages/admin.html")
        snap("admin_nav_verified")

        request_link = page.get_by_role("link", name="💡 REQUEST GAME")
        request_link.click()
        expect(page.locator(".toast")).to_be_visible()
        snap("admin_toast_verified")

        browser.close()

if __name__ == "__main__":
    # Start server if not running
    import subprocess
    import time

    server = subprocess.Popen(["python3", "-m", "http.server", "3000"])
    time.sleep(2) # Wait for server
    try:
        run()
    finally:
        server.terminate()
