const fs = require('fs');
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
    process.exit(1);
}

// Test Suite
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
