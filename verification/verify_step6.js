const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 360, height: 800 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });
  const page = await context.newPage();

  // Test Homepage and Mobile Menu
  await page.goto('http://localhost:3000/index.html');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'verification/homepage_mobile.png' });

  // Open Menu
  await page.click('button[aria-label="Toggle Menu"]');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'verification/mobile_menu_open.png' });

  // Close Menu
  await page.click('#nav-backdrop');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'verification/mobile_menu_closed.png' });

  // Test Admin Login
  await page.goto('http://localhost:3000/pages/admin.html');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'verification/admin_login.png' });

  await page.fill('#adminUser', 'admin');
  await page.fill('#adminPass', 'admin123');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'verification/admin_dashboard.png' });

  // Check Game List tab
  await page.click('.sidebar-link:has-text("Game List")');
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'verification/admin_games.png' });

  await browser.close();
})();
