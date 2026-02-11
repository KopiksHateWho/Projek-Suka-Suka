const fs = require('fs');
const path = require('path');

// --- Mocks ---
const localStorageMock = (function() {
  let store = {};
  return {
    getItem: function(key) {
      return store[key] || null;
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    removeItem: function(key) {
      delete store[key];
    },
    clear: function() {
      store = {};
    },
    // For testing verification
    _getStore: function() { return store; }
  };
})();

global.window = {
    location: { href: '', pathname: '/' },
    localStorage: localStorageMock,
};
global.document = {
    getElementById: () => null,
    querySelector: () => null,
    addEventListener: () => {},
    body: { appendChild: () => {} },
    createElement: () => ({ className: '', textContent: '' })
};
global.localStorage = localStorageMock;

// --- Load Code ---
const authJsPath = path.join(__dirname, '../js/auth.js');
const authJsContent = fs.readFileSync(authJsPath, 'utf8');

// Execute the code
try {
    eval(authJsContent);
} catch (e) {
    console.error('Error loading js/auth.js:', e);
    process.exit(1);
}

// --- Test Helper ---
let passed = 0;
let failed = 0;

function test(name, fn) {
    try {
        fn();
        console.log(`✅ ${name}`);
        passed++;
    } catch (e) {
        console.error(`❌ ${name}`);
        console.error(e);
        failed++;
    }
}

function expect(actual) {
    return {
        toBe: (expected) => {
            if (actual !== expected) {
                throw new Error(`Expected ${expected} but got ${actual}`);
            }
        },
        toBeTruthy: () => {
            if (!actual) throw new Error(`Expected truthy but got ${actual}`);
        },
        toBeFalsy: () => {
            if (actual) throw new Error(`Expected falsy but got ${actual}`);
        }
    };
}

// --- Tests ---
console.log('🧪 Starting Tests for loginUser...');

test('Admin user initialized by IIFE', () => {
    const users = JSON.parse(localStorage.getItem('ks_users') || '[]');
    const admin = users.find(u => u.email === 'admin@kingslayer.com');
    expect(!!admin).toBeTruthy();
});

test('Login with valid credentials', () => {
    // Setup
    const email = 'test@example.com';
    const password = 'password123';

    let users = JSON.parse(localStorage.getItem('ks_users') || '[]');
    users = users.filter(u => u.email !== email);
    users.push({ email, password });
    localStorage.setItem('ks_users', JSON.stringify(users));

    // Action
    const result = window.loginUser(email, password);

    // Assert
    expect(result).toBeTruthy();
    const currentUser = JSON.parse(localStorage.getItem('ks_current_user'));
    expect(currentUser.email).toBe(email);
});

test('Login with invalid password', () => {
     // Setup
    const email = 'test2@example.com';
    const password = 'password123';

    let users = JSON.parse(localStorage.getItem('ks_users') || '[]');
    users = users.filter(u => u.email !== email);
    users.push({ email, password });
    localStorage.setItem('ks_users', JSON.stringify(users));

    // Action
    const result = window.loginUser(email, 'wrongpass');

    // Assert
    expect(result).toBeFalsy();
});

test('Login with non-existent user', () => {
    // Action
    const result = window.loginUser('ghost@example.com', 'password');

    // Assert
    expect(result).toBeFalsy();
});

test('Login with empty storage', () => {
    // Setup
    localStorage.clear();

    // Action
    const result = window.loginUser('any@example.com', 'any');

    // Assert
    expect(result).toBeFalsy();
});

// Summary
console.log('---------------------------------------------------');
if (failed === 0) {
    console.log(`🎉 All ${passed} tests passed!`);
    process.exit(0);
} else {
    console.error(`💥 ${failed} tests failed.`);
    process.exit(1);
}
