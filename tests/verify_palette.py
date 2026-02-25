from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1280, 'height': 800})

        try:
            # 1. Navigate to Home
            page.goto("http://localhost:3000/index.html")
            print("✅ Navigated to Home")

            # 2. Check for visual hint [/]
            # It should be visible initially (not focused, no text)
            hint = page.locator('span:has-text("[/]")')
            if hint.is_visible():
                print("✅ Visual hint [/] is visible initially")
            else:
                print("❌ Visual hint [/] is NOT visible initially")

            # 3. Test keyboard shortcut /
            page.keyboard.press("/")

            # Check if search input is focused
            is_focused = page.evaluate("document.activeElement.id === 'gameSearch'")
            if is_focused:
                print("✅ Keyboard shortcut / successfully focused the search input")
            else:
                active_id = page.evaluate("document.activeElement.id")
                print(f"❌ Keyboard shortcut / failed to focus search input (Active element ID: {active_id})")

            # 4. Check if hint is hidden when focused
            if not hint.is_visible():
                print("✅ Visual hint [/] is hidden when search input is focused")
            else:
                print("❌ Visual hint [/] is still visible when focused")

            # 5. Type something and check if hint remains hidden
            page.keyboard.type("mobile")
            if not hint.is_visible():
                print("✅ Visual hint [/] is hidden when search input has text")
            else:
                print("❌ Visual hint [/] is still visible when search input has text")

            # 6. Clear search and check hint visibility
            page.click("#clearSearch")
            # Clear search focuses the input, so hint should still be hidden because of focus
            if not hint.is_visible():
                print("✅ Visual hint [/] is hidden when search input is cleared (and focused)")
            else:
                print("❌ Visual hint [/] is visible after clear (expected hidden due to focus)")

            # 7. Blur the input and check hint visibility
            page.evaluate("document.getElementById('gameSearch').blur()")
            if hint.is_visible():
                print("✅ Visual hint [/] is visible again after blurring empty search input")
            else:
                print("❌ Visual hint [/] is NOT visible after blurring empty search input")

            # 8. Check "REQUEST GAME" button in empty state
            # Type something that won't match
            page.locator("#gameSearch").press_sequentially("nonexistentgame123", delay=50)
            page.wait_for_selector("#noGamesFound", state="visible")

            request_btn = page.locator("#noGamesFound .btn-primary")
            onclick = request_btn.get_attribute("onclick")
            if "openRequestGameModal()" in onclick:
                print("✅ Empty state REQUEST GAME button correctly calls openRequestGameModal()")
            else:
                print(f"❌ Empty state REQUEST GAME button has wrong onclick: {onclick}")

            page.screenshot(path="tests/palette_verification.png")

        except Exception as e:
            print(f"❌ Error during verification: {e}")
            page.screenshot(path="tests/palette_error.png")

        browser.close()

if __name__ == "__main__":
    run()
