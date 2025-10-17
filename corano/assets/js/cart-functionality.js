document.addEventListener("DOMContentLoaded", function () {
    // Cart functionality
    let cartItems = [];
    const minicartInner = document.querySelector(".minicart-inner");
    const minicartItemWrapper = document.querySelector(".minicart-item-wrapper ul");
    const cartSubtotal = document.querySelector(".subtotal .ammount");
    const cartCountDesktop = document.querySelector(".minicart-btn .notification"); // Desktop cart count
    const cartCountMobile = document.querySelector(".mini-cart-wrap .notification"); // Mobile cart count

    // Load cart from localStorage
    function loadCart() {
        const savedCart = localStorage.getItem('coranoCart');
        if (savedCart) {
            cartItems = JSON.parse(savedCart);
            updateCart();
        }
    }

    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('coranoCart', JSON.stringify(cartItems));
    }

    // Add item to cart
    function addToCart(productInfo) {
        const existingItem = cartItems.find(item => item.id === productInfo.id);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.push({
                ...productInfo,
                quantity: 1
            });
        }

        saveCart();
        updateCart();
        showCartFeedback();
    }

    // Remove item from cart
    function removeFromCart(productId) {
        cartItems = cartItems.filter(item => item.id !== productId);
        saveCart();
        updateCart();
    }

    // Update cart display
    function updateCart() {
        if (!minicartItemWrapper) return;

        // Clear current cart items
        minicartItemWrapper.innerHTML = '';

        if (cartItems.length === 0) {
            minicartItemWrapper.innerHTML = '<li class="text-center p-3">Your cart is empty</li>';
            updateCartTotal(0);
            return;
        }

        let subtotal = 0;

        cartItems.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;

            const cartItemHTML = `
                <li class="minicart-item" data-product-id="${item.id}">
                    <div class="minicart-thumb">
                        <a href="${item.url || 'product-details.html'}">
                            <img src="${item.image}" alt="${item.name}">
                        </a>
                    </div>
                    <div class="minicart-content">
                        <h3 class="product-name">
                            <a href="${item.url || 'product-details.html'}">${item.name}</a>
                        </h3>
                        <p>
                            <span class="cart-quantity">${item.quantity} <strong>&times;</strong></span>
                            <span class="cart-price">$${item.price.toFixed(2)}</span>
                        </p>
                    </div>
                    <button class="minicart-remove" data-product-id="${item.id}">
                        <i class="pe-7s-close"></i>
                    </button>
                </li>
            `;

            minicartItemWrapper.insertAdjacentHTML('beforeend', cartItemHTML);
        });

        updateCartTotal(subtotal);

        // Add remove event listeners
        document.querySelectorAll('.minicart-remove').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const productId = this.getAttribute('data-product-id');
                removeFromCart(productId);
            });
        });
    }

    // Update cart total
    function updateCartTotal(subtotal) {
        if (cartSubtotal) {
            cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
        }

        // Update cart count if elements exist
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

        if (cartCountDesktop) {
            cartCountDesktop.textContent = totalItems;
            cartCountDesktop.style.display = totalItems > 0 ? 'block' : 'none';
        }

        if (cartCountMobile) {
            cartCountMobile.textContent = totalItems;
            cartCountMobile.style.display = totalItems > 0 ? 'block' : 'none';
        }
    }

    // Show cart feedback animation
    function showCartFeedback() {
        // Show the cart sidebar without causing scroll
        if (minicartInner) {
            // Store current scroll position
            const scrollY = window.scrollY;

            // Show the cart sidebar
            minicartInner.classList.add('show');
            document.body.classList.add('fix');

            // Prevent scroll position jump
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';

            // Store scroll position for later restoration
            document.body.setAttribute('data-scroll-y', scrollY);
        }
    }

    // Restore scroll position when cart is closed
    function restoreScrollPosition() {
        const scrollY = document.body.getAttribute('data-scroll-y');
        if (scrollY !== null) {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.removeAttribute('data-scroll-y');
            window.scrollTo(0, parseInt(scrollY));
        }
    }

    // Extract product information from the DOM element
    function getProductInfo(element) {
        const productElement = element.closest('.product-item') || element.closest('.product-wrap');

        if (!productElement) return null;

        const nameElement = productElement.querySelector('.product-name a');
        const imageElement = productElement.querySelector('img');
        const priceElement = productElement.querySelector('.price-regular, .main-price');
        const urlElement = productElement.querySelector('.product-name a');

        // Generate a unique ID based on product name and price for better uniqueness
        const productName = nameElement ? nameElement.textContent.trim() : 'Unknown Product';
        const productPrice = priceElement ? parseFloat(priceElement.textContent.replace('$', '')) : 0;
        const id = `${productName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}-${productPrice}`;

        return {
            id: id,
            name: productName,
            image: imageElement ? imageElement.src : 'assets/img/product/default.jpg',
            price: productPrice,
            url: urlElement ? urlElement.href : 'product-details.html'
        };
    }

    // Handle Add to Cart button click
    function handleAddToCartClick(e) {
        e.preventDefault();
        e.stopPropagation();

        const button = e.target;
        const originalText = button.textContent;

        // Show "Added!" feedback
        button.textContent = "Added!";
        button.style.background = "#27ae60";
        button.disabled = true;

        // Get product information
        const productInfo = getProductInfo(button);

        if (productInfo) {
            addToCart(productInfo);

            // Reset button after delay
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = "";
                button.disabled = false;
            }, 1500);
        } else {
            console.error('Could not extract product information');
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = "";
                button.disabled = false;
            }, 1500);
        }
    }

    // Add event listeners to all Add to Cart buttons
    function addCartButtonListeners() {
        // Featured products add to cart buttons
        document.querySelectorAll('.btn-cart').forEach(button => {
            button.addEventListener('click', handleAddToCartClick);
        });

        // NOTE: Marquee details add to cart button is handled in draggable-grid.js
        // We do NOT add an event listener here to avoid duplication
    }

    // Initialize cart functionality
    loadCart();
    addCartButtonListeners();

    // Enhance existing cart close buttons to restore scroll position
    document.querySelectorAll('.offcanvas-close, .minicart-close, .offcanvas-overlay').forEach(element => {
        element.addEventListener('click', function() {
            setTimeout(restoreScrollPosition, 10);
        });
    });

    // Re-add listeners if dynamic content is loaded
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                addCartButtonListeners();

                // Re-add close button listeners for new content
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        node.querySelectorAll('.offcanvas-close, .minicart-close, .offcanvas-overlay').forEach(element => {
                            element.addEventListener('click', function() {
                                setTimeout(restoreScrollPosition, 10);
                            });
                        });
                    }
                });
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Make cart functions globally accessible
    window.coranoCart = {
        addToCart,
        removeFromCart,
        updateCart,
        cartItems: () => cartItems,
        restoreScrollPosition
    };
});