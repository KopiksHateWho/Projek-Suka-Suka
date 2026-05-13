import asyncio
from playwright.async_api import async_playwright
import os

async def verify_password_toggle():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Test Login Page
        print("Testing Login Page...")
        await page.goto("http://localhost:3000/pages/login.html")

        # Login form is visible by default
        password_input = page.locator("#loginForm #password")
        toggle_btn = page.locator("#loginForm button[aria-label='Show password']")

        await expect_type(password_input, "password")
        await toggle_btn.click()
        await expect_type(password_input, "text")
        print("✅ Login password toggle works")

        # Test Register Form
        print("\nTesting Register Form...")
        await page.click("text=Register")
        reg_input = page.locator("#registerForm #regPassword")
        reg_toggle = page.locator("#registerForm button[aria-label='Show password']")

        await expect_type(reg_input, "password")
        await reg_toggle.click()
        await expect_type(reg_input, "text")
        print("✅ Register password toggle works")

        # Test Admin Login Modal on Home Page
        print("\nTesting Admin Login Modal...")
        await page.goto("http://localhost:3000/index.html")

        # Trigger admin modal (click owner name 10 times)
        owner_name = page.locator("#ownerName")
        for _ in range(10):
            await owner_name.click()

        admin_input = page.locator("#adminPassInput")
        admin_toggle = page.locator("#adminLoginModal button[aria-label='Show password']")

        await expect_type(admin_input, "password")
        await admin_toggle.click()
        await expect_type(admin_input, "text")
        print("✅ Admin password toggle works")

        await browser.close()

async def expect_type(locator, expected_type):
    actual_type = await locator.get_attribute("type")
    if actual_type != expected_type:
        raise Exception(f"Expected type {expected_type}, but got {actual_type}")

if __name__ == "__main__":
    asyncio.run(verify_password_toggle())
