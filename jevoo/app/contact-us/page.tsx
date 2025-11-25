"use client";

import Link from "next/link";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SuccessModal from "../../components/ui/SuccessModal";
import { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Show success modal
      setIsSuccessModalOpen(true);

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

      // Set success message for the alert (optional, can be removed)
      setSubmitMessage('Your message has been sent successfully! We\'ll get back to you soon.');
      setMessageType('success');
    } catch (err) {
      setSubmitMessage('An error occurred. Please try again later.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    setSubmitMessage('');
    setMessageType('');
  };

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
                        Contact Us
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
              <div className="col-lg-11 offset-lg-1">
                <div className="page-content">
                  <h1 className="page-title text-center mb-4">Contact Us</h1>
                  <p className="page-subtitle text-center mb-5">We'd love to hear from you! Whether you have a question about our jewellery, need assistance with an order, or want to visit our showroom, we're here to help.</p>

                  <div className="row">
                    {/* Contact Information */}
                    <div className="col-lg-12">
                      <div className="contact-info card border-0 shadow-sm">
                        <div className="card-body p-4">
                          <div className="d-flex align-items-center mb-4">
                            <i className="pe-7s-headphones me-3 gold-font" style={{ fontSize: '2rem' }}></i>
                            <h3 className="section-title mb-0 gold-font">Get in Touch</h3>
                          </div>

                          <div className="row g-4 d-flex">
                            {/* Left Side - Store Location and Email */}
                            <div className="col-lg-6 d-flex flex-column">
                              <div className="d-flex flex-column gap-3 flex-grow-1">
                                <div className="contact-item p-3 border rounded flex-grow-1">
                                  <div className="d-flex align-items-start">
                                    <div className="contact-icon me-3">
                                      <div className="rounded-circle gold-bg d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                        <i className="pe-7s-home text-white"></i>
                                      </div>
                                    </div>
                                    <div className="contact-details">
                                      <h5 className="mb-2 gold-font">Store Location</h5>
                                      <p className="mb-0">4710-4890 Hong Kong<br />Central District<br />Hong Kong</p>
                                    </div>
                                  </div>
                                </div>

                                <div className="contact-item p-3 border rounded flex-grow-1">
                                  <div className="d-flex align-items-start">
                                    <div className="contact-icon me-3">
                                      <div className="rounded-circle gold-bg d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                        <i className="pe-7s-mail text-white"></i>
                                      </div>
                                    </div>
                                    <div className="contact-details">
                                      <h5 className="mb-2 gold-font">Email</h5>
                                      <p className="mb-0"><a href="mailto:info@jevoo-jewellery.com" className="text-decoration-none">info@jevoo-jewellery.com</a></p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Right Side - Phone and Store Hours */}
                            <div className="col-lg-6 d-flex flex-column">
                              <div className="d-flex flex-column gap-3 flex-grow-1">
                                <div className="contact-item p-3 border rounded flex-grow-1">
                                  <div className="d-flex align-items-start">
                                    <div className="contact-icon me-3">
                                      <div className="rounded-circle gold-bg d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                        <i className="pe-7s-call text-white"></i>
                                      </div>
                                    </div>
                                    <div className="contact-details">
                                      <h5 className="mb-2 gold-font">Phone</h5>
                                      <p className="mb-1"><a href="tel:(012)800456789987" className="text-decoration-none">(012) 800 456 789-987</a></p>
                                      <p className="mb-0 small">Monday - Saturday: 9:00 AM - 8:00 PM<br />Sunday: 10:00 AM - 6:00 PM</p>
                                    </div>
                                  </div>
                                </div>

                                <div className="contact-item p-3 border rounded flex-grow-1">
                                  <div className="d-flex align-items-start">
                                    <div className="contact-icon me-3">
                                      <div className="rounded-circle gold-bg d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                        <i className="pe-7s-clock text-white"></i>
                                      </div>
                                    </div>
                                    <div className="contact-details">
                                      <h5 className="mb-2 gold-font">Store Hours</h5>
                                      <p className="mb-0">Monday - Friday: 10:00 AM - 7:00 PM<br />Saturday: 10:00 AM - 6:00 PM<br />Sunday & Public Holidays: 11:00 AM - 5:00 PM</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Social Media - Full Width */}
                            <div className="col-12">
                              <div className="social-links p-3 border rounded" style={{ backgroundColor: '#FFF3CD' }}>
                                <h5 className="mb-3 gold-font">Follow Us</h5>
                                <div className="social-icons d-flex gap-3">
                                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon gold-bg btn btn-sm rounded-circle text-white" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <i className="fa fa-facebook"></i>
                                  </a>
                                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon gold-bg btn btn-sm rounded-circle text-white" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <i className="fa fa-instagram"></i>
                                  </a>
                                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon gold-bg btn btn-sm rounded-circle text-white" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <i className="fa fa-twitter"></i>
                                  </a>
                                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon gold-bg btn btn-sm rounded-circle text-white" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <i className="fa fa-youtube"></i>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Contact Form - Full Width */}
                    <div className="col-lg-12 mt-4">
                      <div className="contact-form-wrapper card border-0 shadow-sm">
                        <div className="card-body p-4">
                          <div className="d-flex align-items-center mb-4">
                            <i className="pe-7s-mail me-3 gold-font mb-2" style={{ fontSize: '2rem' }}></i>
                            <h3 className="section-title mb-0 gold-font">Send Us a Message</h3>
                          </div>

                        {submitMessage && (
                          <div className={`alert ${messageType === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">
                            {submitMessage}
                          </div>
                        )}

                        <form onSubmit={handleSubmit} className="contact-form">
                          <div className="row">
                            <div className="col-md-6 mb-4 d-flex flex-column">
                              <label htmlFor="name" className="form-label gold-font">Name *</label>
                              <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                disabled={isLoading}
                              />
                            </div>
                            <div className="col-md-6 mb-4 d-flex flex-column">
                              <label htmlFor="email" className="form-label gold-font">Email *</label>
                              <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                disabled={isLoading}
                              />
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6 mb-4 d-flex flex-column">
                              <label htmlFor="phone" className="form-label gold-font">Phone</label>
                              <input
                                type="tel"
                                className="form-control"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                disabled={isLoading}
                              />
                            </div>
                            <div className="col-md-6 mb-4 d-flex flex-column">
                              <label htmlFor="subject" className="form-label gold-font">Subject *</label>
                              <select
                                className="form-control"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                disabled={isLoading}
                                style={{ width: 'auto' }}
                              >
                                <option value="">Select a subject</option>
                                <option value="general">General Inquiry</option>
                                <option value="product">Product Question</option>
                                <option value="order">Order Status</option>
                                <option value="return">Return & Exchange</option>
                                <option value="custom">Custom Jewellery</option>
                                <option value="repair">Jewellery Repair</option>
                                <option value="wholesale">Wholesale Inquiry</option>
                                <option value="other">Other</option>
                              </select>
                            </div>
                          </div>

                          <div className="mb-4 d-flex flex-column">
                            <label htmlFor="message" className="form-label gold-font">Message *</label>
                            <textarea
                              className="form-control"
                              id="message"
                              name="message"
                              rows={6}
                              value={formData.message}
                              onChange={handleChange}
                              required
                              disabled={isLoading}
                              placeholder="Please provide as much detail as possible so we can better assist you..."
                            ></textarea>
                          </div>

                          <div className="text-center">
                            <button
                              type="submit"
                              className="btn btn-cart btn-lg"
                              disabled={isLoading}
                            >
                              {isLoading ? 'Sending...' : 'Send Message'}
                            </button>
                          </div>
                        </form>
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

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleCloseSuccessModal}
        message="Your message has been sent successfully! We'll get back to you soon."
      />
    </>
  );
}