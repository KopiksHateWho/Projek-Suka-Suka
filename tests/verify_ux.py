import asyncio
from playwright.async_api import async_playwright
import os

async def run_verification():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context()
        page = await context.new_page()

        print("Testing Micro-UX Enhancements...")
        await page.goto("http://localhost:3000")

        # 1. Check Visual Hint
        hint = page.locator('span:has-text("[/]")')
        if await hint.is_visible():
            print("✅ Visual hint [/] is visible")
        else:
            print("❌ Visual hint [/] is NOT visible")

        # 2. Test Search Shortcut (/)
        await page.keyboard.press("/")
        search_input = page.locator("#gameSearch")
        is_focused = await search_input.evaluate("el => document.activeElement === el")
        if is_focused:
            print("✅ Search bar focused on '/' key")
        else:
            print("❌ Search bar NOT focused on '/' key")

        # 3. Test Opacity Change on Focus
        await asyncio.sleep(0.5)  # wait for transition
        opacity = await hint.evaluate("el => window.getComputedStyle(el).opacity")
        if opacity == "0":
            print("✅ Visual hint hidden on focus")
        else:
            print(f"❌ Visual hint still visible on focus (opacity: {opacity})")

        # 4. Test Filtering
        await page.keyboard.type("Mobile")
        ml_card = page.locator('.game-card:has-text("MOBILE LEGENDS")')
        ff_card = page.locator('.game-card:has-text("FREE FIRE")')
        if await ml_card.is_visible() and not await ff_card.is_visible():
            print("✅ Search filtering works correctly")
        else:
            print("❌ Search filtering failed")

        # 5. Test Escape Key - Clear Search
        await page.keyboard.press("Escape")
        val = await search_input.input_value()
        if val == "":
            print("✅ Escape clears search value")
        else:
            print(f"❌ Escape did NOT clear search (value: '{val}')")

        is_focused_after = await search_input.evaluate("el => document.activeElement === el")
        if not is_focused_after:
            print("✅ Escape blurs search bar")
        else:
            print("❌ Escape did NOT blur search bar")

        # 6. Test Escape Key - Close Modals
        await page.click("text=HISTORY")
        modal = page.locator("#historyModal")
        if "show" in await modal.get_attribute("class"):
            print("✅ Modal opened")
        else:
            print("❌ Modal failed to open")

        await page.keyboard.press("Escape")
        if "show" not in await modal.get_attribute("class"):
            print("✅ Escape closes modal")
        else:
            print("❌ Escape failed to close modal")

        await browser.close()

if __name__ == "__main__":
    import subprocess
    import time

    # Ensure port 3000 is free
    subprocess.run("kill $(lsof -t -i :3000) 2>/dev/null || true", shell=True)

    # Start server
    server = subprocess.Popen(["python3", "-m", "http.server", "3000"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(2)

    try:
        asyncio.run(run_verification())
    finally:
        server.terminate()
