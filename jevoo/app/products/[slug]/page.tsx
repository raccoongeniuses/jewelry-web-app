'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ScriptLoader from '../../../components/ScriptLoader';
import LoaderSpinner, { JewelryLoader, LuxuryJewelryLoader } from '../../../components/LoaderSpinner';
import QuickViewModal from '../../../components/modals/QuickViewModal';
import ProductReviews from '../../../components/product/ProductReviews';
import RelatedProducts from '../../../components/product/RelatedProducts';
import ProductImageGallery from '../../../components/product/ProductImageGallery';
import ProductInfo from '../../../components/product/ProductInfo';
import { Product } from '../../../types/product';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = use(params);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Helper function to construct full image URL
  const getFullImageUrl = (imageUrl: string | undefined) => {
    if (!imageUrl) return '/assets/img/product/product-details-img1.jpg';
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

  // Fetch product data from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || ''}/products/slug/${resolvedParams.slug}?depth=1`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }

        const item = await response.json();

        // Debug: Log the API response to see the structure
        console.log('API Response:', item);
        console.log('Product Image URL:', item.productImage?.url);
        console.log('Galleries:', item.galleries);

        // Transform API response to Product type
        const mainImageUrl = getFullImageUrl(item.productImage?.url);
        console.log('Main Image URL:', mainImageUrl);

        const transformedProduct: Product = {
          id: item.id,
          name: item.name,
          slug: item.slug,
          description: item.description,
          shortDescription: item.shortDescription || '',
          price: item.price,
          salePrice: item.finalPrice,
          originalPrice: item.salePrice,
          isOnSale: item.isOnSale,
          category: item.categories?.name || 'uncategorized',
          brand: item.brand?.name || 'Brand',
          image: mainImageUrl,
          secondaryImage: mainImageUrl,
          images: (() => {
            const galleryImages = item.galleries?.map((gallery: any) => getFullImageUrl(gallery.image?.url)).filter(Boolean) || [];
            console.log('Gallery Images:', galleryImages);
            // If we have gallery images, include them, otherwise just use the main image
            return galleryImages.length > 0 ? [mainImageUrl, ...galleryImages].slice(0, 5) : [mainImageUrl];
          })(),
          stockStatus: item.stockStatus,
          isFeatured: item.isFeatured,
          isBestSeller: item.isBestSeller,
          status: item.status,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          // Required fields for ProductInfo component
          colors: ['LightSteelblue', 'Darktan', 'Grey', 'Brown'], // Default colors
          sizes: ['S', 'M', 'L', 'XL'], // Default sizes
          inStock: item.stockStatus === 'in_stock',
          stockCount: item.stock || 100, // Use stock from API or default to 100
          isNew: false, // You can determine this from createdAt if needed
          isSale: item.isOnSale,
          discount: item.isOnSale && item.price > item.finalPrice
            ? Math.round(((item.price - item.finalPrice) / item.price) * 100)
            : 0,
          rating: 5, // Default rating
          reviewCount: 1, // Default review count
          sku: item.sku || `JEWEL-${item.id}`,
          categories: [item.categories?.name || 'Jewelry'], // Convert category to array
          tags: ['jewelry', 'luxury', 'premium'], // Default tags
        };

        setProduct(transformedProduct);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Product not found');
      } finally {
        setContentLoaded(true);
      }
    };

    fetchProduct();
  }, [resolvedParams.slug]);

  // Simulate content loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setContentLoaded(true);
    }, 1000); // 1 second delay to simulate content loading

    return () => clearTimeout(timer);
  }, []);

  // Check if everything is loaded
  useEffect(() => {
    if (scriptsLoaded && contentLoaded) {
      // Add a small delay to ensure smooth transition
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [scriptsLoaded, contentLoaded]);

  const handleScriptsLoaded = () => {
    setScriptsLoaded(true);
  };

  // Show loader while content is loading
  if (isLoading) {
    return (
      <>
        <ScriptLoader onScriptsLoaded={handleScriptsLoaded} />
        <LuxuryJewelryLoader
          fullScreen={true}
          size="large"
          message="Loading exquisite jewelry details..."
        />
      </>
    );
  }

  // Show error if product not found
  if (error || !product) {
    return (
      <>
        <ScriptLoader onScriptsLoaded={handleScriptsLoaded} />
        <div className="wrapper animate-fade-in">
          <Header />
          <main className="pt-5 pb-5">
            <div className="container">
              <div className="row">
                <div className="col-12 text-center">
                  <h1>Product Not Found</h1>
                  <p>The product you're looking for doesn't exist or has been removed.</p>
                  <Link href="/our-products" className="btn btn-primary">
                    Back to Products
                  </Link>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  const breadcrumbData = [
    { name: 'Home', url: '/' },
    { name: 'Shop', url: '/our-products' },
    { name: product.category || 'Product', url: `/our-products?category=${product.category}` },
    { name: product.name, url: `/products/${product.slug}` }
  ];

  return (
    <>
      <ScriptLoader onScriptsLoaded={handleScriptsLoaded} />
      <div className="wrapper animate-fade-in">
        <Header />

        <main>
          {/* Breadcrumb Area */}
          <div className="breadcrumb-area">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="breadcrumb-wrap">
                    <nav aria-label="breadcrumb">
                      <ul className="breadcrumb">
                        {breadcrumbData.map((item, index) => (
                          <li
                            key={index}
                            className={`breadcrumb-item${index === breadcrumbData.length - 1 ? ' active' : ''}`}
                            aria-current={index === breadcrumbData.length - 1 ? 'page' : undefined}
                          >
                            {index === 0 ? (
                              <Link href={item.url}>
                                <i className="fa fa-home"></i>
                              </Link>
                            ) : index === breadcrumbData.length - 1 ? (
                              item.name
                            ) : (
                              <Link href={item.url}>{item.name}</Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Main Wrapper */}
          <div className="shop-main-wrapper section-padding pb-0">
            <div className="container">
              <div className="row">
                {/* Product Details Wrapper */}
                <div className="col-lg-12 order-1 order-lg-2">
                  {/* Product Details Inner */}
                  <div className="product-details-inner">
                    <div className="row">
                      {/* Product Image Gallery */}
                      <div className="col-lg-5">
                        <ProductImageGallery
                          images={product.images}
                          selectedImageIndex={selectedImageIndex}
                          onImageSelect={setSelectedImageIndex}
                        />
                      </div>

                      {/* Product Information */}
                      <div className="col-lg-7">
                        <ProductInfo
                          product={product}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Product Details Inner End */}

                  {/* Product Details Reviews */}
                  <ProductReviews product={product} />
                </div>
                {/* Product Details Wrapper End */}
              </div>
            </div>
          </div>
          {/* Page Main Wrapper End */}

          {/* Related Products Section */}
          <RelatedProducts currentProductId={product.id} />
        </main>

        <Footer />
      </div>

      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
}