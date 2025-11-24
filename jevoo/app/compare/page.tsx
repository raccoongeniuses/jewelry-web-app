"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import LoaderSpinner from "../../components/LoaderSpinner";
import CartButton from "../../components/cart/CartButton";
import { useCompare } from "../../contexts/CompareContext";

interface ProductImage {
  createdAt: string;
  updatedAt: string;
  alt: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  focalX: number;
  focalY: number;
  id: string;
  url: string;
  thumbnailURL: null;
}

interface AttributeValue {
  name: string;
  slug: string;
  id: string;
}

interface ProductAttribute {
  attribute: {
    name: string;
    slug: string;
    description: string;
    id: string;
  };
  attributeValues: AttributeValue[];
  id: string;
}

interface Category {
  name: string;
  slug: string;
  id: string;
}

interface Brand {
  name: string;
  slug: string;
  id: string;
}

interface Product {
  createdAt: string;
  updatedAt: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  isOnSale: boolean;
  salePrice: number;
  finalPrice: number;
  manageInventory: boolean;
  stock: number;
  stockStatus: string;
  productAttributes: ProductAttribute[];
  status: string;
  isFeatured: boolean;
  isBestSeller: boolean;
  categories: Category;
  brand: Brand;
  productImage: ProductImage;
  galleries: Array<{
    image: ProductImage;
    id: string;
  }>;
  id: string;
  isNewProduct: boolean;
  isWishlisted: boolean;
  isNew: boolean;
}


export default function ComparePage() {
  const { compareProducts, compareProductsData, removeFromCompare, clearCompare } = useCompare();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  
  // Format currency
  const formatCurrency = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  // Generate star rating HTML
  const generateStarRating = (rating: number = 5): React.ReactElement => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fa fa-star"></i>);
    }
    if (hasHalfStar) {
      stars.push(<i key="half" className="fa fa-star-half-o"></i>);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="fa fa-star-o"></i>);
    }
    return <>{stars}</>;
  };

  // Get display price (sale price if on sale, otherwise regular price)
  const getDisplayPrice = (product: Product) => {
    if (product.isOnSale && product.salePrice) {
      return {
        regular: formatCurrency(product.price),
        sale: formatCurrency(product.salePrice),
        final: formatCurrency(product.finalPrice)
      };
    }
    return {
      regular: formatCurrency(product.price),
      sale: null,
      final: formatCurrency(product.price)
    };
  };

  // Get stock status text
  const getStockStatus = (product: Product): string => {
    if (product.stockStatus === 'in_stock') {
      return product.manageInventory && product.stock <= 0 ? 'Out of Stock' : 'In Stock';
    }
    return 'Out of Stock';
  };

  
  // Remove product from compare
  const removeProduct = (slug: string) => {
    removeFromCompare(slug);
  };

  // Clear all products from compare
  const clearAllProducts = () => {
    clearCompare();
  };

  useEffect(() => {
    // Use products data from compare context directly
    if (compareProducts.length === 0) {
      setLoading(false);
      return;
    }

    setLoading(false);
    setError(null);
  }, [compareProducts, compareProductsData]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <LoaderSpinner />
        </main>
        <Footer />
      </>
    );
  }

  if (compareProducts.length === 0) {
    return (
      <>
        <Header />
        <main>
          {/* breadcrumb area start */}
          <div className="breadcrumb-area">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="breadcrumb-wrap">
                    <nav aria-label="breadcrumb">
                      <ul className="breadcrumb">
                        <li className="breadcrumb-item">
                          <Link href="/"><i className="fa fa-home"></i></Link>
                        </li>
                        <li className="breadcrumb-item">
                          <Link href="/our-products">Products</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">compare</li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* breadcrumb area end */}

          {/* compare main wrapper start */}
          <div className="compare-page-wrapper section-padding">
            <div className="container">
              <div className="section-bg-color">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="compare-page-content-wrap">
                      <div className="text-center py-5">
                        <i className="fa fa-exchange fa-3x text-muted mb-3"></i>
                        <h3>No Products to Compare</h3>
                        <p className="text-muted">Please select products to compare from the products page.</p>
                        <Link href="/our-products" className="btn btn-primary mt-3">
                          <i className="fa fa-shopping-bag"></i> Go to Products
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* compare main wrapper end */}
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <main>
          {/* breadcrumb area start */}
          <div className="breadcrumb-area">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="breadcrumb-wrap">
                    <nav aria-label="breadcrumb">
                      <ul className="breadcrumb">
                        <li className="breadcrumb-item">
                          <Link href="/"><i className="fa fa-home"></i></Link>
                        </li>
                        <li className="breadcrumb-item">
                          <Link href="/our-products">Products</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">compare</li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* breadcrumb area end */}

          {/* compare main wrapper start */}
          <div className="compare-page-wrapper section-padding">
            <div className="container">
              <div className="section-bg-color">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="compare-page-content-wrap">
                      <div className="text-center py-5">
                        <div className="alert alert-danger" role="alert">
                          <i className="fa fa-exclamation-triangle"></i>
                          {error}
                        </div>
                        <Link href="/our-products" className="btn btn-primary mt-3">
                          <i className="fa fa-arrow-left"></i> Back to Products List
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* compare main wrapper end */}
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        {/* breadcrumb area start */}
        <div className="breadcrumb-area">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="breadcrumb-wrap">
                  <nav aria-label="breadcrumb">
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link href="/"><i className="fa fa-home"></i></Link>
                      </li>
                      <li className="breadcrumb-item">
                        <Link href="/our-products">Products</Link>
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">compare</li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* breadcrumb area end */}

        {/* compare main wrapper start */}
        <div className="compare-page-wrapper section-padding">
          <div className="container">
            <div className="section-bg-color">
              <div className="row">
                <div className="col-lg-12">
                  {/* Compare Page Content Start */}
                  <div className="compare-page-content-wrap">
                    {compareProductsData.length > 0 && (
                      <div className="text-end mb-3">
                        <button
                          onClick={clearAllProducts}
                          className="btn btn-outline-danger btn-sm"
                        >
                          <i className="fa fa-trash-o"></i> Clear All
                        </button>
                      </div>
                    )}
                    <div className="compare-table table-responsive">
                      <table className="table table-bordered mb-0">
                        <tbody>
                          {/* Product row */}
                          <tr>
                            <td className="first-column align-middle text-center" style={{textAlign: 'center', verticalAlign: 'middle'}}>Product</td>
                            {compareProductsData.map((product) => {
                              // Helper function to construct full image URL (same as our-products page)
                              const getFullImageUrl = (imageUrl: string | undefined) => {
                                if (!imageUrl) return '/assets/img/product/default.jpg';
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

                              const productImage = getFullImageUrl(product.productImage?.url);
                              const categoryName = product.categories?.name || 'Uncategorized';
                              const productName = product.name || 'Unknown Product';
                      

                              return (
                                <td key={product.id} className="product-image-title align-middle text-center" style={{textAlign: 'center', verticalAlign: 'middle'}}>
                                  <div className="text-center d-flex flex-column align-items-center justify-content-center">
                                    {product.productImage ? (
                                      <Image
                                        src={productImage}
                                        alt={productName}
                                        width={200}
                                        height={200}
                                        className="img-fluid mb-2"
                                      />
                                    ) : (
                                      <Image
                                        src="/assets/img/product/default.jpg"
                                        alt={productName}
                                        width={200}
                                        height={200}
                                        className="img-fluid mb-2"
                                      />
                                    )}
                                    <Link href="#" className="category d-block text-center">{categoryName}</Link>
                                    <Link href={`/products/${product.slug}`} className="title d-block text-center">{productName}</Link>
                                  </div>
                                </td>
                              );
                            })}
                          </tr>

                          {/* Description row */}
                          <tr>
                            <td className="first-column align-middle text-center" style={{textAlign: 'center', verticalAlign: 'middle'}}>Description</td>
                            {compareProductsData.map((product) => {
                              const description = product.shortDescription || product.description || 'No description available';
                              const truncatedDescription = description.length > 150 ? description.substring(0, 150) + '...' : description;

                              return (
                                <td key={product.id} className="pro-desc align-middle text-center">
                                  <p>{truncatedDescription}</p>
                                </td>
                              );
                            })}
                          </tr>

                          {/* Price row */}
                          <tr>
                            <td className="first-column align-middle text-center" style={{textAlign: 'center', verticalAlign: 'middle'}}>Price</td>
                            {compareProductsData.map((product) => {
                              return (
                                <td key={product.id} className="pro-price align-middle text-center">
                                  {product.isOnSale && product.salePrice ? (
                                    <>
                                      <del style={{color: 'black', textDecoration: 'line-through'}}>
                                        {formatCurrency(product.price)}
                                      </del>{' '}
                                      <span style={{color: '#d4af37', fontWeight: 'bold'}}>
                                        {formatCurrency(product.salePrice)}
                                      </span>
                                    </>
                                  ) : (
                                    <span>{formatCurrency(product.price)}</span>
                                  )}
                                </td>
                              );
                            })}
                          </tr>

                          {/* Color/Attributes row */}
                          <tr>
                            <td className="first-column align-middle text-center" style={{textAlign: 'center', verticalAlign: 'middle'}}>Color</td>
                            {compareProductsData.map((product) => {
                              const colorAttribute = product.productAttributes?.find(attr =>
                                attr.attribute?.name?.toLowerCase() === 'color' || attr.attribute?.slug?.toLowerCase() === 'color'
                              );
                              const colors = colorAttribute?.attributeValues?.map(val => val.name).join(', ') ?? 'N/A';

                              return (
                                <td key={product.id} className="pro-color align-middle text-center">{colors}</td>
                              );
                            })}
                          </tr>

                          {/* Size row */}
                          <tr>
                            <td className="first-column align-middle text-center" style={{textAlign: 'center', verticalAlign: 'middle'}}>Size</td>
                            {compareProductsData.map((product) => {
                              const sizeAttribute = product.productAttributes?.find(attr =>
                                attr.attribute?.name?.toLowerCase() === 'size' || attr.attribute?.slug?.toLowerCase() === 'size'
                              );
                              const sizes = sizeAttribute?.attributeValues?.map(val => val.name).join(', ') ?? 'N/A';

                              return (
                                <td key={product.id} className="pro-size align-middle text-center">{sizes}</td>
                              );
                            })}
                          </tr>

                          {/* Stock row */}
                          <tr>
                            <td className="first-column align-middle text-center" style={{textAlign: 'center', verticalAlign: 'middle'}}>Stock</td>
                            {compareProductsData.map((product) => {
                              const stockStatus = getStockStatus(product);

                              return (
                                <td key={product.id} className="pro-stock align-middle text-center">{stockStatus}</td>
                              );
                            })}
                          </tr>

                          {/* Add to cart row */}
                          <tr>
                            <td className="first-column align-middle text-center" style={{textAlign: 'center', verticalAlign: 'middle'}}>Add to cart</td>
                            {compareProductsData.map((product) => {
                              const stockStatus = getStockStatus(product);
                              const isInStock = stockStatus === 'In Stock';

                              // Transform product data to match Product type expected by CartButton
                              const getFullImageUrl = (imageUrl: string | undefined) => {
                                if (!imageUrl) return '/assets/img/product/default.jpg';
                                if (imageUrl.startsWith('http')) return imageUrl;
                                const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
                                if (imageUrl.startsWith('/api') && baseUrl.endsWith('/api')) {
                                  return `${baseUrl}${imageUrl.replace('/api', '')}`;
                                }
                                return `${baseUrl}${imageUrl}`;
                              };

                              const transformedProduct = {
                                id: product.id,
                                name: product.name,
                                slug: product.slug,
                                price: product.price,
                                salePrice: product.isOnSale ? product.salePrice : undefined,
                                originalPrice: product.price,
                                image: getFullImageUrl(product.productImage?.url),
                                images: product.galleries?.map((gallery: any) => getFullImageUrl(gallery.image?.url)).filter(Boolean) || [],
                                secondaryImage: getFullImageUrl(product.productImage?.url),
                                category: product.categories?.name,
                                brand: product.brand?.name,
                                description: product.description,
                                shortDescription: product.shortDescription,
                                colors: [],
                                sizes: [],
                                inStock: isInStock,
                                stockStatus: product.stockStatus,
                                isOnSale: product.isOnSale,
                                isFeatured: product.isFeatured,
                                isBestSeller: product.isBestSeller,
                              };

                              return (
                                <td key={product.id} className="align-middle text-center">
                                  <CartButton
                                    product={transformedProduct}
                                    className={`btn btn-sqr ${!isInStock ? 'disabled' : ''}`}
                                  />
                                </td>
                              );
                            })}
                          </tr>

                          {/* Rating row */}
                          <tr>
                            <td className="first-column align-middle text-center" style={{textAlign: 'center', verticalAlign: 'middle'}}>Rating</td>
                            {compareProductsData.map((product) => {
                              // You can add rating field to your API if needed
                              const rating = 5; // Default rating

                              return (
                                <td key={product.id} className="pro-ratting align-middle text-center">
                                  {generateStarRating(rating)}
                                </td>
                              );
                            })}
                          </tr>

                          {/* Remove row */}
                          <tr>
                            <td className="first-column align-middle text-center" style={{textAlign: 'center', verticalAlign: 'middle'}}>Remove</td>
                            {compareProductsData.map((product) => (
                              <td key={product.id} className="pro-remove align-middle text-center">
                                <button onClick={() => removeProduct(product.slug)}>
                                  <i className="fa fa-trash-o"></i>
                                </button>
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* Compare Page Content End */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* compare main wrapper end */}
      </main>
      <Footer />
    </>
  );
}