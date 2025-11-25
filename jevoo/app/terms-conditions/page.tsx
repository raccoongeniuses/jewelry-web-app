import Link from "next/link";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function TermsConditions() {
  return (
    <>
      <Header />

      <main>
        {/* breadcrumb area start */}
        <div className="breadcrumb-area">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="breadcrumb-wrap">
                  <nav aria-label="breadcrumb">
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link href="/">
                          <i className="fa fa-home"></i>
                        </Link>
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">
                        Terms & Conditions
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* breadcrumb area end */}

        {/* page wrapper start */}
        <div className="page-wrapper section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 offset-lg-1">
                <div className="page-content">
                  <h1 className="page-title text-center mb-4 gold-font">Terms & Conditions</h1>
                  <div className="entry-content" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    <p><strong>Effective Date:</strong> {new Date().toLocaleDateString()}</p>
                    <p>Welcome to Jevoo Jewellery. These Terms & Conditions govern your use of our website and your purchase of products from our online store. By accessing our website and making a purchase, you agree to be bound by these terms.</p>

                    <div className="card border-0 shadow-sm">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center mb-3">
                          <span className="badge gold-bg rounded-circle me-3 text-white fw-bold" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>1</span>
                          <h3 className="card-title mb-0 gold-font">General Information</h3>
                        </div>
                        <p className="card-text">Jevoo Jewellery ("we," "us," or "our") operates this website and sells fine jewellery products. By using our website, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.</p>
                      </div>
                    </div>

                    <div className="card border-0 shadow-sm">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center mb-3">
                          <span className="badge gold-bg rounded-circle me-3 text-white fw-bold" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>2</span>
                          <h3 className="card-title mb-0 gold-font">Products and Pricing</h3>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                          <div>
                            <h4 className="gold-font mb-3">Product Descriptions</h4>
                            <div className="alert alert-light border">
                              <div className="d-flex align-items-start">
                                <i className="pe-7s-diamond me-3 mt-1 gold-font" style={{ fontSize: '1.5rem' }}></i>
                                <div>
                                  We strive to provide accurate descriptions and images of our products. However, due to variations in monitors, lighting, and natural gemstone characteristics, actual products may vary slightly from images shown.
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="gold-font mb-3">Pricing</h4>
                            <div className="row">
                              <div className="col-md-6">
                                <ul className="list-unstyled" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                  <li className="d-flex align-items-center">
                                    <i className="pe-7s-cash me-2 gold-font"></i>
                                    <span>All prices are displayed in US Dollars (USD)</span>
                                  </li>
                                  <li className="d-flex align-items-center">
                                    <i className="pe-7s-refresh-2 me-2 gold-font"></i>
                                    <span>Prices are subject to change without notice</span>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-md-6">
                                <ul className="list-unstyled" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                  <li className="d-flex align-items-center">
                                    <i className="pe-7s-note2 me-2 gold-font"></i>
                                    <span>We reserve the right to correct pricing errors</span>
                                  </li>
                                  <li className="d-flex align-items-center">
                                    <i className="pe-7s-clock me-2 gold-font"></i>
                                    <span>Promotional prices are limited time offers</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="gold-font mb-3">Product Availability</h4>
                            <div className="alert alert-warning border">
                              <div className="d-flex align-items-center">
                                <i className="pe-7s-attention me-3" style={{ fontSize: '1.5rem' }}></i>
                                <span>All products are subject to availability. We reserve the right to limit quantities and discontinue products at any time.</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card border-0 shadow-sm">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center mb-3">
                          <span className="badge gold-bg rounded-circle me-3 text-white fw-bold" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>3</span>
                          <h3 className="card-title mb-0 gold-font">Orders and Payment</h3>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                          <div>
                            <h4 className="gold-font mb-3">Order Acceptance</h4>
                            <p className="mb-3">Your order constitutes an offer to purchase. We reserve the right to accept or decline your order for any reason, including but not limited to:</p>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="d-flex align-items-start mb-3" style={{ minHeight: '60px' }}>
                                  <i className="pe-7s-box2 me-2 mt-1 gold-font"></i>
                                  <span>Product availability</span>
                                </div>
                                <div className="d-flex align-items-start mb-3" style={{ minHeight: '60px' }}>
                                  <i className="pe-7s-cash me-2 mt-1 gold-font"></i>
                                  <span>Pricing errors</span>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="d-flex align-items-start mb-3" style={{ minHeight: '60px' }}>
                                  <i className="pe-7s-shield me-2 mt-1 gold-font"></i>
                                  <span>Suspicious or fraudulent orders</span>
                                </div>
                                <div className="d-flex align-items-start mb-3" style={{ minHeight: '60px' }}>
                                  <i className="pe-7s-note2 me-2 mt-1 gold-font"></i>
                                  <span>Incomplete or inaccurate information</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="gold-font mb-3">Payment Methods</h4>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="card border-gold mb-2">
                                  <div className="card-body p-3">
                                    <div className="d-flex align-items-center">
                                      <i className="pe-7s-credit me-2"></i>
                                      <span>Credit Cards (Visa, MasterCard, American Express)</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="card border-gold mb-2">
                                  <div className="card-body p-3">
                                    <div className="d-flex align-items-center">
                                      <i className="pe-7s-credit me-2"></i>
                                      <span>Debit Cards</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="card border-gold mb-2">
                                  <div className="card-body p-3">
                                    <div className="d-flex align-items-center">
                                      <i className="pe-7s-wallet me-2"></i>
                                      <span>PayPal</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="card border-gold mb-2">
                                  <div className="card-body p-3">
                                    <div className="d-flex align-items-center">
                                      <i className="pe-7s-bank me-2"></i>
                                      <span>Bank Transfer</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="card border-gold">
                                  <div className="card-body p-3">
                                    <div className="d-flex align-items-center">
                                      <i className="pe-7s-cash me-2"></i>
                                      <span>Cash on Delivery (for Hong Kong orders over USD 130)</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="alert alert-light border">
                            <div className="d-flex align-items-start">
                              <i className="pe-7s-shield me-3 mt-1" style={{ fontSize: '1.5rem' }}></i>
                              <div>
                                <h5 className="alert-heading mb-2">Payment Security</h5>
                                <p className="mb-0">All payment transactions are processed securely through PCI-compliant payment processors. We do not store your complete credit card information on our servers.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card border-0 shadow-sm">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center mb-3">
                          <span className="badge gold-bg rounded-circle me-3 text-white fw-bold" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>4</span>
                          <h3 className="card-title mb-0 gold-font">Shipping and Delivery</h3>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                          <div>
                            <h4 className="gold-font mb-3">Shipping Methods</h4>
                            <p className="mb-3">We offer the following shipping options:</p>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="d-flex align-items-start mb-3">
                                  <i className="pe-7s-map-2 me-3 mt-1 gold-font" style={{ fontSize: '1.5rem' }}></i>
                                  <div>
                                    <strong>Hong Kong:</strong>
                                    <ul className="mt-1 mb-0">
                                      <li>Standard (3-5 business days)</li>
                                      <li>Express (1-2 business days)</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="d-flex align-items-start mb-3">
                                  <i className="pe-7s-global me-3 mt-1 gold-font" style={{ fontSize: '1.5rem' }}></i>
                                  <div>
                                    <strong>International:</strong>
                                    <ul className="mt-1 mb-0">
                                      <li>Standard (7-14 business days)</li>
                                      <li>Express (3-5 business days)</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="alert alert-light border">
                              <div className="d-flex align-items-center">
                                <i className="pe-7s-gift me-3"></i>
                                <span><strong>Free Shipping:</strong> Available for orders over USD 650 within Hong Kong</span>
                              </div>
                            </div>
                          </div>

                          <div className="alert alert-info border">
                            <div className="d-flex align-items-start">
                              <i className="pe-7s-shield me-3 mt-1" style={{ fontSize: '1.5rem' }}></i>
                              <div>
                                <h4 className="alert-heading mb-2">Shipping Insurance</h4>
                                <p className="mb-0">All orders are insured during transit. A signature is required upon delivery for orders over USD 390.</p>
                              </div>
                            </div>
                          </div>

                          <div className="alert alert-warning border">
                            <div className="d-flex align-items-start">
                              <i className="pe-7s-attention me-3 mt-1" style={{ fontSize: '1.5rem' }}></i>
                              <div>
                                <h4 className="alert-heading mb-2">Delivery Risk</h4>
                                <p className="mb-0">Risk of loss and title for all products pass to you upon delivery to the shipping carrier.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card border-0 shadow-sm">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center mb-3">
                          <span className="badge gold-bg rounded-circle me-3 text-white fw-bold" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>5</span>
                          <h3 className="card-title mb-0 gold-font">Returns and Refunds</h3>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                          <div className="alert alert-light border">
                            <div className="d-flex align-items-start">
                              <i className="pe-7s-back me-3 mt-1" style={{ fontSize: '1.5rem' }}></i>
                              <div>
                                <h4 className="alert-heading mb-2">30-Day Return Policy</h4>
                                <p className="mb-0">You may return unused items in their original condition within 30 days of delivery for a full refund or exchange.</p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="gold-font mb-3">Non-Returnable Items</h4>
                            <p className="mb-3">The following items cannot be returned:</p>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="d-flex align-items-start mb-3" style={{ minHeight: '60px' }}>
                                  <i className="pe-7s-note me-2 mt-1 gold-font"></i>
                                  <span>Custom or personalized jewellery</span>
                                </div>
                                <div className="d-flex align-items-start mb-3" style={{ minHeight: '60px' }}>
                                  <i className="pe-7s-note me-2 mt-1 gold-font"></i>
                                  <span>Items with signs of wear or damage</span>
                                </div>
                                <div className="d-flex align-items-start mb-3" style={{ minHeight: '60px' }}>
                                  <i className="pe-7s-note me-2 mt-1 gold-font"></i>
                                  <span>Engraved items</span>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="d-flex align-items-start mb-3" style={{ minHeight: '60px' }}>
                                  <i className="pe-7s-note me-2 mt-1 gold-font"></i>
                                  <span>Items without original packaging and documentation</span>
                                </div>
                                <div className="d-flex align-items-start mb-3" style={{ minHeight: '60px' }}>
                                  <i className="pe-7s-note me-2 mt-1 gold-font"></i>
                                  <span>Earrings (for hygiene reasons)</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="gold-font mb-3">Return Process</h4>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="d-flex align-items-start mb-3" style={{ minHeight: '60px' }}>
                                  <span className="badge me-2 text-white fw-bold gold-bg" style={{ minWidth: '30px' }}>1</span>
                                  <span>Contact our customer service within 30 days of delivery</span>
                                </div>
                                <div className="d-flex align-items-start mb-3" style={{ minHeight: '60px' }}>
                                  <span className="badge me-2 text-white fw-bold gold-bg" style={{ minWidth: '30px' }}>2</span>
                                  <span>Receive a return authorization and shipping label</span>
                                </div>
                                <div className="d-flex align-items-start mb-3" style={{ minHeight: '60px' }}>
                                  <span className="badge me-2 text-white fw-bold gold-bg" style={{ minWidth: '30px' }}>3</span>
                                  <span>Pack items securely in original packaging</span>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="d-flex align-items-start mb-3" style={{ minHeight: '60px' }}>
                                  <span className="badge me-2 text-white fw-bold gold-bg" style={{ minWidth: '30px' }}>4</span>
                                  <span>Ship the items using the provided label</span>
                                </div>
                                <div className="d-flex align-items-start mb-3" style={{ minHeight: '60px' }}>
                                  <span className="badge me-2 text-white fw-bold gold-bg" style={{ minWidth: '30px' }}>5</span>
                                  <span>Receive refund within 5-7 business days of receipt</span>
                                </div>
                                <div className="d-flex align-items-start mb-3" style={{ minHeight: '60px' }}></div>
                              </div>
                            </div>
                          </div>

                          <div className="alert alert-light border">
                            <div className="d-flex align-items-start">
                              <i className="pe-7s-cash me-3 mt-1" style={{ fontSize: '1.5rem' }}></i>
                              <div>
                                <h4 className="alert-heading mb-2">Refund Method</h4>
                                <p className="mb-0">Refunds are issued to the original payment method. Shipping costs are non-refundable unless the return is due to our error.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card border-0 shadow-sm">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center mb-3">
                          <span className="badge gold-bg rounded-circle me-3 text-white fw-bold" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>6</span>
                          <h3 className="card-title mb-0 gold-font">Warranty and Repairs</h3>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                          <div className="alert alert-light border">
                            <div className="d-flex align-items-start">
                              <i className="pe-7s-medal me-3 mt-1" style={{ fontSize: '1.5rem' }}></i>
                              <div>
                                <h4 className="alert-heading mb-2">Product Warranty</h4>
                                <p className="mb-3">All our jewellery comes with a 1-year warranty covering manufacturing defects. This warranty does not cover:</p>
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="d-flex align-items-start mb-3" style={{ minHeight: '60px' }}>
                                      <i className="pe-7s-refresh-2 me-2 text-warning mt-1"></i>
                                      <span>Normal wear and tear</span>
                                    </div>
                                    <div className="d-flex align-items-start mb-3" style={{ minHeight: '60px' }}>
                                      <i className="pe-7s-tools me-2 text-danger mt-1"></i>
                                      <span>Damage from improper use or care</span>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="d-flex align-items-start mb-3" style={{ minHeight: '60px' }}>
                                      <i className="pe-7s-close-circle me-2 mt-1 gold-font"></i>
                                      <span>Lost or stolen items</span>
                                    </div>
                                    <div className="d-flex align-items-start mb-3" style={{ minHeight: '60px' }}>
                                      <i className="pe-7s-config me-2 text-warning mt-1"></i>
                                      <span>Damage from improper repairs</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="alert alert-light border">
                            <div className="d-flex align-items-start">
                              <i className="pe-7s-tools me-3 mt-1" style={{ fontSize: '1.5rem' }}></i>
                              <div>
                                <h4 className="alert-heading mb-2">Repair Services</h4>
                                <p className="mb-0">We offer professional repair services for all types of jewellery. Contact us for a free quote and consultation.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card border-0 shadow-sm">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center mb-3">
                          <span className="badge gold-bg rounded-circle me-3 text-white fw-bold" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>7</span>
                          <h3 className="card-title mb-0 gold-font">Intellectual Property</h3>
                        </div>
                        <div className="alert alert-light border">
                          <div className="d-flex align-items-start">
                            <i className="pe-7s-copyright me-3 mt-1 gold-font" style={{ fontSize: '1.5rem' }}></i>
                            <p className="mb-0">All content on this website, including but not limited to text, images, graphics, logos, and software, is the property of Jevoo Jewellery and is protected by copyright, trademark, and other intellectual property laws.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card border-0 shadow-sm">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center mb-3">
                          <span className="badge gold-bg rounded-circle me-3 text-white fw-bold" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>8</span>
                          <h3 className="card-title mb-0 gold-font">User Conduct</h3>
                        </div>
                        <p className="mb-3">You agree not to:</p>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="d-flex align-items-start mb-2">
                              <i className="pe-7s-close-circle me-2 mt-1 gold-font"></i>
                              <span>Use the website for any illegal or unauthorized purpose</span>
                            </div>
                            <div className="d-flex align-items-start mb-2">
                              <i className="pe-7s-note2 me-2 text-warning mt-1"></i>
                              <span>Reproduce, distribute, or modify website content without permission</span>
                            </div>
                            <div className="d-flex align-items-start mb-2">
                              <i className="pe-7s-lock me-2 text-danger mt-1"></i>
                              <span>Attempt to gain unauthorized access to our systems</span>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="d-flex align-items-start mb-2">
                              <i className="pe-7s-tools me-2 mt-1 gold-font"></i>
                              <span>Interfere with website functionality or security</span>
                            </div>
                            <div className="d-flex align-items-start mb-2">
                              <i className="pe-7s-attention me-2 mt-1 gold-font"></i>
                              <span>Post fraudulent or misleading information</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card border-0 shadow-sm">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center mb-3">
                          <span className="badge gold-bg rounded-circle me-3 text-white fw-bold" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>9</span>
                          <h3 className="card-title mb-0 gold-font">Privacy</h3>
                        </div>
                        <div className="alert alert-light border">
                          <div className="d-flex align-items-start">
                            <i className="pe-7s-lock me-3 mt-1" style={{ fontSize: '1.5rem' }}></i>
                            <p className="mb-0">Your privacy is important to us. Please review our <Link href="/privacy-policy" className="text-decoration-none">Privacy Policy</Link> to understand how we collect, use, and protect your information.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card border-0 shadow-sm">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center mb-3">
                          <span className="badge gold-bg rounded-circle me-3 text-white fw-bold" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>10</span>
                          <h3 className="card-title mb-0 gold-font">Limitation of Liability</h3>
                        </div>
                        <div className="alert alert-warning border">
                          <div className="d-flex align-items-start">
                            <i className="pe-7s-attention me-3 mt-1" style={{ fontSize: '1.5rem' }}></i>
                            <p className="mb-0">To the fullest extent permitted by law, Jevoo Jewellery shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or purchase of our products.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card border-0 shadow-sm">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center mb-3">
                          <span className="badge gold-bg rounded-circle me-3 text-white fw-bold" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>11</span>
                          <h3 className="card-title mb-0 gold-font">Indemnification</h3>
                        </div>
                        <div className="alert alert-light border">
                          <div className="d-flex align-items-start">
                            <i className="pe-7s-shield me-3 mt-1" style={{ fontSize: '1.5rem' }}></i>
                            <p className="mb-0">You agree to indemnify and hold Jevoo Jewellery harmless from any claims, damages, or expenses arising from your breach of these Terms & Conditions.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card border-0 shadow-sm">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center mb-3">
                          <span className="badge gold-bg rounded-circle me-3 text-white fw-bold" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>12</span>
                          <h3 className="card-title mb-0 gold-font">Governing Law</h3>
                        </div>
                        <div className="alert alert-light border">
                          <div className="d-flex align-items-start">
                            <i className="pe-7s-map-marker me-3 mt-1 gold-font" style={{ fontSize: '1.5rem' }}></i>
                            <p className="mb-0">These Terms & Conditions are governed by and construed in accordance with the laws of Hong Kong. Any disputes shall be resolved in the courts of Hong Kong.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card border-0 shadow-sm">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center mb-3">
                          <span className="badge gold-bg rounded-circle me-3 text-white fw-bold" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>13</span>
                          <h3 className="card-title mb-0 gold-font">Changes to Terms & Conditions</h3>
                        </div>
                        <div className="alert alert-light border">
                          <div className="d-flex align-items-start">
                            <i className="pe-7s-refresh-2 me-3 mt-1" style={{ fontSize: '1.5rem' }}></i>
                            <p className="mb-0">We reserve the right to update these Terms & Conditions at any time. Changes will be effective immediately upon posting on our website.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card border-0 shadow-sm">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center mb-3">
                          <span className="badge gold-bg rounded-circle me-3 text-white fw-bold" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>14</span>
                          <h3 className="card-title mb-0 gold-font">Contact Information</h3>
                        </div>
                        <div className="alert alert-light border">
                          <div className="d-flex align-items-start mb-4">
                            <i className="pe-7s-call me-3 mt-1" style={{ fontSize: '1.5rem' }}></i>
                            <h4 className="alert-heading mb-0">If you have any questions about these Terms & Conditions, please contact us:</h4>
                          </div>
                          <div className="row g-4">
                            <div className="col-md-6">
                              <div className="d-flex align-items-start">
                                <div className="me-3">
                                  <div className="rounded-circle gold-bg bg-opacity-10 gold-font d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                    <i className="pe-7s-mail text-white"></i>
                                  </div>
                                </div>
                                <div>
                                  <h6 className="mb-1 gold-font">Email</h6>
                                  <p className="mb-0">info@jevoo-jewellery.com</p>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="d-flex align-items-start">
                                <div className="me-3">
                                  <div className="rounded-circle gold-bg gold-font d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                    <i className="pe-7s-call text-white"></i>
                                  </div>
                                </div>
                                <div>
                                  <h6 className="mb-1 gold-font">Phone</h6>
                                  <p className="mb-0">(012) 800 456 789-987</p>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="d-flex align-items-start">
                                <div className="me-3">
                                  <div className="rounded-circle gold-bg gold-font d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                    <i className="pe-7s-home text-white"></i>
                                  </div>
                                </div>
                                <div>
                                  <h6 className="mb-1 gold-font">Address</h6>
                                  <p className="mb-0">4710-4890 Hong Kong</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-center mt-4 pt-3 border-top">
                            <p className="mb-0"><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* page wrapper end */}
      </main>

      <Footer />
    </>
  );
}