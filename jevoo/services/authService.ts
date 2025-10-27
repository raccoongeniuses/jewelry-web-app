import { LoginCredentials, RegisterCredentials, AuthResponse, ApiError, AuthError } from '@/types/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

const handleApiError = async (response: Response): Promise<AuthError> => {
  let errorMessage = 'An error occurred. Please try again.';
  let field: string | undefined;
  let details: string | undefined;

  try {
    const errorData = await response.json();

    // Handle the simple error format from /users/login endpoint
    if (errorData.errors && Array.isArray(errorData.errors) && errorData.errors.length > 0) {
      const error = errorData.errors[0];
      errorMessage = error.message || errorMessage;
    }
    // Handle simple error responses
    else if (errorData.message) {
      errorMessage = errorData.message;
    }
    // Handle array of errors directly
    else if (Array.isArray(errorData) && errorData.length > 0) {
      errorMessage = errorData[0].message || errorMessage;
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
    if (response.status === 401) {
      errorMessage = 'The email or password provided is incorrect.';
    } else if (response.status === 400) {
      errorMessage = 'Invalid request. Please check your input.';
    } else if (response.status === 404) {
      errorMessage = 'User not found. Please check your email.';
    } else {
      errorMessage = 'The email or password provided is incorrect.';
    }
  }

  // Clean up the error message
  const finalMessage = (errorMessage && typeof errorMessage === 'string' && errorMessage.trim() !== '')
    ? errorMessage.trim()
    : 'The email or password provided is incorrect.';

  const authError = Object.assign(new Error(finalMessage), {
    code: response.status.toString(),
    field: field,
    details: details
  }) as AuthError;

  return authError;
};

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await handleApiError(response);
      throw error;
    }

    const data = await response.json();

    // Validate response format and ensure it matches AuthResponse interface
    if (!data.user || !data.token) {
      throw new Error('Invalid response format from server');
    }

    // Ensure the user object has required fields
    const formattedUser = {
      id: data.user.id || data.user._id || 'unknown',
      email: data.user.email,
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      token: data.token
    };

    return { user: formattedUser, token: data.token };
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await handleApiError(response);
      throw error;
    }

    const data = await response.json();

    // Handle different response formats
    if (data.user && data.token) {
      // Standard response with user and token
      const formattedUser = {
        id: data.user.id || data.user._id || 'unknown',
        email: data.user.email,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        token: data.token
      };
      return { user: formattedUser, token: data.token };
    } else if (data.doc && data.message === "User successfully created.") {
      // Registration succeeded with user in 'doc' field, but no token - need to login separately
      return {
        user: {
          id: data.doc.id,
          email: data.doc.email,
          firstName: data.doc.firstName,
          lastName: data.doc.lastName,
          token: ''
        },
        token: '',
        needsLogin: true
      };
    } else if (data.message === "success" || data.status === "success" || Object.keys(data).length === 0 || data.message === "User successfully created.") {
      // Registration succeeded but no auth data returned - need to login separately
      throw new Error('REGISTRATION_SUCCESS_NO_AUTH');
    } else {
      throw new Error('Invalid response format from server');
    }
  },
};