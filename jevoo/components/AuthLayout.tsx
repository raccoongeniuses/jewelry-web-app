'use client';

import React from 'react';
import Header from './Header';
import Link from 'next/link';

const styles = {
  wrapper: {
    minHeight: 'calc(100vh - 400px)', // Minimum height to ensure proper centering
    display: 'flex',
    alignItems: 'center',
  },
};

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  breadcrumb: string;
}

export default function AuthLayout({ children, title, breadcrumb }: AuthLayoutProps) {
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

      {/* login register wrapper start */}
      <div className="login-register-wrapper section-padding" style={styles.wrapper}>
        <div className="container">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-lg-6 col-md-8">
              <div className="login-reg-form-wrap mx-auto">
                <h5>{title}</h5>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* login register wrapper end */}
    </>
  );
}