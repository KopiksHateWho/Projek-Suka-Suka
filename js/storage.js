/**
 * KingSlayer - Centralized Storage Utility
 */

const STORAGE_KEYS = {
    GAMES: 'ks_games',
    ORDERS: 'ks_transactions',
    REQUESTS: 'ks_requests',
    SETTINGS: 'ks_settings'
};

const DEFAULT_GAMES = [
    {
        id: 'ml',
        name: 'MOBILE LEGENDS',
        icon: '⚔️',
        subtitle: 'Diamonds & Weekly Pass',
        packages: [
            { name: "💎 Weekly Diamond Pass", price: "Rp28.777" },
            { name: "💎 5", price: "Rp1.800" },
            { name: "💎 12", price: "Rp3.800" },
            { name: "💎 14", price: "Rp4.300" },
            { name: "💎 50", price: "Rp14.000" }
        ]
    },
    {
        id: 'ff',
        name: 'FREE FIRE',
        icon: '🔥',
        subtitle: 'Diamonds & Membership',
        packages: [
            { name: "🚀 Member Mingguan", price: "Rp27.555" },
            { name: "💎 75 ⭐", price: "Rp10.000" },
            { name: "💎 150 ⭐", price: "Rp20.000" },
            { name: "💎 770 ⭐", price: "Rp100.000" }
        ]
    },
    {
        id: 'pubg',
        name: 'PUBG MOBILE',
        icon: '🎯',
        subtitle: 'Unknown Cash (UC)',
        packages: [
            { name: "🎯 60 UC", price: "Rp16.200" },
            { name: "🎯 325 UC", price: "Rp79.500" },
            { name: "🎯 660 UC", price: "Rp158.700" }
        ]
    }
];

const DEFAULT_SETTINGS = {
    store_name: 'KingSlayer',
    tagline: 'Top Up Game Premium & Terpercaya',
    footer_text: 'Proses Cepat & Amanah',
    whatsapp_number: '+62 882-0076-55617',
    contact_link: 'https://wa.me/62882007655617'
};

const Storage = {
    init() {
        if (!localStorage.getItem(STORAGE_KEYS.GAMES)) {
            localStorage.setItem(STORAGE_KEYS.GAMES, JSON.stringify(DEFAULT_GAMES));
        }
        if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
            localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
        }
    },

    // Games
    getGames() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.GAMES) || '[]');
    },
    saveGame(game) {
        const games = this.getGames();
        const index = games.findIndex(g => g.id === game.id);
        if (index > -1) games[index] = game;
        else games.push(game);
        localStorage.setItem(STORAGE_KEYS.GAMES, JSON.stringify(games));
    },
    deleteGame(id) {
        const games = this.getGames().filter(g => g.id !== id);
        localStorage.setItem(STORAGE_KEYS.GAMES, JSON.stringify(games));
    },

    // Orders
    getOrders() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '[]');
    },
    saveOrder(order) {
        const orders = this.getOrders();
        orders.push(order);
        localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    },
    updateOrderStatus(orderNumber, status) {
        const orders = this.getOrders();
        const index = orders.findIndex(o => o.order_number === orderNumber);
        if (index > -1) {
            orders[index].status = status;
            localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
            return true;
        }
        return false;
    },

    // Requests
    getRequests() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.REQUESTS) || '[]');
    },
    saveRequest(req) {
        const requests = this.getRequests();
        requests.push({ ...req, id: Date.now(), status: 'pending' });
        localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(requests));
    },
    updateRequestStatus(id, status) {
        const requests = this.getRequests();
        const index = requests.findIndex(r => r.id === id);
        if (index > -1) {
            requests[index].status = status;
            localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(requests));
        }
    },

    // Settings
    getSettings() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS) || JSON.stringify(DEFAULT_SETTINGS));
    },
    updateSettings(newSettings) {
        const settings = { ...this.getSettings(), ...newSettings };
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
        return settings;
    }
};

Storage.init();
window.Storage = Storage;
