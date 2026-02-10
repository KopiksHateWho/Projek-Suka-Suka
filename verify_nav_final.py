import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Test Desktop
        await page.set_viewport_size({"width": 1280, "height": 800})
        await page.goto("http://localhost:3000/index.html")
        await page.screenshot(path="/home/jules/verification/desktop_nav_final.png")

        # Test Mobile
        await page.set_viewport_size({"width": 375, "height": 667})
        await page.goto("http://localhost:3000/index.html")
        await page.screenshot(path="/home/jules/verification/mobile_nav_closed_final.png")

        # Open Menu
        await page.evaluate("window.toggleMenu()")
        await asyncio.sleep(0.5)
        await page.screenshot(path="/home/jules/verification/mobile_nav_open_final.png")

        # Close Menu
        await page.evaluate("window.closeMenu()")
        await asyncio.sleep(0.5)

        # Click a game card
        await page.click("#mlCard")
        await asyncio.sleep(0.5)
        await page.screenshot(path="/home/jules/verification/game_modal_final.png")

        await browser.close()

asyncio.run(run())
