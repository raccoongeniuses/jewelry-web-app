import { Product } from './product';

export interface WishlistItem extends Product {
  dateAdded: string;
}

export interface WishlistContextType {
  items: WishlistItem[];
  addToWishlist: (item: Product) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
  getWishlistCount: () => number;
}