import Link from 'next/link';

export default function Footer() {
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
                        <img src="/assets/img/jevoo-bespoke.jpg" alt="brand logo" style={{maxHeight: '100px', width: 'auto', paddingLeft: '20%'}} />
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
                        <li><i className="pe-7s-mail"></i> <a href="mailto:jevoo@jewellery.com">jevoo@jewellery.com</a></li>
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
                  <form className="newsletter-inner" id="mc-form">
                    <input type="email" className="news-field" id="mc-email" autoComplete="off" placeholder="Enter your email address" />
                    <button className="news-btn" id="mc-submit">Subscribe</button>
                  </form>
                  {/* mail-chimp-alerts Start */}
                  <div className="mailchimp-alerts">
                    <div className="mailchimp-submitting"></div>
                    <div className="mailchimp-success"></div>
                    <div className="mailchimp-error"></div>
                  </div>
                  {/* mail-chimp-alerts end */}
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
        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="copyright-text text-center">
                  <p>&copy; 2025 <b>Jevoo Jewellery</b> Made with <i className="fa fa-heart text-danger"></i> by <a href="https://hasthemes.com/"><b>HasThemes</b></a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
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
