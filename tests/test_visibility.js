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

// Mock DOM
class MockElement {
    constructor(id) {
        this.id = id;
        this.type = 'password';
        this.textContent = '';
        this.attributes = {};
    }
    setAttribute(name, value) {
        this.attributes[name] = value;
    }
    getAttribute(name) {
        return this.attributes[name];
    }
}

global.window = {};
global.document = {
    getElementById: (id) => {
        if (!global.inputs[id]) {
            global.inputs[id] = new MockElement(id);
        }
        return global.inputs[id];
    },
    addEventListener: () => {}
};
global.localStorage = new MockStorage();
global.inputs = {};

// Load auth.js
const authJsPath = path.join(__dirname, '../js/auth.js');
const authJsContent = fs.readFileSync(authJsPath, 'utf8');
vm.runInThisContext(authJsContent);

console.log('🧪 Testing window.togglePasswordVisibility...');

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

// Test 1: Toggle to text
const input = document.getElementById('password');
const btn = { textContent: '👁️', setAttribute: (n, v) => btn[n] = v, getAttribute: (n) => btn[n] };

window.togglePasswordVisibility('password', btn);
assert(input.type === 'text', 'Input type should be text after toggle');
assert(btn.textContent === '🙈', 'Button icon should be 🙈');
assert(btn['aria-label'] === 'Hide password', 'ARIA label should be Hide password');

// Test 2: Toggle back to password
window.togglePasswordVisibility('password', btn);
assert(input.type === 'password', 'Input type should be password after toggle back');
assert(btn.textContent === '👁️', 'Button icon should be 👁️');
assert(btn['aria-label'] === 'Show password', 'ARIA label should be Show password');

console.log(`\nTest Summary: ${testsPassed} passed, ${testsFailed} failed.`);
if (testsFailed > 0) process.exit(1);
