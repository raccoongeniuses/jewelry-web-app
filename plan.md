# Jevoo Jewellery Next.js Migration Plan

## Overview
This document outlines the migration plan from the original Corano HTML/CSS/JS template to the Next.js implementation, focusing on fixing the marquee functionality, cart system, and featured products components.

## Current Issues Identified

### 1. Marquee Component Issues
- **Problem**: The draggable marquee in Next.js is static and doesn't have the interactive functionality from the original
- **Original**: Uses GSAP Flip animations, click interactions, and product details panel
- **Current**: Static grid layout without animations or interactions

### 2. Cart Functionality Issues
- **Problem**: Cart system is not properly implemented in Next.js
- **Original**: Full cart functionality with localStorage, add/remove items, quantity management
- **Current**: Missing cart state management and functionality

### 3. Featured Products Issues
- **Problem**: Featured products section is empty in Next.js
- **Original**: Complete product carousel with slick slider, product cards, and interactions
- **Current**: Only section title, no actual products

### 4. Missing Components
- Product carousel/slider functionality
- Cart modal/dropdown
- Product quick view modal
- Wishlist functionality
- Compare functionality

## Migration Plan

### Phase 1: Core Infrastructure Setup
1. **Copy Assets and Dependencies**
   - Copy all CSS files from `corano/assets/css/` to `jevoo/public/assets/css/`
   - Copy all JS files from `corano/assets/js/` to `jevoo/public/assets/js/`
   - Copy all images from `corano/assets/img/` to `jevoo/public/assets/img/`
   - Copy fonts from `corano/assets/fonts/` to `jevoo/public/assets/fonts/`

2. **Update Layout and Scripts**
   - Ensure all CSS and JS files are properly linked in `layout.tsx`
   - Add missing script dependencies (GSAP, Flip, etc.)
   - Fix script loading order and strategy

### Phase 2: Marquee Component Implementation
1. **Create Marquee Component**
   - Create `components/Marquee.tsx` with proper GSAP animations
   - Implement click interactions for product details
   - Add product details panel with animations
   - Integrate with cart functionality

2. **Key Features to Implement**
   - GSAP Flip animations for smooth transitions
   - Click handlers for product selection
   - Product details overlay panel
   - Add to cart functionality from marquee items

### Phase 3: Cart System Implementation
1. **Create Cart Context**
   - Create `contexts/CartContext.tsx` for global cart state
   - Implement localStorage persistence
   - Add cart actions (add, remove, update quantity)

2. **Create Cart Components**
   - `components/cart/CartModal.tsx` - Cart dropdown/modal
   - `components/cart/CartItem.tsx` - Individual cart item
   - `components/cart/CartButton.tsx` - Add to cart button

3. **Cart Functionality**
   - Add to cart from product cards
   - Add to cart from marquee items
   - Remove items from cart
   - Update quantities
   - Calculate totals and subtotals

### Phase 4: Featured Products Implementation
1. **Create Product Components**
   - `components/product/ProductCard.tsx` - Individual product card
   - `components/product/ProductCarousel.tsx` - Product slider
   - `components/product/FeaturedProducts.tsx` - Featured products section

2. **Product Data Structure**
   - Create product data/types
   - Implement product image handling
   - Add product variants (colors, sizes)

3. **Product Interactions**
   - Add to cart functionality
   - Wishlist functionality
   - Compare functionality
   - Quick view modal

### Phase 5: Additional Components
1. **Modal Components**
   - `components/modals/QuickViewModal.tsx`
   - `components/modals/ProductDetailsModal.tsx`

2. **Utility Components**
   - `components/ui/Button.tsx`
   - `components/ui/Modal.tsx`
   - `components/ui/Carousel.tsx`

### Phase 6: Integration and Testing
1. **Component Integration**
   - Integrate all components in main page
   - Ensure proper state management
   - Test all interactions

2. **Responsive Design**
   - Ensure mobile compatibility
   - Test on different screen sizes
   - Fix any layout issues

## File Structure After Migration

```
jevoo/
├── app/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Marquee.tsx
│   │   ├── cart/
│   │   │   ├── CartModal.tsx
│   │   │   ├── CartItem.tsx
│   │   │   └── CartButton.tsx
│   │   ├── product/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductCarousel.tsx
│   │   │   └── FeaturedProducts.tsx
│   │   └── modals/
│   │       ├── QuickViewModal.tsx
│   │       └── ProductDetailsModal.tsx
│   ├── contexts/
│   │   └── CartContext.tsx
│   ├── types/
│   │   └── product.ts
│   └── hooks/
│       └── useCart.ts
├── public/
│   └── assets/
│       ├── css/
│       ├── js/
│       ├── img/
│       └── fonts/
└── lib/
    └── utils.ts
```

## Implementation Priority

1. **High Priority**
   - Copy and fix asset loading
   - Implement cart functionality
   - Create featured products section
   - Fix marquee interactions

2. **Medium Priority**
   - Add product quick view
   - Implement wishlist
   - Add compare functionality
   - Mobile responsiveness

3. **Low Priority**
   - Advanced animations
   - Performance optimizations
   - Additional features

## Success Criteria

- [ ] Marquee component works with GSAP animations
- [ ] Cart functionality is fully working
- [ ] Featured products display correctly
- [ ] All interactions work as in original
- [ ] Mobile responsive design
- [ ] No console errors
- [ ] Fast loading times

## Notes

- Maintain the original design and functionality
- Use TypeScript for type safety
- Implement proper error handling
- Ensure accessibility compliance
- Optimize for performance
