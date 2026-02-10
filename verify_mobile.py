import os
from playwright.sync_api import sync_playwright

def verify_mobile_layout():
    with sync_playwright() as p:
        # iPhone 12 viewport
        iphone_12 = p.devices['iPhone 12']
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(**iphone_12)
        page = context.new_page()

        path = f"file://{os.getcwd()}/index.html"
        page.goto(path)

        # Wait for fonts/styles
        page.wait_for_timeout(1000)

        # Screenshot 1: Hero section on mobile
        page.screenshot(path="mobile_hero.png")
        print("Captured mobile_hero.png")

        # Scroll to bottom
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        page.wait_for_timeout(500)

        # Screenshot 2: Footer on mobile
        page.screenshot(path="mobile_footer.png")
        print("Captured mobile_footer.png")

        # Open a modal
        page.evaluate("window.scrollTo(0, 0)")
        page.click("text=MOBILE LEGENDS")
        page.wait_for_selector("#packageModal.show")

        # Screenshot 3: Modal on mobile
        page.screenshot(path="mobile_modal.png")
        print("Captured mobile_modal.png")

        browser.close()

if __name__ == "__main__":
    verify_mobile_layout()
