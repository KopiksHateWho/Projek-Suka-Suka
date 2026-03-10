import asyncio
import os
from playwright.async_api import async_playwright

async def verify_ux_improvements():
    async with async_playwright() as p:
        # Launch browser with local server context
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={'width': 1280, 'height': 800})
        page = await context.new_page()

        # Mock external CDNs and SDKs to avoid timeouts
        async def handle_route(route):
            if "cdn.tailwindcss.com" in route.request.url:
                await route.fulfill(body="", status=200)
            elif "_sdk" in route.request.url:
                await route.fulfill(body="", status=200)
            else:
                await route.continue_()

        await page.route("**/*", handle_route)

        # Start a temporary server
        import subprocess
        process = subprocess.Popen(['python3', '-m', 'http.server', '3000'])
        await asyncio.sleep(2) # Wait for server to start

        try:
            # 1. Verify Home Page Search Shortcut
            print("Checking index.html...")
            await page.goto("http://localhost:3000/index.html", wait_until="domcontentloaded")

            # Check for hint using a more specific selector
            hint = page.locator(".absolute:has-text('[/]')").first
            is_visible = await hint.is_visible()
            print(f"Hint visible: {is_visible}")

            # Test Shortcut '/'
            await page.keyboard.press("/")
            is_focused = await page.evaluate("document.activeElement.id === 'gameSearch'")
            print(f"Search input focused on '/': {is_focused}")

            # Check if hint hides on focus
            await asyncio.sleep(0.5)
            # Use class check instead of opacity because Tailwind styles might not apply without real CDN
            classes = await hint.evaluate("el => el.className")
            print(f"Hint classes: {classes}")
            is_peer = "peer-focus:opacity-0" in classes
            print(f"Tailwind peer utilities present: {is_peer}")

            # 2. Verify Navigation on other pages
            for path in ["pages/login.html", "pages/dashboard.html", "pages/admin.html"]:
                print(f"Checking {path}...")
                await page.goto(f"http://localhost:3000/{path}", wait_until="domcontentloaded")

                # Check for standardized links (emojis)
                # Since we standardized them, let's check one specifically
                home_link = page.locator("a:has-text('🏠 HOME')")
                exists = await home_link.count() > 0
                print(f"Standardized Home link exists on {path}: {exists}")

                # Verify no junk text
                content = await page.content()
                junk_found = "fix-navigation-regression" in content
                print(f"Junk text found on {path}: {junk_found}")

        finally:
            process.terminate()
            await browser.close()

if __name__ == "__main__":
    asyncio.run(verify_ux_improvements())
