from playwright.sync_api import sync_playwright
import os

def run_cuj_password_toggle(page):
    # Set window size
    page.set_viewport_size({"width": 1280, "height": 800})
    page.goto("http://localhost:3000/pages/login.html")
    page.wait_for_timeout(1000)

    # 1. Fill password
    password_input = page.locator("#password")
    password_input.fill("secret_password")
    page.wait_for_timeout(500)

    # 2. Toggle visibility (Login form)
    # Use a very specific locator and force click because of broken nav overlay
    toggle_btn = page.locator("#loginForm button").filter(has_text="👁️")
    toggle_btn.click(force=True)
    page.wait_for_timeout(1000)

    # Check if type is text
    input_type = password_input.get_attribute("type")
    print(f"Input type after toggle: {input_type}")

    # Take screenshot
    page.screenshot(path="/home/jules/verification/screenshots/password_toggle_verification.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        video_dir = "/home/jules/verification/videos"
        context = browser.new_context(record_video_dir=video_dir)
        page = context.new_page()
        try:
            run_cuj_password_toggle(page)
        finally:
            context.close()
            browser.close()
