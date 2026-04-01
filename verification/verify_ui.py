from playwright.sync_api import sync_playwright
import os

def run_cuj(page):
    # Test Login Page & Password Toggle
    page.goto("http://localhost:3000/pages/login.html")
    page.wait_for_timeout(2000)

    # 1. Verify Password Toggle
    # The registration form is hidden by default. The first toggle should be for the login form.
    # We need to make sure we're clicking the one that's visible.

    password_input = page.locator("#password")
    # Using CSS selector to find the sibling button of the password input
    toggle_btn = page.locator("#password + button")

    password_input.fill("secret123")
    page.wait_for_timeout(500)

    # Click toggle to show
    toggle_btn.click()
    page.wait_for_timeout(1000)
    # Take screenshot of shown password
    page.screenshot(path="/home/jules/verification/screenshots/password_visible.png")

    # Click toggle to hide
    toggle_btn.click()
    page.wait_for_timeout(500)

    # 2. Verify Navigation Standard (Desktop)
    page.set_viewport_size({"width": 1280, "height": 720})
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/nav_desktop.png")

    # 3. Verify Mobile Nav & Backdrop
    page.set_viewport_size({"width": 375, "height": 667})
    page.wait_for_timeout(1000)
    page.get_by_role("button", name="Toggle Menu").click()
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/nav_mobile_open.png")

    # 4. Verify Package Selection A11y (Keyboard)
    page.goto("http://localhost:3000/index.html")
    page.wait_for_timeout(2000)

    # Use click on the game card directly
    page.locator(".game-card").first.click()
    page.wait_for_timeout(1000)

    # Force focus to see the style
    package_item = page.locator(".price-box-mini").first
    package_item.focus()
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/package_focus.png")

if __name__ == "__main__":
    os.makedirs("/home/jules/verification/screenshots", exist_ok=True)
    os.makedirs("/home/jules/verification/videos", exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
