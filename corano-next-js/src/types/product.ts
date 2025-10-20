export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  image?: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  shortDescription?: string;
  category: string;
  categories?: string[];
  tags: string[];
  inStock: boolean;
  isNew?: boolean;
  isSale?: boolean;
  rating?: number;
  reviewCount?: number;
  variants?: ProductVariant[];
  sku?: string;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  material?: string;
  gemstone?: string;
  meta?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

export interface CartItem extends Product {
  quantity: number;
  selectedVariant?: ProductVariant;
  addedAt: Date;
}

export interface ProductFilter {
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  inStock?: boolean;
  isNew?: boolean;
  isSale?: boolean;
  tags?: string[];
  rating?: number;
  sortBy?: 'name' | 'price-low' | 'price-high' | 'rating' | 'newest';
  search?: string;
}

export interface ProductReview {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  title: string;
  content: string;
  date: Date;
  verified: boolean;
  helpful: number;
}

export interface WishlistItem extends Product {
  addedAt: Date;
}