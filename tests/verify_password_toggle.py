from playwright.sync_api import sync_playwright
import os

# Create screenshots directory if it doesn't exist
os.makedirs("verification/screenshots", exist_ok=True)
os.makedirs("verification/videos", exist_ok=True)

def run_cuj(page):
    page.goto("http://localhost:3000/pages/login.html")
    page.wait_for_timeout(1000)

    # Login Form
    password_input = page.locator("#password")
    toggle_btn = page.locator("#loginForm button[type='button']")

    password_input.fill("secret123")
    page.wait_for_timeout(500)

    assert password_input.get_attribute("type") == "password"

    toggle_btn.click()
    page.wait_for_timeout(500)
    assert password_input.get_attribute("type") == "text"

    page.screenshot(path="verification/screenshots/login_password_visible.png")

    toggle_btn.click()
    page.wait_for_timeout(500)
    assert password_input.get_attribute("type") == "password"

    # Register Form
    page.get_by_role("link", name="Register").click()
    page.wait_for_timeout(500)

    reg_password_input = page.locator("#regPassword")
    reg_toggle_btn = page.locator("#registerForm button[type='button']")

    reg_password_input.fill("regSecret456")
    page.wait_for_timeout(500)
    assert reg_password_input.get_attribute("type") == "password"

    reg_toggle_btn.click()
    page.wait_for_timeout(500)
    assert reg_password_input.get_attribute("type") == "text"

    page.screenshot(path="verification/screenshots/register_password_visible.png")

    # Admin Modal on Index
    page.goto("http://localhost:3000/index.html")
    page.wait_for_timeout(1000)

    # Click footer 10 times
    owner_name = page.locator("#ownerName")
    for _ in range(10):
        owner_name.click()

    page.wait_for_timeout(500)
    admin_pass = page.locator("#adminPassInput")
    admin_toggle = page.locator("#adminLoginModal button[type='button']")

    admin_pass.fill("AdminPass789")
    page.wait_for_timeout(500)
    assert admin_pass.get_attribute("type") == "password"

    admin_toggle.click()
    page.wait_for_timeout(500)
    assert admin_pass.get_attribute("type") == "text"

    page.screenshot(path="verification/screenshots/admin_password_visible.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
