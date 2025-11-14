'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { cartService, getSavedCartId, removeCartId } from '../../services/cartService';
import { orderService } from '../../services/orderService';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SuccessModal from '../../components/ui/SuccessModal';
import { JewelryLoader } from '../../components/LoaderSpinner';
import { formatCurrency } from '../../lib/formatCurrency';

interface BillingDetails {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  postcode: string;
  phone: string;
}

interface ShippingDetails {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  postcode: string;
}

export default function CheckoutPage() {
  const { items, getTotalPrice, loading: cartLoading } = useCart();
  const { isAuthenticated, user, isLoading } = useAuth();

  const [billingDetails, setBillingDetails] = useState<BillingDetails>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    country: 'Afghanistan',
    address: '',
    address2: '',
    city: '',
    state: '',
    postcode: '',
    phone: ''
  });

  const [shippingToDifferent, setShippingToDifferent] = useState(false);
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    firstName: '',
    lastName: '',
    email: '',
    country: 'Bangladesh',
    address: '',
    address2: '',
    city: '',
    state: '',
    postcode: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'bank' | 'check' | 'paypal'>('cash');
  const [shippingMethod, setShippingMethod] = useState<'flat'>('flat');
  const [orderNote, setOrderNote] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccessMessage, setCouponSuccessMessage] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [orderId, setOrderId] = useState('');
  const [orderPreview, setOrderPreview] = useState<any>(null);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const [shippingCost] = useState(0); // Free shipping (temporary)

  // Effect to fetch order preview on page load and when coupon changes
  useEffect(() => {
    if (items.length > 0 && !cartLoading) {
      fetchOrderPreview(appliedCoupon || undefined);
    }
  }, [items, cartLoading, appliedCoupon, shippingCost]);

  // Function to fetch order preview
  const fetchOrderPreview = async (coupon?: string) => {
    setIsLoadingPreview(true);
    try {
      let cartId = getSavedCartId();

      if (!cartId) {
        const cartResponse = await cartService.getCart();
        if (!cartResponse.cart || !cartResponse.cart.id) {
          console.error('Unable to retrieve cart information');
          return;
        }
        cartId = cartResponse.cart.id;
      }

      const previewRequest = {
        cartId: cartId,
        couponCode: coupon || undefined,
        shippingCost: shippingCost,
        tax: 10, // Default tax
        customerNotes: orderNote || undefined
      };

      const previewResponse = await orderService.previewOrder(previewRequest);

      if (previewResponse.success && previewResponse.preview) {
        setOrderPreview(previewResponse.preview);
      }
    } catch (error) {
      console.error('Failed to fetch order preview:', error);
    } finally {
      setIsLoadingPreview(false);
    }
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="main-wrapper">
        <Header />
        <main className="page-content-wrapper">
          <div className="container section-padding">
            <div className="row">
              <div className="col-12 text-center py-5">
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <p className="mt-3">Loading...</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Redirect to login if not authenticated (client-side check)
  if (!isAuthenticated) {
    return (
      <div className="main-wrapper">
        <Header />
        <main className="page-content-wrapper">
          <div className="container section-padding">
            <div className="row justify-content-center">
              <div className="col-lg-6 text-center">
                <h2>Please Login to Continue</h2>
                <p className="mt-3">You need to be logged in to proceed with checkout.</p>
                <Link href="/login" className="btn btn-sqr mt-3">
                  Go to Login
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Pricing calculations - use API-provided total
  const subtotal = getTotalPrice();
  const total = subtotal + shippingCost;

  
  // Countries list
  const countries = [
    'Afghanistan', 'Albania', 'Algeria', 'Armenia', 'Bangladesh',
    'India', 'Pakistan', 'England', 'London', 'China'
  ];

  const handleBillingChange = (field: keyof BillingDetails, value: string | boolean) => {
    setBillingDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleShippingChange = (field: keyof ShippingDetails, value: string) => {
    setShippingDetails(prev => ({ ...prev, [field]: value }));
  };

  const formatDate = () => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Basic coupon code validation
  const validateCouponCode = (code: string): boolean => {
    if (!code || code.trim().length < 3) {
      return false;
    }
    // Basic validation: alphanumeric, no special characters except spaces and dashes
    const couponRegex = /^[A-Z0-9\s-]+$/i;
    return couponRegex.test(code.trim());
  };

  // Clear coupon error when user starts typing
  const handleCouponInputChange = (value: string) => {
    // Convert to uppercase for user display and storage
    setCouponCode(value.toUpperCase());
    if (couponError) {
      setCouponError(null);
    }
  };

  // Handle coupon application with validation
  const handleApplyCoupon = async () => {
    // Clear any existing messages
    setCouponError(null);
    setCouponSuccessMessage(null);

    if (!validateCouponCode(couponCode)) {
      setCouponError('Please enter a valid coupon code. Coupon codes should be at least 3 characters and contain only letters, numbers, spaces, and dashes.');
      return;
    }

    setIsValidatingCoupon(true);

    try {
      // Convert coupon code to uppercase for case-insensitive API call
      const uppercaseCouponCode = couponCode.trim().toUpperCase();

      // Validate coupon with backend API
      const couponResponse = await orderService.checkCoupon(uppercaseCouponCode);

      if (couponResponse.valid) {
        // Check if there's a minimum order value requirement
        if (couponResponse.coupon?.minimumOrderValue && subtotal < couponResponse.coupon.minimumOrderValue) {
          setCouponError(`Coupon requires a minimum order value of ${formatCurrency(couponResponse.coupon.minimumOrderValue)}. Your current subtotal is ${formatCurrency(subtotal)}.`);
          return;
        }

        setAppliedCoupon(uppercaseCouponCode);
        setCouponError(null); // Clear any existing errors
        setCouponSuccessMessage(couponResponse.message || 'Coupon applied successfully!');

        // Fetch updated order preview with the new coupon
        fetchOrderPreview(uppercaseCouponCode);

        // Clear success message after 3 seconds
        setTimeout(() => {
          setCouponSuccessMessage(null);
        }, 3000);
      } else {
        setCouponError(couponResponse.message || 'Invalid coupon code. Please check and try again.');
      }
    } catch (error: any) {
      let errorMessage = 'Failed to validate coupon. Please try again.';

      if (error.message) {
        if (error.message.toLowerCase().includes('coupon') ||
            error.message.toLowerCase().includes('invalid') ||
            error.message.toLowerCase().includes('not found') ||
            error.message.toLowerCase().includes('expired')) {
          errorMessage = error.message;
        }
      }

      setCouponError(errorMessage);
    } finally {
      setIsValidatingCoupon(false);
    }
  };

  const getPaymentMethodName = () => {
    switch (paymentMethod) {
      case 'cash': return 'Cash on Delivery';
      case 'bank': return 'Direct Bank Transfer';
      case 'check': return 'Check Payment';
      case 'paypal': return 'PayPal';
      default: return paymentMethod;
    }
  };

  const getShippingMethodName = () => {
    return shippingMethod === 'flat' ? 'Flat Rate ($70)' : 'Free Shipping';
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    // Redirect to home page after closing modal
    setTimeout(() => {
      window.location.href = '/';
    }, 500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (isSubmitting) {
      return;
    }

    // Form validation
    const requiredFields = [
      { field: 'firstName', value: billingDetails.firstName, label: 'First Name' },
      { field: 'lastName', value: billingDetails.lastName, label: 'Last Name' },
      { field: 'email', value: billingDetails.email, label: 'Email Address' },
      { field: 'country', value: billingDetails.country, label: 'Country' },
      { field: 'address', value: billingDetails.address, label: 'Street Address' },
      { field: 'city', value: billingDetails.city, label: 'Town / City' },
      { field: 'postcode', value: billingDetails.postcode, label: 'Postcode / ZIP' }
    ];

    // Check for empty required fields
    const emptyFields = requiredFields.filter(field => !field.value.trim());

    if (emptyFields.length > 0) {
      alert(`Please fill in the following required fields:\n${emptyFields.map(field => `• ${field.label}`).join('\n')}`);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(billingDetails.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Try to get cart ID from localStorage first, then fallback to API call
      let cartId = getSavedCartId();

      if (!cartId) {
        // If no cart ID in localStorage, fetch from API
        const cartResponse = await cartService.getCart();

        if (!cartResponse.cart || !cartResponse.cart.id) {
          alert('Unable to retrieve cart information. Please try again.');
          setIsSubmitting(false);
          return;
        }

        cartId = cartResponse.cart.id;
      }

      // Create order via API
      const orderRequest = {
        cartId: cartId,
        couponCode: appliedCoupon || undefined,
        shippingCost: shippingCost,
        customerNotes: orderNote || undefined
      };

      const orderResponse = await orderService.createOrder(orderRequest);

      if (orderResponse.success && orderResponse.order) {
        // Remove cart ID from localStorage after successful order
        removeCartId();

        // Store order ID for success message
        const currentOrderId = orderResponse.order.orderId || orderResponse.order.id;
        setOrderId(currentOrderId);

        // Generate order data for invoice page
        const orderData = {
          orderId: orderResponse.order.id,
          orderDate: formatDate(),
          customerName: billingDetails.firstName && billingDetails.lastName
            ? `${billingDetails.firstName} ${billingDetails.lastName}`
            : 'Guest Customer',
          customerEmail: billingDetails.email || 'guest@jevoo.com',
          customerPhone: billingDetails.phone || 'N/A',
          billingAddress: billingDetails,
          shippingAddress: shippingToDifferent ? shippingDetails : undefined,
          items: items,
          subtotal: subtotal,
          shippingCost: shippingCost,
          total: total,
          paymentMethod: getPaymentMethodName(),
          shippingMethod: getShippingMethodName(),
          orderNote: orderNote || undefined,
          couponCode: appliedCoupon
        };

        // Store order data in sessionStorage for the invoice page
        sessionStorage.setItem('lastOrder', JSON.stringify(orderData));

        // Set success message and show modal
        setSuccessMessage(`Order placed successfully! Your order ID is: ${currentOrderId}`);
        setShowSuccessModal(true);

        // Open invoice in new tab
        const invoiceUrl = '/invoice';

        // Method 1: Try window.open first
        const newWindow = window.open(invoiceUrl, '_blank');

        if (newWindow && !newWindow.closed) {
        } else {
          // Method 2: Fallback - create and click a link
          const link = document.createElement('a');
          link.href = invoiceUrl;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }

      } else {
        alert(orderResponse.message || 'Failed to create order. Please try again.');
      }

    } catch (error: any) {
      console.error('Order creation error:', error);

      // Handle different types of errors
      let errorMessage = 'Failed to create order. Please try again.';

      if (error.message) {
        // Check if it's a coupon-related error
        if (error.message.toLowerCase().includes('coupon') || error.message.toLowerCase().includes('invalid')) {
          errorMessage = `Coupon error: ${error.message}. Please remove the coupon and try again.`;
          // Clear the invalid coupon
          setAppliedCoupon(null);
          setCouponCode('');
        } else {
          errorMessage = error.message;
        }
      } else if (typeof error === 'string') {
        errorMessage = error;
      }

      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state while cart is being fetched
  if (cartLoading) {
    return (
      <div className="main-wrapper">
        <Header />
        <main className="page-content-wrapper">
          <div className="container section-padding">
            <div className="row">
              <div className="col-12 text-center py-5">
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <p className="mt-3">Loading your cart...</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="main-wrapper">
        <Header />
        <main className="page-content-wrapper">
          <div className="container section-padding">
            <div className="row justify-content-center">
              <div className="col-lg-6 text-center">
                <h2>Your cart is empty</h2>
                <p className="mt-3">You need to add items to your cart before proceeding to checkout.</p>
                <Link href="/" className="btn btn-sqr mt-3">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="main-wrapper">
      <Header />

      <main>
        {/* breadcrumb area start */}
        <div className="breadcrumb-area">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="breadcrumb-wrap">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link href="/"><i className="fa fa-home"></i></Link>
                      </li>
                      <li className="breadcrumb-item">
                        <Link href="/our-products">shop</Link>
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">checkout</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* breadcrumb area end */}

        {/* checkout main wrapper start */}
        <div className="checkout-page-wrapper section-padding">
          <div className="container">
            <div className="row">
              <div className="col-12">
                              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="row">
                {/* Checkout Billing Details */}
                <div className="col-lg-6">
                  <div className="checkout-billing-details-wrap">
                    <h5 className="checkout-title">Billing Details</h5>
                    <div className="billing-form-wrap">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="single-input-item">
                            <label htmlFor="f_name" className="required">First Name</label>
                            <input
                              type="text"
                              id="f_name"
                              placeholder="First Name"
                              required
                              value={billingDetails.firstName}
                              onChange={(e) => handleBillingChange('firstName', e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="single-input-item">
                            <label htmlFor="l_name" className="required">Last Name</label>
                            <input
                              type="text"
                              id="l_name"
                              placeholder="Last Name"
                              required
                              value={billingDetails.lastName}
                              onChange={(e) => handleBillingChange('lastName', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="single-input-item">
                        <label htmlFor="email" className="required">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          placeholder="Email Address"
                          required
                          value={billingDetails.email}
                          onChange={(e) => handleBillingChange('email', e.target.value)}
                        />
                      </div>

                      
                      <div className="single-input-item">
                        <label htmlFor="country" className="required">Country</label>
                        <select
                          name="country"
                          id="country"
                          required
                          value={billingDetails.country}
                          onChange={(e) => handleBillingChange('country', e.target.value)}
                          style={{
                            color: '#555555',
                            border: '1px solid #ccc',
                            padding: '12px 10px',
                            width: '100%',
                            fontSize: '14px',
                            background: '#f7f7f7',
                            appearance: 'none',
                            backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23555\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6,9 12,15 18,9\'%3e%3c/polyline%3e%3c/svg%3e")',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 10px center',
                            backgroundSize: '16px',
                            paddingRight: '30px',
                            borderRadius: '0'
                          }}
                        >
                          {countries.map(country => (
                            <option key={country} value={country}>{country}</option>
                          ))}
                        </select>
                      </div>

                      <div className="single-input-item">
                        <label htmlFor="street-address" className="required mt-20">Street address</label>
                        <input
                          type="text"
                          id="street-address"
                          placeholder="Street address Line 1"
                          required
                          value={billingDetails.address}
                          onChange={(e) => handleBillingChange('address', e.target.value)}
                        />
                      </div>

                      <div className="single-input-item">
                        <input
                          type="text"
                          placeholder="Street address Line 2 (Optional)"
                          value={billingDetails.address2}
                          onChange={(e) => handleBillingChange('address2', e.target.value)}
                        />
                      </div>

                      <div className="single-input-item">
                        <label htmlFor="town" className="required">Town / City</label>
                        <input
                          type="text"
                          id="town"
                          placeholder="Town / City"
                          required
                          value={billingDetails.city}
                          onChange={(e) => handleBillingChange('city', e.target.value)}
                        />
                      </div>

                      <div className="single-input-item">
                        <label htmlFor="state">State / Division</label>
                        <input
                          type="text"
                          id="state"
                          placeholder="State / Division"
                          value={billingDetails.state}
                          onChange={(e) => handleBillingChange('state', e.target.value)}
                        />
                      </div>

                      <div className="single-input-item">
                        <label htmlFor="postcode" className="required">Postcode / ZIP</label>
                        <input
                          type="text"
                          id="postcode"
                          placeholder="Postcode / ZIP"
                          required
                          value={billingDetails.postcode}
                          onChange={(e) => handleBillingChange('postcode', e.target.value)}
                        />
                      </div>

                      <div className="single-input-item">
                        <label htmlFor="phone">Phone</label>
                        <input
                          type="text"
                          id="phone"
                          placeholder="Phone"
                          value={billingDetails.phone}
                          onChange={(e) => handleBillingChange('phone', e.target.value)}
                        />
                      </div>

                      
                      <div className="checkout-box-wrap">
                        <div className="single-input-item">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="ship_to_different"
                              checked={shippingToDifferent}
                              onChange={(e) => setShippingToDifferent(e.target.checked)}
                            />
                          </div>
                        </div>
                        {shippingToDifferent && (
                          <div className="ship-to-different single-form-row">
                            <div className="row">
                              <div className="col-md-6">
                                <div className="single-input-item">
                                  <label htmlFor="f_name_2" className="required">First Name</label>
                                  <input
                                    type="text"
                                    id="f_name_2"
                                    placeholder="First Name"
                                    required
                                    value={shippingDetails.firstName}
                                    onChange={(e) => handleShippingChange('firstName', e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="single-input-item">
                                  <label htmlFor="l_name_2" className="required">Last Name</label>
                                  <input
                                    type="text"
                                    id="l_name_2"
                                    placeholder="Last Name"
                                    required
                                    value={shippingDetails.lastName}
                                    onChange={(e) => handleShippingChange('lastName', e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="single-input-item">
                              <label htmlFor="email_2" className="required">Email Address</label>
                              <input
                                type="email"
                                id="email_2"
                                placeholder="Email Address"
                                required
                                value={shippingDetails.email}
                                onChange={(e) => handleShippingChange('email', e.target.value)}
                              />
                            </div>

                            
                            <div className="single-input-item">
                              <label htmlFor="country_2" className="required">Country</label>
                              <select
                                name="country"
                                id="country_2"
                                value={shippingDetails.country}
                                onChange={(e) => handleShippingChange('country', e.target.value)}
                                style={{
                                  color: '#555555',
                                  border: '1px solid #ccc',
                                  padding: '12px 10px',
                                  width: '100%',
                                  fontSize: '14px',
                                  background: '#f7f7f7',
                                  appearance: 'none',
                                  backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23555\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6,9 12,15 18,9\'%3e%3c/polyline%3e%3c/svg%3e")',
                                  backgroundRepeat: 'no-repeat',
                                  backgroundPosition: 'right 10px center',
                                  backgroundSize: '16px',
                                  paddingRight: '30px',
                                  borderRadius: '0'
                                }}
                              >
                                {countries.map(country => (
                                  <option key={country} value={country}>{country}</option>
                                ))}
                              </select>
                            </div>

                            <div className="single-input-item">
                              <label htmlFor="street-address_2" className="required mt-20">Street address</label>
                              <input
                                type="text"
                                id="street-address_2"
                                placeholder="Street address Line 1"
                                required
                                value={shippingDetails.address}
                                onChange={(e) => handleShippingChange('address', e.target.value)}
                              />
                            </div>

                            <div className="single-input-item">
                              <input
                                type="text"
                                placeholder="Street address Line 2 (Optional)"
                                value={shippingDetails.address2}
                                onChange={(e) => handleShippingChange('address2', e.target.value)}
                              />
                            </div>

                            <div className="single-input-item">
                              <label htmlFor="town_2" className="required">Town / City</label>
                              <input
                                type="text"
                                id="town_2"
                                placeholder="Town / City"
                                required
                                value={shippingDetails.city}
                                onChange={(e) => handleShippingChange('city', e.target.value)}
                              />
                            </div>

                            <div className="single-input-item">
                              <label htmlFor="state_2">State / Division</label>
                              <input
                                type="text"
                                id="state_2"
                                placeholder="State / Division"
                                value={shippingDetails.state}
                                onChange={(e) => handleShippingChange('state', e.target.value)}
                              />
                            </div>

                            <div className="single-input-item">
                              <label htmlFor="postcode_2" className="required">Postcode / ZIP</label>
                              <input
                                type="text"
                                id="postcode_2"
                                placeholder="Postcode / ZIP"
                                required
                                value={shippingDetails.postcode}
                                onChange={(e) => handleShippingChange('postcode', e.target.value)}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="single-input-item">
                        <label htmlFor="ordernote">Order Note</label>
                        <textarea
                          name="ordernote"
                          id="ordernote"
                          cols={30}
                          rows={3}
                          placeholder="Notes about your order, e.g. special notes for delivery."
                          value={orderNote}
                          onChange={(e) => setOrderNote(e.target.value)}
                        />
                      </div>

                      {/* Coupon Code Section */}
                      <div className="single-input-item">
                        <label htmlFor="coupon">Coupon Code</label>
                        {!appliedCoupon ? (
                          <>
                            <div className="d-flex gap-2">
                              <input
                                type="text"
                                id="coupon"
                                placeholder="Enter your coupon code"
                                value={couponCode}
                                onChange={(e) => handleCouponInputChange(e.target.value)}
                                style={{
                                  flex: '1',
                                  color: '#555555',
                                  border: couponError ? '1px solid #dc3545' : '1px solid #ccc',
                                  padding: '12px 10px',
                                  fontSize: '14px',
                                  background: '#f7f7f7',
                                  borderRadius: '0'
                                }}
                              />
                              <button
                                type="button"
                                className="btn btn-sqr"
                                onClick={handleApplyCoupon}
                                disabled={!couponCode.trim() || isValidatingCoupon}
                              >
                                {isValidatingCoupon ? (
                                  <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Validating...
                                  </>
                                ) : (
                                  'Apply'
                                )}
                              </button>
                            </div>
                            {couponError && (
                              <div className="invalid-feedback d-block" style={{
                                color: '#dc3545',
                                fontSize: '0.875rem',
                                marginTop: '0.25rem',
                                display: 'block'
                              }}>
                                {couponError}
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="coupon-applied" style={{
                            padding: '10px',
                            background: '#d4edda',
                            border: '1px solid #c3e6cb',
                            borderRadius: '4px',
                            color: '#155724'
                          }}>
                            <div className="d-flex align-items-center justify-content-between">
                              <span>
                                <strong>Coupon Applied:</strong> {appliedCoupon}
                              </span>
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => {
                                  setAppliedCoupon(null);
                                  setCouponCode('');
                                  setCouponError(null);
                                  setCouponSuccessMessage(null);
                                  // Fetch updated order preview without coupon
                                  fetchOrderPreview();
                                }}
                              >
                                Remove
                              </button>
                            </div>
                            {couponSuccessMessage && (
                              <div className="mt-2" style={{
                                fontSize: '0.875rem',
                                color: '#155724'
                              }}>
                                {couponSuccessMessage}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Summary Details */}
                <div className="col-lg-6">
                  <div className="order-summary-details">
                    <h5 className="checkout-title">Your Order Summary</h5>
                    <div className="order-summary-content">
                      {/* Order Summary Table */}
                      <div className="order-summary-table table-responsive text-center">
                        <table className="table table-bordered checkout-table">
                          <thead>
                            <tr>
                              <th>Products</th>
                              <th>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {items.map((item) => {
                              // Create unique key using id, size, and color
                              const uniqueKey = `${item.id}-${item.selectedSize || 'default'}-${item.selectedColor || 'default'}`;
                              return (
                                <tr key={uniqueKey}>
                                <td>
                                    {item.name} <strong> × {item.quantity}</strong>
                                </td>
                                <td>{formatCurrency(getTotalPrice())}</td>
                              </tr>
                              );
                            })}
                          </tbody>
                          <tfoot style={{ backgroundColor: '#c29958 !important', display: 'table-header-group !important' }}>
                            {/* Order Preview Pricing Section */}
                            {isLoadingPreview ? (
                              <tr>
                                <td colSpan={2} className="text-center py-3">
                                  <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                                  Loading pricing...
                                </td>
                              </tr>
                            ) : orderPreview ? (
                              <>
                                <tr>
                                  <td style={{ color: '#2c3e50' }}>Sub Total</td>
                                  <td style={{ color: '#2c3e50', fontWeight: '600' }}>{formatCurrency(getTotalPrice())}</td>
                                </tr>
                                <tr>
                                  <td style={{ color: '#3498db' }}>Shipping</td>
                                  <td style={{ color: '#3498db', fontWeight: '600' }}>{formatCurrency(orderPreview.shippingCost)}</td>
                                </tr>
                                <tr>
                                  <td style={{ color: '#9b59b6' }}>Tax</td>
                                  <td style={{ color: '#9b59b6', fontWeight: '600' }}>{formatCurrency(orderPreview.tax)}</td>
                                </tr>
                                {orderPreview.discount > 0 && (
                                  <tr>
                                    <td style={{ color: '#27ae60' }}>Discount</td>
                                    <td style={{ color: '#27ae60', fontWeight: '600' }}>-{formatCurrency(orderPreview.discount)}</td>
                                  </tr>
                                )}
                                <tr style={{ borderTop: '2px solid #ecf0f1' }}>
                                  <td><strong>Total Amount</strong></td>
                                  <td><strong>{formatCurrency(orderPreview.total)}</strong></td>
                                </tr>
                              </>
                            ) : (
                              <>
                                <tr>
                                  <td>Sub Total</td>
                                  <td><strong>{formatCurrency(subtotal)}</strong></td>
                                </tr>
                                <tr>
                                  <td>Shipping</td>
                                  <td className="d-flex justify-content-center">
                                    <ul className="shipping-type">
                                      <li>
                                        <div className="custom-control custom-radio">
                                          <input
                                            type="radio"
                                            id="flatrate"
                                            name="shipping"
                                            className="custom-control-input"
                                            checked={true}
                                            readOnly
                                          />
                                          <label className="custom-control-label" htmlFor="flatrate">
                                            Flat Rate: {formatCurrency(shippingCost)}
                                          </label>
                                        </div>
                                      </li>
                                    </ul>
                                  </td>
                                </tr>
                                <tr style={{ borderTop: '2px solid #ecf0f1' }}>
                                  <td><strong>Total Amount</strong></td>
                                  <td><strong>{formatCurrency(total)}</strong></td>
                                </tr>
                              </>
                            )}
                          </tfoot>
                        </table>
                      </div>

                      {/* Order Payment Method */}
                      <div className="order-payment-method">
                        <div className={`single-payment-method ${paymentMethod === 'cash' ? 'show' : ''}`}>
                          <div className="payment-method-name">
                            <div className="custom-control custom-radio">
                              <input
                                type="radio"
                                id="cashon"
                                name="paymentmethod"
                                value="cash"
                                className="custom-control-input"
                                checked={paymentMethod === 'cash'}
                                onChange={() => setPaymentMethod('cash')}
                              />
                              <label className="custom-control-label" htmlFor="cashon">
                                Cash On Delivery
                              </label>
                            </div>
                          </div>
                          <div className="payment-method-details" style={{ display: paymentMethod === 'cash' ? 'block' : 'none' }}>
                            <p>Pay with cash upon delivery.</p>
                          </div>
                        </div>

                        <div className={`single-payment-method ${paymentMethod === 'bank' ? 'show' : ''}`}>
                          <div className="payment-method-name">
                            <div className="custom-control custom-radio">
                              <input
                                type="radio"
                                id="directbank"
                                name="paymentmethod"
                                value="bank"
                                className="custom-control-input"
                                checked={paymentMethod === 'bank'}
                                onChange={() => setPaymentMethod('bank')}
                              />
                              <label className="custom-control-label" htmlFor="directbank">
                                Direct Bank Transfer
                              </label>
                            </div>
                          </div>
                          <div className="payment-method-details" style={{ display: paymentMethod === 'bank' ? 'block' : 'none' }}>
                            <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
                          </div>
                        </div>

                        <div className={`single-payment-method ${paymentMethod === 'check' ? 'show' : ''}`}>
                          <div className="payment-method-name">
                            <div className="custom-control custom-radio">
                              <input
                                type="radio"
                                id="checkpayment"
                                name="paymentmethod"
                                value="check"
                                className="custom-control-input"
                                checked={paymentMethod === 'check'}
                                onChange={() => setPaymentMethod('check')}
                              />
                              <label className="custom-control-label" htmlFor="checkpayment">
                                Pay with Check
                              </label>
                            </div>
                          </div>
                          <div className="payment-method-details" style={{ display: paymentMethod === 'check' ? 'block' : 'none' }}>
                            <p>Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.</p>
                          </div>
                        </div>

                        <div className={`single-payment-method ${paymentMethod === 'paypal' ? 'show' : ''}`}>
                          <div className="payment-method-name">
                            <div className="custom-control custom-radio">
                              <input
                                type="radio"
                                id="paypalpayment"
                                name="paymentmethod"
                                value="paypal"
                                className="custom-control-input"
                                checked={paymentMethod === 'paypal'}
                                onChange={() => setPaymentMethod('paypal')}
                              />
                              <label className="custom-control-label" htmlFor="paypalpayment">
                                Paypal <img src="/assets/img/paypal-card.jpg" className="img-fluid paypal-card" alt="Paypal" />
                              </label>
                            </div>
                          </div>
                          <div className="payment-method-details" style={{ display: paymentMethod === 'paypal' ? 'block' : 'none' }}>
                            <p>Pay via PayPal; you can pay with your credit card if you don&apos;t have a PayPal account.</p>
                          </div>
                        </div>

                        <div className="summary-footer-area">
                          <div className="custom-control custom-checkbox mb-20">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="terms"
                              checked={termsAccepted}
                              onChange={(e) => setTermsAccepted(e.target.checked)}
                            />
                            <label className="custom-control-label" htmlFor="terms">
                              I have read and agree to the website <Link href="/terms">terms and conditions.</Link>
                            </label>
                          </div>
                          <button type="submit" className="btn btn-sqr" disabled={isSubmitting}>
                            {isSubmitting ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Processing...
                              </>
                            ) : (
                              'Place Order'
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* checkout main wrapper end */}
      </main>

      <Footer />

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        message={successMessage}
      />

      {/* Order Submission Loading Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
          <div className="text-center">
            <JewelryLoader
              size="large"
              message="Placing your order..."
            />
          </div>
        </div>
      )}
    </div>
  );
}