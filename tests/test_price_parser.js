const fs = require('fs');
const path = require('path');
const vm = require('vm');

// Mock browser environment
global.window = {
  dataSdk: undefined,
  elementSdk: undefined,
  onload: null,
  loadingInterval: null,
  currentReceipt: null,
  saveTransaction: null,
  open: () => {}
};

global.document = {
  addEventListener: () => {},
  getElementById: () => ({
    classList: { add: () => {}, remove: () => {}, contains: () => false },
    style: {},
    querySelector: () => ({ textContent: '' }),
    querySelectorAll: () => [],
    value: '',
    textContent: ''
  }),
  body: {
    style: {},
    appendChild: () => {}
  },
  createElement: () => ({ className: '', textContent: '', remove: () => {} }),
  querySelectorAll: () => []
};

global.localStorage = {
  getItem: () => null,
  setItem: () => {}
};

// Read app.js
const appJsPath = path.join(__dirname, '../js/app.js');
const appJsContent = fs.readFileSync(appJsPath, 'utf8');

// Execute app.js in the global context
try {
  vm.runInThisContext(appJsContent);
} catch (e) {
  console.error('Error loading js/app.js:', e);
  process.exit(1);
}

// Helper for assertions
let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    // console.log(`✅ PASS: ${message}`);
  } else {
    failed++;
    console.error(`❌ FAIL: ${message}`);
  }
}

console.log('Running tests for parsePrice...');

// Test Cases
try {
  // Standard prices
  assert(parsePrice('Rp10.000') === 10000, 'Parses "Rp10.000" correctly');
  assert(parsePrice('Rp 10.000') === 10000, 'Parses "Rp 10.000" correctly');
  assert(parsePrice('10000') === 10000, 'Parses "10000" correctly');

  // Large numbers
  assert(parsePrice('Rp1.500.000') === 1500000, 'Parses "Rp1.500.000" correctly');

  // Edge cases
  assert(Number.isNaN(parsePrice('')), 'Returns NaN for empty string');
  assert(Number.isNaN(parsePrice('abc')), 'Returns NaN for non-numeric string');

  // Mixed content
  assert(parsePrice('Price: 50.000') === 50000, 'Parses "Price: 50.000" correctly');

} catch (e) {
  console.error('Test execution error:', e);
  failed++;
}

console.log(`\nTests completed: ${passed} passed, ${failed} failed.`);

if (failed > 0) {
  process.exit(1);
}
