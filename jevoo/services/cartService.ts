import { CartResponse, CartAddRequest, CartApiError } from '@/types/cart';
import { CartItem } from '@/types/product';

// Use full API URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

const handleApiError = async (response: Response): Promise<CartApiError> => {
  let errorMessage = 'An error occurred. Please try again.';
  let details: string | undefined;

  try {
    const errorData = await response.json();

    // Handle error messages from API
    if (errorData.message) {
      errorMessage = errorData.message;
    }
    if (errorData.errors && Array.isArray(errorData.errors) && errorData.errors.length > 0) {
      const error = errorData.errors[0];
      errorMessage = error.message || errorMessage;
      details = error.details;
    }
  } catch (parseError) {
    // If JSON parsing fails, try to get text response
    try {
      const textResponse = await response.text();
      if (textResponse) {
        errorMessage = textResponse;
      }
    } catch (textError) {
      // Keep default error message if both JSON and text parsing fail
    }
  }

  // Ensure we always have a valid error message based on status code
  if (!errorMessage || errorMessage.trim() === '') {
    if (response.status === 400) {
      errorMessage = 'Invalid request. Please check your input.';
    } else if (response.status === 401) {
      errorMessage = 'Unauthorized. Please log in.';
    } else if (response.status === 404) {
      errorMessage = 'Cart not found.';
    } else if (response.status === 500) {
      errorMessage = 'Server error. Please try again later.';
    } else {
      errorMessage = 'An error occurred. Please try again.';
    }
  }

  return {
    message: errorMessage.trim(),
    code: response.status.toString(),
    details: details
  };
};

const getAuthHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Add token if available in localStorage
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('authToken');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};

export const cartService = {
  async getCart(): Promise<CartResponse> {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await handleApiError(response);
      throw error;
    }

    const data = await response.json();

    // Handle empty or null responses
    if (!data) {
      return { cart: { items: [], itemCount: 0, total: 0, status: 'active', sessionId: '', createdAt: '', updatedAt: '', expiresAt: '', id: '' } };
    }

    return data;
  },

  async addToCart(request: CartAddRequest): Promise<CartResponse> {
    const response = await fetch(`${API_BASE_URL}/cart/add`, {
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

  async updateQuantity(itemId: string, quantity: number): Promise<CartResponse> {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        itemId,
        quantity
      }),
    });

    if (!response.ok) {
      const error = await handleApiError(response);
      throw error;
    }

    const data = await response.json();
    return data;
  },

  async removeFromCart(productId: string, productAttributes?: Record<string, any>): Promise<CartResponse> {
    const response = await fetch(`${API_BASE_URL}/cart/remove`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        productId,
        productAttributes: productAttributes || {}
      }),
    });

    if (!response.ok) {
      const error = await handleApiError(response);
      throw error;
    }

    const data = await response.json();
    return data;
  },

  async clearCart(): Promise<CartResponse> {
    const response = await fetch(`${API_BASE_URL}/cart/clear`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await handleApiError(response);
      throw error;
    }

    const data = await response.json();
    return data;
  }
};

// Helper function to convert CartItem to CartAddRequest
export const cartItemToAddRequest = (cartItem: CartItem): CartAddRequest => {
  return {
    productId: cartItem.id,
    quantity: cartItem.quantity || 1,
    productAttributes: {
      selectedSize: cartItem.selectedSize,
      selectedColor: cartItem.selectedColor,
    }
  };
};