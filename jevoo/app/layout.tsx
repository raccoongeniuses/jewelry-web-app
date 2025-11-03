import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { CartProvider } from "../contexts/CartContext";
import { AuthProvider } from "../contexts/AuthContext";
import { WishlistProvider } from "../components/wishlist/WishlistProvider";
import ModernizrInit from "../components/ModernizrInit";

export const metadata: Metadata = {
  title: "Jevoo Jewellery - Jewelry Shop eCommerce",
  description: "Jevoo Jewellery Online Store - Premium Jewelry Collection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="no-js">
      <head>
        <link rel="shortcut icon" type="image/x-icon" href="/assets/img/jevoo-circle.ico" />
        <link rel="stylesheet" href="/assets/css/vendor/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/vendor/pe-icon-7-stroke.css" />
        <link rel="stylesheet" href="/assets/css/vendor/font-awesome.min.css" />
        <link rel="stylesheet" href="/assets/css/plugins/slick.min.css" />
        <link rel="stylesheet" href="/assets/css/plugins/animate.css" />
        <link rel="stylesheet" href="/assets/css/plugins/nice-select.css" />
        <link rel="stylesheet" href="/assets/css/plugins/jqueryui.min.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="stylesheet" href="/assets/css/draggable-grid.css" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              {children}
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>

        {/* Modernizr initialization - client side only to prevent hydration mismatch */}
        <ModernizrInit />

        {/* Scripts */}
        <Script src="/assets/js/vendor/jquery-3.6.0.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/vendor/bootstrap.bundle.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/plugins/slick.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/plugins/countdown.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/plugins/nice-select.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/plugins/jqueryui.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/plugins/image-zoom.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/plugins/imagesloaded.pkgd.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/plugins/ajaxchimp.js" strategy="afterInteractive" />
        <Script src="/assets/js/plugins/ajax-mail.js" strategy="afterInteractive" />
        {/* <Script
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCfmCVTjRI007pC1Yk2o2d_EhgkjTsFVN8"
          strategy="afterInteractive"
          onError={(e) => {
            console.error('Failed to load Google Maps API:', e);
          }}
        />
        <Script
          src="/assets/js/plugins/google-map.js"
          strategy="afterInteractive"
          onError={(e) => {
            console.error('Failed to load Google Map plugin:', e);
          }}
        /> */}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" strategy="afterInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/Flip.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/main.js" strategy="afterInteractive" />
        <Script src="/assets/js/draggable-grid.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
