import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Invoice - Jevoo Jewelry',
  description: 'Your order invoice from Jevoo Jewelry',
};

export default function InvoiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}