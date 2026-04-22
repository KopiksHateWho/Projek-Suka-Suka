import asyncio
from playwright.async_api import async_playwright
import os

async def verify_ux():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context()
        page = await context.new_page()

        # Mocking external requests that might fail in sandbox
        await page.route("**/*", lambda route: route.continue_() if "localhost" in route.request.url or "127.0.0.1" in route.request.url or "cdn.tailwindcss.com" in route.request.url else route.abort())

        # Start a local server
        os.system("python3 -m http.server 3000 &")
        await asyncio.sleep(2)

        try:
            print("Verifying index.html password toggle...")
            await page.goto("http://localhost:3000/index.html")

            # Trigger admin login modal (10 clicks on owner name)
            owner = page.locator("#ownerName")
            for _ in range(10):
                await owner.click()

            await page.wait_for_selector("#adminLoginModal.show")
            password_input = page.locator("#adminPassInput")
            toggle_btn = page.locator("#adminLoginModal button[onclick*='togglePasswordVisibility']")

            await password_input.fill("secret")
            assert await password_input.get_attribute("type") == "password"

            await toggle_btn.click()
            assert await password_input.get_attribute("type") == "text"
            assert await toggle_btn.inner_text() == "🙈"

            await page.screenshot(path="verification/screenshots/admin_login_toggle.png")

            print("Verifying login.html password toggle...")
            await page.goto("http://localhost:3000/pages/login.html")

            # Login form
            login_pass = page.locator("#password")
            login_toggle = page.locator("#loginForm button[onclick*='togglePasswordVisibility']")

            await login_pass.fill("password123")
            assert await login_pass.get_attribute("type") == "password"
            await login_toggle.click()
            assert await login_pass.get_attribute("type") == "text"

            # Register form
            await page.click("text=Register")
            reg_pass = page.locator("#regPassword")
            reg_toggle = page.locator("#registerForm button[onclick*='togglePasswordVisibility']")

            await reg_pass.fill("regpass123")
            assert await reg_pass.get_attribute("type") == "password"
            await reg_toggle.click()
            assert await reg_pass.get_attribute("type") == "text"

            await page.screenshot(path="verification/screenshots/login_page_toggles.png")

            print("Verifying navigation consistency...")
            # Check emojis and links in dashboard
            await page.goto("http://localhost:3000/pages/dashboard.html")
            nav_links = page.locator(".nav-link")
            texts = await nav_links.all_inner_texts()
            expected = ["🏠 HOME", "🎮 GAMES", "📋 HISTORY", "💡 REQUEST GAME", "📞 CONTACT"]
            for text in expected:
                assert any(text in t for t in texts), f"Missing {text} in nav"

            await page.screenshot(path="verification/screenshots/dashboard_nav.png")

            print("Verification successful!")

        except Exception as e:
            print(f"Verification failed: {e}")
            await page.screenshot(path="verification/screenshots/error.png")
            raise e
        finally:
            await browser.close()
            os.system("pkill -f 'python3 -m http.server 3000'")

if __name__ == "__main__":
    if not os.path.exists("verification/screenshots"):
        os.makedirs("verification/screenshots")
    asyncio.run(verify_ux())
