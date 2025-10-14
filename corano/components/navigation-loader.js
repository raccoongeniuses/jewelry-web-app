// Navigation Component Loader for Jevoo Jewellery
class NavigationLoader {
    constructor() {
        this.currentPage = this.getCurrentPage();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.substring(path.lastIndexOf('/') + 1);

        if (filename === 'index.html' || filename === '') {
            return 'home';
        } else if (filename === 'about-us.html') {
            return 'about';
        }
        return 'home'; // default
    }

    async loadNavigation() {
        try {
            const response = await fetch('components/navigation.html');
            let navigationHTML = await response.text();

            // Replace template variables based on current page
            navigationHTML = navigationHTML.replace('{{home_active}}', this.currentPage === 'home' ? 'active' : '');
            navigationHTML = navigationHTML.replace('{{about_active}}', this.currentPage === 'about' ? 'active' : '');

            // Find the main header area and replace it
            const headerMainArea = document.querySelector('.header-main-area');
            if (headerMainArea) {
                headerMainArea.outerHTML = navigationHTML;
            }

            // Initialize mobile menu and other functionality
            this.initializeNavigation();

        } catch (error) {
            console.error('Error loading navigation:', error);
        }
    }

    initializeNavigation() {
        // Initialize mobile menu toggle
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const offCanvasWrapper = document.querySelector('.off-canvas-wrapper');
        const offCanvasOverlay = document.querySelector('.off-canvas-overlay');
        const btnCloseOffCanvas = document.querySelector('.btn-close-off-canvas');

        if (mobileMenuToggle && offCanvasWrapper) {
            mobileMenuToggle.addEventListener('click', () => {
                // Add classes to match the CSS expected by main.js
                document.body.classList.add('fix');
                offCanvasWrapper.classList.add('open');
            });
        }

        // Close off-canvas when clicking overlay
        if (offCanvasOverlay && offCanvasWrapper) {
            offCanvasOverlay.addEventListener('click', () => {
                document.body.classList.remove('fix');
                offCanvasWrapper.classList.remove('open');
            });
        }

        // Close off-canvas when clicking close button
        if (btnCloseOffCanvas && offCanvasWrapper) {
            btnCloseOffCanvas.addEventListener('click', () => {
                document.body.classList.remove('fix');
                offCanvasWrapper.classList.remove('open');
            });
        }

        // Initialize header search
        const headerSearchToggle = document.querySelector('.header-search-toggle');
        const headerSearchForm = document.querySelector('.header-search-form');

        if (headerSearchToggle && headerSearchForm) {
            headerSearchToggle.addEventListener('click', () => {
                headerSearchForm.classList.toggle('active');
            });
        }

        // Initialize header settings
        const headerSettingsToggle = document.querySelector('.header-settings-toggle');
        const headerSettings = document.querySelector('.header-settings');

        if (headerSettingsToggle && headerSettings) {
            headerSettingsToggle.addEventListener('click', () => {
                headerSettings.classList.toggle('active');
            });
        }

        // Initialize mobile menu dropdown functionality
        this.initializeMobileMenuDropdowns();

        // Mini cart functionality temporarily removed
    }

    initializeMobileMenuDropdowns() {
        // Add dropdown functionality to mobile menu
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu) {
            const dropdownItems = mobileMenu.querySelectorAll('.dropdown');

            // Add toggle buttons to dropdown items
            dropdownItems.forEach(item => {
                const parentLi = item.parentElement;
                if (parentLi && !parentLi.querySelector('.menu-expand')) {
                    const expandBtn = document.createElement('span');
                    expandBtn.className = 'menu-expand';
                    expandBtn.innerHTML = '<i></i>';
                    parentLi.insertBefore(expandBtn, item);

                    // Initially hide dropdowns
                    item.style.display = 'none';
                }
            });

            // Handle click events for menu items and expand buttons
            mobileMenu.addEventListener('click', (e) => {
                const target = e.target;
                const menuExpand = target.closest('.menu-expand');
                const menuItem = target.closest('li');

                if (menuExpand || (target.tagName === 'A' && menuItem && menuItem.querySelector('.dropdown'))) {
                    e.preventDefault();

                    const dropdown = menuItem.querySelector('.dropdown');
                    const expandIcon = menuItem.querySelector('.menu-expand i');

                    if (dropdown) {
                        const isExpanded = dropdown.style.display !== 'none';

                        // Toggle dropdown visibility
                        dropdown.style.display = isExpanded ? 'none' : 'block';

                        // Rotate expand icon
                        if (expandIcon) {
                            expandIcon.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
                        }
                    }
                }
            });
        }
    }
}

// Load navigation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const navLoader = new NavigationLoader();
    navLoader.loadNavigation();
});