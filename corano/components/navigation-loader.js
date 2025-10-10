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
                offCanvasWrapper.classList.add('active');
            });
        }

        // Close off-canvas when clicking overlay
        if (offCanvasOverlay && offCanvasWrapper) {
            offCanvasOverlay.addEventListener('click', () => {
                offCanvasWrapper.classList.remove('active');
            });
        }

        // Close off-canvas when clicking close button
        if (btnCloseOffCanvas && offCanvasWrapper) {
            btnCloseOffCanvas.addEventListener('click', () => {
                offCanvasWrapper.classList.remove('active');
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

        // Mini cart functionality temporarily removed
    }
}

// Load navigation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const navLoader = new NavigationLoader();
    navLoader.loadNavigation();
});