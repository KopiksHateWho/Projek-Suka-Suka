import asyncio
from playwright.async_api import async_playwright
import os

async def verify_password_toggle():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Ensure we are using the correct URL
        url = "http://localhost:3000/pages/login.html"
        await page.goto(url)
        print(f"✅ Navigated to {url}")

        # Check Login Form Password Toggle
        password_input = page.locator("#password")
        toggle_btn = page.locator("button[onclick*='password']")

        # Initial state
        assert await password_input.get_attribute("type") == "password"
        assert await toggle_btn.get_attribute("aria-label") == "Show password"
        print("✅ Login password field is initially masked")

        # Click toggle
        await toggle_btn.click()
        assert await password_input.get_attribute("type") == "text"
        assert await toggle_btn.get_attribute("aria-label") == "Hide password"
        print("✅ Login password field is visible after click")

        # Click again to hide
        await toggle_btn.click()
        assert await password_input.get_attribute("type") == "password"
        assert await toggle_btn.get_attribute("aria-label") == "Show password"
        print("✅ Login password field is masked again")

        # Check Register Form
        await page.click("text=Register")
        reg_password_input = page.locator("#regPassword")
        reg_toggle_btn = page.locator("button[onclick*='regPassword']")

        assert await reg_password_input.get_attribute("type") == "password"
        await reg_toggle_btn.click()
        assert await reg_password_input.get_attribute("type") == "text"
        print("✅ Register password toggle also works")

        await browser.close()

if __name__ == "__main__":
    # Start server in background if not running
    import subprocess
    import time

    server = subprocess.Popen(["python3", "-m", "http.server", "3000"])
    time.sleep(2)

    try:
        asyncio.run(verify_password_toggle())
        print("\n✨ All password toggle verifications passed!")
    finally:
        server.terminate()
