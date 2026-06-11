from playwright.sync_api import sync_playwright
import time
import subprocess

def run():
    # Start server
    server = subprocess.Popen(["python3", "-m", "http.server", "3000"])
    time.sleep(2)

    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            # Use a mobile viewport
            context = browser.new_context(viewport={'width': 375, 'height': 667})
            page = context.new_page()

            # Navigate to the login page
            page.goto("http://localhost:3000/pages/login.html")

            # Click the hamburger menu
            page.click('button[aria-label="Toggle Menu"]')
            print("👆 Clicked hamburger menu on login page")

            # Wait for the menu to open
            page.wait_for_timeout(1000)

            # Check if backdrop is active
            backdrop = page.locator('#nav-backdrop.active')
            if backdrop.is_visible():
                print("✅ Backdrop is visible on login page")
            else:
                print("❌ Backdrop is NOT visible on login page")

            # Click on the left side of the screen (backdrop area)
            # Menu is 75% wide on the right, so 0-25% is backdrop.
            # 375 * 0.1 = 37.5px
            page.mouse.click(20, 300)
            print("👆 Clicked left side of the screen (backdrop area)")
            page.wait_for_timeout(1000)

            # Check if menu is closed
            menu = page.locator('.nav-links-container')
            is_active = menu.evaluate("el => el.classList.contains('active')")
            if not is_active:
                print("✅ Menu closed successfully after clicking backdrop area")
            else:
                print("❌ Menu is still active after clicking backdrop area")

            browser.close()
    finally:
        server.terminate()

if __name__ == "__main__":
    run()
