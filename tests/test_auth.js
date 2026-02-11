const fs = require('fs');
test/auth-registration-10009305681274471756
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

const vm = require('vm');
const path = require('path');

// Mock localStorage
class MockStorage {
    constructor() {
        this.store = {};
    }
    getItem(key) {
        return this.store[key] || null;
    }
    setItem(key, value) {
        this.store[key] = String(value);
    }
    removeItem(key) {
        delete this.store[key];
    }
    clear() {
        this.store = {};
    }
}

// Mock DOM Element
class MockElement {
    constructor() {
        this.className = '';
        this.textContent = '';
        this.innerHTML = '';
        this.style = {};
        this.classList = {
            add: () => {},
            remove: () => {},
            toggle: () => {},
            contains: () => false
        };
    }
    appendChild(child) {}
    remove() {}
    addEventListener(event, callback) {}
}

// Setup global environment
global.window = {
    location: { pathname: '/', href: '' }
};
global.document = {
    addEventListener: (event, callback) => {}, // Mock addEventListener
    getElementById: (id) => new MockElement(), // Return a dummy element to prevent crashes
    querySelector: (selector) => new MockElement(),
    createElement: (tag) => new MockElement(),
    body: { appendChild: () => {} }
};
global.localStorage = new MockStorage();

// Read and execute js/auth.js
const authJsPath = path.join(__dirname, '../js/auth.js');
const authJsContent = fs.readFileSync(authJsPath, 'utf8');

// Execute the script in the current context so it attaches to global.window
try {
    vm.runInThisContext(authJsContent);
} catch (e) {
    console.error('Failed to load js/auth.js:', e);
 main
    process.exit(1);
}

// Test Suite
 test/auth-registration-10009305681274471756
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
  
console.log('🧪 Running tests for window.getCurrentUser...');

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, message) {
    if (condition) {
        console.log(`✅ PASS: ${message}`);
        testsPassed++;
    } else {
        console.error(`❌ FAIL: ${message}`);
        testsFailed++;
    }
}

// Test 1: No user logged in
localStorage.clear();
const user1 = window.getCurrentUser();
assert(user1 === null, 'Should return null when no user is logged in');

// Test 2: Valid user logged in
const testUser = { email: 'test@example.com', name: 'Test User' };
// Note: We use the hardcoded key 'ks_current_user' here.
// If js/auth.js changes AUTH_KEY, this test will fail, ensuring we are aware of the breaking change.
localStorage.setItem('ks_current_user', JSON.stringify(testUser));
const user2 = window.getCurrentUser();
assert(user2 && user2.email === testUser.email, 'Should return user object when valid user is logged in');

// Test 3: Invalid JSON handling
try {
    localStorage.setItem('ks_current_user', '{invalid_json');
    // window.getCurrentUser might throw SyntaxError
    const user3 = window.getCurrentUser();
    // If it doesn't throw, we check if it handles it gracefully (returns null?)
    // Based on implementation: JSON.parse throws on invalid JSON.
    assert(false, 'Should have thrown SyntaxError for invalid JSON');
} catch (e) {
    assert(e instanceof SyntaxError, 'Should throw SyntaxError for invalid JSON');
}

// Summary
console.log(`\nTest Summary: ${testsPassed} passed, ${testsFailed} failed.`);
if (testsFailed > 0) {
    process.exit(1);
}
main
