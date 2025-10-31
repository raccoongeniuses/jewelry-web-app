'use client';

import { useState, useEffect } from 'react';
import ProductCard from '../../components/product/ProductCard';
import Pagination from '../../components/Pagination';
import EmptyPage from '../../components/EmptyPage';
import { Product } from '../../types/product';

// Add jQuery global declaration
declare global {
  interface Window {
    $: any;
    jQuery: any;
  }
}


export default function OurProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 5000 });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [categories, setCategories] = useState<{ value: string; label: string; id: string }[]>([
    { value: 'all', label: 'All Products', id: '' }
  ]);
  const [brands, setBrands] = useState<{ value: string; label: string; id: string }[]>([
    { value: 'all', label: 'All Brands', id: '' }
  ]);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const productsPerPage = 12; // Show 10 products per page
  const maxPages = 99; // Maximum pages to show in pagination

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

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');

        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }

        const data = await response.json();

        // Transform categories data to match dropdown format
        const transformedCategories = [
          { value: 'all', label: 'All Products', id: '' },
          ...data.docs.map((category: any) => ({
            value: category.slug,
            label: category.name,
            id: category.id
          }))
        ];

        setCategories(transformedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Keep default categories if API fails
        setCategories([
          { value: 'all', label: 'All Products', id: '' }
        ]);
      }
    };

    fetchCategories();
  }, []);

  // Fetch brands from API
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch('/api/brands');

        if (!response.ok) {
          throw new Error('Failed to fetch brands');
        }

        const data = await response.json();

        // Transform brands data to match dropdown format
        const transformedBrands = [
          { value: 'all', label: 'All Brands', id: '' },
          ...data.docs.map((brand: any) => ({
            value: brand.slug,
            label: brand.name,
            id: brand.id
          }))
        ];

        setBrands(transformedBrands);
      } catch (error) {
        console.error('Error fetching brands:', error);
        // Keep default brands if API fails
        setBrands([
          { value: 'all', label: 'All Brands', id: '' }
        ]);
      }
    };

    fetchBrands();
  }, []);

  // Reinitialize nice-select for category dropdown when categories are loaded
  useEffect(() => {
    if (typeof window !== 'undefined' && window.$) {
      const categorySelect = window.$('#category-select');
      if (categorySelect.length > 0 && categories.length > 1) {
        // Remove existing nice-select if any
        categorySelect.next('.nice-select').remove();
        // Remove existing event listeners
        categorySelect.off('change');
        // Reinitialize nice-select
        categorySelect.niceSelect();

        // Add change event listener for nice-select
        categorySelect.on('change', (event: any) => {
          const newValue = window.$(event.target).val();
          setSelectedCategory(newValue);
        });
      }
    }
  }, [categories]);

  // Reinitialize nice-select for brand dropdown when brands are loaded
  useEffect(() => {
    if (typeof window !== 'undefined' && window.$) {
      const brandSelect = window.$('#brand-select');
      if (brandSelect.length > 0 && brands.length > 1) {
        // Remove existing nice-select if any
        brandSelect.next('.nice-select').remove();
        // Remove existing event listeners
        brandSelect.off('change');
        // Reinitialize nice-select
        brandSelect.niceSelect();

        // Add change event listener for nice-select
        brandSelect.on('change', (event: any) => {
          const newValue = window.$(event.target).val();
          setSelectedBrand(newValue);
        });
      }
    }
  }, [brands]);

  // Initialize nice-select for sort dropdown
  useEffect(() => {
    if (typeof window !== 'undefined' && window.$) {
      const sortSelect = window.$('#sort-select');
      if (sortSelect.length > 0) {
        // Remove existing nice-select if any
        sortSelect.next('.nice-select').remove();
        // Remove existing event listeners
        sortSelect.off('change');
        // Initialize nice-select
        sortSelect.niceSelect();

        // Add change event listener for nice-select
        sortSelect.on('change', (event: any) => {
          const newValue = window.$(event.target).val();
          setSortBy(newValue);
        });
      }
    }
  }, []);

  // Fetch products function
  const fetchProductsWithFilters = async (pageOverride?: number) => {
    try {
      setLoading(true);

      // Build query parameters
      const params = new URLSearchParams({
        pagination: 'true',
        page: (pageOverride ?? currentPage).toString(),
        limit: productsPerPage.toString(),
        depth: '1',
        trash: 'false',
      });

      // Add sorting parameter based on selected sort option
      switch (sortBy) {
        case 'price-low':
          params.append('sort', 'price');
          break;
        case 'price-high':
          params.append('sort', '-price');
          break;
        case 'name-asc':
          params.append('sort', 'name');
          break;
        case 'name-desc':
          params.append('sort', '-name');
          break;
        default:
          break;
      }

      // Add category filter if selected
      const selectedCategoryObj = categories.find(cat => cat.value === selectedCategory);
      if (selectedCategoryObj && selectedCategoryObj.id) {
        params.append('where[categories][equals]', selectedCategoryObj.id);
      }

      // Add brand filter if selected
      const selectedBrandObj = brands.find(brand => brand.value === selectedBrand);
      if (selectedBrandObj && selectedBrandObj.id) {
        params.append('where[brand][equals]', selectedBrandObj.id);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || ''}/products?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();

      // Helper function to construct full image URL
      const getFullImageUrl = (imageUrl: string | undefined) => {
        if (!imageUrl) return '/placeholder-product.jpg';
        // If URL already starts with http, return as is
        if (imageUrl.startsWith('http')) return imageUrl;

        const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
        // If image URL starts with /api and base URL ends with /api, remove /api from image URL
        if (imageUrl.startsWith('/api') && baseUrl.endsWith('/api')) {
          return `${baseUrl}${imageUrl.replace('/api', '')}`;
        }
        // Otherwise, prepend the API base URL
        return `${baseUrl}${imageUrl}`;
      };

      // Transform API response to Product type
      const transformedProducts: Product[] = data.docs.map((item: any) => ({
        id: item.id,
        name: item.name,
        slug: item.slug,
        description: item.description,
        shortDescription: item.shortDescription || '',
        price: item.price,
        salePrice: item.finalPrice,
        isOnSale: item.isOnSale,
        category: item.categories?.name || 'uncategorized',
        brand: item.brands?.name || 'unbranded',
        image: getFullImageUrl(item.productImage?.url),
        secondaryImage: getFullImageUrl(item.productImage?.url),
        images: item.galleries?.map((gallery: any) => getFullImageUrl(gallery.image?.url)).filter(Boolean) || [],
        stockStatus: item.stockStatus,
        isFeatured: item.isFeatured,
        isBestSeller: item.isBestSeller,
        status: item.status,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      }));

      setProducts(transformedProducts);
      setFilteredProducts(transformedProducts);
      setTotalProducts(data.totalDocs || transformedProducts.length);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
      setFilteredProducts([]);
      setTotalProducts(0);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch when categories and brands are loaded
  useEffect(() => {
    if (categories.length > 1 && brands.length > 1) {
      fetchProductsWithFilters(1);
    }
  }, [categories.length, brands.length]);

  // Fetch products when page changes
  useEffect(() => {
    if (categories.length > 1 && brands.length > 1) {
      fetchProductsWithFilters();
    }
  }, [currentPage]);

  // Fetch products immediately when category or brand changes (reset to page 1)
  useEffect(() => {
    if (categories.length > 1 && brands.length > 1) {
      setCurrentPage(1);
      fetchProductsWithFilters(1);
    }
  }, [selectedCategory, selectedBrand]);

  // Fetch products immediately when sort changes (reset to page 1)
  useEffect(() => {
    if (categories.length > 1 && brands.length > 1) {
      setCurrentPage(1);
      fetchProductsWithFilters(1);
    }
  }, [sortBy]);

  // Reset to page 1 for client-side filters that don't require refetch
  useEffect(() => {
    setCurrentPage(1);
  }, [priceRange]);

  useEffect(() => {
    let filtered = [...products];

    // Filter by price range
    filtered = filtered.filter(product =>
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    setFilteredProducts(filtered);
  }, [products, priceRange]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
                        id="sort-select"
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
                        id="category-select"
                      >
                        {categories.map(category => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 mb-3 mb-lg-0">
                    <div className="shop-category">
                      <label className="filter-label">Brand</label>
                      <select
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        className="nice-select"
                        id="brand-select"
                      >
                        {brands.map(brand => (
                          <option key={brand.value} value={brand.value}>
                            {brand.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-12">
                    <div className="shop-price-filter">
                      <label className="filter-label">Price Range: ${priceRange.min} - ${priceRange.max}</label>
                      <div className="price-range-inputs">
                        <input
                          type="range"
                          min="0"
                          max="5000"
                          value={priceRange.max}
                          onChange={(e) => setPriceRange({...priceRange, max: Number(e.target.value)})}
                          className="price-range-slider"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Clear filters button hidden for now */}
                <div className="col-lg-1 col-md-12" style={{ display: 'none' }}>
                    <div className="clear-filters-wrapper">
                      <button
                        onClick={() => {
                          setSelectedCategory('all');
                          setSelectedBrand('all');
                          setSortBy('default');
                          setPriceRange({ min: 0, max: 5000 });
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
                Showing {filteredProducts.length > 0 ? `${startIndex + 1}-${Math.min(endIndex, filteredProducts.length)}` : '0'} of <span className="results-count">{filteredProducts.length}</span> of <span className="total-count">{totalProducts}</span> products
              </p>
            </div>
          </div>
        </div>

        {/* Product Grid or Empty Page */}
        {loading ? (
          <div className="row">
            <div className="col-12 text-center py-5">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <p className="mt-3">Loading products...</p>
            </div>
          </div>
        ) : isPageEmpty || isPageOutOfRange ? (
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
        {filteredProducts.length === 0 && !isPageEmpty && !isPageOutOfRange && !loading && (
          <div className="row">
            <div className="col-12">
              <div className="no-products-found text-center">
                <h3>No products found</h3>
                <p>Try adjusting your filters or browse all products.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedBrand('all');
                    setSortBy('default');
                    setPriceRange({ min: 0, max: 5000 });
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