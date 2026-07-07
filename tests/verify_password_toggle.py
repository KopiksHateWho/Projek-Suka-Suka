import asyncio
from playwright.async_api import async_playwright

async def verify_password_toggle():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        await page.goto("http://localhost:3000/pages/login.html")

        # Use a stable locator for the login password toggle
        # The button is the only button inside the relative container of the password field
        login_toggle = page.locator("#loginForm div.relative button")
        password_input = page.locator("#password")

        # Initial state
        assert await password_input.get_attribute("type") == "password"
        assert await login_toggle.get_attribute("aria-label") == "Show password"
        print("✅ Initial login password type is 'password'")

        # Click toggle to show
        await login_toggle.click()
        await page.wait_for_timeout(500) # Wait for DOM update
        assert await password_input.get_attribute("type") == "text"
        assert await login_toggle.get_attribute("aria-label") == "Hide password"
        assert await login_toggle.inner_text() == "👁️"
        print("✅ Login password type changed to 'text' after toggle")

        # Click toggle to hide
        await login_toggle.click()
        await page.wait_for_timeout(500)
        assert await password_input.get_attribute("type") == "password"
        assert await login_toggle.get_attribute("aria-label") == "Show password"
        assert await login_toggle.inner_text() == "🙈"
        print("✅ Login password type changed back to 'password' after second toggle")

        # Test Register Form
        await page.click("text=Register")

        reg_toggle = page.locator("#registerForm div.relative button")
        reg_password_input = page.locator("#regPassword")

        assert await reg_password_input.get_attribute("type") == "password"
        print("✅ Initial register password type is 'password'")

        await reg_toggle.click()
        await page.wait_for_timeout(500)
        assert await reg_password_input.get_attribute("type") == "text"
        print("✅ Register password type changed to 'text' after toggle")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify_password_toggle())
