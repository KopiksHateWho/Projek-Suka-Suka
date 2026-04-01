const fs = require('fs');
const vm = require('vm');
const path = require('path');

// Mock DOM
class MockElement {
    constructor(id = '') {
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

const mockInput = new MockElement('password');
const mockBtn = new MockElement();

global.document = {
    getElementById: (id) => id === 'password' ? mockInput : null,
    addEventListener: () => {}
};

// Read and execute js/auth.js
const authJsPath = path.join(__dirname, '../js/auth.js');
const authJsContent = fs.readFileSync(authJsPath, 'utf8');

global.window = {};
const context = {
    window: global.window,
    document: global.document,
    localStorage: { getItem: () => null, setItem: () => null },
    console: console
};
vm.runInNewContext(authJsContent, context);

console.log('🧪 Testing window.togglePasswordVisibility...');

// Test toggle to text
context.window.togglePasswordVisibility('password', mockBtn);
if (mockInput.type === 'text' && mockBtn.textContent === '🙈' && mockBtn.getAttribute('aria-label') === 'Hide password') {
    console.log('✅ PASS: Toggled to text successfully');
} else {
    console.error('❌ FAIL: Toggled to text failed', mockInput.type, mockBtn.textContent);
    process.exit(1);
}

// Test toggle back to password
context.window.togglePasswordVisibility('password', mockBtn);
if (mockInput.type === 'password' && mockBtn.textContent === '👁️' && mockBtn.getAttribute('aria-label') === 'Show password') {
    console.log('✅ PASS: Toggled back to password successfully');
} else {
    console.error('❌ FAIL: Toggled back to password failed', mockInput.type, mockBtn.textContent);
    process.exit(1);
}

console.log('🎉 All visibility toggle tests passed!');
