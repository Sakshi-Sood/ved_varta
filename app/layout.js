import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./sections/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "VedVarta - Vedic Astrology Solutions",
  description: "Discover the power of Vedic astrology to solve life's challenges. Get personalized guidance, remedies, and spiritual solutions from experienced astrologers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://kit.fontawesome.com/d6cddf6b31.js" crossOrigin="anonymous" aria-hidden="true"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
