/**
 * KingSlayer - Navbar & Navigation Logic
 */

const Navbar = {
    init() {
        this.setupBackdrop();
        this.setupMobileMenu();
        this.setupScrollBehavior();
        this.setupActiveLinks();
    },

    setupBackdrop() {
        let backdrop = document.getElementById('nav-backdrop');
        if (!backdrop) {
            backdrop = document.createElement('div');
            backdrop.id = 'nav-backdrop';
            backdrop.className = 'nav-backdrop';
            document.body.appendChild(backdrop);
        }
        backdrop.addEventListener('click', () => window.closeMenu());
        this.backdrop = backdrop;
    },

    setupMobileMenu() {
        // Overwrite global window methods for consistency
        window.toggleMenu = () => {
            const nav = document.querySelector('.nav-links-container');
            if (nav) {
                const isActive = nav.classList.toggle('active');
                if (isActive) {
                    this.lockScroll();
                    this.backdrop.classList.add('active');
                } else {
                    this.unlockScroll();
                    this.backdrop.classList.remove('active');
                }
            }
        };

        window.closeMenu = () => {
            const nav = document.querySelector('.nav-links-container');
            if (nav) {
                nav.classList.remove('active');
                this.unlockScroll();
                if (this.backdrop) this.backdrop.classList.remove('active');
            }
        };
    },

    lockScroll() {
        document.body.style.overflow = 'hidden';
    },

    unlockScroll() {
        document.body.style.overflow = '';
    },

    setupScrollBehavior() {
        document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#') return;

                e.preventDefault();
                const targetId = href.substring(1);
                const targetEl = document.getElementById(targetId);

                if (targetEl) {
                    window.closeMenu();
                    const offset = 80; // Navbar height
                    const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    },

    setupActiveLinks() {
        const sections = document.querySelectorAll('section, footer');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
};

document.addEventListener('DOMContentLoaded', () => Navbar.init());
window.Navbar = Navbar;
