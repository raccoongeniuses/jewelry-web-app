import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout - Jevoo Jewelry',
  description: 'Complete your purchase securely at Jevoo Jewelry. Enter billing and shipping information, select payment method, and review your order.',
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}