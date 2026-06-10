import asyncio
from playwright.async_api import async_playwright
import os

async def verify_password_toggle():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()

        # Start a local server
        import subprocess
        server = subprocess.Popen(['python3', '-m', 'http.server', '3000'])
        await asyncio.sleep(2) # Wait for server to start

        try:
            await page.goto("http://localhost:3000/pages/login.html")
            print("✅ Navigated to Login page")

            password_input = page.locator('#password')
            toggle_btn = page.locator('button[onclick*="password"]')

            # Initial state
            assert await password_input.get_attribute('type') == 'password'
            print("✅ Password input is initially type='password'")

            # Click toggle to show
            await toggle_btn.click()
            assert await password_input.get_attribute('type') == 'text'
            assert await toggle_btn.inner_text() == '🙈'
            assert await toggle_btn.get_attribute('aria-label') == 'Hide password'
            print("✅ Password is now visible (type='text')")

            # Click toggle to hide
            await toggle_btn.click()
            assert await password_input.get_attribute('type') == 'password'
            assert await toggle_btn.inner_text() == '👁️'
            assert await toggle_btn.get_attribute('aria-label') == 'Show password'
            print("✅ Password is now hidden again (type='password')")

            # Test Registration form toggle
            await page.click('text=Register')
            reg_password_input = page.locator('#regPassword')
            reg_toggle_btn = page.locator('button[onclick*="regPassword"]')

            assert await reg_password_input.get_attribute('type') == 'password'
            await reg_toggle_btn.click()
            assert await reg_password_input.get_attribute('type') == 'text'
            print("✅ Registration password toggle works")

            os.makedirs('tests/screenshots', exist_ok=True)
            await page.screenshot(path="tests/screenshots/password_toggle_verify.png")
            print("✅ Screenshot saved to tests/screenshots/password_toggle_verify.png")

        finally:
            server.terminate()
            await browser.close()

if __name__ == "__main__":
    asyncio.run(verify_password_toggle())
