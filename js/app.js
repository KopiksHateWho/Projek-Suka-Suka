/**
 * KingSlayer - Premium Gaming Top-Up Logic
 */

const ADMIN_PASSWORD = 'Dio213z';

let GAME_PACKAGES = {};

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
  whatsapp_number: '+62 882-0076-55617'
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

function initAccessibility() {
  // Global listener for keyboard interactions on role="button" elements
  document.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.getAttribute('role') === 'button') {
      // Avoid triggering if it's already a native button or link (they handle Enter/Space automatically)
      if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') return;

      e.preventDefault();
      e.target.click();
    }
  });
}

(async function init() {
  await initDataSDK();
  await initElementSDK();
  initAccessibility();
  renderGamesGrid();
  applySiteSettings();
})();

function parsePrice(priceStr) {
  return parseInt(priceStr.replace(/[^0-9]/g, ''));
}

function formatPrice(price) {
  return `Rp${price.toLocaleString('id-ID')}`;
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
  const games = Storage.getGames();
  const game = games.find(g => g.id === gameId.toLowerCase());

  if (!game) {
    return showToast('🎮 Hubungi admin untuk game ini');
  }

  currentOrder.game = game.name;
  renderPackageSelection(game.name);
  openModal('packageModal');
}

function renderPackageSelection(gameName) {
  const container = document.getElementById('packageList');
  const games = Storage.getGames();
  const game = games.find(g => g.name === gameName);

  if (!game) return;

  container.innerHTML = game.packages.map(pkg => `
    <div class="price-box-mini" onclick="selectPackage('${pkg.name}', '${pkg.price}')">
      <div class="mini-diamond">${pkg.name}</div>
      <div class="mini-price">${pkg.price}</div>
    </div>
  `).join('');
}

function renderGamesGrid() {
    const container = document.querySelector('.games-grid');
    if (!container) return;

    const games = Storage.getGames();
    container.innerHTML = games.map(game => `
        <div class="game-card" id="${game.id}Card" onclick="selectGame('${game.id}')" role="button" tabindex="0">
            <div class="game-icon-container text-4xl mb-4">${game.icon}</div>
            <div class="game-name">${game.name}</div>
            <div class="game-subtitle">${game.subtitle}</div>
        </div>
    `).join('');
}

function applySiteSettings() {
    const settings = Storage.getSettings();
    const mappings = {
        'storeName': settings.store_name,
        'navStoreName': settings.store_name,
        'tagline': settings.tagline,
        'footerText': settings.footer_text,
        'whatsappNumber': settings.whatsapp_number
    };

    for (const [id, val] of Object.entries(mappings)) {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
    }
}

function selectPackage(name, price, maybePrice) {
  // Handle both 2-arg (pkg, price) and 3-arg (game, pkg, price) calls
  const finalPackage = maybePrice ? price : name;
  const finalPrice = maybePrice ? maybePrice : price;

  if (finalPrice === 'HABIS') return showToast('❌ Stok sedang kosong');

  currentOrder.package = finalPackage;
  currentOrder.price = finalPrice;
  currentOrder.unitPrice = parseInt(finalPrice.replace(/[^0-9]/g, ''));
  currentOrder.quantity = 1;

  document.querySelectorAll('.price-box-mini, .price-box').forEach(el => {
    const pkgText = el.querySelector('.mini-diamond, .diamond-value')?.textContent || '';
    if (pkgText === finalPackage) el.classList.add('selected');
    else el.classList.remove('selected');
  });

  updateOrderSummary();

  const stickyBar = document.getElementById('stickyMobileBar');
  if (stickyBar) stickyBar.classList.add('active');

  // If clicking from the static price grid, also open the modal if not already open
  if (!document.getElementById('packageModal').classList.contains('show')) {
      const gameName = maybePrice ? name : '';
      if (gameName) {
          currentOrder.game = gameName;
          renderPackageSelection(gameName);
      }
      openModal('packageModal');
  }
}

function updateOrderSummary() {
  const total = currentOrder.unitPrice * currentOrder.quantity;
  const formattedPrice = `Rp${total.toLocaleString('id-ID')}`;

  // Package Modal Summary
  document.getElementById('summaryGame').textContent = currentOrder.game;
  document.getElementById('summaryPackage').textContent = currentOrder.package;
  document.getElementById('summaryTotal').textContent = formattedPrice;
  document.getElementById('qtyDisplay').textContent = currentOrder.quantity;

  // Sticky Mobile Bar
  const stickyTotal = document.getElementById('stickyTotal');
  if (stickyTotal) stickyTotal.textContent = formattedPrice;
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

  // Show Summary Modal
  document.getElementById('summGame').textContent = currentOrder.game;
  document.getElementById('summItem').textContent = currentOrder.package;
  document.getElementById('summUserId').textContent = `${nickname} (${gameId})`;
  document.getElementById('summPayment').textContent = currentOrder.paymentMethod;
  document.getElementById('summTotal').textContent = document.getElementById('summaryTotal').textContent;

  closeModal('packageModal');
  openModal('summaryModal');
}

async function confirmOrder() {
  if (isSubmitting) return;
  isSubmitting = true;

  closeModal('summaryModal');
  startLoading();

  const gameId = document.getElementById('gameIdInput').value.trim();
  const nickname = document.getElementById('nicknameInput').value.trim();
  const whatsapp = document.getElementById('whatsappInput').value.trim();

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

    // Simulate network delay for the premium loading experience
    await new Promise(resolve => setTimeout(resolve, 3000));

    if (window.dataSdk) {
      const result = await window.dataSdk.create(orderData);
      if (result.isOk) {
        if (window.saveTransaction) window.saveTransaction(orderData);
        stopLoading();
        showReceipt(orderData);
      } else {
        stopLoading();
        showToast('❌ Gagal membuat pesanan');
      }
    } else {
      // Simulation mode if SDK is not present
      if (window.saveTransaction) window.saveTransaction(orderData);
      stopLoading();
      showReceipt(orderData);
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

  // Hide sticky bar when closing package modal if no package chosen?
  // Actually the requirement is "Hide checkout bar when no package is selected".
  // Let's reset it if they close the main interaction.
  if (id === 'packageModal') {
    // We don't necessarily want to hide it if they have a package selected but just closed the modal.
    // But usually in these apps, closing the modal means canceling.
    // Let's keep it visible if a package is selected.
  }
}

// Loading Rocket
function startLoading() {
  const modal = document.getElementById('loadingModal');
  const bar = modal.querySelector('.progress-bar');
  const rocket = modal.querySelector('.rocket-icon-horizontal');
  const percent = modal.querySelector('.progress-percent');
  const statusText = document.getElementById('loadingStatus');

  const messages = [
    "Processing your order...",
    "Connecting to server...",
    "Validating game ID...",
    "Finalizing transaction..."
  ];

  modal.classList.add('show');
  let p = 0;
  let msgIndex = 0;

  const interval = setInterval(() => {
    p += Math.random() * 3;
    if (p >= 100) {
      p = 100;
      clearInterval(interval);
    }

    bar.style.width = p + '%';
    percent.textContent = Math.floor(p) + '%';

    // Move rocket across the track
    if (rocket) {
      const trackWidth = rocket.parentElement.offsetWidth;
      rocket.style.left = `calc(${p}% - 30px)`;
    }

    // Cycle messages
    if (Math.floor(p) % 25 === 0 && messages[msgIndex]) {
        statusText.textContent = messages[Math.floor(p / 25)] || messages[messages.length - 1];
    }

  }, 50);

  window.loadingInterval = interval;
}

function stopLoading() {
  clearInterval(window.loadingInterval);
  document.getElementById('loadingModal').classList.remove('show');
}

function filterGameSearch(event) {
  const searchInput = event.target.value.toLowerCase().trim();
  const resultsContainer = document.getElementById('gameSearchResults');

  if (!searchInput) {
    resultsContainer.style.display = 'none';
    return;
  }

  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchInput)
  );

  if (filteredGames.length === 0) {
    resultsContainer.innerHTML = '<div style="padding: 12px 15px; color: #d1fae5; font-size: 13px;">❌ Game tidak ditemukan</div>';
    resultsContainer.style.display = 'block';
    return;
  }

  resultsContainer.innerHTML = filteredGames.map(game => `
    <div style="padding: 12px 15px; border-bottom: 1px solid rgba(253, 224, 71, 0.2); cursor: pointer; transition: all 0.2s ease; background: transparent;"
         role="button"
         tabindex="0"
         onmouseover="this.style.background = 'rgba(253, 224, 71, 0.1)'"
         onmouseout="this.style.background = 'transparent'"
         onclick="selectGameFromSearch('${game.id}')">
      <span style="font-size: 18px; margin-right: 8px;" role="img" aria-label="${game.name} icon">${game.emoji}</span>
      <span style="color: #fde047; font-weight: 700; font-size: 13px;">${game.name}</span>
    </div>
  `).join('');

  resultsContainer.style.display = 'block';
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
  let count = 0;
  document.querySelectorAll('.game-card').forEach(card => {
    const name = card.querySelector('.game-name').textContent.toLowerCase();
    const isMatch = name.includes(q);
    card.style.display = isMatch ? 'flex' : 'none';
    if (isMatch) count++;
  });

  const noResults = document.getElementById('noGamesFound');
  if (noResults) {
    noResults.classList.toggle('hidden', count > 0);
  }
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// Init is handled by the IIFE at the top
