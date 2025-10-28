export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  salePrice?: number;
  originalPrice?: number;
  image: string;
  images: string[];
  secondaryImage?: string;
  url?: string;
  category?: string;
  brand?: string;
  description?: string;
  shortDescription?: string;
  colors: string[];
  sizes: string[];
  inStock?: boolean;
  stockStatus?: string;
  stockCount?: number;
  isNew?: boolean;
  isSale?: boolean;
  isOnSale?: boolean;
  discount?: number;
  rating?: number;
  reviewCount?: number;
  sku?: string;
  categories?: string[];
  tags?: string[];
  isFeatured?: boolean;
  isBestSeller?: boolean;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  uniqueId?: string;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (uniqueId: string) => void;
  updateQuantity: (uniqueId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}
