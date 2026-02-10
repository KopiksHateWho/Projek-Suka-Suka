let currentOrder = { game: '', diamond: '', price: '', unitPrice: '', quantity: 1 };
let allOrders = [];
let isSubmitting = false;
let ownerClickCount = 0;
let ownerClickTimer = null;
// NOTE: For a real production app, use a secure backend and environment variables for authentication.
const ADMIN_PASSWORD = 'Dio213z';
let currentAdminOrderId = null;

const games = [
  { name: 'Mobile Legends', id: 'ml', emoji: '⚔️' },
  { name: 'Free Fire', id: 'ff', emoji: '🔫' },
  { name: 'PUBG Mobile', id: 'pubg', emoji: '🪖' },
  { name: 'Roblox', id: 'roblox', emoji: '🔳' },
  { name: 'Genshin Impact', id: 'genshin', emoji: '✨' }
];

const defaultConfig = {
  store_name: 'KingSlayer',
  tagline: 'Premium Gaming Top Up Service',
  footer_text: 'Fast & Secure Transactions',
  whatsapp_number: '+62 856-4633-5331'
};

const dataHandler = {
  onDataChanged(data) {
    if (!data) return;

    allOrders = data.filter(item => item.order_number);
  }
};

async function initDataSDK() {
  if (window.dataSdk) {
    try {
      const result = await window.dataSdk.init(dataHandler);
      if (!result.isOk) {
        console.error('Failed to initialize data SDK');
      }
    } catch (error) {
      console.error('Error initializing data SDK:', error);
    }
  }
}

async function onConfigChange(config) {
  if (document.getElementById('storeName')) {
    document.getElementById('storeName').textContent = config.store_name || defaultConfig.store_name;
  }
  if (document.getElementById('tagline')) {
    document.getElementById('tagline').textContent = config.tagline || defaultConfig.tagline;
  }
  if (document.getElementById('footerText')) {
    document.getElementById('footerText').textContent = config.footer_text || defaultConfig.footer_text;
  }
  if (document.getElementById('whatsappNumber')) {
    document.getElementById('whatsappNumber').textContent = config.whatsapp_number || defaultConfig.whatsapp_number;
  }
}

async function initElementSDK() {
  if (window.elementSdk) {
    try {
      await window.elementSdk.init({
        defaultConfig: defaultConfig,
        onConfigChange: onConfigChange,
        mapToCapabilities: () => ({
          recolorables: [],
          borderables: [],
          fontEditable: undefined,
          fontSizeable: undefined
        }),
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

    // Close menu when nav links are clicked
    const links = navLinks.querySelectorAll('.nav-link');
    links.forEach(link => {
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

function selectGame(gameType) {
  const panels = document.querySelectorAll('.price-panel');

  panels.forEach(panel => panel.classList.remove('active'));

  if (gameType === 'ml') {
    document.getElementById('mlPrices').classList.add('active');
  } else if (gameType === 'ff') {
    document.getElementById('ffPrices').classList.add('active');
  } else if (gameType === 'pubg') {
    document.getElementById('pubgPrices').classList.add('active');
  } else if (gameType === 'genshin') {
    document.getElementById('genshinPrices').classList.add('active');
  } else {
    showToast(`🎮 Hubungi admin untuk harga game ini`);
    return;
  }

  setTimeout(() => {
    const priceContainer = document.getElementById('priceContainer');
    if (priceContainer) {
      priceContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 100);
}

function selectPackage(game, diamond, price, event) {
  const element = event ? event.currentTarget : null;

  document.querySelectorAll('.price-box').forEach(item => {
    item.classList.remove('selected');
  });

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

  setTimeout(() => {
    orderSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 100);

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
  document.querySelectorAll('.price-box').forEach(item => {
    item.classList.remove('selected');
  });
  currentOrder = { game: '', diamond: '', price: '', unitPrice: '', quantity: 1 };
  showToast('❌ Pemesanan dibatalkan');
}

function generateOrderNumber() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `DRZ-${timestamp}-${random}`;
}

function selectPaymentMethod(method, element) {
  document.querySelectorAll('.payment-option').forEach(item => {
    item.classList.remove('selected');
  });

  element.classList.add('selected');
  document.getElementById('paymentMethod').value = method;

  const methodNames = {
    gopay: 'GoPay',
    dana: 'Dana',
    ovo: 'OVO',
    qris: 'QRIS'
  };

  showToast(`✅ ${methodNames[method]} dipilih!`);
}

async function submitOrder(event) {
  event.preventDefault();

  if (isSubmitting) {
    showToast('⌛ Mohon tunggu...');
    return;
  }

  if (allOrders.length >= 999) {
    showToast('❌ Limit maksimal tercapai!');
    return;
  }

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
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = '⏳ Memproses...';
  }

  try {
    const orderNumber = generateOrderNumber();
    const orderData = {
      order_number: orderNumber,
      game: currentOrder.game,
      diamond: currentOrder.diamond,
      unit_price: currentOrder.unitPrice,
      quantity: currentOrder.quantity,
      price: currentOrder.price,
      game_id: gameId,
      server_id: '-',
      nickname: nickname,
      whatsapp: whatsapp,
      payment_method: paymentMethod,
      status: 'pending',
      diamond_received: 'pending',
      order_date: new Date().toISOString()
    };

    if (window.dataSdk) {
      const result = await window.dataSdk.create(orderData);

      if (result.isOk) {
        const paymentNames = {
          gopay: 'GoPay',
          dana: 'Dana',
          ovo: 'OVO',
          qris: 'QRIS'
        };

        showReceipt({
          orderNumber,
          game: currentOrder.game,
          diamond: currentOrder.diamond,
          quantity: currentOrder.quantity,
          price: currentOrder.price,
          gameId,
          nickname,
          whatsapp,
          paymentMethod: paymentNames[paymentMethod]
        });

        document.getElementById('orderForm').reset();
        document.getElementById('orderSection').classList.remove('show');
        document.querySelectorAll('.price-box').forEach(item => {
          item.classList.remove('selected');
        });
        document.querySelectorAll('.payment-option').forEach(item => {
          item.classList.remove('selected');
        });

      } else {
        showToast('❌ Gagal membuat pesanan. Coba lagi!');
      }
    } else {
        // Fallback if SDK not present
        showToast('✅ Pesanan disimulasikan (SDK tidak tersedia)');
        showReceipt({
          orderNumber,
          game: currentOrder.game,
          diamond: currentOrder.diamond,
          quantity: currentOrder.quantity,
          price: currentOrder.price,
          gameId,
          nickname,
          whatsapp,
          paymentMethod: paymentMethod
        });
    }
  } catch (error) {
    console.error('Error creating order:', error);
    showToast('❌ Terjadi kesalahan!');
  } finally {
    isSubmitting = false;
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = '🛒 BELI SEKARANG';
    }
  }
}

function showReceipt(orderData) {
  document.getElementById('receiptOrderNumber').textContent = orderData.orderNumber;
  document.getElementById('receiptGame').textContent = orderData.game;
  document.getElementById('receiptDiamond').textContent = orderData.diamond;
  document.getElementById('receiptQty').textContent = orderData.quantity;
  document.getElementById('receiptGameId').textContent = orderData.gameId;
  document.getElementById('receiptNickname').textContent = orderData.nickname;
  document.getElementById('receiptWhatsapp').textContent = orderData.whatsapp;
  document.getElementById('receiptPayment').textContent = orderData.paymentMethod;
  document.getElementById('receiptTotal').textContent = orderData.price;

  window.currentReceiptData = orderData;

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

  const message = `Halo Admin! 👋

Saya ingin mengkonfirmasi pesanan saya:

📦 *Nomor Pesanan:* ${data.orderNumber}
🎮 *Game:* ${data.game}
💎 *Paket:* ${data.diamond}
🔢 *Qty:* ${data.quantity}
💰 *Total:* ${data.price}

👤 *Data Pemain:*
🎯 ID Game: ${data.gameId}
📛 Nickname: ${data.nickname}
📱 WhatsApp: ${data.whatsapp}

💳 *Metode Pembayaran:* ${data.paymentMethod}

Mohon segera diproses. Terima kasih!`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${adminPhone}?text=${encodedMessage}`;

  window.open(whatsappUrl, '_blank');

  showToast('✅ Membuka WhatsApp...');
}

function openWhatsApp() {
  const phoneNumber = document.getElementById('whatsappNumber').textContent.replace(/\D/g, '');
  window.open(`https://wa.me/${phoneNumber}`, '_blank');
}

function scrollToSection(sectionId, event) {
  const element = document.getElementById(sectionId);
  if (element) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));

    if (event && event.target) {
        event.target.classList.add('active');
    }

    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
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
    resultsContainer.innerHTML = '<div class="search-no-results">❌ Game tidak ditemukan</div>';
    resultsContainer.style.display = 'block';
    return;
  }

  resultsContainer.innerHTML = filteredGames.map(game => `
    <div class="search-result-item" onclick="selectGameFromSearch('${game.id}')">
      <span class="emoji">${game.emoji}</span>
      <span class="name">${game.name}</span>
    </div>
  `).join('');

  resultsContainer.style.display = 'block';
}

function selectGameFromSearch(gameId) {
  document.getElementById('gameSearchInput').value = '';
  document.getElementById('gameSearchResults').style.display = 'none';

  // Close mobile menu if open
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if (menuToggle) menuToggle.classList.remove('active');
  if (navLinks) navLinks.classList.remove('active');

  selectGame(gameId);
}

function requestGame() {
  const phoneNumber = document.getElementById('whatsappNumber').textContent.replace(/\D/g, '');
  const message = encodeURIComponent('MIN REQUEST GAME DONG 🎮\n\nAda game favorit yang belum tersedia? Chat saya untuk request game!');

  window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  showToast('💬 Membuka WhatsApp untuk request game...');
}

// ADMIN FUNCTIONS
function handleOwnerClick() {
  ownerClickCount++;

  clearTimeout(ownerClickTimer);

  if (ownerClickCount === 10) {
    openAdminLogin();
    ownerClickCount = 0;
    return;
  }

  ownerClickTimer = setTimeout(() => {
    ownerClickCount = 0;
  }, 3000);
}

function openAdminLogin() {
  document.getElementById('adminLoginModal').classList.add('show');
  document.getElementById('adminPassword').value = '';
  document.getElementById('adminPassword').focus();
  showToast('🔑 Admin Login Terbuka!');
}

function closeAdminLogin() {
  document.getElementById('adminLoginModal').classList.remove('show');
  document.getElementById('adminPassword').value = '';
  ownerClickCount = 0;
}

function handleAdminLogin(event) {
  event.preventDefault();

  const password = document.getElementById('adminPassword').value;

  if (password === ADMIN_PASSWORD) {
    closeAdminLogin();
    showAdminPanel();
    showToast('✅ Login berhasil! Selamat datang admin 👋');
  } else {
    showToast('❌ Password salah! Coba lagi');
    document.getElementById('adminPassword').value = '';
    document.getElementById('adminPassword').focus();
  }
}

function showAdminPanel() {
  document.getElementById('adminPanelModal').classList.add('show');
  updateAdminStats();
  renderAdminOrders();
}

function updateAdminStats() {
  const totalOrders = allOrders.length;
  const successOrders = allOrders.filter(o => o.status === 'success').length;
  const pendingOrders = allOrders.filter(o => o.status === 'pending').length;

  let totalRevenue = 0;
  allOrders.forEach(order => {
    const price = parseInt(order.price.replace(/[^0-9]/g, ''));
    totalRevenue += price;
  });

  document.getElementById('adminTotalOrders').textContent = totalOrders;
  document.getElementById('adminSuccessOrders').textContent = successOrders;
  document.getElementById('adminPendingOrders').textContent = pendingOrders;
  document.getElementById('adminTotalRevenue').textContent = `Rp${totalRevenue.toLocaleString('id-ID')}`;
}

function renderAdminOrders() {
  const ordersList = document.getElementById('adminOrdersList');

  if (allOrders.length === 0) {
    ordersList.innerHTML = '<div class="admin-no-orders">🚫 Belum ada pesanan</div>';
    return;
  }

  const sortedOrders = [...allOrders].sort((a, b) => {
    return new Date(b.order_date) - new Date(a.order_date);
  });

  ordersList.innerHTML = sortedOrders.map((order, index) => {
    const orderDate = new Date(order.order_date);
    const formattedDate = orderDate.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });

    const statusEmoji = {
      'pending': '⏳',
      'success': '✅',
      'failed': '❌'
    };

    return `
      <div class="admin-table-row">
        <div class="order-num">${order.order_number}</div>
        <div>${order.game}</div>
        <div>${order.nickname}</div>
        <div class="price">${order.price}</div>
        <div>${order.whatsapp}</div>
        <div class="date">${formattedDate}</div>
        <div>
          <span class="status-badge ${order.status === 'success' ? 'status-success' : order.status === 'failed' ? 'status-failed' : 'status-pending'}">
            ${statusEmoji[order.status]} ${order.status.toUpperCase()}
          </span>
        </div>
        <div>
          <button type="button" class="receipt-btn" onclick="viewAdminOrderDetail('${order.__backendId}')">
            👁️ LIHAT
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function viewAdminOrderDetail(orderId) {
  const order = allOrders.find(o => o.__backendId === orderId);
  if (!order) return;

  currentAdminOrderId = orderId;

  const orderDate = new Date(order.order_date);
  const formattedDate = orderDate.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const statusEmoji = {
    'pending': '⏳',
    'success': '✅',
    'failed': '❌'
  };

  document.getElementById('adminReceiptOrderNumber').textContent = order.order_number;
  document.getElementById('adminReceiptSubtitle').textContent = `${statusEmoji[order.status]} ${order.status.toUpperCase()}`;
  document.getElementById('adminReceiptGame').textContent = order.game;
  document.getElementById('adminReceiptDiamond').textContent = order.diamond;
  document.getElementById('adminReceiptQty').textContent = order.quantity || 1;
  document.getElementById('adminReceiptGameId').textContent = order.game_id;
  document.getElementById('adminReceiptNickname').textContent = order.nickname;
  document.getElementById('adminReceiptWhatsapp').textContent = order.whatsapp;
  document.getElementById('adminReceiptPayment').textContent = order.payment_method;
  document.getElementById('adminReceiptTotal').textContent = order.price;
  document.getElementById('adminReceiptDate').textContent = formattedDate;
  document.getElementById('adminModalStatusSelect').value = order.status;

  document.getElementById('adminReceiptModal').classList.add('show');
}

function closeAdminReceipt() {
  document.getElementById('adminReceiptModal').classList.remove('show');
  currentAdminOrderId = null;
}

async function saveAdminReceiptStatus() {
  if (!currentAdminOrderId) return;

  const newStatus = document.getElementById('adminModalStatusSelect').value;
  const saveBtn = document.getElementById('saveStatusBtn');

  saveBtn.disabled = true;
  saveBtn.textContent = '⏳ Menyimpan...';

  try {
    const orderIndex = allOrders.findIndex(o => o.__backendId === currentAdminOrderId);
    if (orderIndex === -1) return;

    const order = allOrders[orderIndex];
    order.status = newStatus;

    if (window.dataSdk) {
      const result = await window.dataSdk.update(order);
      if (result.isOk) {
        closeAdminReceipt();
        updateAdminStats();
        renderAdminOrders();
        showToast(`✅ Status diperbarui ke ${newStatus.toUpperCase()}!`);
      } else {
        showToast('❌ Gagal menyimpan status');
      }
    }
  } catch (error) {
    console.error('Error updating status:', error);
    showToast('❌ Terjadi kesalahan');
  } finally {
    saveBtn.disabled = false;
    saveBtn.textContent = '💾 SIMPAN STATUS';
  }
}

function logoutAdmin() {
  document.getElementById('adminPanelModal').classList.remove('show');
  ownerClickCount = 0;
  showToast('👋 Logout berhasil!');
}

function openHistory(event) {
  if (event) event.preventDefault();
  document.getElementById('historyModal').classList.add('show');
  document.getElementById('searchPhone').value = '';
  document.getElementById('ordersList').innerHTML = '';
}

function closeHistory() {
  document.getElementById('historyModal').classList.remove('show');
  document.getElementById('searchPhone').value = '';
  document.getElementById('ordersList').innerHTML = '';
}

function normalizePhone(phone) {
  phone = phone.replace(/\D/g, '');
  if (phone.startsWith('62')) {
    phone = phone.substring(2);
  }
  return phone;
}

function searchOrders() {
  const searchPhone = document.getElementById('searchPhone').value.trim();
  const searchBtn = document.getElementById('searchBtn');

  if (!searchPhone) {
    showToast('⚠️ Masukkan nomor WhatsApp terlebih dahulu!');
    return;
  }

  searchBtn.disabled = true;
  searchBtn.textContent = '⏳ Mencari...';

  try {
    const normalizedSearch = normalizePhone(searchPhone);
    const matchedOrders = allOrders.filter(order => {
      const normalizedOrderPhone = normalizePhone(order.whatsapp || '');
      return normalizedOrderPhone.includes(normalizedSearch) || normalizedSearch.includes(normalizedOrderPhone);
    }).sort((a, b) => {
      return new Date(b.order_date) - new Date(a.order_date);
    });

    const ordersList = document.getElementById('ordersList');

    if (matchedOrders.length === 0) {
      ordersList.innerHTML = `
        <div class="no-orders">
          <div class="no-orders-icon">📭</div>
          <div>Tidak ada pesanan ditemukan untuk nomor WhatsApp ini</div>
        </div>
      `;
    } else {
      ordersList.innerHTML = matchedOrders.map((order, index) => {
        const statusClass = order.status === 'success' ? 'status-success' :
                           order.status === 'failed' ? 'status-failed' : 'status-pending';
        const statusText = order.status === 'success' ? '✅ BERHASIL' :
                          order.status === 'failed' ? '❌ GAGAL' : '⏳ PENDING';

        const orderDate = new Date(order.order_date);
        const formattedDate = orderDate.toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });

        return `
          <div class="order-item" key="${index}">
            <div class="order-number">📦 ${order.order_number}</div>
            <div class="order-row">
              <span class="order-label">🎮 Game</span>
              <span class="order-value">${order.game || '-'}</span>
            </div>
            <div class="order-row">
              <span class="order-label">💎 Paket</span>
              <span class="order-value">${order.diamond || '-'}</span>
            </div>
            <div class="order-row">
              <span class="order-label">🔢 Qty</span>
              <span class="order-value">${order.quantity || 1}x</span>
            </div>
            <div class="order-row">
              <span class="order-label">💰 Total</span>
              <span class="order-value">${order.price || '-'}</span>
            </div>
            <div class="order-row">
              <span class="order-label">👤 Nickname</span>
              <span class="order-value">${order.nickname || '-'}</span>
            </div>
            <div class="order-row">
              <span class="order-label">💳 Pembayaran</span>
              <span class="order-value">${order.payment_method || '-'}</span>
            </div>
            <div class="order-row">
              <span class="order-label">📅 Tanggal</span>
              <span class="order-value">${formattedDate}</span>
            </div>
            <div class="order-row">
              <span class="order-label">Status</span>
              <span class="status-badge ${statusClass}">${statusText}</span>
            </div>
          </div>
        `;
      }).join('');

      showToast(`✅ Ditemukan ${matchedOrders.length} pesanan!`);
    }
  } catch (error) {
    console.error('Search error:', error);
    showToast('❌ Terjadi kesalahan saat mencari!');
  } finally {
    searchBtn.disabled = false;
    searchBtn.textContent = '🔍 CARI PESANAN';
  }
}

document.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    const historyModal = document.getElementById('historyModal');
    if (historyModal && historyModal.classList.contains('show')) {
      searchOrders();
    }
  }
});
