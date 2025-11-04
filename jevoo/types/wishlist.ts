import { Product } from './product';

export interface WishlistItem extends Product {
  dateAdded: string;
}

export interface WishlistContextType {
  items: WishlistItem[];
  addToWishlist: (item: Product) => Promise<void>;
  removeFromWishlist: (id: string) => Promise<void>;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => Promise<void>;
  getWishlistCount: () => number;
  loading: boolean;
}