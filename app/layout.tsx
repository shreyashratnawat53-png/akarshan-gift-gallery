import type { Metadata } from "next";
import { Cinzel, Poppins } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "AKARSHAN Gift Gallery | Gifts for Every Occasion",
  description:
    "Every Gift Tells a Story. Discover premium gifts, personalized gifts, hampers, toys and more at AKARSHAN Gift Gallery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${poppins.variable}`}
    >
      <body>
        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}