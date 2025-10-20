import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export default function Layout({ children, className = '' }: LayoutProps) {
  return (
    <div className={`site-wrapper ${className}`}>
      <Header />
      <main className="site-content">
        {children}
      </main>
      <Footer />
    </div>
  );
}