import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(viewport={'width': 1280, 'height': 800})
        page = await context.new_page()

        # Mock SDKs to avoid timeouts
        await page.route("**/_sdk/**", lambda route: route.fulfill(status=200, body=""))

        await page.goto("http://localhost:3000/index.html")

        # Click a game card to open package modal
        await page.click(".game-card")
        await page.wait_for_selector("#packageModal.show")

        # Click a package
        await page.click(".price-box-mini")

        # Check if selected class and after pseudo-element (simulated) are present
        pkg = page.locator(".price-box-mini.selected")
        count = await pkg.count()
        print(f"✅ Selected package count: {count}")

        if count > 0:
            aria = await pkg.get_attribute("aria-label")
            role = await pkg.get_attribute("role")
            tabindex = await pkg.get_attribute("tabindex")
            print(f"✅ Package ARIA: {aria}, Role: {role}, Tabindex: {tabindex}")

            # Screenshot of selected package
            await pkg.screenshot(path="verification/package_selected.png")
            print("📸 Screenshot taken: verification/package_selected.png")

        # Click a payment method
        await page.click(".payment-btn")
        pay = page.locator(".payment-btn.selected")
        pay_count = await pay.count()
        print(f"✅ Selected payment count: {pay_count}")

        if pay_count > 0:
            pay_role = await pay.get_attribute("role")
            pay_tabindex = await pay.get_attribute("tabindex")
            print(f"✅ Payment Role: {pay_role}, Tabindex: {pay_tabindex}")

            # Screenshot of selected payment
            await pay.screenshot(path="verification/payment_selected.png")
            print("📸 Screenshot taken: verification/payment_selected.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
