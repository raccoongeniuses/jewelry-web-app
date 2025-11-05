'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const [isMessageVisible, setIsMessageVisible] = useState(true);

  // Auto-hide success message after 5 seconds
  useEffect(() => {
    if (messageType === 'success' && message) {
      setIsMessageVisible(true);
      const timer = setTimeout(() => {
        setIsMessageVisible(false); // Start fade out
        setTimeout(() => {
          setMessage('');
          setMessageType('');
          setIsMessageVisible(true);
        }, 300); // 300ms for fade out animation
      }, 5000); // 5 seconds

      return () => clearTimeout(timer); // Cleanup timer on component unmount or message change
    }
  }, [message, messageType]);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setIsMessageVisible(true);
      setMessage('Please enter your email address');
      setMessageType('error');
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setIsMessageVisible(true);
      setMessage('Please enter a valid email address');
      setMessageType('error');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/newsletter-signups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsMessageVisible(true);
        setMessage('Successfully subscribed to newsletter!');
        setMessageType('success');
        setEmail(''); // Clear the form
      } else {
        setIsMessageVisible(true);
        setMessage(data.error || 'Failed to subscribe. Please try again.');
        setMessageType('error');
      }
    } catch (err) {
      console.error(err);
      setIsMessageVisible(true);
      setMessage('An error occurred. Please try again later.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Scroll to top */}
      <div className="scroll-top not-visible">
        <i className="fa fa-angle-up"></i>
      </div>
      
      {/* footer area start */}
      <footer className="footer-widget-area">
        <div className="footer-top section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <div className="widget-item">
                  <div className="widget-title">
                    <div className="widget-logo">
                      <Link href="/">
                        <Image
                          src="/assets/img/jevoo-bespoke.jpg"
                          alt="brand logo"
                          width={180}
                          height={100}
                          style={{ maxHeight: '100px', width: 'auto', paddingLeft: '20%' }}
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="widget-body">
                    <p>We are a team of designers and developers that create high quality websites.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="widget-item">
                  <h6 className="widget-title">Contact Us</h6>
                  <div className="widget-body">
                    <address className="contact-block">
                      <ul>
                        <li><i className="pe-7s-home"></i> 4710-4890 Breckinridge USA</li>
                        <li><i className="pe-7s-mail"></i> <a href="mailto:jevoo-jewellery.com">jevoo-jewellery.com</a></li>
                        <li><i className="pe-7s-call"></i> <a href="tel:(012)800456789987">(012) 800 456 789-987</a></li>
                      </ul>
                    </address>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="widget-item">
                  <h6 className="widget-title">Information</h6>
                  <div className="widget-body">
                    <ul className="info-list">
                      <li><a href="#">about us</a></li>
                      <li><a href="#">Delivery Information</a></li>
                      <li><a href="#">privet policy</a></li>
                      <li><a href="#">Terms & Conditions</a></li>
                      <li><a href="#">contact us</a></li>
                      <li><a href="#">site map</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="widget-item">
                  <h6 className="widget-title">Follow Us</h6>
                  <div className="widget-body social-link">
                    <a href="#"><i className="fa fa-facebook"></i></a>
                    <a href="#"><i className="fa fa-twitter"></i></a>
                    <a href="#"><i className="fa fa-instagram"></i></a>
                    <a href="#"><i className="fa fa-youtube"></i></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="row align-items-center mt-20">
              <div className="col-md-6">
                <div className="newsletter-wrapper">
                  <h6 className="widget-title-text">Signup for newsletter</h6>
                  <form className="newsletter-inner" onSubmit={handleNewsletterSubmit}>
                    <input
                      type="email"
                      className="news-field"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                      autoComplete="off"
                      placeholder="Enter your email address"
                      required
                    />
                    <button
                      className="news-btn"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Subscribing...' : 'Subscribe'}
                    </button>
                  </form>
                  {/* Newsletter messages */}
                  {message && (
                    <div
                      className={`mt-2 ${messageType === 'success' ? 'text-success' : 'text-danger'} transition-opacity duration-300 ${isMessageVisible ? 'opacity-100' : 'opacity-0'}`}
                    >
                      <small>{message}</small>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="footer-payment">
                  <img src="/assets/img/payment.png" alt="payment method" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-12">
              </div>
            </div>
          </div>
        </div> */}
      </footer>
      {/* footer area end */}

      {/* offcanvas mini cart start */}
      <div className="offcanvas-minicart-wrapper">
        <div className="minicart-inner">
          <div className="offcanvas-overlay"></div>
          <div className="minicart-inner-content">
            <div className="minicart-close">
              <i className="pe-7s-close"></i>
            </div>
            <div className="minicart-content-box">
              <div className="minicart-item-wrapper">
                {/* Mini cart items would go here */}
              </div>
              <div className="minicart-pricing-box">
                {/* Pricing would go here */}
              </div>
              <div className="minicart-button">
                {/* Buttons would go here */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* offcanvas mini cart end */}
    </>
  );
}
