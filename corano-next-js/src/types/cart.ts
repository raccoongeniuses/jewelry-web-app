import { CartItem } from './product';

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  currency: string;
  appliedCoupon?: Coupon;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minimumAmount?: number;
  usageLimit?: number;
  usedCount: number;
  expiresAt?: Date;
  applicableProducts?: string[];
  applicableCategories?: string[];
}

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  cost: number;
  estimatedDays: number;
  type: 'standard' | 'express' | 'overnight';
  available: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'stripe' | 'bank_transfer';
  name: string;
  description?: string;
  icon?: string;
  enabled: boolean;
}

export interface CheckoutData {
  shippingAddress: {
    firstName: string;
    lastName: string;
    company?: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone?: string;
  };
  billingAddress?: {
    firstName: string;
    lastName: string;
    company?: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone?: string;
  };
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethod;
  couponCode?: string;
  notes?: string;
  saveAddresses: boolean;
}