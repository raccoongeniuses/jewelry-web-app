'use client';

import Link from 'next/link';

interface CartSummaryProps {
  subtotal: number;
  total: number;
  discount: number;
  couponCode: string | null;
}

export default function CartSummary({ subtotal, total, discount, couponCode }: CartSummaryProps) {
  return (
    <div className="cart-calculator-wrapper">
      <div className="cart-calculate-items">
        <h6>Cart Totals</h6>
        <div className="table-responsive">
          <table className="table">
            <tbody>
              <tr className="subtotal">
                <td>Subtotal</td>
                <td>${subtotal.toFixed(2)}</td>
              </tr>
              {discount > 0 && (
                <tr className="discount">
                  <td>
                    Discount
                    {couponCode && (
                      <small className="d-block text-muted">Coupon: {couponCode}</small>
                    )}
                  </td>
                  <td className="text-success">-${discount.toFixed(2)}</td>
                </tr>
              )}
              <tr className="total">
                <td>Total</td>
                <td className="total-amount">${total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Link href="/checkout" className="btn btn-sqr d-block text-center">
        Proceed Checkout
      </Link>

      {/* Additional Actions */}
      <div className="cart-actions mt-3">
        <Link href="/" className="btn btn-outline-secondary btn-sm d-block mb-2">
          <i className="fa fa-arrow-left me-2"></i>
          Continue Shopping
        </Link>
      </div>

      {/* Security Badge */}
      <div className="security-badge text-center mt-3">
        <small className="text-muted">
          <i className="fa fa-lock me-1"></i>
          Secure Checkout
        </small>
      </div>
    </div>
  );
}