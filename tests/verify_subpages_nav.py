from playwright.sync_api import sync_playwright

def test_page(url, page_name):
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 375, 'height': 667})
        page = context.new_page()

        print(f"Testing {page_name} at {url}...")
        try:
            page.goto(url)
        except Exception as e:
            print(f"Error navigating to {url}: {e}")
            return

        # Check hamburger button
        try:
            hamburger = page.locator('button[aria-label="Toggle Menu"]')
            hamburger.wait_for(timeout=5000)
            hamburger.click()
            print(f"  👆 Clicked hamburger menu on {page_name}")
        except Exception as e:
            print(f"  ❌ Error finding/clicking hamburger on {page_name}: {e}")
            return

        page.wait_for_timeout(1000)

        # Check overlay
        overlay = page.locator('.nav-overlay.active')
        if overlay.is_visible():
            print(f"  ✅ Overlay is visible on {page_name}")
        else:
            print(f"  ❌ Overlay is NOT visible on {page_name}")

        # Check menu
        menu = page.locator('.nav-links-container.active')
        if menu.is_visible():
            print(f"  ✅ Menu is visible on {page_name}")
        else:
            print(f"  ❌ Menu is NOT visible on {page_name}")

        # Try clicking backdrop to close
        try:
            # The backdrop might be behind the menu (width 75%), but let's try to click the left side
            page.mouse.click(10, 300)
            page.wait_for_timeout(500)
            if not menu.is_visible():
                print(f"  ✅ Menu closed via backdrop on {page_name}")
            else:
                # Try direct click on overlay if mouse click didn't work
                page.click('.nav-overlay.active', force=True)
                page.wait_for_timeout(500)
                if not menu.is_visible():
                    print(f"  ✅ Menu closed via overlay click on {page_name}")
                else:
                    print(f"  ❌ Menu did NOT close on {page_name}")
        except Exception as e:
            print(f"  ❌ Error clicking backdrop on {page_name}: {e}")

        browser.close()

if __name__ == "__main__":
    pages = [
        ("http://localhost:3000/index.html", "Home"),
        ("http://localhost:3000/pages/login.html", "Login"),
        ("http://localhost:3000/pages/dashboard.html", "Dashboard"),
        ("http://localhost:3000/pages/admin.html", "Admin")
    ]
    for url, name in pages:
        test_page(url, name)
        print("-" * 30)
