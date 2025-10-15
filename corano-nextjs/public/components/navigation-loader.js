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
        } else if (filename === 'our-promises.html') {
            return 'our-promises';
        } else if (filename === 'our-services.html') {
            return 'our-services';
        } else if (filename === 'our-philosophy.html') {
            return 'our-philosophy';
        }
        return 'home'; // default
    }

    async loadNavigation() {
        try {
            // Load main navigation component
            const navResponse = await fetch('components/navigation.html');
            let navigationHTML = await navResponse.text();

            // Replace template variables based on current page
            navigationHTML = navigationHTML.replace('{{home_active}}', this.currentPage === 'home' ? 'active' : '');
            navigationHTML = navigationHTML.replace('{{about_active}}', this.currentPage === 'about' ? 'active' : '');
            navigationHTML = navigationHTML.replace('{{our_promises_active}}', this.currentPage === 'our-promises' ? 'active' : '');
            navigationHTML = navigationHTML.replace('{{our_services_active}}', this.currentPage === 'our-services' ? 'active' : '');
            navigationHTML = navigationHTML.replace('{{our_philosophy_active}}', this.currentPage === 'our-philosophy' ? 'active' : '');

            // Find the main header area and replace it
            const headerMainArea = document.querySelector('.header-main-area');
            if (headerMainArea) {
                headerMainArea.outerHTML = navigationHTML;
            }

            // Load mobile navigation component
            await this.loadMobileNavigation();

            // Wait a bit for jQuery to be ready and initialize functionality
            setTimeout(() => {
                this.initializeNavigation();
            }, 100);

        } catch (error) {
            console.error('Error loading navigation:', error);
        }
    }

    async loadMobileNavigation() {
        try {
            const mobileNavResponse = await fetch('components/mobile-navigation.html');
            let mobileNavHTML = await mobileNavResponse.text();

            // Replace template variables based on current page
            mobileNavHTML = mobileNavHTML.replace('{{home_active}}', this.currentPage === 'home' ? 'active' : '');
            mobileNavHTML = mobileNavHTML.replace('{{about_active}}', this.currentPage === 'about' ? 'active' : '');
            mobileNavHTML = mobileNavHTML.replace('{{our_promises_active}}', this.currentPage === 'our-promises' ? 'active' : '');
            mobileNavHTML = mobileNavHTML.replace('{{our_services_active}}', this.currentPage === 'our-services' ? 'active' : '');
            mobileNavHTML = mobileNavHTML.replace('{{our_philosophy_active}}', this.currentPage === 'our-philosophy' ? 'active' : '');

            // Find elements with data-include attribute and replace them
            const mobileNavElements = document.querySelectorAll('[data-include="components/mobile-navigation.html"]');
            mobileNavElements.forEach(element => {
                // Check if element has data attributes for active states
                if (element.dataset.homeActive) {
                    mobileNavHTML = mobileNavHTML.replace('{{home_active}}', element.dataset.homeActive);
                }
                if (element.dataset.aboutActive) {
                    mobileNavHTML = mobileNavHTML.replace('{{about_active}}', element.dataset.aboutActive);
                }
                if (element.dataset.ourPromisesActive) {
                    mobileNavHTML = mobileNavHTML.replace('{{our_promises_active}}', element.dataset.ourPromisesActive);
                }
                if (element.dataset.ourServicesActive) {
                    mobileNavHTML = mobileNavHTML.replace('{{our_services_active}}', element.dataset.ourServicesActive);
                }
                if (element.dataset.ourPhilosophyActive) {
                    mobileNavHTML = mobileNavHTML.replace('{{our_philosophy_active}}', element.dataset.ourPhilosophyActive);
                }

                element.outerHTML = mobileNavHTML;
            });

        } catch (error) {
            console.error('Error loading mobile navigation:', error);
        }
    }

    initializeNavigation() {
        // Re-initialize jQuery event handlers for mobile menu after dynamic loading
        if (typeof $ !== 'undefined' && $.fn) {
            // Trigger jQuery to rebind events for the mobile menu
            // Since main.js already handles the burger menu functionality,
            // we just need to ensure the elements exist when it runs

            // Manually trigger jQuery off-canvas functionality
            $(".mobile-menu-btn").off('click').on('click', function () {
                $("body").addClass('fix');
                $(".off-canvas-wrapper").addClass('open');
            });

            $(".btn-close-off-canvas, .off-canvas-overlay").off('click').on('click', function () {
                $("body").removeClass('fix');
                $(".off-canvas-wrapper").removeClass('open');
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