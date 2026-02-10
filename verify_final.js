const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Set viewport to desktop
  await page.setViewportSize({ width: 1280, height: 800 });

  // Load index.html
  const path = `file://${process.cwd()}/index.html`;
  await page.goto(path);

  console.log('Checking page title...');
  const title = await page.title();
  if (title.includes('KingSlayer')) {
    console.log('✅ Title check passed');
  } else {
    console.log('❌ Title check failed:', title);
  }

  console.log('Checking game cards...');
  const cards = await page.locator('.game-card');
  const count = await cards.count();
  console.log(`Found ${count} game cards`);
  if (count >= 7) {
    console.log('✅ Game cards count passed');
  } else {
    console.log('❌ Game cards count failed');
  }

  console.log('Checking package modal...');
  await page.click('.game-card:has-text("MOBILE LEGENDS")');
  await page.waitForSelector('#packageModal.show', { timeout: 2000 });
  console.log('✅ Package modal opened');

  const packages = await page.locator('#packageList .price-box-mini');
  const pkgCount = await packages.count();
  console.log(`Found ${pkgCount} packages for Mobile Legends`);
  if (pkgCount > 50) {
    console.log('✅ Large package list check passed');
  } else {
    console.log('❌ Package list check failed:', pkgCount);
  }

  console.log('Checking search functionality...');
  await page.click('.close-modal');
  await page.fill('#gameSearch', 'FREE FIRE');
  const ffVisible = await page.isVisible('.game-card:has-text("FREE FIRE")');
  const mlVisible = await page.isVisible('.game-card:has-text("MOBILE LEGENDS")');
  if (ffVisible && !mlVisible) {
    console.log('✅ Search functionality passed');
  } else {
    console.log('❌ Search functionality failed');
  }

  console.log('Checking admin trigger (10 clicks)...');
  const ownerName = page.locator('#ownerName');
  for (let i = 0; i < 10; i++) {
    await ownerName.click();
  }
  await page.waitForSelector('#adminLoginModal.show', { timeout: 2000 });
  console.log('✅ Admin login modal triggered successfully');

  // Mobile menu check
  console.log('Checking mobile menu...');
  await page.setViewportSize({ width: 375, height: 667 });
  const hamburger = page.locator('button:has-text("☰")');
  if (await hamburger.isVisible()) {
    console.log('✅ Hamburger menu visible on mobile');
    await hamburger.click();
    const menuVisible = await page.isVisible('#navLinks:not(.hidden)');
    if (menuVisible) {
        console.log('✅ Mobile menu toggled open');
    } else {
        console.log('❌ Mobile menu failed to open');
    }
  } else {
    console.log('❌ Hamburger menu NOT visible on mobile');
  }

  await page.screenshot({ path: 'final_verification.png', fullPage: true });
  console.log('Screenshot saved to final_verification.png');

  await browser.close();
})();
