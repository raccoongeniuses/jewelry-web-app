'use client';

import { useState, useEffect } from 'react';
import ProductCard from '../components/product/ProductCard';
import Pagination from '../components/Pagination';
import EmptyPage from '../components/EmptyPage';
import { Product } from '../types/product';
import { generateProducts } from '../utils/productGenerator';

// Generate a large number of products for pagination testing (up to 99 pages)
const allProducts: Product[] = generateProducts(800); // 800 products = 100 pages with 8 products per page

export default function OurProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 500 });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 8; // Show 8 products per page
  const maxPages = 99; // Maximum pages to show in pagination

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

  // Calculate pagination values
  const totalPages = Math.min(Math.ceil(filteredProducts.length / productsPerPage), maxPages);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);
  
  // Check if current page is empty
  const isPageEmpty = currentProducts.length === 0;
  const isPageOutOfRange = currentPage > totalPages;

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, sortBy, priceRange]);

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

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of products when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle going to first page (for empty page)
  const handleGoToFirstPage = () => {
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
                Showing {filteredProducts.length > 0 ? `${startIndex + 1}-${Math.min(endIndex, filteredProducts.length)}` : '0'} of <span className="results-count">{filteredProducts.length}</span> of <span className="total-count">{allProducts.length}</span> products
              </p>
            </div>
          </div>
        </div>

        {/* Product Grid or Empty Page */}
        {isPageEmpty || isPageOutOfRange ? (
          <EmptyPage 
            currentPage={currentPage}
            totalPages={totalPages}
            onGoToFirstPage={handleGoToFirstPage}
          />
        ) : (
          <div className="shop-product-wrap grid-view row mbn-30">
            {currentProducts.map((product) => (
              <div key={product.id} className="col-lg-3 col-md-4 col-sm-6">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {/* No Products Found (when no products match filters) */}
        {filteredProducts.length === 0 && !isPageEmpty && !isPageOutOfRange && (
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

        {/* Pagination */}
        {filteredProducts.length > 0 && totalPages > 1 && !isPageEmpty && !isPageOutOfRange && (
          <div className="row">
            <div className="col-12">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                maxVisiblePages={7}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}