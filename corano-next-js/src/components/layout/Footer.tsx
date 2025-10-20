import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer-area">
      {/* Newsletter Section */}
      <div className="newsletter-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <div className="newsletter-content">
                <h2>Subscribe to Our Newsletter</h2>
                <p>Get the latest updates on new products and upcoming sales</p>
                <form className="newsletter-form">
                  <div className="form-group">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      required
                    />
                    <button type="submit" className="btn btn-primary">
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer-main">
        <div className="container">
          <div className="row">
            {/* About Us */}
            <div className="col-lg-3 col-md-6">
              <div className="footer-widget about-widget">
                <div className="footer-logo">
                  <img src="/images/logo.png" alt="Jevoo Jewellery" />
                </div>
                <p>
                  Discover exquisite jewelry collections crafted with precision and elegance.
                  Our commitment to quality ensures timeless pieces that celebrate life's special moments.
                </p>
                <div className="social-links">
                  <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <i className="fa fa-facebook"></i>
                  </Link>
                  <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <i className="fa fa-twitter"></i>
                  </Link>
                  <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <i className="fa fa-instagram"></i>
                  </Link>
                  <Link href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
                    <i className="fa fa-pinterest"></i>
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-lg-3 col-md-6">
              <div className="footer-widget">
                <h3>Quick Links</h3>
                <ul>
                  <li><Link href="/about">About Us</Link></li>
                  <li><Link href="/contact">Contact Us</Link></li>
                  <li><Link href="/account">My Account</Link></li>
                  <li><Link href="/cart">Shopping Cart</Link></li>
                  <li><Link href="/wishlist">Wishlist</Link></li>
                </ul>
              </div>
            </div>

            {/* Customer Service */}
            <div className="col-lg-3 col-md-6">
              <div className="footer-widget">
                <h3>Customer Service</h3>
                <ul>
                  <li><Link href="/shipping">Shipping Information</Link></li>
                  <li><Link href="/returns">Returns & Exchanges</Link></li>
                  <li><Link href="/size-guide">Size Guide</Link></li>
                  <li><Link href="/care">Jewelry Care</Link></li>
                  <li><Link href="/faq">FAQ</Link></li>
                </ul>
              </div>
            </div>

            {/* Contact Info */}
            <div className="col-lg-3 col-md-6">
              <div className="footer-widget contact-widget">
                <h3>Contact Info</h3>
                <div className="contact-info">
                  <div className="contact-item">
                    <i className="fa fa-map-marker"></i>
                    <div className="contact-details">
                      <p>123 Jewelry Street<br />New York, NY 10001</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <i className="fa fa-phone"></i>
                    <div className="contact-details">
                      <p>+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <i className="fa fa-envelope"></i>
                    <div className="contact-details">
                      <p>info@jevoojewellery.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="copyright">
                <p>&copy; {new Date().getFullYear()} Jevoo Jewellery. All rights reserved.</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="footer-bottom-links">
                <Link href="/privacy-policy">Privacy Policy</Link>
                <Link href="/terms">Terms & Conditions</Link>
                <Link href="/sitemap">Sitemap</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}