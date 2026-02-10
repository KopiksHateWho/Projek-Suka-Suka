
// KingSlayer - Main Application Logic

let currentOrder = { game: '', diamond: '', price: '', unitPrice: '', quantity: 1 };
let allOrders = [];
let isSubmitting = false;
let ownerClickCount = 0;
let ownerClickTimer = null;

// NOTE: This is a client-side concept for this portfolio project.
// In a production environment, authentication would be handled by a secure backend.
const ADMIN_PASSWORD = 'Dio213z';
let currentAdminOrderId = null;

const games = [
  { name: 'Mobile Legends', id: 'ml', emoji: '⚔️', key: 'MOBILE LEGENDS' },
  { name: 'Free Fire', id: 'ff', emoji: '🔫', key: 'FREE FIRE' },
  { name: 'PUBG Mobile', id: 'pubg', emoji: '🪖', key: 'PUBG MOBILE' },
  { name: 'Roblox', id: 'roblox', emoji: '🔳', external: 'https://direz-store-robloxrobux.my.canva.site/' },
  { name: 'Genshin Impact', id: 'genshin', emoji: '✨', key: 'GENSHIN IMPACT' },
  { name: 'Telegram Stars', id: 'telegram', emoji: '✈️', key: 'TELEGRAM STARS' }
];

const GAME_PACKAGES = {
  'MOBILE LEGENDS': [
    { diamond: '💎 Weekly Diamond Pass', price: 'Rp28.777' },
    { diamond: '💎 5', price: 'Rp1.800' },
    { diamond: '💎 12', price: 'Rp3.800' },
    { diamond: '💎 14', price: 'Rp4.300' },
    { diamond: '💎 19', price: 'Rp5.800' },
    { diamond: '💎 28', price: 'Rp8.200' },
    { diamond: '💎 36', price: 'Rp10.200' },
    { diamond: '💎 50', price: 'Rp14.000' },
    { diamond: '💎 59', price: 'Rp16.200' },
    { diamond: '💎 67', price: 'Rp18.300' },
    { diamond: '💎 70', price: 'Rp19.200' },
    { diamond: '💎 85', price: 'Rp22.700' },
    { diamond: '💎 100', price: 'Rp27.200' },
    { diamond: '💎 112', price: 'Rp30.700' },
    { diamond: '💎 140', price: 'Rp37.900' },
    { diamond: '💎 145', price: 'Rp40.700' },
    { diamond: '💎 170', price: 'Rp45.200' },
    { diamond: '💎 185', price: 'Rp49.500' },
    { diamond: '💎 222', price: 'Rp58.700' },
    { diamond: '💎 240', price: 'Rp63.300' },
    { diamond: '💎 257', price: 'Rp68.200' },
    { diamond: '💎 284', price: 'Rp74.900' },
    { diamond: '💎 296', price: 'Rp77.700' },
    { diamond: '💎 344', price: 'Rp91.000' },
    { diamond: '💎 355', price: 'Rp93.500' },
    { diamond: '💎 408', price: 'Rp107.000' },
    { diamond: '💎 429', price: 'Rp113.000' },
    { diamond: '💎 460', price: 'Rp121.500' },
    { diamond: '💎 514', price: 'Rp135.500' },
    { diamond: '💎 568', price: 'Rp146.500' },
    { diamond: '💎 600', price: 'Rp155.000' },
    { diamond: '💎 706', price: 'Rp182.000' },
    { diamond: '💎 875', price: 'Rp222.000' },
    { diamond: '💎 963', price: 'Rp247.000' },
    { diamond: '💎 1.050', price: 'Rp269.000' },
    { diamond: '💎 1.136', price: 'Rp291.000' },
    { diamond: '💎 1.159', price: 'Rp298.000' },
    { diamond: '💎 1.220', price: 'Rp307.000' },
    { diamond: '💎 1.412', price: 'Rp357.000' },
    { diamond: '💎 1.704', price: 'Rp438.000' },
    { diamond: '💎 1.750', price: 'Rp445.000' },
    { diamond: '💎 2.010', price: 'Rp479.000' },
    { diamond: '💎 2.195', price: 'Rp527.000' },
    { diamond: '💎 2.380', price: 'Rp579.000' },
    { diamond: '💎 2.901', price: 'Rp705.000' },
    { diamond: '💎 3.688', price: 'Rp899.000' },
    { diamond: '💎 4.394', price: 'Rp1.049.000' },
    { diamond: '💎 5.532', price: 'Rp1.329.000' },
    { diamond: '💎 7.720', price: 'Rp1.852.000' },
    { diamond: '💎 9.288', price: 'Rp2.220.000' },
    { diamond: '💎 10.050', price: 'Rp2.378.000' },
    { diamond: '💎 12.976', price: 'Rp3.108.000' },
    { diamond: '💎 16.080', price: 'Rp3.828.000' },
    { diamond: '💎 27.864', price: 'Rp6.655.000' },
  ],
  'FREE FIRE': [
    { diamond: '🚀 Member Mingguan', price: 'Rp27.555' },
    { diamond: '🚀 Member Bulanan', price: 'Rp80.565' },
    { diamond: '💎 75 ⭐', price: 'Rp10.000' },
    { diamond: '💎 150 ⭐', price: 'Rp20.000' },
    { diamond: '💎 130', price: 'Rp20.000' },
    { diamond: '💎 210 ⭐', price: 'Rp30.000' },
    { diamond: '💎 190', price: 'Rp30.000' },
    { diamond: '💎 370', price: 'Rp50.000' },
    { diamond: '💎 770 ⭐', price: 'Rp100.000' },
    { diamond: '💎 740', price: 'Rp100.000' },
    { diamond: '💎 5', price: 'Rp1.490' },
    { diamond: '💎 10', price: 'Rp1.990' },
    { diamond: '💎 15', price: 'Rp2.490' },
    { diamond: '💎 20', price: 'Rp3.490' },
    { diamond: '💎 25', price: 'Rp4.490' },
    { diamond: '💎 30', price: 'Rp4.990' },
    { diamond: '💎 50', price: 'Rp7.490' },
    { diamond: '💎 60', price: 'Rp8.990' },
    { diamond: '💎 100', price: 'Rp13.990' },
    { diamond: '💎 1440 ⭐', price: 'Rp180.000' },
    { diamond: '💎 2000 ⭐', price: 'Rp252.000' },
    { diamond: '💎 7290', price: 'Rp960.000' },
  ],
  'PUBG MOBILE': [
    { diamond: '🎯 60 UC', price: 'Rp16.200' },
    { diamond: '🎯 120 UC', price: 'Rp32.400' },
    { diamond: '🎯 325 UC', price: 'Rp79.500' },
    { diamond: '🎯 660 UC', price: 'Rp158.700' },
    { diamond: '🎯 1800 UC', price: 'Rp394.000' },
    { diamond: '🎯 3850 UC', price: 'Rp782.000' },
    { diamond: '🎯 8100 UC', price: 'Rp1.564.000' },
  ],
  'GENSHIN IMPACT': [
    { diamond: '💎 30 Crystal', price: 'Rp9.900' },
    { diamond: '💎 60 Crystal', price: 'Rp19.800' },
  ],
  'TELEGRAM STARS': [
    { diamond: '⭐ 50 Stars', price: 'Rp17.292' },
    { diamond: '⭐ 100 Stars', price: 'Rp31.492' },
    { diamond: '⭐ 500 Stars', price: 'Rp147.192' },
    { diamond: '⭐ 1000 Stars', price: 'Rp289.692' },
  ],
};

const defaultConfig = {
  store_name: 'KingSlayer',
  tagline: 'Premium Gaming Top Up Service',
  footer_text: 'Fast & Secure Transactions',
  whatsapp_number: '+62 856-4633-5331'
};

// Security Helpers
function escapeHTML(str) {
  if (!str) return '';
  return str.toString().replace(/[&<>"']/g, function(m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m];
  });
}

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
    } catch (error) {
      console.error('Error initializing data SDK:', error);
    }
  }
}

async function onConfigChange(config) {
  const elements = ['storeName', 'tagline', 'footerText', 'whatsappNumber', 'navStoreName'];
  elements.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = config[id === 'navStoreName' ? 'store_name' : (id === 'whatsappNumber' ? 'whatsapp_number' : (id === 'footerText' ? 'footer_text' : (id === 'tagline' ? 'tagline' : 'store_name')))] || defaultConfig[id === 'navStoreName' ? 'store_name' : (id === 'whatsappNumber' ? 'whatsapp_number' : (id === 'footerText' ? 'footer_text' : (id === 'tagline' ? 'tagline' : 'store_name')))];
  });
}

async function initElementSDK() {
  if (window.elementSdk) {
    try {
      await window.elementSdk.init({
        defaultConfig: defaultConfig,
        onConfigChange: onConfigChange,
        mapToCapabilities: () => ({ recolorables: [], borderables: [], fontEditable: undefined, fontSizeable: undefined }),
        mapToEditPanelValues: (config) => new Map([
          ['store_name', config.store_name || defaultConfig.store_name],
          ['tagline', config.tagline || defaultConfig.tagline],
          ['footer_text', config.footer_text || defaultConfig.footer_text],
          ['whatsapp_number', config.whatsapp_number || defaultConfig.whatsapp_number]
        ])
      });
      await onConfigChange(window.elementSdk.config);
    } catch (error) {
      console.error('Error initializing element SDK:', error);
    }
  }
}

(async function init() {
  await initDataSDK();
  await initElementSDK();
  initMobileMenu();
})();

function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }
}

function parsePrice(priceStr) {
  return parseInt(priceStr.replace(/[^0-9]/g, ''));
}

function formatPrice(price) {
  return `Rp${price.toLocaleString('id-ID')}`;
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

function selectGame(gameId) {
  const game = games.find(g => g.id === gameId);
  if (!game) return;

  if (game.external) {
    window.open(game.external, '_blank');
    return;
  }

  renderPackages(gameId);

  setTimeout(() => {
    const priceContainer = document.getElementById('priceContainer');
    if (priceContainer) priceContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

function renderPackages(gameId) {
  const game = games.find(g => g.id === gameId);
  const packages = GAME_PACKAGES[game.key] || [];
  const panel = document.getElementById('dynamicPricePanel');
  const header = document.getElementById('dynamicPriceHeader');
  const grid = document.getElementById('dynamicPriceGrid');

  header.textContent = `💎 ${game.name.toUpperCase()} PACKAGES`;
  grid.innerHTML = '';

  packages.forEach(pkg => {
    const box = document.createElement('div');
    box.className = 'price-box';
    box.onclick = (e) => selectPackage(game.key, pkg.diamond, pkg.price, e);

    const diamondEl = document.createElement('div');
    diamondEl.className = 'diamond-value';
    diamondEl.textContent = pkg.diamond;

    const priceEl = document.createElement('div');
    priceEl.className = 'price-value';
    priceEl.textContent = pkg.price;

    box.appendChild(diamondEl);
    box.appendChild(priceEl);
    grid.appendChild(box);
  });

  panel.classList.add('active');
}

function selectPackage(game, diamond, price, event) {
  const element = event ? event.currentTarget : null;
  document.querySelectorAll('.price-box').forEach(item => item.classList.remove('selected'));
  if (element) element.classList.add('selected');

  currentOrder.game = game;
  currentOrder.diamond = diamond;
  currentOrder.unitPrice = price;
  currentOrder.quantity = 1;
  currentOrder.price = price;

  updateOrderTotal();

  document.getElementById('summaryGame').textContent = game;
  document.getElementById('summaryDiamond').textContent = diamond;
  document.getElementById('summaryPrice').textContent = price;
  document.getElementById('qtyDisplay').textContent = '1';

  const orderSection = document.getElementById('orderSection');
  orderSection.classList.add('show');

  setTimeout(() => orderSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
  showToast(`🎁 Paket dipilih! Isi form untuk melanjutkan`);
}

function updateOrderTotal() {
  const unitPrice = parsePrice(currentOrder.unitPrice);
  const totalPrice = unitPrice * currentOrder.quantity;
  currentOrder.price = formatPrice(totalPrice);
  const priceEl = document.getElementById('summaryPrice');
  const qtyEl = document.getElementById('qtyDisplay');
  if (priceEl) priceEl.textContent = currentOrder.price;
  if (qtyEl) qtyEl.textContent = currentOrder.quantity;
}

function increaseQty() {
  if (currentOrder.quantity < 10) {
    currentOrder.quantity++;
    updateOrderTotal();
  } else {
    showToast('⚠️ Maksimal 10x order!');
  }
}

function decreaseQty() {
  if (currentOrder.quantity > 1) {
    currentOrder.quantity--;
    updateOrderTotal();
  }
}

function cancelOrder() {
  document.getElementById('orderForm').reset();
  document.getElementById('orderSection').classList.remove('show');
  document.querySelectorAll('.price-box').forEach(item => item.classList.remove('selected'));
  currentOrder = { game: '', diamond: '', price: '', unitPrice: '', quantity: 1 };
  showToast('❌ Pemesanan dibatalkan');
}

function generateOrderNumber() {
  return `DRZ-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

function selectPaymentMethod(method, element) {
  document.querySelectorAll('.payment-option').forEach(item => item.classList.remove('selected'));
  element.classList.add('selected');
  document.getElementById('paymentMethod').value = method;
  showToast(`✅ ${method.toUpperCase()} dipilih!`);
}

async function submitOrder(event) {
  event.preventDefault();
  if (isSubmitting) return;

  const gameId = document.getElementById('gameId').value.trim();
  const nickname = document.getElementById('nickname').value.trim();
  const whatsapp = document.getElementById('whatsapp').value.trim();
  const paymentMethod = document.getElementById('paymentMethod').value;

  if (!gameId || !nickname || !whatsapp || !paymentMethod) {
    showToast('❌ Semua field wajib diisi!');
    return;
  }

  isSubmitting = true;
  const submitBtn = document.getElementById('submitBtn');
  submitBtn.disabled = true;
  submitBtn.textContent = '⏳ Memproses...';

  try {
    const orderNumber = generateOrderNumber();
    const orderData = {
      order_number: orderNumber,
      game: currentOrder.game,
      diamond: currentOrder.diamond,
      price: currentOrder.price,
      nickname: nickname,
      whatsapp: whatsapp,
      payment_method: paymentMethod,
      game_id: gameId,
      status: 'pending',
      order_date: new Date().toISOString()
    };

    if (window.dataSdk) {
      const result = await window.dataSdk.create(orderData);
      if (result.isOk) {
        showReceipt(orderData);
        cancelOrder();
      } else {
        showToast('❌ Gagal membuat pesanan');
      }
    } else {
      showReceipt(orderData);
      cancelOrder();
    }
  } catch (error) {
    console.error(error);
    showToast('❌ Terjadi kesalahan!');
  } finally {
    isSubmitting = false;
    submitBtn.disabled = false;
    submitBtn.textContent = '🛒 PURCHASE NOW';
  }
}

function showReceipt(data) {
  document.getElementById('receiptOrderNumber').textContent = data.order_number;
  document.getElementById('receiptGame').textContent = data.game;
  document.getElementById('receiptDiamond').textContent = data.diamond;
  document.getElementById('receiptGameId').textContent = data.game_id;
  document.getElementById('receiptNickname').textContent = data.nickname;
  document.getElementById('receiptWhatsapp').textContent = data.whatsapp;
  document.getElementById('receiptPayment').textContent = data.payment_method.toUpperCase();
  document.getElementById('receiptTotal').textContent = data.price;
  document.getElementById('receiptQty').textContent = currentOrder.quantity || 1;

  window.currentReceiptData = data;
  document.getElementById('receiptModal').classList.add('show');
}

function closeReceipt() {
  document.getElementById('receiptModal').classList.remove('show');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function sendReceiptToWhatsApp() {
  if (!window.currentReceiptData) return;
  const data = window.currentReceiptData;
  const adminPhone = document.getElementById('whatsappNumber').textContent.replace(/\D/g, '');
  const message = `Halo Admin! 👋\n\nPesanan: ${data.order_number}\nGame: ${data.game}\nPaket: ${data.diamond}\nTotal: ${data.price}\n\nNickname: ${data.nickname}\nID: ${data.game_id}`;
  window.open(`https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`, '_blank');
}

function openWhatsApp() {
  const phoneNumber = document.getElementById('whatsappNumber').textContent.replace(/\D/g, '');
  window.open(`https://wa.me/${phoneNumber}`, '_blank');
}

function scrollToSection(sectionId, event) {
  const element = document.getElementById(sectionId);
  if (element) {
    if (event) event.preventDefault();
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function filterGameSearch(event) {
  const query = event.target.value.toLowerCase().trim();
  const results = document.getElementById('gameSearchResults');
  if (!query) { results.style.display = 'none'; return; }

  const filtered = games.filter(g => g.name.toLowerCase().includes(query));
  results.innerHTML = filtered.length ? filtered.map(g => `
    <div class="search-result-item" onclick="selectGame('${g.id}')">
      <span class="emoji">${g.emoji}</span>
      <span class="name">${g.name}</span>
    </div>
  `).join('') : '<div class="search-no-results">❌ Game tidak ditemukan</div>';
  results.style.display = 'block';
}

function requestGame() {
  const adminPhone = document.getElementById('whatsappNumber').textContent.replace(/\D/g, '');
  window.open(`https://wa.me/${adminPhone}?text=${encodeURIComponent('Halo, saya ingin request game...')}`, '_blank');
}

// Admin Logic
function handleOwnerClick() {
  ownerClickCount++;
  clearTimeout(ownerClickTimer);
  if (ownerClickCount === 10) { openAdminLogin(); ownerClickCount = 0; }
  else ownerClickTimer = setTimeout(() => ownerClickCount = 0, 3000);
}

function openAdminLogin() {
  document.getElementById('adminLoginModal').classList.add('show');
}

function closeAdminLogin() {
  document.getElementById('adminLoginModal').classList.remove('show');
}

function handleAdminLogin(event) {
  event.preventDefault();
  if (document.getElementById('adminPassword').value === ADMIN_PASSWORD) {
    closeAdminLogin();
    document.getElementById('adminPanelModal').classList.add('show');
    updateAdminStats();
    renderAdminOrders();
  } else {
    showToast('❌ Password salah!');
  }
}

function updateAdminStats() {
  const success = allOrders.filter(o => o.status === 'success').length;
  const revenue = allOrders.reduce((acc, o) => acc + (o.status === 'success' ? parsePrice(o.price) : 0), 0);
  document.getElementById('adminTotalOrders').textContent = allOrders.length;
  document.getElementById('adminSuccessOrders').textContent = success;
  document.getElementById('adminPendingOrders').textContent = allOrders.length - success;
  document.getElementById('adminTotalRevenue').textContent = formatPrice(revenue);
}

function renderAdminOrders() {
  const list = document.getElementById('adminOrdersList');
  if (!allOrders.length) { list.innerHTML = '<div class="no-orders">🚫 Belum ada pesanan</div>'; return; }

  list.innerHTML = [...allOrders].sort((a,b) => new Date(b.order_date) - new Date(a.order_date)).map(o => `
    <div class="admin-table-row">
      <div class="order-num">${escapeHTML(o.order_number)}</div>
      <div>${escapeHTML(o.game)}</div>
      <div>${escapeHTML(o.nickname)}</div>
      <div class="price">${escapeHTML(o.price)}</div>
      <div>${escapeHTML(o.whatsapp)}</div>
      <div><span class="status-badge status-${o.status}">${o.status.toUpperCase()}</span></div>
      <div><button class="receipt-btn" onclick="viewAdminOrderDetail('${o.__backendId}')">👁️ LIHAT</button></div>
    </div>
  `).join('');
}

function viewAdminOrderDetail(id) {
  const o = allOrders.find(order => order.__backendId === id);
  if (!o) return;
  currentAdminOrderId = id;

  const statusEmoji = { 'pending': '⏳', 'success': '✅', 'failed': '❌' };

  document.getElementById('adminReceiptOrderNumber').textContent = o.order_number;
  document.getElementById('adminReceiptSubtitle').textContent = `${statusEmoji[o.status] || ''} ${o.status.toUpperCase()}`;
  document.getElementById('adminReceiptGame').textContent = o.game;
  document.getElementById('adminReceiptDiamond').textContent = o.diamond;
  document.getElementById('adminReceiptQty').textContent = o.quantity || 1;
  document.getElementById('adminReceiptGameId').textContent = o.game_id;
  document.getElementById('adminReceiptNickname').textContent = o.nickname;
  document.getElementById('adminReceiptWhatsapp').textContent = o.whatsapp;
  document.getElementById('adminReceiptPayment').textContent = o.payment_method;
  document.getElementById('adminReceiptTotal').textContent = o.price;
  document.getElementById('adminReceiptDate').textContent = new Date(o.order_date).toLocaleString('id-ID');

  document.getElementById('adminModalStatusSelect').value = o.status;
  document.getElementById('adminReceiptModal').classList.add('show');
}

function closeAdminReceipt() { document.getElementById('adminReceiptModal').classList.remove('show'); }

async function saveAdminReceiptStatus() {
  const newStatus = document.getElementById('adminModalStatusSelect').value;
  const order = allOrders.find(o => o.__backendId === currentAdminOrderId);
  if (order && window.dataSdk) {
    order.status = newStatus;
    const res = await window.dataSdk.update(order);
    if (res.isOk) {
      closeAdminReceipt();
      updateAdminStats();
      renderAdminOrders();
      showToast('✅ Status diperbarui!');
    }
  }
}

function logoutAdmin() {
  document.getElementById('adminPanelModal').classList.remove('show');
  showToast('👋 Logout berhasil!');
}

// History Search
function openHistory(e) { if(e) e.preventDefault(); document.getElementById('historyModal').classList.add('show'); }
function closeHistory() { document.getElementById('historyModal').classList.remove('show'); }

function searchOrders() {
  const phone = document.getElementById('searchPhone').value.trim();
  if (!phone) { showToast('⚠️ Masukkan nomor!'); return; }

  const matched = allOrders.filter(o => o.whatsapp.includes(phone));
  const list = document.getElementById('ordersList');

  list.innerHTML = matched.length ? matched.map(o => `
    <div class="order-item">
      <div class="order-number">📦 ${escapeHTML(o.order_number)}</div>
      <div class="order-row"><span class="order-label">Game</span><span class="order-value">${escapeHTML(o.game)}</span></div>
      <div class="order-row"><span class="order-label">Paket</span><span class="order-value">${escapeHTML(o.diamond)}</span></div>
      <div class="order-row"><span class="order-label">Total</span><span class="order-value">${escapeHTML(o.price)}</span></div>
      <div class="order-row"><span class="order-label">Status</span><span class="status-badge status-${o.status}">${o.status.toUpperCase()}</span></div>
    </div>
  `).join('') : '<div class="no-orders">📭 Tidak ditemukan</div>';
}
