/**
 * KingSlayer - Auth Logic
 */

const AUTH_KEY = 'ks_current_user';
const USERS_KEY = 'ks_users';
const TRANSACTIONS_KEY = 'ks_transactions';

window.getCurrentUser = function() {
    const user = localStorage.getItem(AUTH_KEY);
    return user ? JSON.parse(user) : null;
};

window.loginUser = function(email, password) {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        localStorage.setItem(AUTH_KEY, JSON.stringify(user));
        return true;
    }
    return false;
};

window.registerUser = function(email, password) {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    if (users.find(u => u.email === email)) return false;
    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(AUTH_KEY, JSON.stringify(newUser));
    return true;
};

window.logout = function() {
    localStorage.removeItem(AUTH_KEY);
    const isInPages = window.location.pathname.includes('/pages/');
    window.location.href = isInPages ? '../index.html' : 'index.html';
};

window.updateNavbar = function() {
    const authLinks = document.getElementById('auth-links');
    if (!authLinks) return;

    const isInPages = window.location.pathname.includes('/pages/');
    const pagesPrefix = isInPages ? '' : 'pages/';

    const user = window.getCurrentUser();
    if (user) {
        const isAdmin = user.email === 'admin@kingslayer.com';
        authLinks.innerHTML = `
            ${isAdmin ? `<a href="${pagesPrefix}admin.html" class="nav-link w-full md:w-auto text-center text-primary font-bold" onclick="window.closeMenu()">ADMIN</a>` : ''}
            <a href="${pagesPrefix}dashboard.html" class="nav-link w-full md:w-auto text-center" onclick="window.closeMenu()">DASHBOARD</a>
            <a href="#" class="nav-link w-full md:w-auto text-center" onclick="window.logout(); window.closeMenu()">LOGOUT</a>
        `;
    } else {
        authLinks.innerHTML = `
            <a href="${pagesPrefix}login.html" class="nav-link w-full md:w-auto text-center" onclick="window.closeMenu()">LOGIN</a>
        `;
    }
};

window.saveTransaction = function(transaction) {
    const user = window.getCurrentUser();
    if (!user) return;

    const transactions = JSON.parse(localStorage.getItem(TRANSACTIONS_KEY) || '[]');
    transaction.userEmail = user.email;
    transactions.push(transaction);
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
};

window.getUserTransactions = function() {
    const user = window.getCurrentUser();
    if (!user) return [];

    const transactions = JSON.parse(localStorage.getItem(TRANSACTIONS_KEY) || '[]');
    return transactions.filter(t => t.userEmail === user.email);
};

window.togglePasswordVisibility = function(inputId, button) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';

    const eyeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
    const eyeOffIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 19c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;

    button.innerHTML = isPassword ? eyeOffIcon : eyeIcon;
    button.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
};

window.showToast = function(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
};

window.toggleMenu = function() {
    const links = document.querySelector('.nav-links-container');
    const overlay = document.querySelector('.nav-overlay');

    if (links) {
        links.classList.toggle('active');
        const isActive = links.classList.contains('active');

        document.body.style.overflow = isActive ? 'hidden' : '';
        if (overlay) {
            if (isActive) overlay.classList.add('active');
            else overlay.classList.remove('active');
        }
    }
};

window.closeMenu = function() {
    const links = document.querySelector('.nav-links-container');
    const overlay = document.querySelector('.nav-overlay');

    if (links) links.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
};


document.addEventListener('DOMContentLoaded', () => {
    window.updateNavbar();
});

// Add default admin for simulation
(function initAdmin() {
    const USERS_KEY = 'ks_users';
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    if (!users.find(u => u.email === 'admin@kingslayer.com')) {
        users.push({ email: 'admin@kingslayer.com', password: 'admin' });
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
})();
