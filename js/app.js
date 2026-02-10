/**
 * KingSlayer - Premium Gaming Top-Up Logic
 */

const ADMIN_PASSWORD = 'Dio213z';

const GAME_PACKAGES = {
  "MOBILE LEGENDS": [
    { "name": "💎 Weekly Diamond Pass", "price": "Rp28.777" },
    { "name": "💎 5", "price": "Rp1.800" },
    { "name": "💎 12", "price": "Rp3.800" },
    { "name": "💎 14", "price": "Rp4.300" },
    { "name": "💎 19", "price": "Rp5.800" },
    { "name": "💎 28", "price": "Rp8.200" },
    { "name": "💎 36", "price": "Rp10.200" },
    { "name": " 45", "price": "Rp13.300" },
    { "name": "💎 50", "price": "Rp14.000" },
    { "name": "💎 59", "price": "Rp16.200" },
    { "name": "💎 67", "price": "Rp18.300" },
    { "name": "💎 70", "price": "Rp19.200" },
    { "name": "💎 85", "price": "Rp22.700" },
    { "name": "💎 100", "price": "Rp27.200" },
    { "name": "💎 112", "price": "Rp30.700" },
    { "name": "💎 140", "price": "Rp37.900" },
    { "name": "💎 145", "price": "Rp40.700" },
    { "name": "💎 170", "price": "Rp45.200" },
    { "name": "💎 185", "price": "Rp49.500" },
    { "name": "💎 222", "price": "Rp58.700" },
    { "name": "💎 240", "price": "Rp63.300" },
    { "name": "💎 257", "price": "Rp68.200" },
    { "name": "💎 284", "price": "Rp74.900" },
    { "name": "💎 296", "price": "Rp77.700" },
    { "name": "💎 344", "price": "Rp91.000" },
    { "name": "💎 355", "price": "Rp93.500" },
    { "name": "💎 408", "price": "Rp107.000" },
    { "name": "💎 429", "price": "Rp113.000" },
    { "name": "💎 460", "price": "Rp121.500" },
    { "name": "💎 514", "price": "Rp135.500" },
    { "name": "💎 568", "price": "Rp146.500" },
    { "name": "💎 600", "price": "Rp155.000" },
    { "name": "💎 706", "price": "Rp182.000" },
    { "name": "💎 875", "price": "Rp222.000" },
    { "name": "💎 963", "price": "Rp247.000" },
    { "name": "💎 1.050", "price": "Rp269.000" },
    { "name": "💎 1.136", "price": "Rp291.000" },
    { "name": "💎 1.159", "price": "Rp298.000" },
    { "name": "💎 1.220", "price": "Rp307.000" },
    { "name": "💎 1.412", "price": "Rp357.000" },
    { "name": "💎 1.704", "price": "Rp438.000" },
    { "name": "💎 1.750", "price": "Rp445.000" },
    { "name": "💎 2.010", "price": "Rp479.000" },
    { "name": "💎 2.195", "price": "Rp527.000" },
    { "name": "💎 2.380", "price": "Rp579.000" },
    { "name": "💎 2.901", "price": "Rp705.000" },
    { "name": "💎 3.688", "price": "Rp899.000" },
    { "name": "💎 4.394", "price": "Rp1.049.000" },
    { "name": "💎 5.532", "price": "Rp1.329.000" },
    { "name": "💎 7.720", "price": "Rp1.852.000" },
    { "name": "💎 9.288", "price": "Rp2.220.000" },
    { "name": "💎 10.050", "price": "Rp2.378.000" },
    { "name": "💎 12.976", "price": "Rp3.108.000" },
    { "name": "💎 16.080", "price": "Rp3.828.000" },
    { "name": "💎 27.864", "price": "Rp6.655.000" }
  ],
  "FREE FIRE": [
    { "name": "🚀 Member Mingguan", "price": "Rp27.555" },
    { "name": "🚀 Member Bulanan", "price": "Rp80.565" },
    { "name": "💎 75 ⭐", "price": "Rp10.000" },
    { "name": "💎 80", "price": "HABIS" },
    { "name": "💎 150 ⭐", "price": "Rp20.000" },
    { "name": "💎 130", "price": "Rp20.000" },
    { "name": "💎 210 ⭐", "price": "Rp30.000" },
    { "name": "💎 190", "price": "Rp30.000" },
    { "name": "💎 370", "price": "Rp50.000" },
    { "name": "💎 770 ⭐", "price": "Rp100.000" },
    { "name": "💎 740", "price": "Rp100.000" },
    { "name": "💎 5", "price": "Rp1.490" },
    { "name": "💎 10", "price": "Rp1.990" },
    { "name": "💎 15", "price": "Rp2.490" },
    { "name": "💎 20", "price": "Rp3.490" },
    { "name": "💎 25", "price": "Rp4.490" },
    { "name": "💎 30", "price": "Rp4.990" },
    { "name": " 40", "price": "Rp6.490" },
    { "name": "💎 50", "price": "Rp7.490" },
    { "name": "💎 60", "price": "Rp8.990" },
    { "name": "💎 75 ⭐", "price": "Rp9.990" },
    { "name": "💎 80", "price": "Rp10.990" },
    { "name": "💎 90", "price": "Rp12.490" },
    { "name": "💎 95", "price": "Rp12.990" },
    { "name": "💎 100", "price": "Rp13.990" },
    { "name": "💎 120", "price": "Rp14.990" },
    { "name": "💎 130", "price": "Rp16.990" },
    { "name": "💎 145", "price": "Rp18.990" },
    { "name": "💎 150 ⭐", "price": "Rp19.490" },
    { "name": "💎 160", "price": "Rp21.990" },
    { "name": "💎 170", "price": "Rp22.990" },
    { "name": "💎 180", "price": "Rp24.990" },
    { "name": " 190", "price": "Rp25.990" },
    { "name": "💎 210 ⭐", "price": "Rp27.990" },
    { "name": "💎 250", "price": "Rp33.990" },
    { "name": "💎 260", "price": "Rp34.990" },
    { "name": "💎 280", "price": "Rp36.990" },
    { "name": "💎 300", "price": "Rp40.000" },
    { "name": "💎 350", "price": "Rp46.000" },
    { "name": "💎 375", "price": "Rp48.000" },
    { "name": "💎 400 ⭐", "price": "Rp50.000" },
    { "name": "💎 405", "price": "Rp51.000" },
    { "name": "💎 420", "price": "Rp53.000" },
    { "name": "💎 425", "price": "Rp54.000" },
    { "name": "💎 475", "price": "Rp59.000" },
    { "name": "💎 500 ⭐", "price": "Rp62.000" },
    { "name": "💎 520", "price": "Rp66.000" },
    { "name": "💎 545", "price": "Rp69.000" },
    { "name": " 565", "price": "Rp72.000" },
    { "name": "💎 600", "price": "Rp77.000" },
    { "name": "💎 645", "price": "Rp82.000" },
    { "name": "💎 655", "price": "Rp84.000" },
    { "name": "💎 700", "price": "Rp90.000" },
    { "name": "💎 725", "price": "Rp93.000" },
    { "name": "💎 770 ⭐", "price": "Rp100.000" },
    { "name": "💎 800", "price": "Rp105.000" },
    { "name": "💎 860", "price": "Rp112.000" },
    { "name": "💎 925", "price": "Rp121.000" },
    { "name": "💎 1000", "price": "Rp130.000" },
    { "name": "💎 1200", "price": "Rp150.000" },
    { "name": "💎 1300", "price": "Rp162.000" },
    { "name": "💎 1440 ⭐", "price": "Rp180.000" },
    { "name": "💎 1490", "price": "Rp186.000" },
    { "name": "💎 1580", "price": "Rp198.000" },
    { "name": "💎 1800", "price": "Rp226.000" },
    { "name": "💎 2000 ⭐", "price": "Rp252.000" },
    { "name": "💎 2100", "price": "Rp265.000" },
    { "name": "💎 2200", "price": "Rp278.000" },
    { "name": "💎 2280", "price": "Rp290.000" },
    { "name": "💎 2350", "price": "Rp300.000" },
    { "name": "💎 2400", "price": "Rp310.000" },
    { "name": "💎 2575", "price": "Rp335.000" },
    { "name": "💎 2720", "price": "Rp355.000" },
    { "name": "💎 3000", "price": "Rp390.000" },
    { "name": " 3310", "price": "Rp430.000" },
    { "name": "💎 3640", "price": "Rp470.000" },
    { "name": "💎 3800", "price": "Rp495.000" },
    { "name": "💎 4000 ⭐", "price": "Rp520.000" },
    { "name": "💎 4340", "price": "Rp565.000" },
    { "name": "💎 4720", "price": "Rp615.000" },
    { "name": "💎 5500", "price": "Rp720.000" },
    { "name": "💎 6000", "price": "Rp790.000" },
    { "name": "💎 6480", "price": "Rp850.000" },
    { "name": "💎 6900", "price": "Rp910.000" },
    { "name": "💎 7290", "price": "Rp960.000" },
    { "name": "💎 8010", "price": "Rp1.050.000" },
    { "name": "💎 9290", "price": "Rp1.200.000" },
    { "name": "💎 9800", "price": "Rp1.260.000" },
    { "name": "💎 14.850", "price": "Rp1.850.000" },
    { "name": "💎 36.500", "price": "Rp4.750.000" },
    { "name": "💎 37.050", "price": "Rp4.820.000" },
    { "name": "💎 73.100", "price": "Rp9.000.000" }
  ],
  "PUBG MOBILE": [
    { "name": "🎯 60 UC", "price": "Rp16.200" },
    { "name": "🎯 120 UC", "price": "Rp32.400" },
    { "name": "🎯 180 UC", "price": "Rp47.600" },
    { "name": "🎯 240 UC", "price": "Rp63.800" },
    { "name": "🎯 325 UC (300+25)", "price": "Rp79.500" },
    { "name": "🎯 385 UC (360+25)", "price": "Rp94.600" },
    { "name": "🎯 445 UC (420+25)", "price": "Rp111.800" },
    { "name": "🎯 505 UC (480+25)", "price": "Rp126.900" },
    { "name": "🎯 565 UC (540+25)", "price": "Rp142.200" },
    { "name": "🎯 660 UC (600+60)", "price": "Rp158.700" },
    { "name": "🎯 720 UC", "price": "Rp174.900" },
    { "name": "🎯 780 UC", "price": "Rp189.500" },
    { "name": "🎯 840 UC", "price": "Rp204.000" },
    { "name": "🎯 900 UC", "price": "Rp219.000" },
    { "name": "🎯 985 UC", "price": "Rp244.000" },
    { "name": " 1105 UC", "price": "Rp274.500" },
    { "name": "🎯 1320 UC", "price": "Rp313.500" },
    { "name": "🎯 1500 UC", "price": "Rp364.000" },
    { "name": " 1800 UC", "price": "Rp394.000" },
    { "name": " 2125 UC", "price": "Rp467.000" },
    { "name": " 2460 UC", "price": "Rp547.000" },
    { "name": " 2785 UC", "price": "Rp623.000" },
    { "name": "🎯 3120 UC", "price": "Rp705.500" },
    { "name": "🎯 3850 UC", "price": "Rp782.000" },
    { "name": " 4030 UC", "price": "Rp828.000" },
    { "name": "🎯 4510 UC", "price": "Rp935.000" },
    { "name": " 5650 UC", "price": "Rp1.171.000" },
    { "name": "🎯 8100 UC", "price": "Rp1.564.000" },
    { "name": "🎯 Elite Pass PUBG Mobile", "price": "Rp184.000" },
    { "name": "🎯 Elite Pass Plus PUBG Mobile", "price": "Rp465.000" },
    { "name": "🎯 60 UC Voucher", "price": "Rp16.000" },
    { "name": "🎯 325 UC Voucher", "price": "Rp79.000" },
    { "name": "🎯 660 UC Voucher", "price": "Rp158.000" },
    { "name": "🎯 1800 UC Voucher", "price": "Rp394.000" },
    { "name": "🎯 3850 UC Voucher", "price": "Rp782.000" }
  ],
  "GENSHIN IMPACT": [
    { "name": "💎 30 Crystal", "price": "Rp9.900" },
    { "name": "💎 60 Crystal", "price": "Rp19.800" }
  ],
  "TELEGRAM STARS": [
    { "name": "⭐ 50 Stars", "price": "Rp17.292" },
    { "name": "⭐ 75 Stars", "price": "Rp24.342" },
    { "name": "⭐ 100 Stars", "price": "Rp31.492" },
    { "name": "⭐ 125 Stars", "price": "Rp38.542" },
    { "name": "⭐ 150 Stars", "price": "Rp45.692" },
    { "name": "⭐ 175 Stars", "price": "Rp55.692" },
    { "name": "⭐ 200 Stars", "price": "Rp59.992" },
    { "name": "⭐ 250 Stars", "price": "Rp74.192" },
    { "name": "⭐ 300 Stars", "price": "Rp86.992" },
    { "name": " 350 Stars", "price": "Rp104.692" },
    { "name": "⭐ 400 Stars", "price": "Rp118.692" },
    { "name": "⭐ 450 Stars", "price": "Rp132.992" },
    { "name": "⭐ 500 Stars", "price": "Rp147.192" },
    { "name": "⭐ 550 Stars", "price": "Rp161.392" },
    { "name": "⭐ 600 Stars", "price": "Rp175.692" },
    { "name": "⭐ 650 Stars", "price": "Rp189.992" },
    { "name": "⭐ 700 Stars", "price": "Rp204.092" },
    { "name": "⭐ 750 Stars", "price": "Rp218.392" },
    { "name": "⭐ 800 Stars", "price": "Rp232.592" },
    { "name": "⭐ 850 Stars", "price": "Rp246.792" },
    { "name": " 900 Stars", "price": "Rp260.992" },
    { "name": "⭐ 950 Stars", "price": "Rp275.092" },
    { "name": "⭐ 1000 Stars", "price": "Rp289.692" },
    { "name": "⭐ 1100 Stars", "price": "Rp320.992" },
    { "name": "⭐ 1200 Stars", "price": "Rp349.492" },
    { "name": "⭐ 1500 Stars", "price": "Rp434.892" },
    { "name": "⭐ 1700 Stars", "price": "Rp486.492" },
    { "name": "⭐ 1800 Stars", "price": "Rp514.592" },
    { "name": " 2000 Stars", "price": "Rp570.992" },
    { "name": "⭐ 2500 Stars", "price": "Rp710.192" },
    { "name": "⭐ 3000 Stars", "price": "Rp850.692" },
    { "name": "⭐ 3500 Stars", "price": "Rp995.970" },
    { "name": "⭐ 4000 Stars", "price": "Rp1.136.540" },
    { "name": "⭐ 4500 Stars", "price": "Rp1.277.100" },
    { "name": "⭐ 5000 Stars", "price": "Rp1.417.670" },
    { "name": "⭐ 5500 Stars", "price": "Rp1.558.240" },
    { "name": "⭐ 6000 Stars", "price": "Rp1.698.800" },
    { "name": "⭐ 6500 Stars", "price": "Rp1.839.370" },
    { "name": "⭐ 7000 Stars", "price": "Rp1.979.940" },
    { "name": "⭐ 8000 Stars", "price": "Rp2.269.070" },
    { "name": "⭐ 9000 Stars", "price": "Rp2.550.200" },
    { "name": "⭐ 10000 Stars", "price": "Rp2.831.340" },
    { "name": "⭐ 12000 Stars", "price": "Rp3.393.600" },
    { "name": "⭐ 15000 Stars", "price": "Rp4.237.000" }
  ]
};

// State
let currentOrder = {
  game: '',
  package: '',
  price: '',
  unitPrice: 0,
  quantity: 1,
  paymentMethod: ''
};

let allOrders = [];
let isSubmitting = false;
let adminClickCount = 0;
let adminClickTimer = null;
let currentAdminOrderId = null;

const defaultConfig = {
  store_name: 'KingSlayer',
  tagline: 'Top Up Game Premium & Terpercaya',
  footer_text: 'Proses Cepat & Amanah',
  whatsapp_number: '+62 856-4633-5331'
};

// SDK Handlers
const dataHandler = {
  onDataChanged(data) {
    if (!data) return;
    allOrders = data.filter(item => item.order_number);
  }
};

async function initDataSDK() {
  if (window.dataSdk) {
    try {
      await window.dataSdk.init(dataHandler);
    } catch (e) { console.error('Data SDK Error:', e); }
  }
}

async function onConfigChange(config) {
  const elements = {
    'storeName': config.store_name || defaultConfig.store_name,
    'navStoreName': config.store_name || defaultConfig.store_name,
    'tagline': config.tagline || defaultConfig.tagline,
    'footerText': config.footer_text || defaultConfig.footer_text,
    'whatsappNumber': config.whatsapp_number || defaultConfig.whatsapp_number
  };

  for (const [id, val] of Object.entries(elements)) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }
}

async function initElementSDK() {
  if (window.elementSdk) {
    try {
      await window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities: () => ({ recolorables: [], borderables: [] }),
        mapToEditPanelValues: (config) => new Map(Object.entries(config))
      });
      await onConfigChange(window.elementSdk.config);
    } catch (e) { console.error('Element SDK Error:', e); }
  }
}

// UI Core
function showToast(msg) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

function selectGame(gameId) {
  const mapping = {
    'ml': 'MOBILE LEGENDS',
    'ff': 'FREE FIRE',
    'pubg': 'PUBG MOBILE',
    'genshin': 'GENSHIN IMPACT',
    'telegram': 'TELEGRAM STARS'
  };
  const gameKey = mapping[gameId.toLowerCase()];
  if (!gameKey) {
    if (gameId === 'roblox') return window.open('https://direz-store-robloxrobux.my.canva.site/', '_blank');
    return showToast('🎮 Hubungi admin untuk game ini');
  }

  currentOrder.game = gameKey;
  renderPackageSelection(gameKey);
  openModal('packageModal');
}

function renderPackageSelection(gameKey) {
  const container = document.getElementById('packageList');
  const packages = GAME_PACKAGES[gameKey];

  container.innerHTML = packages.map(pkg => `
    <div class="price-box-mini" onclick="selectPackage('${pkg.name}', '${pkg.price}')">
      <div class="mini-diamond">${pkg.name}</div>
      <div class="mini-price">${pkg.price}</div>
    </div>
  `).join('');
}

function selectPackage(name, price) {
  if (price === 'HABIS') return showToast('❌ Stok sedang kosong');

  currentOrder.package = name;
  currentOrder.price = price;
  currentOrder.unitPrice = parseInt(price.replace(/[^0-9]/g, ''));
  currentOrder.quantity = 1;

  document.querySelectorAll('.price-box-mini').forEach(el => {
    if (el.querySelector('.mini-diamond').textContent === name) el.classList.add('selected');
    else el.classList.remove('selected');
  });

  updateOrderSummary();
}

function updateOrderSummary() {
  const total = currentOrder.unitPrice * currentOrder.quantity;
  document.getElementById('summaryGame').textContent = currentOrder.game;
  document.getElementById('summaryPackage').textContent = currentOrder.package;
  document.getElementById('summaryTotal').textContent = `Rp${total.toLocaleString('id-ID')}`;
  document.getElementById('qtyDisplay').textContent = currentOrder.quantity;
}

function adjustQty(amount) {
  const newQty = currentOrder.quantity + amount;
  if (newQty >= 1 && newQty <= 10) {
    currentOrder.quantity = newQty;
    updateOrderSummary();
  } else if (newQty > 10) {
    showToast('⚠️ Maksimal 10x order!');
  }
}

function selectPaymentMethod(method, el) {
  currentOrder.paymentMethod = method;
  document.querySelectorAll('.payment-btn').forEach(btn => btn.classList.remove('selected'));
  el.classList.add('selected');
}

async function submitOrder(e) {
  e.preventDefault();
  if (isSubmitting) return;
  if (!currentOrder.package || !currentOrder.paymentMethod) return showToast('❌ Pilih paket & pembayaran!');

  const gameId = document.getElementById('gameIdInput').value.trim();
  const nickname = document.getElementById('nicknameInput').value.trim();
  const whatsapp = document.getElementById('whatsappInput').value.trim();

  if (!gameId || !nickname || !whatsapp) return showToast('❌ Lengkapi data pemain!');

  isSubmitting = true;
  startLoading();

  try {
    const orderNumber = `KS-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const orderData = {
      order_number: orderNumber,
      game: currentOrder.game,
      diamond: currentOrder.package,
      price: document.getElementById('summaryTotal').textContent,
      game_id: gameId,
      nickname,
      whatsapp,
      payment_method: currentOrder.paymentMethod,
      status: 'pending',
      order_date: new Date().toISOString()
    };

    if (window.dataSdk) {
      const result = await window.dataSdk.create(orderData);
      if (result.isOk) {
        if (window.saveTransaction) window.saveTransaction(orderData);
        finishLoading(() => showReceipt(orderData));
      } else {
        stopLoading();
        showToast('❌ Gagal membuat pesanan');
      }
    }
  } catch (err) {
    console.error(err);
    stopLoading();
    showToast('❌ Terjadi kesalahan');
  } finally {
    isSubmitting = false;
  }
}

// Modal System
function openModal(id) {
  document.getElementById(id).classList.add('show');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('show');
}

// Loading Rocket
function startLoading() {
  const modal = document.getElementById('loadingModal');
  const bar = modal.querySelector('.progress-bar');
  const rocket = modal.querySelector('.rocket-icon');
  const percent = modal.querySelector('.progress-percent');

  modal.classList.add('show');
  let p = 0;
  const interval = setInterval(() => {
    p += Math.random() * 5;
    if (p >= 100) {
      p = 100;
      clearInterval(interval);
    }
    bar.style.width = p + '%';
    percent.textContent = Math.floor(p) + '%';
    rocket.style.transform = `translateY(-${p * 2}px)`;
  }, 100);
  window.loadingInterval = interval;
}

function stopLoading() {
  clearInterval(window.loadingInterval);
  document.getElementById('loadingModal').classList.remove('show');
}

function finishLoading(callback) {
  setTimeout(() => {
    stopLoading();
    callback();
  }, 500);
}

// Receipt
function showReceipt(data) {
  closeModal('packageModal');
  document.getElementById('receiptOrderNum').textContent = data.order_number;
  document.getElementById('receiptGame').textContent = data.game;
  document.getElementById('receiptPackage').textContent = data.diamond;
  document.getElementById('receiptTotal').textContent = data.price;
  window.currentReceipt = data;
  openModal('receiptModal');
}

function sendToWhatsApp() {
  const d = window.currentReceipt;
  const adminNum = document.getElementById('whatsappNumber').textContent.replace(/\D/g, '');
  const msg = encodeURIComponent(`Halo KingSlayer! 👋\n\nKonfirmasi Pesanan:\n📦 No: ${d.order_number}\n🎮 Game: ${d.game}\n💎 Paket: ${d.diamond}\n💰 Total: ${d.price}\n\n👤 Pemain: ${d.nickname} (${d.game_id})\n📱 WA: ${d.whatsapp}\n💳 Bayar: ${d.payment_method}`);
  window.open(`https://wa.me/${adminNum}?text=${msg}`, '_blank');
}

// History
function openHistory() {
  openModal('historyModal');
  document.getElementById('historyList').innerHTML = '';
}

function searchOrders() {
  const phone = document.getElementById('historyPhone').value.trim();
  if (!phone) return showToast('❌ Masukkan nomor WhatsApp');

  const search = normalizePhone(phone);
  const matched = allOrders.filter(o => normalizePhone(o.whatsapp || '').includes(search));

  const list = document.getElementById('historyList');
  if (matched.length === 0) {
    list.innerHTML = '<div class="text-center py-8">📭 Pesanan tidak ditemukan</div>';
  } else {
    list.innerHTML = matched.map(o => `
      <div class="order-item-history">
        <div class="flex justify-between mb-2">
          <span class="font-bold text-primary">${o.order_number}</span>
          <span class="status-badge ${o.status}">${o.status.toUpperCase()}</span>
        </div>
        <div class="text-sm text-slate-400">${o.game} - ${o.diamond}</div>
        <div class="text-sm font-bold mt-1">${o.price}</div>
      </div>
    `).join('');
  }
}

function normalizePhone(p) {
  p = p.replace(/\D/g, '');
  return p.startsWith('62') ? p.substring(2) : (p.startsWith('0') ? p.substring(1) : p);
}

// Admin
function handleOwnerClick() {
  adminClickCount++;
  clearTimeout(adminClickTimer);
  if (adminClickCount === 10) {
    adminClickCount = 0;
    openModal('adminLoginModal');
  }
  adminClickTimer = setTimeout(() => adminClickCount = 0, 3000);
}

function handleAdminLogin(e) {
  e.preventDefault();
  const pass = document.getElementById('adminPassInput').value;
  if (pass === ADMIN_PASSWORD) {
    closeModal('adminLoginModal');
    showAdminPanel();
  } else {
    showToast('❌ Password salah');
  }
}

function showAdminPanel() {
  updateAdminStats();
  renderAdminOrders();
  openModal('adminPanelModal');
}

function updateAdminStats() {
  const total = allOrders.length;
  const success = allOrders.filter(o => o.status === 'success').length;
  const revenue = allOrders.reduce((acc, o) => acc + parseInt(o.price.replace(/[^0-9]/g, '') || 0), 0);

  document.getElementById('adminStatTotal').textContent = total;
  document.getElementById('adminStatSuccess').textContent = success;
  document.getElementById('adminStatRevenue').textContent = `Rp${revenue.toLocaleString('id-ID')}`;
}

function renderAdminOrders() {
  const list = document.getElementById('adminOrdersList');
  const sorted = [...allOrders].sort((a, b) => new Date(b.order_date) - new Date(a.order_date));

  list.innerHTML = sorted.map(o => `
    <div class="admin-row">
      <div>${o.order_number}</div>
      <div>${o.game}</div>
      <div>${o.nickname}</div>
      <div>${o.status.toUpperCase()}</div>
      <button onclick="viewAdminDetail('${o.__backendId}')" class="btn-mini">DETAIL</button>
    </div>
  `).join('');
}

async function viewAdminDetail(id) {
  const o = allOrders.find(x => x.__backendId === id);
  if (!o) return;
  currentAdminOrderId = id;
  document.getElementById('adminDetailContent').innerHTML = `
    <p>📦 <b>No:</b> ${o.order_number}</p>
    <p>🎮 <b>Game:</b> ${o.game} (${o.diamond})</p>
    <p>👤 <b>User:</b> ${o.nickname} (${o.game_id})</p>
    <p>📱 <b>WA:</b> ${o.whatsapp}</p>
    <p>💳 <b>Pay:</b> ${o.payment_method}</p>
    <p>💰 <b>Total:</b> ${o.price}</p>
    <div class="mt-4">
      <label class="block text-xs mb-1">STATUS</label>
      <select id="adminStatusUpdate" class="field-input py-2">
        <option value="pending" ${o.status === 'pending' ? 'selected' : ''}>PENDING</option>
        <option value="success" ${o.status === 'success' ? 'selected' : ''}>SUCCESS</option>
        <option value="failed" ${o.status === 'failed' ? 'selected' : ''}>FAILED</option>
      </select>
    </div>
  `;
  openModal('adminDetailModal');
}

async function saveAdminStatus() {
  const newStatus = document.getElementById('adminStatusUpdate').value;
  const o = allOrders.find(x => x.__backendId === currentAdminOrderId);
  if (!o) return;

  o.status = newStatus;
  if (window.dataSdk) {
    const res = await window.dataSdk.update(o);
    if (res.isOk) {
      showToast('✅ Status diupdate');
      closeModal('adminDetailModal');
      renderAdminOrders();
      updateAdminStats();
    }
  }
}

// Search & Misc
function filterGames() {
  const q = document.getElementById('gameSearch').value.toLowerCase();
  document.querySelectorAll('.game-card').forEach(card => {
    const name = card.querySelector('.game-name').textContent.toLowerCase();
    card.style.display = name.includes(q) ? 'flex' : 'none';
  });
}

function requestGame() {
  const num = document.getElementById('whatsappNumber').textContent.replace(/\D/g, '');
  window.open(`https://wa.me/${num}?text=${encodeURIComponent('Halo, saya ingin request game yang belum ada!')}`, '_blank');
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function toggleMenu() {
  const links = document.getElementById('navLinks');
  links.classList.toggle('hidden');
}

function closeMenu() {
  const links = document.getElementById('navLinks');
  if (!links.classList.contains('hidden')) {
    links.classList.add('hidden');
  }
}

// Init
window.onload = () => {
  initDataSDK();
  initElementSDK();
};
