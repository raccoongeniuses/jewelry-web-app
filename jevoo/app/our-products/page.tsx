'use client';

import { useState, useEffect } from 'react';
import ProductCard from '../components/product/ProductCard';
import { Product } from '../types/product';

// Combine best seller and on-sale products into a single array
const allProducts: Product[] = [
  // Best Seller Products
  {
    id: 'bs-1',
    name: 'Diamond Exclusive Ring',
    price: 50.0,
    originalPrice: 65.0,
    image: '/assets/img/product/diamond-ring.jpeg',
    secondaryImage: '/assets/img/product/diamond-rings.jpeg',
    url: '/product-details',
    brand: 'Diamond Collection',
    category: 'rings',
    isNew: false,
    isSale: true,
    discount: 23,
    inStock: true,
    colors: ['lightblue', 'gold', 'silver'],
  },
  {
    id: 'bs-2',
    name: 'Handmade Golden Ring',
    price: 55.0,
    image: '/assets/img/product/gold-handmade.jpeg',
    secondaryImage: '/assets/img/product/gold-rings.jpeg',
    url: '/product-details',
    brand: 'Gold Collection',
    category: 'rings',
    isNew: false,
    isSale: false,
    inStock: true,
    colors: ['gold', 'rose-gold'],
  },
  {
    id: 'bs-3',
    name: 'Exclusive Gold Jewelry Set',
    price: 45.0,
    image: '/assets/img/product/gold-jewelry.jpeg',
    secondaryImage: '/assets/img/product/gold-necklace.jpeg',
    url: '/product-details',
    brand: 'Quickiin',
    category: 'sets',
    isNew: true,
    isSale: false,
    inStock: true,
    colors: ['gold'],
  },
  {
    id: 'bs-4',
    name: 'Perfect Diamond Earrings',
    price: 50.0,
    originalPrice: 70.0,
    image: '/assets/img/product/diamond-earring.jpeg',
    secondaryImage: '/assets/img/product/diamond-rings.jpeg',
    url: '/product-details',
    brand: 'Diamond Collection',
    category: 'earrings',
    isNew: false,
    isSale: true,
    discount: 29,
    inStock: true,
    colors: ['silver', 'gold'],
  },
  {
    id: 'bs-5',
    name: 'Handmade Golden Necklace',
    price: 90.0,
    originalPrice: 120.0,
    image: '/assets/img/product/gold-necklace.jpeg',
    secondaryImage: '/assets/img/product/gold-necklace-details-1.jpeg',
    url: '/product-details',
    brand: 'Gold Collection',
    category: 'necklaces',
    isNew: false,
    isSale: true,
    discount: 25,
    inStock: true,
    colors: ['gold', 'rose-gold'],
  },
  {
    id: 'bs-6',
    name: 'Diamond Ring Collection',
    price: 125.0,
    image: '/assets/img/product/diamond-ring.jpeg',
    secondaryImage: '/assets/img/product/diamond-rings.jpeg',
    url: '/product-details',
    brand: 'Platinum',
    category: 'rings',
    isNew: false,
    isSale: false,
    inStock: true,
    colors: ['lightblue', 'silver'],
  },
  {
    id: 'bs-7',
    name: 'Silver Wedding Ring',
    price: 280.0,
    image: '/assets/img/product/silver-bracelet.jpeg',
    secondaryImage: '/assets/img/product/mony-ring.jpeg',
    url: '/product-details',
    brand: 'Quickiin',
    category: 'rings',
    isNew: false,
    isSale: false,
    inStock: true,
    colors: ['blue', 'silver', 'gold'],
  },
  {
    id: 'bs-8',
    name: 'Elegant Silver Bracelet',
    price: 450.0,
    image: '/assets/img/product/silver-bracelet.jpeg',
    secondaryImage: '/assets/img/product/gold-rings.jpeg',
    url: '/product-details',
    brand: 'Quickiin',
    category: 'bracelets',
    isNew: false,
    isSale: false,
    inStock: true,
    colors: ['silver'],
  },

  // On-Sale Products
  {
    id: 'os-1',
    name: 'Classic Silver Bracelet',
    price: 144.0,
    originalPrice: 180.0,
    image: '/assets/img/product/silver-bracelet.jpeg',
    secondaryImage: '/assets/img/product/gold-rings.jpeg',
    url: '/product-details',
    brand: 'Diamond',
    category: 'bracelets',
    isNew: false,
    isSale: true,
    discount: 20,
    inStock: true,
    colors: ['gold', 'rose-gold'],
  },
  {
    id: 'os-2',
    name: 'Golden Necklace Collection',
    price: 55.0,
    originalPrice: 75.0,
    image: '/assets/img/product/gold-necklace.jpeg',
    secondaryImage: '/assets/img/product/gold-necklace-details-1.jpeg',
    url: '/product-details',
    brand: 'Gold Collection',
    category: 'necklaces',
    isNew: false,
    isSale: true,
    discount: 27,
    inStock: true,
    colors: ['gold'],
  },
  {
    id: 'os-3',
    name: 'Exclusive Silver Bracelet',
    price: 45.0,
    originalPrice: 65.0,
    image: '/assets/img/product/silver-bracelet.jpeg',
    secondaryImage: '/assets/img/product/gold-rings.jpeg',
    url: '/product-details',
    brand: 'BDevs',
    category: 'bracelets',
    isNew: false,
    isSale: true,
    discount: 31,
    inStock: true,
    colors: ['silver'],
  },
  {
    id: 'os-4',
    name: 'Diamond Necklace',
    price: 50.0,
    originalPrice: 70.0,
    image: '/assets/img/product/diamond-necklace.jpeg',
    secondaryImage: '/assets/img/product/diamond-ring.jpeg',
    url: '/product-details',
    brand: 'Diamond Collection',
    category: 'necklaces',
    isNew: false,
    isSale: true,
    discount: 29,
    inStock: true,
    colors: ['silver', 'gold'],
  },
  {
    id: 'os-5',
    name: 'Diamond Stud Earrings',
    price: 90.0,
    originalPrice: 100.0,
    image: '/assets/img/product/diamond-earring.jpeg',
    secondaryImage: '/assets/img/product/diamond-ring-1.jpeg',
    url: '/product-details',
    brand: 'Diamond Collection',
    category: 'earrings',
    isNew: false,
    isSale: true,
    discount: 10,
    inStock: true,
    colors: ['silver', 'gold'],
  },
  {
    id: 'os-6',
    name: 'Diamond Ring Special',
    price: 90.0,
    originalPrice: 120.0,
    image: '/assets/img/product/mony-ring.jpeg',
    secondaryImage: '/assets/img/product/diamond-ring.jpeg',
    url: '/product-details',
    brand: 'BDevs',
    category: 'rings',
    isNew: false,
    isSale: true,
    discount: 25,
    inStock: true,
    colors: ['white', 'cream'],
  },
  {
    id: 'os-7',
    name: 'Gold Ring Collection',
    price: 224.0,
    originalPrice: 320.0,
    image: '/assets/img/product/gold-rings.jpeg',
    secondaryImage: '/assets/img/product/diamond-rings.jpeg',
    url: '/product-details',
    brand: 'BDevs',
    category: 'rings',
    isNew: false,
    isSale: true,
    discount: 30,
    inStock: true,
    colors: ['red', 'gold'],
  },
  {
    id: 'os-8',
    name: 'Jevoo Exclusive Jewelry Set',
    price: 20.0,
    originalPrice: 30.0,
    image: '/assets/img/product/gold-jewelry.jpeg',
    secondaryImage: '/assets/img/product/gold-necklace.jpeg',
    url: '/product-details',
    brand: 'Jevoo',
    category: 'sets',
    isNew: false,
    isSale: true,
    discount: 33,
    inStock: true,
    colors: ['gold', 'silver'],
  },
];

export default function OurProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 500 });

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'rings', label: 'Rings' },
    { value: 'necklaces', label: 'Necklaces' },
    { value: 'earrings', label: 'Earrings' },
    { value: 'bracelets', label: 'Bracelets' },
    { value: 'sets', label: 'Jewelry Sets' },
  ];

  const sortOptions = [
    { value: 'default', label: 'Default' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' },
  ];

  useEffect(() => {
    let filtered = [...allProducts];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(product =>
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Keep original order
        break;
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, sortBy, priceRange]);

  return (
    <div className="page-content-wrapper section-padding">
      {/* Page Header */}
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-title text-center mb-2">
              <h1>Our Complete Product Collection</h1>
              <p>Discover our finest selection of jewelry, featuring best sellers and special on-sale items</p>
            </div>
          </div>
        </div>

        {/* Filters and Sorting */}
        <div className="row mb-2">
          <div className="col-lg-12">
            <div className="shop-toolbar-wrapper">
              <div className="shop-toolbar">
                <div className="row align-items-center">
                  <div className="col-lg-3 col-md-6 mb-3 mb-lg-0">
                    <div className="shop-sortby">
                      <label className="filter-label">Sort By</label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="nice-select"
                      >
                        {sortOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 mb-3 mb-lg-0">
                    <div className="shop-category">
                      <label className="filter-label">Category</label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="nice-select"
                      >
                        {categories.map(category => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-5 col-md-12">
                    <div className="shop-price-filter">
                      <label className="filter-label">Price Range: ${priceRange.min} - ${priceRange.max}</label>
                      <div className="price-range-inputs">
                        <input
                          type="range"
                          min="0"
                          max="500"
                          value={priceRange.max}
                          onChange={(e) => setPriceRange({...priceRange, max: Number(e.target.value)})}
                          className="price-range-slider"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-1 col-md-12">
                    <div className="clear-filters-wrapper">
                      <button
                        onClick={() => {
                          setSelectedCategory('all');
                          setSortBy('default');
                          setPriceRange({ min: 0, max: 500 });
                        }}
                        className="clear-filters-btn"
                        title="Clear all filters"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="row mb-30">
          <div className="col-12">
            <div className="results-summary">
              <p className="results-text">
                Showing <span className="results-count">{filteredProducts.length}</span> of <span className="total-count">{allProducts.length}</span> products
              </p>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="shop-product-wrap grid-view row mbn-30">
          {filteredProducts.map((product) => (
            <div key={product.id} className="col-lg-3 col-md-4 col-sm-6">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* No Products Found */}
        {filteredProducts.length === 0 && (
          <div className="row">
            <div className="col-12">
              <div className="no-products-found text-center">
                <h3>No products found</h3>
                <p>Try adjusting your filters or browse all products.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSortBy('default');
                    setPriceRange({ min: 0, max: 500 });
                  }}
                  className="btn btn-primary"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}