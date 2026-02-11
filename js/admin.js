/**
 * KingSlayer - Admin Dashboard Logic
 */

const Admin = {
    init() {
        this.checkAuth();
        this.setupEventListeners();
        this.renderDashboard();
    },

    checkAuth() {
        const isLogged = sessionStorage.getItem('ks_admin_logged');
        const loginOverlay = document.getElementById('loginOverlay');
        if (isLogged) {
            loginOverlay.classList.add('hidden');
        } else {
            loginOverlay.classList.remove('hidden');
        }
    },

    setupEventListeners() {
        // Login Form
        const loginForm = document.getElementById('adminLoginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const user = document.getElementById('adminUser').value;
                const pass = document.getElementById('adminPass').value;
                const errorEl = document.getElementById('loginError');

                if (user === 'King@gmail.com' && pass === 'Slayer123') {
                    sessionStorage.setItem('ks_admin_logged', 'true');
                    if (errorEl) errorEl.classList.add('hidden');
                    this.checkAuth();
                    this.renderDashboard();
                } else {
                    if (errorEl) {
                        errorEl.classList.remove('hidden');
                    } else {
                        alert('Invalid email or password');
                    }
                }
            });
        }

        // Game Form
        const gameForm = document.getElementById('gameForm');
        if (gameForm) {
            gameForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveGame();
            });
        }
    },

    showSection(id, el) {
        document.querySelectorAll('.admin-section').forEach(s => s.classList.add('hidden'));
        document.getElementById(`content-${id}`).classList.remove('hidden');

        document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
        el.classList.add('active');

        document.getElementById('sectionTitle').textContent = id.toUpperCase();

        // Load data for specific section
        if (id === 'orders') this.renderOrders();
        if (id === 'games') this.renderGames();
        if (id === 'settings') this.loadSettings();
        if (id === 'requests') this.renderRequests();
        if (id === 'dashboard') this.renderDashboard();
    },

    renderDashboard() {
        const orders = Storage.getOrders();
        const games = Storage.getGames();

        document.getElementById('statTotalOrders').textContent = orders.length;
        document.getElementById('statTotalGames').textContent = games.length;

        const revenue = orders
            .filter(o => o.status === 'success')
            .reduce((acc, o) => acc + parseInt(o.price.replace(/[^0-9]/g, '') || 0), 0);
        document.getElementById('statRevenue').textContent = `Rp${revenue.toLocaleString('id-ID')}`;

        const recentList = document.getElementById('recentActivity');
        recentList.innerHTML = orders.slice(-5).reverse().map(o => `
            <div class="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
                <div>
                    <div class="font-bold text-sm">${o.game} - ${o.diamond}</div>
                    <div class="text-[10px] text-slate-500">${o.order_number}</div>
                </div>
                <div class="btn-status ${o.status || 'pending'}">${o.status || 'pending'}</div>
            </div>
        `).join('') || '<p class="text-slate-500 text-sm italic">No recent orders.</p>';
    },

    renderOrders() {
        const orders = Storage.getOrders();
        const tbody = document.getElementById('ordersTableBody');

        tbody.innerHTML = orders.slice().reverse().map(o => `
            <tr class="border-b border-white/5 hover:bg-white/5 transition">
                <td class="py-4 font-mono text-xs text-primary">${o.order_number}</td>
                <td><div class="font-bold">${o.game}</div><div class="text-[10px] text-slate-500">${o.diamond}</div></td>
                <td><div class="text-xs">${o.nickname}</div><div class="text-[10px] text-slate-500">${o.whatsapp}</div></td>
                <td class="text-green-400 font-bold">${o.price}</td>
                <td>
                    <select onchange="updateOrderStatus('${o.order_number}', this.value)" class="bg-black/40 border border-white/10 rounded px-2 py-1 text-xs">
                        <option value="pending" ${o.status === 'pending' ? 'selected' : ''}>PENDING</option>
                        <option value="processing" ${o.status === 'processing' ? 'selected' : ''}>PROCESSING</option>
                        <option value="success" ${o.status === 'success' ? 'selected' : ''}>SUCCESS</option>
                    </select>
                </td>
                <td>
                    <button class="text-xs text-red-400 hover:underline" onclick="deleteOrder('${o.order_number}')">DELETE</button>
                </td>
            </tr>
        `).join('') || '<tr><td colspan="6" class="py-12 text-center text-slate-500">No orders found.</td></tr>';
    },

    renderGames() {
        const games = Storage.getGames();
        const container = document.getElementById('gamesAdminList');

        container.innerHTML = games.map(g => `
            <div class="admin-card">
                <div class="flex justify-between mb-4">
                    <div class="text-3xl">${g.icon}</div>
                    <div class="flex gap-2">
                        <button onclick="editGame('${g.id}')" class="text-xs bg-primary/20 text-primary px-3 py-1 rounded-lg">EDIT</button>
                        <button onclick="deleteGame('${g.id}')" class="text-xs bg-red-500/20 text-red-500 px-3 py-1 rounded-lg">DELETE</button>
                    </div>
                </div>
                <h4 class="font-black">${g.name}</h4>
                <p class="text-xs text-slate-400 mb-4">${g.subtitle}</p>
                <p class="text-[10px] text-slate-500 uppercase font-bold">${g.packages.length} Packages Available</p>
            </div>
        `).join('');
    },

    loadSettings() {
        const settings = Storage.getSettings();
        document.getElementById('settingStoreName').value = settings.store_name;
        document.getElementById('settingWA').value = settings.whatsapp_number;
        document.getElementById('settingTagline').value = settings.tagline;
    },

    saveGame() {
        const id = document.getElementById('gameIdInput').value.trim();
        const name = document.getElementById('gameNameInput').value.trim();
        const icon = document.getElementById('gameIconInput').value.trim();
        const subtitle = document.getElementById('gameSubtitleInput').value.trim();
        const packagesRaw = document.getElementById('gamePackagesInput').value.trim();

        try {
            const packages = JSON.parse(packagesRaw);
            Storage.saveGame({ id, name, icon, subtitle, packages });
            closeModal('gameModal');
            this.renderGames();
        } catch (e) {
            alert('Invalid Packages JSON format');
        }
    },

    renderRequests() {
        const reqs = Storage.getRequests();
        const container = document.getElementById('requestsList');
        container.innerHTML = reqs.map(r => `
            <div class="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
                <div>
                    <div class="font-bold">${r.gameName}</div>
                    <div class="text-xs text-slate-500">Requested by: ${r.userPhone}</div>
                </div>
                <div class="flex gap-2">
                    <button onclick="updateRequestStatus(${r.id}, 'added')" class="text-[10px] bg-green-500/20 text-green-500 px-2 py-1 rounded">ADDED</button>
                    <button onclick="updateRequestStatus(${r.id}, 'rejected')" class="text-[10px] bg-red-500/20 text-red-500 px-2 py-1 rounded">REJECT</button>
                </div>
            </div>
        `).join('') || '<p class="text-slate-500 text-sm">No requests found.</p>';
    }
};

// Global Helpers for Admin Panel
window.showSection = (id, el) => Admin.showSection(id, el);
window.adminLogout = () => {
    sessionStorage.removeItem('ks_admin_logged');
    Admin.checkAuth();
};
window.toggleSidebar = () => {
    document.getElementById('sidebar').classList.toggle('active');
};
window.updateOrderStatus = (num, status) => {
    Storage.updateOrderStatus(num, status);
    Admin.renderDashboard(); // Refresh dash if needed
};
window.deleteOrder = (num) => {
    if (confirm('Delete this order?')) {
        const orders = Storage.getOrders().filter(o => o.order_number !== num);
        localStorage.setItem('ks_transactions', JSON.stringify(orders));
        Admin.renderOrders();
    }
};
window.saveSettings = (e) => {
    e.preventDefault();
    const store_name = document.getElementById('settingStoreName').value;
    const whatsapp_number = document.getElementById('settingWA').value;
    const tagline = document.getElementById('settingTagline').value;
    Storage.updateSettings({ store_name, whatsapp_number, tagline });
    alert('Settings saved!');
};
window.openAddGameModal = () => {
    document.getElementById('gameForm').reset();
    document.getElementById('gameModalTitle').textContent = 'ADD NEW GAME';
    openModal('gameModal');
};
window.editGame = (id) => {
    const game = Storage.getGames().find(g => g.id === id);
    if (!game) return;
    document.getElementById('gameIdInput').value = game.id;
    document.getElementById('gameNameInput').value = game.name;
    document.getElementById('gameIconInput').value = game.icon;
    document.getElementById('gameSubtitleInput').value = game.subtitle;
    document.getElementById('gamePackagesInput').value = JSON.stringify(game.packages, null, 2);
    document.getElementById('gameModalTitle').textContent = 'EDIT GAME';
    openModal('gameModal');
};
window.deleteGame = (id) => {
    if (confirm('Delete this game?')) {
        Storage.deleteGame(id);
        Admin.renderGames();
    }
};
window.updateRequestStatus = (id, status) => {
    Storage.updateRequestStatus(id, status);
    Admin.renderRequests();
};

// Modal helpers (if not globally available)
window.openModal = (id) => document.getElementById(id).classList.add('show');
window.closeModal = (id) => document.getElementById(id).classList.remove('show');

document.addEventListener('DOMContentLoaded', () => Admin.init());
