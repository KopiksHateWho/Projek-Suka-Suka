import asyncio
from playwright.async_api import async_playwright

async def verify_password_toggle():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Start server in background if not already running
        # Assuming we can just open the file directly since it's a sandbox or use the http server

        await page.goto("http://localhost:3000/pages/login.html")

        # Check login form password toggle
        password_input = page.locator("#password")
        toggle_btn = page.locator("#loginForm button[type='button']")

        print("Checking initial state...")
        assert await password_input.get_attribute("type") == "password"

        print("Clicking toggle button...")
        await toggle_btn.click()
        assert await password_input.get_attribute("type") == "text"
        assert await toggle_btn.inner_text() == "🙈"

        print("Clicking toggle button again...")
        await toggle_btn.click()
        assert await password_input.get_attribute("type") == "password"
        assert await toggle_btn.inner_text() == "👁️"

        # Check register form password toggle
        await page.click("text=Register")
        reg_password_input = page.locator("#regPassword")
        reg_toggle_btn = page.locator("#registerForm button[type='button']")

        print("Checking register initial state...")
        assert await reg_password_input.get_attribute("type") == "password"

        print("Clicking register toggle button...")
        await reg_toggle_btn.click()
        assert await reg_password_input.get_attribute("type") == "text"

        print("All password toggles verified!")
        await browser.close()

if __name__ == "__main__":
    import os
    # We need to run the server
    import subprocess
    import time

    server = subprocess.Popen(["python3", "-m", "http.server", "3000"])
    time.sleep(2)
    try:
        asyncio.run(verify_password_toggle())
    finally:
        server.terminate()
