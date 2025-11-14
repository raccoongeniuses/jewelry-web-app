const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface OrderRequest {
  cartId: string;
  couponCode?: string;
  shippingCost?: number;
  tax?: number;
  customerNotes?: string;
}

interface OrderResponse {
  success: boolean;
  order?: {
    id: string;
    orderId: string;
    status: string;
    total: number;
    createdAt: string;
  };
  message?: string;
}

interface CouponCheckRequest {
  code: string;
}

interface CouponCheckResponse {
  valid: boolean;
  message: string;
  coupon?: {
    id: string;
    code: string;
    discountType: 'percentage' | 'fixed' | 'free_shipping';
    minimumOrderValue?: number;
    usageCount?: number;
    firstOrderOnly?: boolean;
    allowWithOtherCoupons?: boolean;
    discountValue?: number;
  };
}

interface OrderPreviewRequest {
  cartId: string;
  couponCode?: string;
  shippingCost?: number;
  tax?: number;
  customerNotes?: string;
}

interface OrderPreviewResponse {
  success: boolean;
  message: string;
  preview?: {
    cartId: string;
    customer: any;
    items: Array<{
      product: any;
      quantity: number;
      price: number;
      itemTotal: number;
    }>;
    itemCount: number;
    subtotal: number;
    shippingCost: number;
    tax: number;
    discount: number;
    total: number;
    coupon?: {
      id: string;
      code: string;
      discountType: string;
      discountValue: number;
    };
    payment: {
      method: string;
    };
    shipping: {
      method: string;
    };
  };
}

const handleApiError = async (response: Response): Promise<{ message: string; code: string }> => {
  let errorMessage = 'An error occurred. Please try again.';

  try {
    const errorData = await response.json();
    if (errorData.message) {
      errorMessage = errorData.message;
    }
    // Handle specific coupon-related errors
    if (errorData.message && errorData.message.toLowerCase().includes('coupon')) {
      errorMessage = `Invalid coupon code: ${errorData.message}`;
    }
  } catch (parseError) {
    try {
      const textResponse = await response.text();
      if (textResponse) {
        errorMessage = textResponse;
        // Check if it's a coupon-related error
        if (textResponse.toLowerCase().includes('coupon')) {
          errorMessage = `Invalid coupon code: ${textResponse}`;
        }
      }
    } catch (textError) {
      // Keep default error message
    }
  }

  if (!errorMessage || errorMessage.trim() === '') {
    if (response.status === 400) {
      errorMessage = 'Invalid request. Please check your input.';
    } else if (response.status === 401) {
      errorMessage = 'Unauthorized. Please log in.';
    } else if (response.status === 404) {
      errorMessage = 'Cart not found.';
    } else if (response.status === 500) {
      errorMessage = 'Server error. Please try again later.';
    }
  }

  return {
    message: errorMessage.trim(),
    code: response.status.toString()
  };
};

// Helper function to check if token is expired
const isTokenExpired = (exp: number): boolean => {
  const currentTime = Math.floor(Date.now() / 1000);
  return exp <= currentTime;
};

const getAuthHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Only add token on client side
  if (typeof window !== 'undefined') {
    // First check the separately stored token
    const storedToken = localStorage.getItem('authToken');
    const storedExp = localStorage.getItem('tokenExp');

    if (storedToken && storedExp) {
      const expTime = parseInt(storedExp, 10);
      if (isTokenExpired(expTime)) {
        console.log('Order service: Stored token expired, clearing all auth data');
        localStorage.removeItem('authToken');
        localStorage.removeItem('tokenExp');
        localStorage.removeItem('user');
      } else {
        headers['Authorization'] = `Bearer ${storedToken}`;
        return headers; // Return early if we have valid token
      }
    }

    // Fallback to user object if separate token not available
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);

        // Check if token exists and is not expired
        if (user.token) {
          if (user.exp && isTokenExpired(user.exp)) {
            console.log('Order service: User token expired, clearing user data');
            localStorage.removeItem('user');
          } else {
            headers['Authorization'] = `Bearer ${user.token}`;
          }
        }
      } catch (error) {
        console.error('Error parsing stored user for token:', error);
        localStorage.removeItem('user');
      }
    }
  }

  return headers;
};

export const orderService = {
  async checkCoupon(couponCode: string): Promise<CouponCheckResponse> {
    const response = await fetch(`${API_BASE_URL}/coupons/check`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        code: couponCode
      }),
    });

    if (!response.ok) {
      const error = await handleApiError(response);
      throw error;
    }

    const data = await response.json();
    return data;
  },

  async previewOrder(request: OrderPreviewRequest): Promise<OrderPreviewResponse> {
    const response = await fetch(`${API_BASE_URL}/orders/preview-from-cart`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await handleApiError(response);
      throw error;
    }

    const data = await response.json();
    return data;
  },

  async createOrder(request: OrderRequest): Promise<OrderResponse> {
    const response = await fetch(`${API_BASE_URL}/orders/from-cart`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await handleApiError(response);
      throw error;
    }

    const data = await response.json();
    return data;
  }
};