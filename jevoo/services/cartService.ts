import { CartResponse, CartAddRequest, CartApiError } from '@/types/cart';
import { CartItem } from '@/types/product';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.jevoo-jewellery.com';

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

  // Only add token on client side
  if (typeof window !== 'undefined') {
    // First try to get token from stored user object (consistent with auth service)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user.token) {
          headers['Authorization'] = `Bearer ${user.token}`;
        }
      } catch (error) {
        console.error('Error parsing stored user for token:', error);
      }
    }

    // Fallback to direct token storage if available
    const directToken = localStorage.getItem('authToken');
    if (directToken && !headers['Authorization']) {
      headers['Authorization'] = `Bearer ${directToken}`;
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
    const response = await fetch(`${API_BASE_URL}/cart/update`, {
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

  async removeFromCart(itemId: string): Promise<CartResponse> {
    const response = await fetch(`${API_BASE_URL}/cart/remove`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        itemId
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
  },

  async transferCart(sessionId: string, customerId: string): Promise<CartResponse> {
    // Handle case where API_BASE_URL might already include /api
    let transferUrl;
    if (API_BASE_URL.endsWith('/api')) {
      transferUrl = `${API_BASE_URL}/cart/transfer`;
    } else {
      transferUrl = `${API_BASE_URL}/api/cart/transfer`;
    }

    const requestBody = {
      sessionId,
      customerId
    };

    // Ensure we have proper auth headers for transfer
    const headers = getAuthHeaders();

    // Ensure content-type is set
    if (!headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    try {
      const response = await fetch(transferUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const error = await handleApiError(response);

        // If it's a 404, the transfer endpoint doesn't exist on backend
        // In this case, we should gracefully handle the failure and not block the login
        if (response.status === 404) {
          // Return a mock successful response to not block the login flow
          return {
            cart: { items: [], itemCount: 0, total: 0, status: 'active', sessionId: '', createdAt: '', updatedAt: '', expiresAt: '', id: '' }
          };
        }

        throw error;
      }

      const data = await response.json();
      return data;
    } catch (networkError) {
      throw networkError;
    }
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