import React from 'react'
import Link from 'next/link'

const Footer: React.FC = () => {
  return (
    <footer className="footer-area">
      <div className="footer-top-area section-padding">
        <div className="container">
          <div className="row">
            {/* Footer About */}
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="footer-widget footer-about">
                <div className="footer-logo">
                  <Link href="/">
                    <img src="/assets/img/jevoo-bespoke.jpg" alt="Footer Logo" />
                  </Link>
                </div>
                <p>Jevoo Jewellery offers exquisite jewelry pieces crafted with precision and passion for timeless elegance.</p>
                <div className="footer-social">
                  <ul>
                    <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                    <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                    <li><a href="#"><i className="fa fa-instagram"></i></a></li>
                    <li><a href="#"><i className="fa fa-pinterest"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer Quick Links */}
            <div className="col-lg-2 col-md-6 col-sm-6">
              <div className="footer-widget footer-menu">
                <h4 className="footer-title">Quick Links</h4>
                <ul>
                  <li><Link href="/about-us">About Us</Link></li>
                  <li><Link href="/our-promises">Our Promises</Link></li>
                  <li><Link href="/our-services">Our Services</Link></li>
                  <li><Link href="/our-philosophy">Our Philosophy</Link></li>
                  <li><Link href="/contact-us">Contact Us</Link></li>
                </ul>
              </div>
            </div>

            {/* Footer Customer Service */}
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="footer-widget footer-menu">
                <h4 className="footer-title">Customer Service</h4>
                <ul>
                  <li><Link href="/my-account">My Account</Link></li>
                  <li><Link href="/wishlist">Wishlist</Link></li>
                  <li><Link href="/cart">Shopping Cart</a></li>
                  <li><Link href="/checkout">Checkout</Link></li>
                  <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                </ul>
              </div>
            </div>

            {/* Footer Contact */}
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="footer-widget footer-contact">
                <h4 className="footer-title">Contact Info</h4>
                <ul>
                  <li>
                    <i className="fa fa-map-marker"></i>
                    <span>123 Jewelry Street, Fashion District, NY 10001</span>
                  </li>
                  <li>
                    <i className="fa fa-phone"></i>
                    <span>+1 (555) 123-4567</span>
                  </li>
                  <li>
                    <i className="fa fa-envelope"></i>
                    <span>info@jevoojewellery.com</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="footer-bottom text-center">
                <div className="footer-bottom-content">
                  <p>&copy; 2024 Jevoo Jewellery. All Rights Reserved.</p>
                  <div className="footer-bottom-payment">
                    <img src="/assets/img/payment.png" alt="Payment Methods" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer