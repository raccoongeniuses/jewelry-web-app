'use client';

import React from 'react';
import Header from './Header';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import MyAccountContent from './MyAccountContent';

interface MyAccountLayoutProps {
  title: string;
  breadcrumb: string;
}

export default function MyAccountLayout({ title, breadcrumb }: MyAccountLayoutProps) {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />

      {/* breadcrumb area start */}
      <div className="breadcrumb-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumb-wrap">
                <nav aria-label="breadcrumb">
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link href="/"><i className="fa fa-home"></i></Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">{breadcrumb}</li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* breadcrumb area end */}

      {/* my account wrapper start */}
      <div className="my-account-wrapper section-padding">
        <div className="container">
          <div className="section-bg-color">
            <div className="row">
              <div className="col-lg-12">
                {/* My Account Page Start */}
                <div className="myaccount-page-wrapper">
                  {/* My Account Tab Menu Start */}
                  <div className="row">
                    <div className="col-lg-3 col-md-4">
                      <div className="myaccount-tab-menu nav" role="tablist">
                        <a href="#dashboard" className="active" data-bs-toggle="tab">
                          <i className="fa fa-dashboard"></i> Dashboard
                        </a>
                        <a href="#orders" data-bs-toggle="tab">
                          <i className="fa fa-cart-arrow-down"></i> Orders
                        </a>
                        <a href="#downloads" data-bs-toggle="tab">
                          <i className="fa fa-cloud-download"></i> Download
                        </a>
                        <a href="#payment-method" data-bs-toggle="tab">
                          <i className="fa fa-credit-card"></i> Payment Method
                        </a>
                        <a href="#address-edit" data-bs-toggle="tab">
                          <i className="fa fa-map-marker"></i> Address
                        </a>
                        <a href="#account-info" data-bs-toggle="tab">
                          <i className="fa fa-user"></i> Account Details
                        </a>
                        <Link href="/login">
                          <i className="fa fa-sign-out"></i> Logout
                        </Link>
                      </div>
                    </div>
                    {/* My Account Tab Menu End */}

                    {/* My Account Tab Content Start */}
                    <div className="col-lg-9 col-md-8">
                      <div className="tab-content" id="myaccountContent">
                        <MyAccountContent />
                      </div>
                    </div>
                    {/* My Account Tab Content End */}
                  </div>
                </div>
                {/* My Account Page End */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* my account wrapper end */}
    </>
  );
}