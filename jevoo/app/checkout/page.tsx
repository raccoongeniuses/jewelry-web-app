'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../contexts/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface BillingDetails {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  country: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  postcode: string;
  phone: string;
  createAccount: boolean;
  accountPassword: string;
}

interface ShippingDetails {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  country: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  postcode: string;
}

export default function CheckoutPage() {
  const { items, getTotalPrice, getTotalItems, clearCart } = useCart();

  // Form states
  const [billingDetails, setBillingDetails] = useState<BillingDetails>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    country: 'Afghanistan',
    address: '',
    address2: '',
    city: '',
    state: '',
    postcode: '',
    phone: '',
    createAccount: false,
    accountPassword: ''
  });

  const [shippingToDifferent, setShippingToDifferent] = useState(false);
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    country: 'Bangladesh',
    address: '',
    address2: '',
    city: '',
    state: '',
    postcode: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'bank' | 'check' | 'paypal'>('cash');
  const [shippingMethod, setShippingMethod] = useState<'flat' | 'free'>('flat');
  const [orderNote, setOrderNote] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Pricing calculations
  const subtotal = getTotalPrice();
  const shippingCost = shippingMethod === 'flat' ? 70 : 0;
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert('Please accept the terms and conditions');
      return;
    }
    // Handle checkout submission
    console.log('Order submitted:', {
      billing: billingDetails,
      shipping: shippingToDifferent ? shippingDetails : billingDetails,
      items,
      total,
      paymentMethod,
      shippingMethod,
      orderNote
    });
    // Clear cart and redirect to success page
    clearCart();
    alert('Order placed successfully!');
  };

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
                        <Link href="/shop">shop</Link>
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
                {/* Checkout Login Coupon Accordion Start */}
                <div className="checkoutaccordion" id="checkOutAccordion">
                  <div className="card" style={{ backgroundColor: 'transparent', border: 'none' }}>
                    <h6>Returning Customer?
                      <span
                        onClick={() => {
                          const loginAccordion = document.getElementById('logInaccordion');
                          if (loginAccordion) {
                            loginAccordion.style.display = loginAccordion.style.display === 'block' ? 'none' : 'block';
                          }
                        }}
                        style={{ cursor: 'pointer', color: '#c29958' }}
                      >
                        Click Here To Login
                      </span>
                    </h6>
                    <div id="logInaccordion" style={{ display: 'none', transition: 'none' }}>
                      <div className="card-body" style={{ backgroundColor: 'transparent', padding: '20px' }}>
                        <p>If you have shopped with us before, please enter your details in the boxes below. If you are a new customer, please proceed to the Billing & Shipping section.</p>
                        <div className="login-reg-form-wrap mt-20">
                          <div className="row">
                            <div className="col-lg-7 m-auto">
                              <form action="#" method="post">
                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="single-input-item">
                                      <input type="email" placeholder="Enter your Email" required />
                                    </div>
                                  </div>
                                  <div className="col-md-12">
                                    <div className="single-input-item">
                                      <input type="password" placeholder="Enter your Password" required />
                                    </div>
                                  </div>
                                </div>
                                <div className="single-input-item">
                                  <div className="login-reg-form-meta d-flex align-items-center justify-content-between">
                                    <div className="remember-meta">
                                      <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="rememberMe" required />
                                        <label className="custom-control-label" htmlFor="rememberMe">Remember Me</label>
                                      </div>
                                    </div>
                                    <a href="#" className="forget-pwd">Forget Password?</a>
                                  </div>
                                </div>
                                <div className="single-input-item">
                                  <button className="btn btn-sqr" type="button">Login</button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card" style={{ backgroundColor: 'transparent', border: 'none' }}>
                    <h6>Have A Coupon?
                      <span
                        onClick={() => {
                          const couponAccordion = document.getElementById('couponaccordion');
                          if (couponAccordion) {
                            couponAccordion.style.display = couponAccordion.style.display === 'block' ? 'none' : 'block';
                          }
                        }}
                        style={{ cursor: 'pointer', color: '#c29958' }}
                      >
                        Click Here To Enter Your Code
                      </span>
                    </h6>
                    <div id="couponaccordion" style={{ display: 'none', transition: 'none' }}>
                      <div className="card-body" style={{ backgroundColor: 'transparent', padding: '20px' }}>
                        <div className="cart-update-option">
                          <div className="apply-coupon-wrapper">
                            <form action="#" method="post" className="d-block d-md-flex">
                              <input type="text" placeholder="Enter Your Coupon Code" required />
                              <button className="btn btn-sqr" type="button">Apply Coupon</button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Checkout Login Coupon Accordion End */}
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
                        <label htmlFor="com-name">Company Name</label>
                        <input
                          type="text"
                          id="com-name"
                          placeholder="Company Name"
                          value={billingDetails.company}
                          onChange={(e) => handleBillingChange('company', e.target.value)}
                        />
                      </div>

                      <div className="single-input-item">
                        <label htmlFor="country" className="required">Country</label>
                        <select
                          name="country"
                          id="country"
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
                              id="create_pwd"
                              checked={billingDetails.createAccount}
                              onChange={(e) => handleBillingChange('createAccount', e.target.checked)}
                            />
                            <label className="custom-control-label" htmlFor="create_pwd">
                              Create an account?
                            </label>
                          </div>
                        </div>
                        {billingDetails.createAccount && (
                          <div className="account-create single-form-row" style={{ display: 'block' }}>
                            <p>Create an account by entering the information below. If you are a returning customer please login at the top of the page.</p>
                            <div className="single-input-item">
                              <label htmlFor="pwd" className="required">Account Password</label>
                              <input
                                type="password"
                                id="pwd"
                                placeholder="Account Password"
                                required
                                value={billingDetails.accountPassword}
                                onChange={(e) => handleBillingChange('accountPassword', e.target.value)}
                              />
                            </div>
                          </div>
                        )}
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
                            <label className="custom-control-label" htmlFor="ship_to_different">
                              Ship to a different address?
                            </label>
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
                              <label htmlFor="com-name_2">Company Name</label>
                              <input
                                type="text"
                                id="com-name_2"
                                placeholder="Company Name"
                                value={shippingDetails.company}
                                onChange={(e) => handleShippingChange('company', e.target.value)}
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
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Products</th>
                              <th>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {items.map((item, index) => (
                              <tr key={item.id}>
                                <td>
                                  <Link href="/product-details">
                                    {item.name} <strong> × {item.quantity}</strong>
                                  </Link>
                                </td>
                                <td>${(item.price * item.quantity).toFixed(2)}</td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr>
                              <td>Sub Total</td>
                              <td><strong>${subtotal.toFixed(2)}</strong></td>
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
                                        checked={shippingMethod === 'flat'}
                                        onChange={() => setShippingMethod('flat')}
                                      />
                                      <label className="custom-control-label" htmlFor="flatrate">
                                        Flat Rate: ${shippingCost.toFixed(2)}
                                      </label>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="custom-control custom-radio">
                                      <input
                                        type="radio"
                                        id="freeshipping"
                                        name="shipping"
                                        className="custom-control-input"
                                        checked={shippingMethod === 'free'}
                                        onChange={() => setShippingMethod('free')}
                                      />
                                      <label className="custom-control-label" htmlFor="freeshipping">
                                        Free Shipping
                                      </label>
                                    </div>
                                  </li>
                                </ul>
                              </td>
                            </tr>
                            <tr>
                              <td>Total Amount</td>
                              <td><strong>${total.toFixed(2)}</strong></td>
                            </tr>
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
                            <p>Pay via PayPal; you can pay with your credit card if you don't have a PayPal account.</p>
                          </div>
                        </div>

                        <div className="summary-footer-area">
                          <div className="custom-control custom-checkbox mb-20">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="terms"
                              required
                              checked={termsAccepted}
                              onChange={(e) => setTermsAccepted(e.target.checked)}
                            />
                            <label className="custom-control-label" htmlFor="terms">
                              I have read and agree to the website <Link href="/terms">terms and conditions.</Link>
                            </label>
                          </div>
                          <button type="submit" className="btn btn-sqr">
                            Place Order
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
    </div>
  );
}