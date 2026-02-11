from playwright.sync_api import sync_playwright

def verify_step6():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Mobile context
        context = browser.new_context(
            viewport={'width': 360, 'height': 800},
            is_mobile=True,
            has_touch=True
        )
        page = context.new_page()

        # Homepage
        page.goto("http://localhost:3000/index.html")
        page.wait_for_load_state("networkidle")
        page.screenshot(path="verification/homepage_mobile.png")

        # Open Menu
        page.click('button[aria-label="Toggle Menu"]')
        page.wait_for_timeout(500)
        page.screenshot(path="verification/mobile_menu_open.png")

        # Admin Login
        page.goto("http://localhost:3000/pages/admin.html")
        page.wait_for_load_state("networkidle")
        page.screenshot(path="verification/admin_login.png")

        page.fill('#adminUser', 'admin')
        page.fill('#adminPass', 'admin123')
        page.click('button[type="submit"]')
        page.wait_for_timeout(1000) # Wait for login transition
        page.screenshot(path="verification/admin_dashboard_mobile.png")

        # Open Sidebar on Admin
        page.click('button:has-text("☰")')
        page.wait_for_timeout(500)
        page.screenshot(path="verification/admin_sidebar_open.png")

        # Click Game List
        page.click('text=Game List')
        page.wait_for_timeout(500)
        page.screenshot(path="verification/admin_games_mobile.png")

        browser.close()

if __name__ == "__main__":
    verify_step6()
