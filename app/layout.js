import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "../sections/Navbar";
import Footer from "../components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Astrologer Anoop Tripathi - Vedic Astrology Solutions",
  description: "Discover the power of Vedic astrology to solve life's challenges. Get personalized guidance, remedies, and spiritual solutions from experienced astrologers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://kit.fontawesome.com/d6cddf6b31.js" crossOrigin="anonymous" async></script>
      </head>
      <body
        className={`${poppins.className} antialiased bg-gradient-to-br from-yellow-200/80 via-yellow-100/80 to-amber-200/80`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
