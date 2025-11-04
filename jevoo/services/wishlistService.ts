import { WishlistItem } from '@/types/wishlist';
import { Product } from '@/types/product';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export interface WishlistResponse {
  data: WishlistItem[];
  total: number;
  skip: number;
  limit: number;
}

export interface WishlistError {
  message: string;
  code?: string;
  details?: string;
}

const handleWishlistError = async (response: Response): Promise<WishlistError> => {
  let errorMessage = 'An error occurred. Please try again.';
  let details: string | undefined;

  try {
    const errorData = await response.json();

    if (errorData.message) {
      errorMessage = errorData.message;
      details = errorData.details;
    } else if (errorData.errors && Array.isArray(errorData.errors) && errorData.errors.length > 0) {
      errorMessage = errorData.errors[0].message || errorMessage;
    }
  } catch (parseError) {
    try {
      const textResponse = await response.text();
      if (textResponse) {
        errorMessage = textResponse;
      }
    } catch (textError) {
      // Keep default error message
    }
  }

  // Ensure we always have a valid error message based on status code
  if (!errorMessage || errorMessage.trim() === '') {
    if (response.status === 401) {
      errorMessage = 'You must be logged in to manage your wishlist.';
    } else if (response.status === 404) {
      errorMessage = 'Wishlist item not found.';
    } else if (response.status === 400) {
      errorMessage = 'Invalid request. Please check your input.';
    } else {
      errorMessage = 'An error occurred while managing your wishlist.';
    }
  }

  return {
    message: errorMessage.trim(),
    code: response.status.toString(),
    details
  };
};

export const wishlistService = {
  async getWishlist(token: string): Promise<WishlistItem[]> {
    const response = await fetch(`${API_BASE_URL}/wishlists`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await handleWishlistError(response);
      throw error;
    }

    const data: WishlistResponse = await response.json();

    // Handle different possible API response structures
    let wishlistItems: any[] = [];

    if (Array.isArray(data?.data)) {
      wishlistItems = data.data;
    } else if (Array.isArray(data?.docs)) {
      wishlistItems = data.docs;
    } else if (Array.isArray(data)) {
      wishlistItems = data;
    }

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

    // Transform each wishlist item to include full product data
    return wishlistItems.map((item: any) => {
      // If the item contains product data nested inside
      if (item.product) {
        const productData = item.product;
        return {
          ...productData,
          image: getFullImageUrl(productData.productImage?.url),
          secondaryImage: productData.galleries?.[1]?.image?.url
            ? getFullImageUrl(productData.galleries[1].image.url)
            : getFullImageUrl(productData.productImage?.url),
          images: productData.galleries?.map((gallery: any) => getFullImageUrl(gallery.image?.url)).filter(Boolean) || [],
          price: productData.price,
          salePrice: productData.finalPrice || productData.salePrice,
          originalPrice: productData.isOnSale ? productData.price : undefined,
          isOnSale: productData.isOnSale,
          isSale: productData.isOnSale,
          category: productData.categories?.name || 'uncategorized',
          brand: productData.brand?.name || '',
          stockStatus: productData.stockStatus,
          isFeatured: productData.isFeatured,
          isBestSeller: productData.isBestSeller,
          status: productData.status,
          colors: [], // Not provided in API response
          sizes: [], // Not provided in API response
          dateAdded: item.dateAdded || item.createdAt || new Date().toISOString(),
          id: productData.id || item.id
        };
      }
      // If the item is already a product with additional fields
      return {
        ...item,
        image: getFullImageUrl(item.productImage?.url),
        dateAdded: item.dateAdded || item.createdAt || new Date().toISOString()
      };
    });
  },

  async addToWishlist(product: Product, token: string): Promise<WishlistItem> {
    const response = await fetch(`${API_BASE_URL}/wishlists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        product: product.id,
      }),
    });

    if (!response.ok) {
      const error = await handleWishlistError(response);
      throw error;
    }

    const data = await response.json();
    return data;
  },

  async removeFromWishlist(productId: string, token: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/wishlists?where[product]=${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await handleWishlistError(response);
      throw error;
    }
  },

  async isInWishlist(productId: string, token: string): Promise<boolean> {
    try {
      const wishlist = await this.getWishlist(token);
      return wishlist.some(item => item.id === productId);
    } catch (error) {
      // If we can't check, assume it's not in wishlist
      return false;
    }
  }
};