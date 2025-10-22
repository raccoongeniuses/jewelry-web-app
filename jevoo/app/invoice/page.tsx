'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import jsPDF from 'jspdf';

interface OrderData {
  orderId: string;
  orderDate: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  billingAddress: {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    country: string;
    address: string;
    address2: string;
    city: string;
    state: string;
    postcode: string;
    phone: string;
  };
  shippingAddress?: {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    country: string;
    address: string;
    address2: string;
    city: string;
    state: string;
    postcode: string;
    phone: string;
  };
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    brand?: string;
    colors?: string[];
    selectedSize?: string;
    selectedColor?: string;
  }>;
  subtotal: number;
  shippingCost: number;
  total: number;
  paymentMethod: string;
  shippingMethod: string;
  orderNote?: string;
}

function InvoiceContent() {
  const searchParams = useSearchParams();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get order data from URL parameters or sessionStorage
    const orderJson = searchParams.get('order');
    const sessionOrder = sessionStorage.getItem('lastOrder');

    try {
      const data: OrderData = orderJson ? JSON.parse(decodeURIComponent(orderJson)) :
                               sessionOrder ? JSON.parse(sessionOrder) : null;
      setOrderData(data);
    } catch (error) {
      console.error('Error parsing order data:', error);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if (!orderData) return;

    // Initialize PDF
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    let yPosition = 20;

    // Helper function to add text
    const addText = (text: string, x: number, y: number, fontSize: number = 12, isBold: boolean = false) => {
      pdf.setFontSize(fontSize);
      pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
      pdf.text(text, x, y);
      return y + (fontSize * 0.5);
    };

    // Header Section
    yPosition = addText('INVOICE', pageWidth / 2, yPosition, 24, true);
    yPosition = addText('JEVOO JEWELRY', pageWidth / 2, yPosition, 16, true);
    yPosition = addText('Premium Jewelry Collection', pageWidth / 2, yPosition, 10);
    yPosition = addText('support@jevoo.com | +1 234 567 8900', pageWidth / 2, yPosition, 9);
    yPosition += 10;

    // Line separator
    pdf.setDrawColor(200, 200, 200);
    pdf.line(20, yPosition, pageWidth - 20, yPosition);
    yPosition += 10;

    // Order Details
    yPosition = addText('Order ID: #' + orderData.orderId, 20, yPosition, 12, true);
    yPosition = addText('Order Date: ' + orderData.orderDate, 20, yPosition, 11);
    yPosition = addText('Status: Processing', 20, yPosition, 11);
    yPosition += 10;

    // Customer Information Section
    yPosition = addText('CUSTOMER INFORMATION', 20, yPosition, 14, true);
    yPosition = addText('Name: ' + orderData.customerName, 20, yPosition, 11);
    yPosition = addText('Email: ' + orderData.customerEmail, 20, yPosition, 11);
    yPosition = addText('Phone: ' + orderData.customerPhone, 20, yPosition, 11);
    yPosition += 10;

    // Billing Address
    yPosition = addText('BILLING ADDRESS', 20, yPosition, 14, true);
    yPosition = addText(orderData.billingAddress.firstName + ' ' + orderData.billingAddress.lastName, 20, yPosition, 11);
    if (orderData.billingAddress.company) {
      yPosition = addText(orderData.billingAddress.company, 20, yPosition, 10);
    }
    yPosition = addText(orderData.billingAddress.address, 20, yPosition, 11);
    if (orderData.billingAddress.address2) {
      yPosition = addText(orderData.billingAddress.address2, 20, yPosition, 11);
    }
    yPosition = addText(`${orderData.billingAddress.city}, ${orderData.billingAddress.state} ${orderData.billingAddress.postcode}`, 20, yPosition, 11);
    yPosition = addText(orderData.billingAddress.country, 20, yPosition, 11);
    yPosition += 10;

    // Shipping Address (if different)
    if (orderData.shippingAddress) {
      yPosition = addText('SHIPPING ADDRESS', 20, yPosition, 14, true);
      yPosition = addText(orderData.shippingAddress.firstName + ' ' + orderData.shippingAddress.lastName, 20, yPosition, 11);
      if (orderData.shippingAddress.company) {
        yPosition = addText(orderData.shippingAddress.company, 20, yPosition, 10);
      }
      yPosition = addText(orderData.shippingAddress.address, 20, yPosition, 11);
      if (orderData.shippingAddress.address2) {
        yPosition = addText(orderData.shippingAddress.address2, 20, yPosition, 11);
      }
      yPosition = addText(`${orderData.shippingAddress.city}, ${orderData.shippingAddress.state} ${orderData.shippingAddress.postcode}`, 20, yPosition, 11);
      yPosition = addText(orderData.shippingAddress.country, 20, yPosition, 11);
      yPosition += 10;
    }

    // Order Items Header
    yPosition = addText('ORDER ITEMS', 20, yPosition, 14, true);

    // Table Headers
    pdf.setFillColor(245, 245, 245);
    pdf.rect(20, yPosition, pageWidth - 40, 10, 'F');
    yPosition += 7;
    addText('Product', 25, yPosition, 10, true);
    addText('Price', 100, yPosition, 10, true);
    addText('Qty', 130, yPosition, 10, true);
    addText('Total', 160, yPosition, 10, true);
    yPosition += 8;

    // Order Items
    orderData.items.forEach((item) => {
      const itemName = item.name.length > 30 ? item.name.substring(0, 30) + '...' : item.name;
      addText(itemName, 25, yPosition, 9);
      addText('$' + item.price.toFixed(2), 100, yPosition, 9);
      addText(item.quantity.toString(), 130, yPosition, 9);
      addText('$' + (item.price * item.quantity).toFixed(2), 160, yPosition, 9);
      yPosition += 6;
    });

    // Line separator
    yPosition += 5;
    pdf.setDrawColor(200, 200, 200);
    pdf.line(20, yPosition, pageWidth - 20, yPosition);
    yPosition += 10;

    // Payment Summary
    yPosition = addText('PAYMENT SUMMARY', 20, yPosition, 14, true);
    yPosition = addText('Subtotal: $' + orderData.subtotal.toFixed(2), 20, yPosition, 11);
    yPosition = addText('Shipping: $' + orderData.shippingCost.toFixed(2), 20, yPosition, 11);
    yPosition = addText('Total: $' + orderData.total.toFixed(2), 20, yPosition, 12, true);
    yPosition += 10;

    // Payment Details
    yPosition = addText('Payment Method: ' + orderData.paymentMethod, 20, yPosition, 11);
    yPosition = addText('Shipping Method: ' + orderData.shippingMethod, 20, yPosition, 11);
    yPosition += 10;

    // Order Note (if exists)
    if (orderData.orderNote) {
      yPosition = addText('Order Note: ' + orderData.orderNote, 20, yPosition, 10);
      yPosition += 10;
    }

    // Footer
    yPosition += 10;
    pdf.setDrawColor(200, 200, 200);
    pdf.line(20, yPosition, pageWidth - 20, yPosition);
    yPosition += 10;

    yPosition = addText('Thank you for your order!', 20, yPosition, 12, true);
    yPosition = addText('We appreciate your business. Your order has been received and is being processed.', 20, yPosition, 10);
    yPosition = addText('Contact us: support@jevoo.com | Phone: +1 234 567 8900 | www.jevoo.com', 20, yPosition, 9);

    // Save the PDF
    pdf.save(`JEVOO-Invoice-${orderData.orderId}.pdf`);
  };

  if (loading) {
    return (
      <div className="invoice-wrapper">
        <div className="container text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading your invoice...</p>
        </div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="invoice-wrapper">
        <div className="container text-center py-5">
          <div className="alert alert-warning">
            <h4>Order Not Found</h4>
            <p>We couldn&apos;t find the order details for this invoice.</p>
            <Link href="/" className="btn btn-primary">Return to Shop</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="invoice-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {/* Invoice Action Buttons */}
            <div className="invoice-actions text-end mb-4 no-print">
              <button onClick={handlePrint} className="btn btn-outline-primary me-2">
                <i className="fa fa-print me-2"></i>Print Invoice
              </button>
              <button onClick={handleDownload} className="btn btn-outline-success">
                <i className="fa fa-download me-2"></i>Download Invoice
              </button>
            </div>

            {/* Invoice Container */}
            <div className="invoice-container bg-white p-5 shadow">
              {/* Invoice Header */}
              <div className="invoice-header border-bottom pb-4 mb-4">
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <h2 className="invoice-title mb-3">INVOICE</h2>
                    <div className="invoice-meta">
                      <p className="mb-1"><strong>Order ID:</strong> #{orderData.orderId}</p>
                      <p className="mb-1"><strong>Order Date:</strong> {orderData.orderDate}</p>
                      <p className="mb-0"><strong>Status:</strong> <span className="badge bg-success">Processing</span></p>
                    </div>
                  </div>
                  <div className="col-md-6 text-md-end">
                    <h3 className="brand-name text-primary mb-2">JEVOO JEWELRY</h3>
                    <p className="text-muted mb-1">Premium Jewelry Collection</p>
                    <p className="text-muted mb-0">support@jevoo.com | +1 234 567 8900</p>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="customer-info mb-4">
                <div className="row">
                  <div className="col-md-6">
                    <h5 className="mb-3">Billing Information</h5>
                    <div className="address-info">
                      <p className="mb-1"><strong>{orderData.billingAddress.firstName} {orderData.billingAddress.lastName}</strong></p>
                      {orderData.billingAddress.company && <p className="mb-1">{orderData.billingAddress.company}</p>}
                      <p className="mb-1">{orderData.billingAddress.address}</p>
                      {orderData.billingAddress.address2 && <p className="mb-1">{orderData.billingAddress.address2}</p>}
                      <p className="mb-1">
                        {orderData.billingAddress.city}, {orderData.billingAddress.state} {orderData.billingAddress.postcode}
                      </p>
                      <p className="mb-1">{orderData.billingAddress.country}</p>
                      <p className="mb-1">{orderData.billingAddress.email}</p>
                      <p className="mb-0">{orderData.billingAddress.phone}</p>
                    </div>
                  </div>

                  {orderData.shippingAddress && (
                    <div className="col-md-6">
                      <h5 className="mb-3">Shipping Information</h5>
                      <div className="address-info">
                        <p className="mb-1"><strong>{orderData.shippingAddress.firstName} {orderData.shippingAddress.lastName}</strong></p>
                        {orderData.shippingAddress.company && <p className="mb-1">{orderData.shippingAddress.company}</p>}
                        <p className="mb-1">{orderData.shippingAddress.address}</p>
                        {orderData.shippingAddress.address2 && <p className="mb-1">{orderData.shippingAddress.address2}</p>}
                        <p className="mb-1">
                          {orderData.shippingAddress.city}, {orderData.shippingAddress.state} {orderData.shippingAddress.postcode}
                        </p>
                        <p className="mb-1">{orderData.shippingAddress.country}</p>
                        <p className="mb-1">{orderData.shippingAddress.email}</p>
                        <p className="mb-0">{orderData.shippingAddress.phone}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Items Table */}
              <div className="order-items mb-4">
                <h5 className="mb-3">Order Items</h5>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead className="table-light">
                      <tr>
                        <th className="text-center">Product</th>
                        <th className="text-center">Unit Price</th>
                        <th className="text-center">Quantity</th>
                        <th className="text-center">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderData.items.map((item) => {
                        // Create unique key using id, size, and color
                        const uniqueKey = `${item.id}-${item.selectedSize || 'default'}-${item.selectedColor || 'default'}`;
                        return (
                          <tr key={uniqueKey}>
                          <td className="text-center align-middle">
                            <div className="d-flex align-items-center justify-content-center">
                              <div className="product-image me-3">
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  width={60}
                                  height={60}
                                  className="img-fluid rounded"
                                />
                              </div>
                              <div className="text-center">
                                <h6 className="mb-0">{item.name}</h6>
                                {item.brand && <small className="text-muted">Brand: {item.brand}</small>}
                                {item.colors && item.colors.length > 0 && (
                                  <small className="text-muted d-block">Color: {item.colors[0]}</small>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="text-center align-middle">${item.price.toFixed(2)}</td>
                          <td className="text-center align-middle">{item.quantity}</td>
                          <td className="text-center align-middle"><strong>${(item.price * item.quantity).toFixed(2)}</strong></td>
                        </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr className="table-light">
                        <td colSpan={3} className="text-end"><strong>Subtotal</strong></td>
                        <td className="text-end"><strong>${orderData.subtotal.toFixed(2)}</strong></td>
                      </tr>
                      <tr className="table-light">
                        <td colSpan={3} className="text-end"><strong>Shipping</strong></td>
                        <td className="text-end"><strong>${orderData.shippingCost.toFixed(2)}</strong></td>
                      </tr>
                      <tr className="table-dark">
                        <td colSpan={3} className="text-end"><strong>Total</strong></td>
                        <td className="text-end"><strong>${orderData.total.toFixed(2)}</strong></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Payment & Shipping Details */}
              <div className="payment-shipping-info mb-4">
                <div className="row">
                  <div className="col-md-6">
                    <h5 className="mb-3">Payment Information</h5>
                    <p className="mb-1"><strong>Payment Method:</strong> {orderData.paymentMethod}</p>
                    <p className="mb-0"><strong>Payment Status:</strong> <span className="badge bg-warning">Pending</span></p>
                  </div>
                  <div className="col-md-6">
                    <h5 className="mb-3">Shipping Information</h5>
                    <p className="mb-1"><strong>Shipping Method:</strong> {orderData.shippingMethod}</p>
                    <p className="mb-0"><strong>Delivery Status:</strong> <span className="badge bg-info">Processing</span></p>
                  </div>
                </div>
              </div>

              {/* Order Note */}
              {orderData.orderNote && (
                <div className="order-note mb-4">
                  <h5 className="mb-3">Order Note</h5>
                  <p className="mb-0">{orderData.orderNote}</p>
                </div>
              )}

              {/* Invoice Footer */}
              <div className="invoice-footer border-top pt-4">
                <div className="row">
                  <div className="col-md-6">
                    <h6 className="mb-3">Thank You!</h6>
                    <p className="text-muted">We appreciate your business. Your order has been received and is being processed. You will receive an email confirmation shortly.</p>
                  </div>
                  <div className="col-md-6 text-md-end">
                    <h6 className="mb-3">Contact Us</h6>
                    <p className="text-muted mb-1">Email: support@jevoo.com</p>
                    <p className="text-muted mb-1">Phone: +1 234 567 8900</p>
                    <p className="text-muted mb-0">Website: www.jevoo.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Back to Shop Button */}
            <div className="text-center mt-4 no-print">
              <Link href="/" className="btn btn-primary btn-lg">
                <i className="fa fa-arrow-left me-2"></i>Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .invoice-wrapper {
          background-color: #f8f9fa;
          padding: 40px 0;
          min-height: 100vh;
        }

        .invoice-container {
          border-radius: 8px;
        }

        .invoice-title {
          color: #c29958;
          font-weight: 700;
          margin-bottom: 0;
        }

        .brand-name {
          font-weight: 700;
        }

        .table th {
          background-color: #f8f9fa;
          border-top: none;
          font-weight: 600;
        }

        .product-image img {
          object-fit: cover;
          border: 1px solid #e9ecef;
        }

        @media print {
          body {
            background-color: white;
          }

          .invoice-wrapper {
            padding: 0;
            background-color: white;
          }

          .no-print {
            display: none !important;
          }

          .invoice-container {
            box-shadow: none;
            border: 1px solid #dee2e6;
          }
        }
      `}</style>
    </div>
  );
}

export default function InvoicePage() {
  return (
    <Suspense fallback={
      <div className="invoice-wrapper">
        <div className="container text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading your invoice...</p>
        </div>
      </div>
    }>
      <InvoiceContent />
    </Suspense>
  );
}