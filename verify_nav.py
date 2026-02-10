import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Test index.html mobile
        await page.set_viewport_size({"width": 375, "height": 667})
        await page.goto("http://localhost:3000/index.html")
        await page.evaluate("window.toggleMenu()")
        await asyncio.sleep(0.5)
        await page.screenshot(path="/home/jules/verification/index_mobile_nav.png")

        # Test login.html mobile
        await page.goto("http://localhost:3000/pages/login.html")
        await page.evaluate("window.toggleMenu()")
        await asyncio.sleep(0.5)
        await page.screenshot(path="/home/jules/verification/login_mobile_nav.png")

        await browser.close()

asyncio.run(run())
