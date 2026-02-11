from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use a mobile viewport
        context = browser.new_context(viewport={'width': 375, 'height': 667})
        page = context.new_page()

        # Navigate to the page
        try:
            page.goto("http://localhost:3000/index.html")
        except Exception as e:
            print(f"Error navigating: {e}")
            return

        # Wait for the hamburger button to be visible
        try:
            page.wait_for_selector('button[aria-label="Toggle Menu"]', timeout=5000)
        except Exception as e:
            print(f"Error finding hamburger: {e}")
            page.screenshot(path="tests/error_state.png")
            return

        # Take a screenshot before clicking
        page.screenshot(path="tests/before_menu.png")
        print("📸 Screenshot taken: tests/before_menu.png")

        # Click the hamburger menu
        page.click('button[aria-label="Toggle Menu"]')
        print("👆 Clicked hamburger menu")

        # Wait for the menu to open (transition is 0.4s)
        page.wait_for_timeout(1000)

        # Check if overlay is active
        overlay = page.locator('.nav-overlay.active')
        if overlay.is_visible():
            print("✅ Overlay is visible")
        else:
            print("❌ Overlay is NOT visible")

        # Check if menu is active
        menu = page.locator('.nav-links-container.active')
        if menu.is_visible():
            print("✅ Menu is visible")
            # Check visibility CSS property just in case
            visibility = menu.evaluate("el => getComputedStyle(el).visibility")
            opacity = menu.evaluate("el => getComputedStyle(el).opacity")
            transform = menu.evaluate("el => getComputedStyle(el).transform")
            print(f"   CSS Visibility: {visibility}")
            print(f"   CSS Opacity: {opacity}")
            print(f"   CSS Transform: {transform}")
        else:
            print("❌ Menu is NOT visible")

        # Take a screenshot of the open menu
        page.screenshot(path="tests/mobile_menu_open.png")
        print("📸 Screenshot taken: tests/mobile_menu_open.png")

        browser.close()

if __name__ == "__main__":
    run()
