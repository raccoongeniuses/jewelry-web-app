'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginCredentials, RegisterCredentials, AuthResponse } from '@/types/auth';
import { authService } from '@/services/authService';
import { cartService } from '@/services/cartService';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  register: (credentials: RegisterCredentials) => Promise<AuthResponse>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await authService.login(credentials);

      // Fetch additional user data from /users/me endpoint
      try {
        const userMeData = await authService.fetchUserMe(response.token);
        const mergedUser = {
          ...response.user,
          ...userMeData.user,
          token: response.token,
          sessions: userMeData.user?.sessions || response.user.sessions,
          customer: userMeData.user?.customer || response.user.customer,
          createdAt: userMeData.user?.createdAt || response.user.createdAt,
          updatedAt: userMeData.user?.updatedAt
        };

        // Check if there's a guest cart that needs to be transferred
        const guestCartItems = localStorage.getItem('coranoCart');

        if (guestCartItems) {
          try {
            const cartItems = JSON.parse(guestCartItems);

            if (Array.isArray(cartItems) && cartItems.length > 0) {
              // Get the guest session ID from localStorage (stored by cart context)
              let guestSessionId = localStorage.getItem('guestSessionId') ||
                                   document.cookie.split(';')
                                     .find(cookie => cookie.trim().startsWith('sessionId='))
                                     ?.split('=')[1];

              // Get customer ID only from user.customer.docs[0].id (docs is an array)
              const customerId = mergedUser.customer?.docs?.[0]?.id;

              if (guestSessionId && customerId) {
                try {
                  // Transfer cart from guest to logged-in user
                  await cartService.transferCart(guestSessionId, customerId);

                  // Clear guest cart and session ID after successful transfer
                  localStorage.removeItem('coranoCart');
                  localStorage.removeItem('guestSessionId');
                } catch (transferError) {
                  console.error('Failed to transfer cart:', transferError);
                  // Continue with login even if transfer fails
                }
              }
            }
          } catch (parseError) {
            console.error('Failed to parse guest cart:', parseError);
          }
        }

        // Store merged user in localStorage
        localStorage.setItem('user', JSON.stringify(mergedUser));
        setUser(mergedUser);

        return { ...response, user: mergedUser };
      } catch (userMeError) {
        console.warn('Failed to fetch additional user data, using basic login data:', userMeError);

        // Store user in localStorage with basic data
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user);

        return response;
      }
    } catch (error) {
      throw error;
    }
  };

  const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    try {
      const response = await authService.register(credentials);

      // Check if registration succeeded but needs login
      if (response.needsLogin) {
        // Try login with the same credentials
        try {
          const loginResponse = await authService.login({
            email: credentials.email,
            password: credentials.password
          });

          // Store user in localStorage
          localStorage.setItem('user', JSON.stringify(loginResponse.user));
          setUser(loginResponse.user);

          return loginResponse;
        } catch (loginError) {
          throw loginError;
        }
      } else {
        // Registration returned full auth data
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user);
        return response;
      }
    } catch (error) {
      // If registration failed, try login as fallback (user might already exist)
      try {
        const loginResponse = await authService.login({
          email: credentials.email,
          password: credentials.password
        });

        // Store user in localStorage
        localStorage.setItem('user', JSON.stringify(loginResponse.user));
        setUser(loginResponse.user);

        return loginResponse;
      } catch (loginError) {
        throw loginError; // Throw the login error since it's more relevant
      }
    }
  };

  const logout = () => {
    // Clear cart from localStorage when user logs out
    localStorage.removeItem('coranoCart');
    localStorage.removeItem('user');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};