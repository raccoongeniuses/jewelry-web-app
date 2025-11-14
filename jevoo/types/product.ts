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
  cartItemId?: string; // Store the cart item ID from API response
}

export interface CartContextType {
  items: CartItem[];
  loading: boolean;
  error: string | null;
  addToCart: (item: CartItem) => Promise<void>;
  removeFromCart: (uniqueId: string) => Promise<void>;
  confirmRemoveFromCart: () => Promise<void>;
  updateQuantity: (uniqueId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  showConfirmationModal: boolean;
  confirmationMessage: string;
  confirmationItemName: string;
  cancelConfirmation: () => void;
}
