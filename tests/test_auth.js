const fs = require('fs');
const path = require('path');

// Mock localStorage
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => { store[key] = value.toString(); },
        removeItem: (key) => { delete store[key]; },
        clear: () => { store = {}; }
    };
})();

// Mock window and document
global.window = {
    location: { pathname: '/', href: '' },
    localStorage: localStorageMock
};
global.localStorage = localStorageMock;
global.document = {
    addEventListener: (event, callback) => {}, // No-op for now
    getElementById: () => null,
    querySelector: () => null,
    body: { appendChild: () => {} }
};

// Read and eval the auth.js file
const authJsPath = path.join(__dirname, '../js/auth.js');
const authJsContent = fs.readFileSync(authJsPath, 'utf8');

// Execute the content of auth.js
try {
    eval(authJsContent);
} catch (e) {
    console.error('Error executing auth.js:', e);
    process.exit(1);
}

// Test Suite
function runTests() {
    console.log('🧪 Running Tests for registerUser...');
    let passed = 0;
    let failed = 0;

    function assert(condition, message) {
        if (condition) {
            console.log(`✅ PASS: ${message}`);
            passed++;
        } else {
            console.error(`❌ FAIL: ${message}`);
            failed++;
        }
    }

    // Reset state before tests
    localStorage.clear();

    // Test 1: Register a new user
    console.log('\nTest 1: Register New User');
    localStorage.clear();
    const email = 'test@example.com';
    const password = 'password123';

    const result1 = window.registerUser(email, password);
    assert(result1 === true, 'registerUser should return true for new user');

    const users = JSON.parse(localStorage.getItem('ks_users') || '[]');
    const savedUser = users.find(u => u.email === email);
    assert(savedUser && savedUser.password === password, 'User should be saved in localStorage');

    const currentUser = JSON.parse(localStorage.getItem('ks_current_user') || 'null');
    assert(currentUser && currentUser.email === email, 'New user should be logged in (saved as current user)');

    // Test 2: Register existing user
    console.log('\nTest 2: Register Existing User');
    // Ensure the user exists first (from previous test or re-setup)
    if (!users.find(u => u.email === email)) {
        // Just in case Test 1 failed
        window.registerUser(email, password);
    }

    const result2 = window.registerUser(email, 'newpassword');
    assert(result2 === false, 'registerUser should return false for existing email');

    const users2 = JSON.parse(localStorage.getItem('ks_users') || '[]');
    const userCount = users2.filter(u => u.email === email).length;
    assert(userCount === 1, 'User should not be duplicated');

    console.log(`\nTest Summary: ${passed} Passed, ${failed} Failed`);
    if (failed > 0) process.exit(1);
}

runTests();
