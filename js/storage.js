class Storage {
    static getGames() {
        const games = JSON.parse(localStorage.getItem('ks_games') || '[]');
        if (games.length === 0) {
            // Seed default data if empty
            const defaults = [
                {
                    id: 'ml',
                    name: 'MOBILE LEGENDS',
                    image: 'assets/games/mlbb.jpg',
                    basePrice: 'Rp1.500',
                    category: 'Mobile',
                    status: 'active'
                },
                {
                    id: 'ff',
                    name: 'FREE FIRE',
                    image: 'assets/games/ff.jpg',
                    basePrice: 'Rp1.000',
                    category: 'Mobile',
                    status: 'active'
                },
                {
                    id: 'pubg',
                    name: 'PUBG MOBILE',
                    image: 'assets/games/pubg.jpg',
                    basePrice: 'Rp10.000',
                    category: 'Mobile',
                    status: 'active'
                }
            ];
            localStorage.setItem('ks_games', JSON.stringify(defaults));
            return defaults;
        }
        return games;
    }

    static saveGame(game) {
        const games = this.getGames();
        const existingIndex = games.findIndex(g => g.id === game.id);

        if (existingIndex >= 0) {
            games[existingIndex] = { ...games[existingIndex], ...game };
        } else {
            games.push(game);
        }

        localStorage.setItem('ks_games', JSON.stringify(games));
        return games;
    }

    static deleteGame(id) {
        const games = this.getGames().filter(g => g.id !== id);
        localStorage.setItem('ks_games', JSON.stringify(games));
        return games;
    }

    static getRequests() {
        return JSON.parse(localStorage.getItem('ks_requests') || '[]');
    }

    static saveRequest(request) {
        const requests = this.getRequests();
        // Generate simple ID if not present
        if (!request.id) {
            request.id = 'REQ-' + Date.now();
            request.date = new Date().toISOString();
            request.status = 'pending';
        }
        requests.push(request);
        localStorage.setItem('ks_requests', JSON.stringify(requests));
        return request;
    }

    static updateRequestStatus(id, status) {
        const requests = this.getRequests();
        const req = requests.find(r => r.id === id);
        if (req) {
            req.status = status;
            localStorage.setItem('ks_requests', JSON.stringify(requests));
            return true;
        }
        return false;
    }

    static getSettings() {
        return JSON.parse(localStorage.getItem('ks_settings') || '{}');
    }

    static saveSettings(settings) {
        const current = this.getSettings();
        const updated = { ...current, ...settings };
        localStorage.setItem('ks_settings', JSON.stringify(updated));
        return updated;
    }
}

// Export for Node.js environments (testing)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Storage;
} else {
    window.Storage = Storage;
}
