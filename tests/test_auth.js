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
        this.id = '';
        this.type = '';
        this.textContent = '';
        this.innerHTML = '';
        this.attributes = {};
        this.classList = {
            add: () => {},
            remove: () => {},
            toggle: () => {},
            contains: () => false
        };
    }
    setAttribute(name, value) { this.attributes[name] = value; }
    getAttribute(name) { return this.attributes[name] || null; }
    appendChild(child) {}
    remove() {}
    addEventListener(event, callback) {}
}

// Setup global environment
global.window = {
    location: { pathname: '/', href: '' }
};
global.document = {
    addEventListener: (event, callback) => {},
    getElementById: (id) => {
        const el = new MockElement();
        el.id = id;
        return el;
    },
    querySelector: (selector) => new MockElement(),
    createElement: (tag) => new MockElement(),
    body: { appendChild: () => {} }
};
global.localStorage = new MockStorage();

// Read and execute js/auth.js
const authJsPath = path.join(__dirname, '../js/auth.js');
const authJsContent = fs.readFileSync(authJsPath, 'utf8');

try {
    vm.runInThisContext(authJsContent);
} catch (e) {
    console.error('Failed to load js/auth.js:', e);
    process.exit(1);
}

// Test Suite
console.log('🧪 Running tests for KingSlayer Auth Utilities...');

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

// Test 1: window.escapeHTML
const unsafe = '<img src=x onerror=alert(1)>';
// In JSDOM/Browser, div.textContent = str; return div.innerHTML; would escape.
// Our MockElement has innerHTML and textContent. Let's see how js/auth.js uses it.
/*
window.escapeHTML = function(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
};
*/
// Our mock doesn't automatically link textContent to innerHTML.
// Let's improve the mock for this test or just assert that it was called.
const mockDiv = global.document.createElement('div');
const originalCreate = global.document.createElement;
global.document.createElement = (tag) => {
    if (tag === 'div') {
        return {
            set textContent(val) { this._text = val; this.innerHTML = val.replace(/</g, '&lt;').replace(/>/g, '&gt;'); },
            get textContent() { return this._text; }
        };
    }
    return originalCreate(tag);
};

const escaped = window.escapeHTML(unsafe);
assert(escaped.includes('&lt;img'), 'Should escape HTML tags');
global.document.createElement = originalCreate;

// Test 2: window.togglePasswordVisibility
const mockInput = new MockElement();
mockInput.type = 'password';
const mockBtn = new MockElement();

// Overwrite getElementById for this test
const originalGetId = global.document.getElementById;
global.document.getElementById = (id) => id === 'pass-input' ? mockInput : null;

window.togglePasswordVisibility('pass-input', mockBtn);
assert(mockInput.type === 'text', 'Should toggle password to text');
assert(mockBtn.textContent === '🙈', 'Should change icon to 🙈');
assert(mockBtn.getAttribute('aria-label') === 'Hide password', 'Should update aria-label to Hide');

window.togglePasswordVisibility('pass-input', mockBtn);
assert(mockInput.type === 'password', 'Should toggle text back to password');
assert(mockBtn.textContent === '👁️', 'Should change icon back to 👁️');
assert(mockBtn.getAttribute('aria-label') === 'Show password', 'Should update aria-label to Show');

global.document.getElementById = originalGetId;

// Test 3: getCurrentUser - No user logged in
localStorage.clear();
const user1 = window.getCurrentUser();
assert(user1 === null, 'Should return null when no user is logged in');

// Test 4: Valid user logged in
const testUser = { email: 'test@example.com', name: 'Test User' };
localStorage.setItem('ks_current_user', JSON.stringify(testUser));
const user2 = window.getCurrentUser();
assert(user2 && user2.email === testUser.email, 'Should return user object when valid user is logged in');

// Test 5: Invalid JSON handling
try {
    localStorage.setItem('ks_current_user', '{invalid_json');
    window.getCurrentUser();
    assert(false, 'Should have thrown SyntaxError for invalid JSON');
} catch (e) {
    assert(e instanceof SyntaxError, 'Should throw SyntaxError for invalid JSON');
}

// Summary
console.log(`\nTest Summary: ${testsPassed} passed, ${testsFailed} failed.`);
if (testsFailed > 0) {
    process.exit(1);
}
