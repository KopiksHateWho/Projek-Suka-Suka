# KingSlayer ⚔️

KingSlayer is a modern, professional gaming top-up website concept. It provides a sleek and intuitive interface for gamers to purchase in-game currency and services for popular titles like Mobile Legends, Free Fire, PUBG Mobile, and more.

## ✨ UI Theme: Purple Galaxy

The website features a **Purple Galaxy** gaming theme designed to provide an immersive experience:
- **Dark Purple Galaxy Gradient:** A deep, atmospheric background that sets the gaming mood.
- **Animated Star-field:** A lightweight CSS-only particle background for subtle motion.
- **Glassmorphism:** Modern UI components with frosted-glass effects, blur, and semi-transparent backgrounds.
- **Neon Glow Effects:** Purple and red accents that highlight key elements and interactive components.
- **Gaming Typography:** Utilizes the **Orbitron** font for a futuristic, high-tech feel.
- **Fully Responsive:** Optimized for a seamless experience across desktop, tablets, and mobile devices.

## 📂 Project Structure

The project has been refactored from a monolithic Canva export into a clean, maintainable structure:

```text
KingSlayer/
├── index.html          # Semantic HTML5 structure
├── css/
│   └── style.css       # Modular CSS with Galaxy theme & Glassmorphism
├── js/
│   └── app.js          # Clean JavaScript logic for UI & data rendering
├── assets/             # Images, icons, and logo assets
└── README.md           # Project documentation
```

## 🚀 How to Run Locally

Since this is a frontend-only project, you can run it easily:

1.  **Clone or Download** the repository.
2.  Open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge).
    - Alternatively, use a local server extension like **Live Server** in VS Code for the best experience.

## 🛠️ How to Customize

- **Changing Theme Colors:** Modify the CSS variables in `css/style.css` under the `:root` selector to update the primary colors and glow effects.
- **Adding New Games:** Update the `GAME_PACKAGES` constant in `js/app.js`. The UI will automatically render new categories and search items.
- **Updating Content:** Main layout changes can be made in `index.html`, while dynamic price lists are managed in `js/app.js`.

## 💻 Technologies Used

- **HTML5:** Semantic markup for better SEO and accessibility.
- **CSS3:** Custom animations, Flexbox/Grid layouts, and modern styling techniques.
- **JavaScript (ES6+):** Dynamic content rendering, search functionality, and UI interactions.
- **Google Fonts:** Orbitron and Inter for typography.

---
*Created as a refactoring project to transform Canva exports into professional-grade web code.*
