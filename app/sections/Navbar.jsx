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
    <nav className="sticky top-0 border-b border-amber-200 px-10 py-3 flex justify-between items-center bg-white/90">
      <a href="/" className="text-2xl font-bold flex items-center space-x-2">
        <Image src="/logo.jpg" alt="Logo" width={70} height={70} />
        <span className="textGradient">VedVarta</span>
      </a>

      <ul className="hidden lg:flex space-x-8">
        {navLinks.map(({ name, href }) => (
          <li key={name}>
            <a
              href={href}
              className="relative text-gray-700 hover:text-amber-600 transition-colors duration-300 font-semibold group pb-1"
            >
              {name}
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-amber-600 transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100" />
            </a>
          </li>
        ))}
      </ul>

      <div className="flex space-x-4">
        <a href="/book">
          <Button
            text="Book Pooja"
            icon={
              <img src="/agni-pooja.png" alt="Pooja Icon" className="w-5 h-5" />
            }
          />
        </a>
        <a
          href="https://wa.me/+916284219106"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            text="WhatsApp"
            icon={<i className="fa-brands fa-whatsapp w-5 h-5"></i>}
            fill={true}
          />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
