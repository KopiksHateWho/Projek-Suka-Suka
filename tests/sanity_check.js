const fs = require('fs');
const path = require('path');

const filesToTouch = [
    'js/auth.js',
    'js/app.js',
    'pages/login.html',
    'pages/dashboard.html'
];

let allPassed = true;

filesToTouch.forEach(filepath => {
    const content = fs.readFileSync(path.join(__dirname, '..', filepath), 'utf8');

    // Check for conflict markers
    if (content.match(/<<<<<<<|=======|>>>>>>>/)) {
        console.error(`❌ Conflict markers found in ${filepath}`);
        allPassed = false;
    } else {
        console.log(`✅ No conflict markers in ${filepath}`);
    }

    // Check for "ghost" text
    if (content.includes('fix-navigation-regression')) {
        console.error(`❌ Ghost text 'fix-navigation-regression' found in ${filepath}`);
        allPassed = false;
    }
});

// Check if escapeHTML is used in app.js
const appJsContent = fs.readFileSync(path.join(__dirname, '../js/app.js'), 'utf8');
if (appJsContent.includes('window.escapeHTML(')) {
    console.log('✅ escapeHTML is used in app.js');
} else {
    console.warn('⚠️ escapeHTML is NOT used in app.js (check if it should be)');
    // We expect it to be used
}

// Check for duplicated navigation blocks in login.html
const loginHtml = fs.readFileSync(path.join(__dirname, '../pages/login.html'), 'utf8');
const navLinkCount = (loginHtml.match(/nav-links-container/g) || []).length;
if (navLinkCount > 1) {
    console.error(`❌ Duplicated nav-links-container in login.html (found ${navLinkCount})`);
    allPassed = false;
} else {
    console.log('✅ No duplicated navigation in login.html');
}

if (!allPassed) {
    process.exit(1);
} else {
    console.log('\n🚀 ALL SANITY CHECKS PASSED');
}
