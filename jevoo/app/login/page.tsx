'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LoginCredentials, AuthError } from '@/types/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthLayout from '@/components/AuthLayout';

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(formData);
      router.push('/my-account');
    } catch (err) {
      const authError = err as AuthError;
      // Provide more specific error messages based on the error code
      let errorMessage = authError.message || 'An error occurred. Please try again.';

      if (authError.code === '401') {
        errorMessage = 'The email or password provided is incorrect.';
      } else if (authError.code === '400') {
        errorMessage = 'Please enter a valid email and password.';
      } else if (authError.code === '404') {
        errorMessage = 'User not found. Please check your email.';
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Sign In" breadcrumb="Login">
      <form onSubmit={handleSubmit}>
        <div className="single-input-item">
          <input
            type="email"
            name="email"
            placeholder="Email or Username"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
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
        <div className="single-input-item">
          <div className="login-reg-form-meta d-flex align-items-center justify-content-between">
            <div className="remember-meta">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="rememberMe"
                />
                <label className="custom-control-label" htmlFor="rememberMe">
                  Remember Me
                </label>
              </div>
            </div>
            <a href="#" className="forget-pwd">Forget Password?</a>
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
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </div>
        <div className="single-input-item mt-3">
          <div className="login-register-switch">
            Don&#39;t have an account?
            <Link href="/register" className="ms-1">Register</Link>
          </div>
        </div>
      </form>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </AuthLayout>
  );
}