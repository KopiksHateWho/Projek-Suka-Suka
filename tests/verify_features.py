from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Desktop viewport
        page = browser.new_page(viewport={'width': 1280, 'height': 800})

        # 1. Navigate to Home
        try:
            page.goto("http://localhost:3000/index.html")
            print("✅ Navigated to Home")
        except Exception as e:
            print(f"❌ Error navigating: {e}")
            return

        # 2. Check Game Cards (Dynamic Rendering)
        try:
            # Wait for content
            page.wait_for_selector('#gamesGrid .game-card', timeout=5000)
            cards = page.locator('#gamesGrid .game-card')
            count = cards.count()
            if count >= 3:
                print(f"✅ Found {count} game cards (Dynamic Rendering working)")
            else:
                print(f"❌ Only found {count} game cards. Expected at least 3.")

            # Check for image
            first_img = cards.first.locator('img')
            if first_img.is_visible():
                print("✅ Game card has visible image")
            else:
                print("❌ Game card image missing")

            page.screenshot(path="tests/games_grid.png")
        except Exception as e:
            print(f"❌ Error checking game cards: {e}")
            page.screenshot(path="tests/error_games.png")

        # 3. Test Request Game Modal
        try:
            # Click Request Game link (desktop nav)
            page.click('text=REQUEST GAME')
            # Wait for modal to be visible
            page.wait_for_selector('#requestGameModal.show', timeout=2000)
            if page.is_visible('#requestGameModal'):
                print("✅ Request Game modal opened")
            else:
                print("❌ Request Game modal NOT visible")

            page.screenshot(path="tests/request_modal.png")

            # Close it
            page.click('#requestGameModal .close-modal')
        except Exception as e:
            print(f"❌ Error testing request modal: {e}")

        # 4. Navigate to Admin Panel (Simulate Login)
        try:
            page.goto("http://localhost:3000/pages/admin.html")
            print("✅ Navigated to Admin Panel")

            # Check tabs existence
            if page.locator('#tabOrders').is_visible() and page.locator('#tabProducts').is_visible():
                print("✅ Admin tabs visible")

            # Switch to Games Tab
            page.click('#tabProducts')
            page.wait_for_selector('#productsGrid')

            # Check for "Add New Game" card - use specific selector to avoid ambiguity
            add_btn = page.locator('#productsGrid .admin-card').filter(has_text="ADD NEW GAME")
            if add_btn.is_visible():
                print("✅ 'Add New Game' button visible")

            # Check for listed games
            admin_cards = page.locator('#productsGrid .admin-card')
            count = admin_cards.count()
            if count > 1: # +1 for the Add button
                print(f"✅ Found {count - 1} games in Admin Panel")

            page.screenshot(path="tests/admin_games.png")

        except Exception as e:
            print(f"❌ Error testing admin panel: {e}")
            page.screenshot(path="tests/error_admin.png")

        browser.close()

if __name__ == "__main__":
    run()
