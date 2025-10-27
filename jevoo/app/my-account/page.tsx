'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { logout } from '@/contexts/AuthContext';
import MyAccountLayout from '@/components/MyAccountLayout';
import Link from 'next/link';

export default function MyAccountPage() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    displayName: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.firstName || user?.email?.split('@')[0] || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Handle tab switching
    const handleTabClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const tabLink = target.closest('a[data-bs-toggle="tab"]');
      if (tabLink) {
        e.preventDefault();
        const href = tabLink.getAttribute('href');
        if (href) {
          const tabId = href.replace('#', '');
          setActiveTab(tabId);
        }
      }
    };

    document.addEventListener('click', handleTabClick);
    return () => document.removeEventListener('click', handleTabClick);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    // Basic validation
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setErrorMessage('New password and confirm password do not match.');
      return;
    }

    if (formData.newPassword && !formData.currentPassword) {
      setErrorMessage('Please enter your current password to change your password.');
      return;
    }

    // Here you would normally make an API call to update the user's profile
    // For now, we'll just show a success message
    setSuccessMessage('Your account details have been updated successfully!');

    // Clear password fields
    setFormData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }));
  };

  const getUserDisplayName = () => {
    if (user?.firstName) {
      return user.firstName;
    }
    return user?.email?.split('@')[0] || 'User';
  };

  const getUserFullName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user?.firstName) {
      return user.firstName;
    }
    return user?.email || 'User';
  };

  if (!isAuthenticated) {
    return (
      <MyAccountLayout title="My Account" breadcrumb="My Account">
        <div className="text-center py-5">
          <p>Please log in to access your account.</p>
          <Link href="/login" className="btn btn-primary">Login</Link>
        </div>
      </MyAccountLayout>
    );
  }

  return (
    <MyAccountLayout title="My Account" breadcrumb="My Account">
      {/* Dashboard Tab */}
      <div className={`tab-pane fade ${activeTab === 'dashboard' ? 'show active' : ''}`} id="dashboard" role="tabpanel">
        <div className="myaccount-content">
          <h5>Dashboard</h5>
          <div className="welcome">
            <p>
              Hello, <strong>{getUserFullName()}</strong>
              (If Not <strong>{getUserDisplayName()}</strong>!
              <Link href="/login" className="logout"> Logout</Link>)
            </p>
          </div>
          <p className="mb-0">
            From your account dashboard. you can easily check &amp; view your recent orders,
            manage your shipping and billing addresses and edit your password and account details.
          </p>
        </div>
      </div>

      {/* Orders Tab */}
      <div className={`tab-pane fade ${activeTab === 'orders' ? 'show active' : ''}`} id="orders" role="tabpanel">
        <div className="myaccount-content">
          <h5>Orders</h5>
          <div className="myaccount-table table-responsive text-center">
            <table className="table table-bordered">
              <thead className="thead-light">
                <tr>
                  <th>Order</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    <p className="text-muted mb-0">No orders found.</p>
                    <small>Start shopping to see your orders here!</small>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Downloads Tab */}
      <div className={`tab-pane fade ${activeTab === 'downloads' ? 'show active' : ''}`} id="downloads" role="tabpanel">
        <div className="myaccount-content">
          <h5>Downloads</h5>
          <div className="myaccount-table table-responsive text-center">
            <table className="table table-bordered">
              <thead className="thead-light">
                <tr>
                  <th>Product</th>
                  <th>Date</th>
                  <th>Expire</th>
                  <th>Download</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    <p className="text-muted mb-0">No downloads available.</p>
                    <small>Your downloadable files will appear here.</small>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Payment Method Tab */}
      <div className={`tab-pane fade ${activeTab === 'payment-method' ? 'show active' : ''}`} id="payment-method" role="tabpanel">
        <div className="myaccount-content">
          <h5>Payment Method</h5>
          <p className="saved-message">You Can't Save Your Payment Method yet.</p>
        </div>
      </div>

      {/* Address Tab */}
      <div className={`tab-pane fade ${activeTab === 'address' ? 'show active' : ''}`} id="address-edit" role="tabpanel">
        <div className="myaccount-content">
          <h5>Billing Address</h5>
          <div className="address-info">
            <p className="text-muted">No address information available.</p>
            <p className="mb-0">Add your billing and shipping addresses to manage your delivery preferences.</p>
          </div>
          <button className="btn btn-sqr mt-3">
            <i className="fa fa-edit"></i> Edit Address
          </button>
        </div>
      </div>

      {/* Account Details Tab */}
      <div className={`tab-pane fade ${activeTab === 'account-info' ? 'show active' : ''}`} id="account-info" role="tabpanel">
        <div className="myaccount-content">
          <h5>Account Details</h5>
          {successMessage && (
            <div className="alert alert-success mt-3 mb-3">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="alert alert-danger mt-3 mb-3">
              {errorMessage}
            </div>
          )}
          <div className="account-details-form">
            <form onSubmit={handleFormSubmit}>
              <div className="row">
                <div className="col-lg-6">
                  <div className="single-input-item">
                    <label htmlFor="first-name" className="required">First Name</label>
                    <input
                      type="text"
                      id="first-name"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="single-input-item">
                    <label htmlFor="last-name" className="required">Last Name</label>
                    <input
                      type="text"
                      id="last-name"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="single-input-item">
                <label htmlFor="display-name" className="required">Display Name</label>
                <input
                  type="text"
                  id="display-name"
                  name="displayName"
                  placeholder="Display Name"
                  value={formData.displayName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="single-input-item">
                <label htmlFor="email" className="required">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  disabled
                />
                <small className="text-muted">Email cannot be changed.</small>
              </div>

              <fieldset>
                <legend>Password Change</legend>
                <div className="single-input-item">
                  <label htmlFor="current-pwd">Current Password</label>
                  <input
                    type="password"
                    id="current-pwd"
                    name="currentPassword"
                    placeholder="Current Password"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="single-input-item">
                      <label htmlFor="new-pwd">New Password</label>
                      <input
                        type="password"
                        id="new-pwd"
                        name="newPassword"
                        placeholder="New Password"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="single-input-item">
                      <label htmlFor="confirm-pwd">Confirm Password</label>
                      <input
                        type="password"
                        id="confirm-pwd"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </fieldset>

              <div className="single-input-item">
                <button type="submit" className="btn btn-sqr">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MyAccountLayout>
  );
}