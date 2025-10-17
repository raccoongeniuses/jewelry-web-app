document.addEventListener("DOMContentLoaded", function() {
    // Cart page functionality
    loadCartFromStorage();
    setupCartEventListeners();
});

// Load cart data from localStorage and populate the cart table
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('coranoCart');

    let cartItems = [];
    if (savedCart) {
        cartItems = JSON.parse(savedCart);
    }

    // If cart is empty, show empty cart message
    if (cartItems.length === 0) {
        showEmptyCart();
        return;
    }

    populateCartTable(cartItems);
    updateCartTotals(cartItems);
}

// Show empty cart message
function showEmptyCart() {
    const cartTableBody = document.querySelector('.cart-table tbody');
    if (cartTableBody) {
        cartTableBody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center py-5">
                    <div class="empty-cart-message">
                        <h4>Your cart is empty</h4>
                        <p>Add some products to your cart first!</p>
                        <a href="index.html" class="btn btn-sqr">Continue Shopping</a>
                    </div>
                </td>
            </tr>
        `;
    }

    // Hide cart totals section
    const cartCalculator = document.querySelector('.cart-calculator-wrapper');
    if (cartCalculator) {
        cartCalculator.style.display = 'none';
    }

    // Hide cart update section
    const cartUpdate = document.querySelector('.cart-update-option');
    if (cartUpdate) {
        cartUpdate.style.display = 'none';
    }

    // Reset mini cart totals to zero
    const miniCartSubtotal = document.querySelector('.minicart-pricing-box li:nth-child(1) span strong');
    const miniCartEcoTax = document.querySelector('.minicart-pricing-box li:nth-child(2) span strong');
    const miniCartVat = document.querySelector('.minicart-pricing-box li:nth-child(3) span strong');
    const miniCartTotal = document.querySelector('.minicart-pricing-box li.total span strong');

    if (miniCartSubtotal) miniCartSubtotal.textContent = '$0.00';
    if (miniCartEcoTax) miniCartEcoTax.textContent = '$0.00';
    if (miniCartVat) miniCartVat.textContent = '$0.00';
    if (miniCartTotal) miniCartTotal.textContent = '$0.00';
}

// Populate the cart table with items
function populateCartTable(cartItems) {
    const cartTableBody = document.querySelector('.cart-table tbody');
    if (!cartTableBody) return;

    cartTableBody.innerHTML = '';

    cartItems.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="pro-number">
                <span>${index + 1}</span>
            </td>
            <td class="pro-thumbnail">
                <a href="#">
                    <img class="img-fluid" src="${item.image || 'assets/img/product/product-1.jpg'}" alt="${item.name}" />
                </a>
            </td>
            <td class="pro-title">
                <a href="#">${item.name}</a>
            </td>
            <td class="pro-quantity">
                <div class="pro-qty">
                    <input type="text" value="${item.quantity}" data-product-id="${item.id}" class="quantity-input">
                </div>
            </td>
            <td class="pro-price">
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </td>
            <td class="pro-remove">
                <button class="remove-item" data-product-id="${item.id}">
                    <i class="fa fa-trash-o"></i>
                </button>
            </td>
        `;
        cartTableBody.appendChild(row);
    });
}

// Update cart totals
function updateCartTotals(cartItems) {
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const ecoTax = subtotal * 0.02; // 2% eco tax
    const vat = subtotal * 0.20; // 20% VAT
    const total = subtotal + ecoTax + vat;

    // Update main cart calculation table if it exists
    const cartSubtotal = document.querySelector('.cart-calculate-items .subtotal span:last-child');
    const cartEcoTax = document.querySelector('.cart-calculate-items .eco-tax span:last-child');
    const cartVat = document.querySelector('.cart-calculate-items .vat span:last-child');
    const cartTotal = document.querySelector('.cart-calculate-items .total span:last-child');

    if (cartSubtotal) cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    if (cartEcoTax) cartEcoTax.textContent = `$${ecoTax.toFixed(2)}`;
    if (cartVat) cartVat.textContent = `$${vat.toFixed(2)}`;
    if (cartTotal) cartTotal.textContent = `$${total.toFixed(2)}`;

    // Update mini cart totals if it exists
    const miniCartSubtotal = document.querySelector('.minicart-pricing-box li:nth-child(1) span strong');
    const miniCartEcoTax = document.querySelector('.minicart-pricing-box li:nth-child(2) span strong');
    const miniCartVat = document.querySelector('.minicart-pricing-box li:nth-child(3) span strong');
    const miniCartTotal = document.querySelector('.minicart-pricing-box li.total span strong');

    if (miniCartSubtotal) miniCartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    if (miniCartEcoTax) miniCartEcoTax.textContent = `$${ecoTax.toFixed(2)}`;
    if (miniCartVat) miniCartVat.textContent = `$${vat.toFixed(2)}`;
    if (miniCartTotal) miniCartTotal.textContent = `$${total.toFixed(2)}`;
}

// Setup cart page event listeners
function setupCartEventListeners() {
    // Remove item buttons
    document.addEventListener('click', function(e) {
        if (e.target.closest('.remove-item')) {
            const button = e.target.closest('.remove-item');
            const productId = button.dataset.productId;
            removeItemFromCart(productId);
        }
    });

    // Quantity input changes
    document.addEventListener('change', function(e) {
        if (e.target.classList.contains('quantity-input')) {
            const input = e.target;
            const productId = input.dataset.productId;
            const newQuantity = parseInt(input.value) || 1;

            if (newQuantity < 1) {
                input.value = 1;
                return;
            }

            updateItemQuantity(productId, newQuantity);
        }
    });

    // Update cart button
    const updateCartBtn = document.querySelector('.cart-update a');
    if (updateCartBtn) {
        updateCartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            refreshCartFromInputs();
        });
    }

    // Apply coupon button
    const applyCouponBtn = document.querySelector('.apply-coupon-wrapper button');
    if (applyCouponBtn) {
        applyCouponBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Coupon functionality would be implemented here');
        });
    }
}

// Remove item from cart
function removeItemFromCart(productId) {
    const savedCart = localStorage.getItem('coranoCart');
    if (!savedCart) return;

    let cartItems = JSON.parse(savedCart);
    cartItems = cartItems.filter(item => item.id !== productId);

    localStorage.setItem('coranoCart', JSON.stringify(cartItems));

    // Check if cart is now empty
    if (cartItems.length === 0) {
        showEmptyCart();
    } else {
        // Reload the cart display
        loadCartFromStorage();
    }

    // Update mini cart if it exists
    if (window.coranoCart) {
        window.coranoCart.removeFromCart(productId);
    }
}

// Update item quantity
function updateItemQuantity(productId, newQuantity) {
    const savedCart = localStorage.getItem('coranoCart');
    if (!savedCart) return;

    let cartItems = JSON.parse(savedCart);
    const item = cartItems.find(item => item.id === productId);

    if (item) {
        item.quantity = newQuantity;
        localStorage.setItem('coranoCart', JSON.stringify(cartItems));

        // Update the price for this row (now shows total price)
        const row = document.querySelector(`.quantity-input[data-product-id="${productId}"]`).closest('tr');
        const priceCell = row.querySelector('.pro-price span');
        priceCell.textContent = `$${(item.price * item.quantity).toFixed(2)}`;

        // Update overall totals
        updateCartTotals(cartItems);
    }
}

// Refresh cart from all quantity inputs (for Update Cart button)
function refreshCartFromInputs() {
    const savedCart = localStorage.getItem('coranoCart');
    if (!savedCart) return;

    let cartItems = JSON.parse(savedCart);
    const quantityInputs = document.querySelectorAll('.quantity-input');

    quantityInputs.forEach(input => {
        const productId = input.dataset.productId;
        const newQuantity = parseInt(input.value) || 1;

        const item = cartItems.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
        }
    });

    localStorage.setItem('coranoCart', JSON.stringify(cartItems));
    loadCartFromStorage();

    // Show success message
    showNotification('Cart updated successfully!');
}

// Show notification message
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        z-index: 9999;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Slide in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}