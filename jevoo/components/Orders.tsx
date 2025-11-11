'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Pagination from './Pagination';

interface OrderItem {
  id: string;
  product: string;
  quantity: number;
  price: number;
  itemTotal: number;
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  subtotal: number;
  shippingCost: number;
  tax: number;
  discount: number;
  total: number;
  createdAt: string;
  orderItems: {
    docs: OrderItem[];
  };
}

interface OrdersResponse {
  docs: Order[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalDocs: number;
  totalPages: number;
  page: number;
  limit: number;
}

interface OrderNumberDisplayProps {
  orderNumber: string;
  orderId: string;
  onCopy: (text: string, orderId: string) => void;
  copiedOrderId: string | null;
}

function OrderNumberDisplay({ orderNumber, orderId, onCopy, copiedOrderId }: OrderNumberDisplayProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="order-number-container">
      <span
        className="order-number-text"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        title={orderNumber}
      >
        <strong>{orderNumber}</strong>
      </span>
      <i
        className={`fa ${copiedOrderId === orderId ? 'fa-check' : 'fa-copy'} copy-icon ${copiedOrderId === orderId ? 'copied' : ''}`}
        onClick={() => onCopy(orderNumber, orderId)}
        title={copiedOrderId === orderId ? 'Copied!' : 'Copy order number'}
      />
      {showTooltip && (
        <div
          className="order-tooltip show"
          style={{
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginTop: '4px'
          }}
        >
          {orderNumber}
        </div>
      )}
    </div>
  );
}

export default function Orders() {
  const { getValidToken } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedOrderId, setCopiedOrderId] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalDocs: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const ORDERS_PER_PAGE = 10;

  useEffect(() => {
    fetchOrders();
  }, [pagination.currentPage]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = getValidToken();

      if (!token) {
        throw new Error('No authentication token available');
      }

      const params = new URLSearchParams({
        page: pagination.currentPage.toString(),
        limit: ORDERS_PER_PAGE.toString(),
      });

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/orders?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorMessage = `Failed to fetch orders (${response.status}: ${response.statusText})`;
        console.error('Orders API Error:', {
          status: response.status,
          statusText: response.statusText,
          url: response.url
        });
        throw new Error(errorMessage);
      }

      const data: OrdersResponse = await response.json();
      setOrders(data.docs);
      setPagination({
        currentPage: data.page,
        totalPages: data.totalPages,
        totalDocs: data.totalDocs,
        hasNextPage: data.hasNextPage,
        hasPrevPage: data.hasPrevPage,
      });
    } catch (err) {
      console.error('Fetch orders error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string, orderId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedOrderId(orderId);
      setTimeout(() => setCopiedOrderId(null), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handlePageChange = (page: number) => {
    setPagination(prev => ({
      ...prev,
      currentPage: page
    }));
  };

  if (loading) {
    return (
      <div className="tab-pane fade show active" id="orders" role="tabpanel">
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  // Custom styles for order number display
  const styles = `
    .order-number-container {
      display: flex;
      align-items: center;
      gap: 8px;
      max-width: 140px;
    }

    .order-number-text {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      min-width: 0;
      flex: 1;
      cursor: pointer;
    }

    .copy-icon {
      cursor: pointer;
      color: #6c757d;
      font-size: 14px;
      transition: color 0.2s;
      flex-shrink: 0;
    }

    .copy-icon:hover {
      color: #007bff;
    }

    .copy-icon.copied {
      color: #28a745;
    }

    .order-tooltip {
      position: absolute;
      background: #333;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      white-space: nowrap;
      z-index: 1000;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.2s;
    }

    .order-tooltip.show {
      opacity: 1;
    }
  `;

  if (error) {
    return (
      <div className="tab-pane fade show active" id="orders" role="tabpanel">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="tab-pane fade show active" id="orders" role="tabpanel">
        <div className="text-center py-5">
          <h4>No Orders Found</h4>
          <p className="text-muted">You haven't placed any orders yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tab-pane fade show active" id="orders" role="tabpanel">
      <style>{styles}</style>
      <div className="myaccount-content">
        <h3>Orders</h3>

        {pagination.totalDocs > 0 && (
          <div className="mb-3 text-muted">
            Showing {orders.length} of {pagination.totalDocs} orders
          </div>
        )}

        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th className="align-middle">Date</th>
                <th className="align-middle">Order No.</th>
                <th className="align-middle">Status</th>
                <th className="align-middle">Subtotal</th>
                <th className="align-middle">Shipping Cost</th>
                <th className="align-middle">Tax</th>
                <th className="align-middle">Discount</th>
                <th className="align-middle">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>
                    <OrderNumberDisplay
                      orderNumber={order.orderNumber}
                      orderId={order.id}
                      onCopy={copyToClipboard}
                      copiedOrderId={copiedOrderId}
                    />
                  </td>
                  <td>
                    <span className={`badge bg-${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td>${order.subtotal.toFixed(2)}</td>
                  <td>${order.shippingCost.toFixed(2)}</td>
                  <td>${order.tax.toFixed(2)}</td>
                  <td>-${order.discount.toFixed(2)}</td>
                  <td>
                    <strong>${order.total.toFixed(2)}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Component */}
        {pagination.totalPages > 1 && (
          <div className="mt-4">
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
              maxVisiblePages={5}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'success';
    case 'processing':
      return 'primary';
    case 'pending':
      return 'warning';
    case 'cancelled':
      return 'danger';
    default:
      return 'secondary';
  }
}