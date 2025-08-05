import React from "react";
import Image from "next/image";
import Button from "../components/Button";

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Services", href: "/services" },
  { name: "Blogs", href: "/blogs" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  return (
    <nav className="sticky top-0 border-b border-amber-200 px-10 py-1 flex justify-between items-center bg-white/90">
      <a href="/" className="text-2xl font-bold flex items-center space-x-2">
        <Image src="/logo2.jpg" alt="Logo" width={70} height={70} />
        <span className="textGradient">VedVarta</span>
      </a>

      <ul className="flex space-x-8">
        {navLinks.map(({ name, href }) => (
          <li key={name}>
            <a
              href={href}
              className="text-gray-700 hover:text-amber-600 transition-colors font-semibold"
            >
              {name}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex space-x-4">
        <a href="/book">
          <Button text="Book Pooja" />
        </a>
        <a
          href="https://wa.me/+916284219106"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button text="WhatsApp" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
