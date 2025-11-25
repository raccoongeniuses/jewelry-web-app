import Link from "next/link";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function PrivacyPolicy() {
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
                        Privacy Policy
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
                  <h1 className="page-title text-center mb-4 gold-font">Privacy Policy</h1>
                  <div className="entry-content" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    <p><strong>Effective Date:</strong> {new Date().toLocaleDateString()}</p>
                    <p>At Jevoo Jewellery, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you visit our website or make a purchase.</p>

                    <div className="card border-0 shadow-sm">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center mb-3">
                          <span className="badge gold-bg rounded-circle me-3 text-white fw-bold" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>1</span>
                          <h3 className="card-title mb-0 gold-font">Information We Collect</h3>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                          <div>
                            <h4 className="mb-3 gold-font">Personal Information</h4>
                            <div className="alert alert-light border">
                              <div className="d-flex align-items-start">
                                <i className="pe-7s-user me-3 mt-1 gold-font" style={{ fontSize: '1.5rem' }}></i>
                                <div>
                                  <p className="mb-2">We collect personal information such as:</p>
                                  <ul className="list-unstyled mb-0" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <li className="d-flex align-items-start">
                                      <i className="pe-7s-check me-2 gold-font"></i>
                                      <span>Name and contact details (email address, phone number, shipping address)</span>
                                    </li>
                                    <li className="d-flex align-items-start">
                                      <i className="pe-7s-check me-2 gold-font"></i>
                                      <span>Payment information (processed securely through our payment partners)</span>
                                    </li>
                                    <li className="d-flex align-items-start">
                                      <i className="pe-7s-check me-2 gold-font"></i>
                                      <span>Account credentials (username, password)</span>
                                    </li>
                                    <li className="d-flex align-items-start">
                                      <i className="pe-7s-check me-2 gold-font"></i>
                                      <span>Communication preferences</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="mb-3 gold-font">Technical Information</h4>
                            <div className="alert alert-light border">
                              <div className="d-flex align-items-start">
                                <i className="pe-7s-key me-3 mt-1 gold-font" style={{ fontSize: '1.5rem' }}></i>
                                <div>
                                  <p className="mb-2">We automatically collect technical data including:</p>
                                  <ul className="list-unstyled mb-0" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <li className="d-flex align-items-start">
                                      <i className="pe-7s-server me-2 gold-font"></i>
                                      <span>IP address and browser type</span>
                                    </li>
                                    <li className="d-flex align-items-start">
                                      <i className="pe-7s-monitor me-2 gold-font"></i>
                                      <span>Device information and operating system</span>
                                    </li>
                                    <li className="d-flex align-items-start">
                                      <i className="pe-7s-server me-2 gold-font"></i>
                                      <span>Cookies and similar tracking technologies</span>
                                    </li>
                                    <li className="d-flex align-items-start">
                                      <i className="pe-7s-mouse me-2 gold-font"></i>
                                      <span>Browsing behavior and interaction with our website</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card border-0 shadow-sm">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center mb-3">
                          <span className="badge gold-bg rounded-circle me-3 text-white fw-bold" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>2</span>
                          <h3 className="card-title mb-0 gold-font">How We Use Your Information</h3>
                        </div>

                        <div className="alert alert-light border">
                          <div className="d-flex align-items-start">
                            <i className="pe-7s-settings me-3 mt-1 gold-font" style={{ fontSize: '1.5rem' }}></i>
                            <div>
                              <p className="mb-3">We use your information to provide you with the best possible service:</p>
                              <div className="row">
                                <div className="col-md-6">
                                  <ul className="list-unstyled" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginLeft: '0', paddingLeft: '0' }}>
                                    <li className="d-flex align-items-start">
                                      <i className="pe-7s-cart me-2 gold-font"></i>
                                      <span>Process and fulfill your orders</span>
                                    </li>
                                    <li className="d-flex align-items-start">
                                      <i className="pe-7s-headphones me-2 gold-font"></i>
                                      <span>Provide customer support and assistance</span>
                                    </li>
                                    <li className="d-flex align-items-start">
                                      <i className="pe-7s-mail me-2 gold-font"></i>
                                      <span>Send order confirmations and shipping notifications</span>
                                    </li>
                                    <li className="d-flex align-items-start">
                                      <i className="pe-7s-user me-2 gold-font"></i>
                                      <span>Personalize your shopping experience</span>
                                    </li>
                                  </ul>
                                </div>
                                <div className="col-md-6">
                                  <ul className="list-unstyled" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginLeft: '0', paddingLeft: '0' }}>
                                    <li className="d-flex align-items-start">
                                      <i className="pe-7s-check me-2 gold-font"></i>
                                      <span>Send marketing communications (with your consent)</span>
                                    </li>
                                    <li className="d-flex align-items-start">
                                      <i className="pe-7s-check me-2 gold-font"></i>
                                      <span>Improve our website and services</span>
                                    </li>
                                    <li className="d-flex align-items-start">
                                      <i className="pe-7s-check me-2 gold-font"></i>
                                      <span>Prevent fraud and ensure security</span>
                                    </li>
                                  </ul>
                                </div>
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
                          <h3 className="card-title mb-0 gold-font">Information Sharing</h3>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                          <div className="alert alert-light border">
                            <div className="d-flex">
                              <i className="pe-7s-share me-3 mt-1 gold-font" style={{ fontSize: '1.5rem' }}></i>
                              <div>
                                <p className="mb-3">We may share your information with trusted partners:</p>
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="card mb-3 border-gold" style={{ height: '110px' }}>
                                      <div className="card-body p-3 d-flex flex-column">
                                        <div className="d-flex align-items-center mb-2">
                                          <i className="pe-7s-credit me-2 gold-font"></i>
                                          <h5 className="card-title mb-0 gold-font">Payment Processors</h5>
                                        </div>
                                        <p className="card-text mb-0 mt-auto">To process your payments securely</p>
                                      </div>
                                    </div>
                                    <div className="card mb-3 border-gold" style={{ height: '110px' }}>
                                      <div className="card-body p-3 d-flex flex-column">
                                        <div className="d-flex align-items-center mb-2">
                                          <i className="pe-7s-box2 me-2 gold-font"></i>
                                          <h5 className="card-title mb-0 gold-font">Shipping Partners</h5>
                                        </div>
                                        <p className="card-text mb-0 mt-auto">To deliver your orders</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="card mb-3 border-gold" style={{ height: '110px' }}>
                                      <div className="card-body p-3 d-flex flex-column">
                                        <div className="d-flex align-items-center mb-2">
                                          <i className="pe-7s-config me-2 gold-font"></i>
                                          <h5 className="card-title mb-0 gold-font">Service Providers</h5>
                                        </div>
                                        <p className="card-text mb-0 mt-auto">For website hosting, analytics, and customer support</p>
                                      </div>
                                    </div>
                                    <div className="card mb-3 border-gold" style={{ height: '110px' }}>
                                      <div className="card-body p-3 d-flex flex-column">
                                        <div className="d-flex align-items-center mb-2">
                                          <i className="pe-7s-note2 me-2 gold-font"></i>
                                          <h5 className="card-title mb-0 gold-font">Legal Authorities</h5>
                                        </div>
                                        <p className="card-text mb-0 mt-auto">When required by law or to protect our rights</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="alert" style={{ backgroundColor: '#FCFCDF', borderColor: '#FCFCDF', color: '#333' }}>
                            <div className="d-flex align-items-center">
                              <i className="pe-7s-info me-2" style={{ color: '#007bff' }}></i>
                              <div>
                                <strong>Important:</strong> We never sell your personal information to third parties.
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
                          <h3 className="card-title mb-0 gold-font">Data Security</h3>
                        </div>

                        <div className="alert alert-light border">
                          <div className="d-flex align-items-start">
                            <i className="pe-7s-shield me-3 mt-1 gold-font" style={{ fontSize: '1.5rem' }}></i>
                            <div>
                              <p className="mb-3">We implement comprehensive security measures to protect your information:</p>
                              <div className="row">
                                <div className="col-md-6">
                                  <ul className="list-unstyled" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginLeft: '0', paddingLeft: '0' }}>
                                    <li className="d-flex align-items-start">
                                      <i className="pe-7s-lock me-2 gold-font"></i>
                                      <span>SSL encryption for all data transmissions</span>
                                    </li>
                                    <li className="d-flex align-items-start">
                                      <i className="pe-7s-credit me-2 gold-font"></i>
                                      <span>Secure payment processing through PCI-compliant partners</span>
                                    </li>
                                  </ul>
                                </div>
                                <div className="col-md-6">
                                  <ul className="list-unstyled" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginLeft: '0', paddingLeft: '0' }}>
                                    <li className="d-flex align-items-start">
                                      <i className="pe-7s-refresh-2 me-2 gold-font"></i>
                                      <span>Regular security audits and updates</span>
                                    </li>
                                    <li className="d-flex align-items-start">
                                      <i className="pe-7s-users me-2 gold-font"></i>
                                      <span>Limited employee access to personal data</span>
                                    </li>
                                  </ul>
                                </div>
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
                          <h3 className="card-title mb-0 gold-font">Your Rights</h3>
                        </div>

                        <div className="alert alert-light border">
                          <div className="d-flex align-items-start">
                            <i className="pe-7s-key me-3 mt-1 gold-font" style={{ fontSize: '1.5rem' }}></i>
                            <div className="flex-grow-1">
                              <p className="mb-3">You have the right to:</p>
                              <div className="row">
                                <div className="col-md-6">
                                  <ul className="list-unstyled" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginLeft: '0', paddingLeft: '0' }}>
                                    <li className="d-flex align-items-start">
                                      <i className="pe-7s-look me-2 gold-font"></i>
                                      <span>Access your personal information</span>
                                    </li>
                                    <li className="d-flex align-items-start">
                                      <i className="pe-7s-pen me-2 gold-font"></i>
                                      <span>Correct inaccurate information</span>
                                    </li>
                                  </ul>
                                </div>
                                <div className="col-md-6">
                                  <ul className="list-unstyled" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginLeft: '0', paddingLeft: '0' }}>
                                    <li className="d-flex align-items-start" >
                                      <i className="pe-7s-trash me-2 gold-font"></i>
                                      <span>Request deletion of your data</span>
                                    </li>
                                    <li className="d-flex align-items-start">
                                      <i className="pe-7s-close-circle me-2 gold-font"></i>
                                      <span>Opt-out of marketing communications</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="row mt-3">
                                <div className="col-md-6">
                                  <ul className="list-unstyled" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginLeft: '0', paddingLeft: '0' }}>
                                    <li className="d-flex align-items-start">
                                      <i className="pe-7s-close-circle me-2 gold-font"></i>
                                      <span>Restrict processing of your information</span>
                                    </li>
                                  </ul>
                                </div>
                                <div className="col-md-6">
                                  <ul className="list-unstyled" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginLeft: '0', paddingLeft: '0' }}>
                                    <li className="d-flex align-items-start">
                                      <i className="pe-7s-download me-2 gold-font"></i>
                                      <span>Data portability</span>
                                    </li>
                                  </ul>
                                </div>
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
                          <h3 className="card-title mb-0 gold-font">Cookies and Tracking</h3>
                        </div>

                        <div className="alert alert-light border">
                          <div className="d-flex align-items-start">
                            <i className="pe-7s-key me-3 mt-1 gold-font" style={{ fontSize: '1.5rem' }}></i>
                            <div className="flex-grow-1">
                              <p className="mb-3">We use cookies to enhance your experience by:</p>
                              <div className="row">
                                <div className="col-md-6">
                                  <ul className="list-unstyled" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginLeft: '0', paddingLeft: '0' }}>
                                    <li className="d-flex align-items-start">
                                      <i className="pe-7s-settings me-2 gold-font"></i>
                                      <span>Remembering your preferences</span>
                                    </li>
                                    <li className="d-flex align-items-start">
                                      <i className="pe-7s-cart me-2 gold-font"></i>
                                      <span>Maintaining shopping cart contents</span>
                                    </li>
                                  </ul>
                                </div>
                                <div className="col-md-6">
                                  <ul className="list-unstyled" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginLeft: '0', paddingLeft: '0' }}>
                                    <li className="d-flex align-items-start">
                                      <i className="pe-7s-graph1 me-2 gold-font"></i>
                                      <span>Analyzing website traffic and usage</span>
                                    </li>
                                    <li className="d-flex align-items-start">
                                      <i className="pe-7s-settings me-2 gold-font "></i>
                                      <span>Personalizing content and offers</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <p className="mb-0 mt-3">You can control cookie settings through your browser preferences.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card border-0 shadow-sm">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center mb-3">
                          <span className="badge gold-bg rounded-circle me-3 text-white fw-bold" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>7</span>
                          <h3 className="card-title mb-0 gold-font">Contact Information</h3>
                        </div>

                        <div className="alert alert-light border">
                          <div className="d-flex align-items-start mb-4">
                            <i className="pe-7s-call me-3 mt-1 gold-font" style={{ fontSize: '1.5rem' }}></i>
                            <h4 className="alert-heading mb-0 gold-font">If you have any questions about this Privacy Policy, please contact us:</h4>
                          </div>
                          <div className="row g-4">
                            <div className="col-md-6">
                              <div className="d-flex align-items-start">
                                <div className="me-3">
                                  <div className="rounded-circle gold-bg d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
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
                                  <div className="rounded-circle gold-bg d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
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
                                  <div className="rounded-circle gold-bg d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
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