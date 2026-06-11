import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()

        await page.goto("http://localhost:3000/pages/login.html")

        # Target the login form specifically
        login_form = page.locator("#loginForm")
        password_input = login_form.locator("#password")
        # Use a regex-like attribute selector or just get the first one inside the form
        toggle_btn = login_form.locator("button[type='button']").first

        # Check initial state
        input_type = await password_input.get_attribute("type")
        print(f"Initial input type: {input_type}")
        assert input_type == "password"

        # Click toggle
        await toggle_btn.click()
        print("👆 Clicked toggle button")

        # Check toggled state
        input_type = await password_input.get_attribute("type")
        btn_label = await toggle_btn.get_attribute("aria-label")
        print(f"Toggled input type: {input_type}")
        print(f"Toggled button label: {btn_label}")

        assert input_type == "text"
        assert btn_label == "Hide password"

        # Click again to toggle back
        await toggle_btn.click()
        print("👆 Clicked toggle button again")

        # Check final state
        input_type = await password_input.get_attribute("type")
        print(f"Final input type: {input_type}")
        assert input_type == "password"

        print("✅ Password toggle verified successfully!")
        await browser.close()

if __name__ == "__main__":
    import os
    import subprocess
    import time

    # Start server
    server = subprocess.Popen(["python3", "-m", "http.server", "3000"])
    time.sleep(2) # Wait for server to start

    try:
        asyncio.run(run())
    finally:
        server.terminate()
