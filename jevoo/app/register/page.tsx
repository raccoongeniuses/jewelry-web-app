'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { RegisterCredentials, AuthError } from '@/types/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthLayout from '@/components/AuthLayout';

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterCredentials>({
    email: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { register } = useAuth();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    if (formData.password !== confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await register(formData);
      setSuccess('Registration successful! You are now logged in.');

      // Check if user is actually authenticated before redirecting
      setTimeout(() => {
        // Re-check authentication state
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          router.push('/my-account');
        } else {
          setError('Authentication failed. Please try logging in manually.');
          setIsLoading(false);
        }
      }, 1500); // Brief delay to show success message
    } catch (err) {
      const authError = err as AuthError;
      let errorMessage = authError.message || 'An error occurred. Please try again.';

      // Handle specific duplicate email error
      if (authError.field === 'email' && errorMessage.includes('already registered')) {
        errorMessage = 'This email is already registered. Please use a different email or login.';
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Signup Form" breadcrumb="Register">
      <form onSubmit={handleSubmit}>
        <div className="single-input-item">
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="single-input-item">
              <input
                type="password"
                name="password"
                placeholder="Enter your Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="single-input-item">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Repeat your Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="single-input-item">
          <div className="login-reg-form-meta">
            <div className="remember-meta">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="subnewsletter"
                  required
                />
                <label className="custom-control-label" htmlFor="subnewsletter">
                  I agree to the Terms & Conditions
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="single-input-item">
          <button
            type="submit"
            className="btn btn-sqr"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Registering...
              </>
            ) : (
              'Register'
            )}
          </button>
        </div>
        <div className="single-input-item mt-3">
          <div className="login-register-switch">
            Already have an account?
            <Link href="/login" className="ms-1">Login</Link>
          </div>
        </div>
      </form>
      {success && <div className="alert alert-success mt-3">{success}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </AuthLayout>
  );
}