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
    window.location.href = 'index.html';
};

window.updateNavbar = function() {
    const authLinks = document.getElementById('auth-links');
    if (!authLinks) return;

    const user = window.getCurrentUser();
    if (user) {
        authLinks.innerHTML = `
            <a href="dashboard.html" class="nav-link w-full md:w-auto text-center">DASHBOARD</a>
            <a href="#" class="nav-link w-full md:w-auto text-center" onclick="logout()">LOGOUT</a>
        `;
    } else {
        authLinks.innerHTML = `
            <a href="login.html" class="nav-link w-full md:w-auto text-center">LOGIN</a>
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

window.showToast = function(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
};

document.addEventListener('DOMContentLoaded', () => {
    window.updateNavbar();
});
