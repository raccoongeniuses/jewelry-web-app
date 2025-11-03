export interface CartItemResponse {
  product: {
    status: string;
    id: string;
    name?: string;
    slug?: string;
    image?: string;
    images?: string[];
    colors?: string[];
    sizes?: string[];
    brand?: string;
    category?: string;
    description?: string;
    shortDescription?: string;
    inStock?: boolean;
    isNew?: boolean;
    isSale?: boolean;
    isOnSale?: boolean;
    discount?: number;
    rating?: number;
    reviewCount?: number;
    sku?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  quantity: number;
  price: number;
  productAttributes: Record<string, any>;
  id: string;
}

export interface CartResponse {
  cart?: {
    createdAt: string;
    updatedAt: string;
    sessionId: string;
    items: CartItemResponse[];
    itemCount: number;
    total: number;
    status: string;
    expiresAt: string;
    id: string;
  };
  items?: CartItemResponse[];
  data?: {
    items: CartItemResponse[];
  };
}

export interface CartAddRequest {
  productId: string;
  quantity?: number;
  productAttributes?: Record<string, any>;
}

export interface CartUpdateRequest {
  itemId: string;
  quantity: number;
}

export interface CartRemoveRequest {
  itemId: string;
}

export interface CartApiError {
  message: string;
  code?: string;
  details?: string;
}