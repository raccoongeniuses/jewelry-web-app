'use client';

import React from 'react';
import Orders from './Orders';

const Dashboard = () => (
  <div className="tab-pane fade show active" id="dashboard" role="tabpanel">
    <div className="myaccount-content">
      <h3>Dashboard</h3>
      <p>Welcome to your account dashboard!</p>
    </div>
  </div>
);

const Downloads = () => (
  <div className="tab-pane fade" id="downloads" role="tabpanel">
    <div className="myaccount-content">
      <h3>Downloads</h3>
      <p>No downloadable files available.</p>
    </div>
  </div>
);

const PaymentMethod = () => (
  <div className="tab-pane fade" id="payment-method" role="tabpanel">
    <div className="myaccount-content">
      <h3>Payment Method</h3>
      <p>No payment methods saved.</p>
    </div>
  </div>
);

const Address = () => (
  <div className="tab-pane fade" id="address-edit" role="tabpanel">
    <div className="myaccount-content">
      <h3>Address</h3>
      <p>No address information saved.</p>
    </div>
  </div>
);

const AccountDetails = () => (
  <div className="tab-pane fade" id="account-info" role="tabpanel">
    <div className="myaccount-content">
      <h3>Account Details</h3>
      <p>Account details management coming soon.</p>
    </div>
  </div>
);

export default function MyAccountContent() {
  return (
    <>
      <Dashboard />
      <Orders />
      <Downloads />
      <PaymentMethod />
      <Address />
      <AccountDetails />
    </>
  );
}