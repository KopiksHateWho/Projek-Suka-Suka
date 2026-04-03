from playwright.sync_api import sync_playwright
import os

def run_debug(page):
    page.goto("http://localhost:3000/pages/login.html")
    page.wait_for_load_state("networkidle")
    print(page.content())
    page.screenshot(path="/home/jules/verification/screenshots/debug_login.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            run_debug(page)
        finally:
            browser.close()
