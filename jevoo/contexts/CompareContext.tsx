'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

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
  stockStatus: string;
  stock: number;
  productAttributes: any[];
  status: string;
  isFeatured: boolean;
  isBestSeller: boolean;
  categories: {
    name: string;
    slug: string;
    id: string;
  };
  brand: {
    name: string;
    slug: string;
    id: string;
  };
  productImage: {
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
  };
  galleries: Array<{
    image: {
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
    };
    id: string;
  }>;
  id: string;
  isNewProduct: boolean;
  isWishlisted: boolean;
  isNew: boolean;
}

interface CompareContextType {
  compareProducts: string[];
  compareProductsData: Product[];
  addToCompare: (slug: string) => Promise<void>;
  removeFromCompare: (slug: string) => void;
  clearCompare: () => void;
  isProductInCompare: (slug: string) => boolean;
  compareCount: number;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};

interface CompareProviderProps {
  children: React.ReactNode;
}

export const CompareProvider: React.FC<CompareProviderProps> = ({ children }) => {
  const [compareProducts, setCompareProducts] = useState<string[]>([]);
  const [compareProductsData, setCompareProductsData] = useState<Product[]>([]);

  // Load compare data from localStorage on component mount
  useEffect(() => {
    const storedProducts = localStorage.getItem('compareProducts');
    const storedProductsData = localStorage.getItem('compareProductsData');

    if (storedProducts && storedProductsData) {
      try {
        setCompareProducts(JSON.parse(storedProducts));
        setCompareProductsData(JSON.parse(storedProductsData));
      } catch (error) {
        console.error('Error parsing compare data from localStorage:', error);
        localStorage.removeItem('compareProducts');
        localStorage.removeItem('compareProductsData');
      }
    }
  }, []);

  // Save compare data to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('compareProducts', JSON.stringify(compareProducts));
  }, [compareProducts]);

  useEffect(() => {
    localStorage.setItem('compareProductsData', JSON.stringify(compareProductsData));
  }, [compareProductsData]);

  // Add product to compare list
  const addToCompare = async (slug: string) => {
    try {
      // Check if product is already in compare list
      if (compareProducts.includes(slug)) {
        alert('This product is already in your compare list.');
        return;
      }

      // Check if compare list has reached maximum capacity (let's say 4 products)
      if (compareProducts.length >= 4) {
        alert('You can compare up to 4 products at a time. Please remove a product first.');
        return;
      }

      // Send request to compare endpoint with the single product
      const endpoint = process.env.NEXT_PUBLIC_API_URL || '';
      const response = await fetch(`${endpoint}/products/compare`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          products: [slug] // Send array with single product
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.data && data.data.products && data.data.products.length > 0) {
        // Update products data from the response
        const newProduct = data.data.products[0];
        setCompareProductsData(prev => [...prev, newProduct]);

        // Add product slug to local state
        setCompareProducts(prev => [...prev, slug]);

        // Show success message
        const productName = newProduct.name || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        alert(`"${productName}" has been added to compare list.`);
      } else {
        throw new Error(data.message || 'Failed to add product to compare');
      }
    } catch (error) {
      console.error('Error adding product to compare:', error);
      alert('Failed to add product to compare. Please try again.');
    }
  };

  // Remove product from compare list
  const removeFromCompare = (slug: string) => {
    setCompareProducts(prev => prev.filter(productSlug => productSlug !== slug));
    setCompareProductsData(prev => prev.filter(product => product.slug !== slug));
  };

  // Clear all products from compare list
  const clearCompare = () => {
    setCompareProducts([]);
    setCompareProductsData([]);
  };

  // Check if product is in compare list
  const isProductInCompare = (slug: string): boolean => {
    return compareProducts.includes(slug);
  };

  const value: CompareContextType = {
    compareProducts,
    compareProductsData,
    addToCompare,
    removeFromCompare,
    clearCompare,
    isProductInCompare,
    compareCount: compareProducts.length,
  };

  return (
    <CompareContext.Provider value={value}>
      {children}
    </CompareContext.Provider>
  );
};