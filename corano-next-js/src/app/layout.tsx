import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  weight: ['300', '400', '700'],
  subsets: ["latin"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "Jevoo Jewellery - Luxury Jewelry Online Store",
  description: "Discover exquisite jewelry collections at Jevoo Jewellery. Fine jewelry crafted with precision and elegance.",
  keywords: ["jewelry", "luxury", "rings", "necklaces", "earrings", "bracelets", "gold", "diamonds"],
  authors: [{ name: "Jevoo Jewellery" }],
  openGraph: {
    title: "Jevoo Jewellery - Luxury Jewelry Online Store",
    description: "Discover exquisite jewelry collections at Jevoo Jewellery",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} antialiased`}>
        {children}
        {/* Scripts for Bootstrap and other libraries */}
        <script src="https://code.jquery.com/jquery-3.6.0.min.js" />
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" />
      </body>
    </html>
  );
}
