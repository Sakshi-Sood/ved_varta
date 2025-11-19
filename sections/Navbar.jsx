"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Button from "../components/Button";
import Link from "next/link";

export const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Blogs", href: "/blogs" },
  { name: "Contact", href: "/contact" },
  { name: "Admin", href: "/admin" }
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Visibility control for hide-on-scroll-down / show-on-scroll-up
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);

  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const SCROLL_UP_THRESHOLD = 10; // px: how much user must scroll up to show
  const SCROLL_DOWN_THRESHOLD = 10; // px: how much user must scroll down to hide
  const MIN_SCROLL_TO_HIDE = 40; // px: don't hide for small scrolls near top

  useEffect(() => {
    // Make sure this runs only in client
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const currentY = window.scrollY;

      // quick top check
      if (currentY <= 0) {
        // at very top: always show and treat as "at top"
        setIsAtTop(true);
      } else {
        setIsAtTop(false);
      }

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const delta = currentY - lastScrollY.current;

          // If at very top, always show
          if (currentY <= 0) {
            setIsVisible(true);
          } else if (
            delta > SCROLL_DOWN_THRESHOLD &&
            currentY > MIN_SCROLL_TO_HIDE
          ) {
            // scrolling down and passed minimum distance -> hide
            setIsVisible(false);
          } else if (lastScrollY.current - currentY > SCROLL_UP_THRESHOLD) {
            // scrolled up enough -> show
            setIsVisible(true);
          }
          lastScrollY.current = currentY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((s) => !s);
    // when opening mobile menu, ensure navbar visible
    setIsVisible(true);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // dynamic classes: translate out when hidden, show shadow/background when not at top
  const navBase = `sticky top-0 z-50 transform transition-transform duration-300`;
  const navTranslate = isVisible ? "translate-y-0" : "-translate-y-full";
  const navBg = isMobileMenuOpen
    ? "bg-orange-100/95"
    : isAtTop
      ? "bg-white/40 shadow-none"
      : "bg-white/95 shadow-sm";

  return (
    <>
      <nav
        className={`${navBase} ${navTranslate} ${navBg} px-4 sm:px-6 lg:px-8 py-4`}
      >
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold flex items-center space-x-2"
            onClick={closeMobileMenu}
          >
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={60}
              height={60}
              className="object-cover"
            />
            <span className="text-orange-400">VedVarta</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex space-x-4 xl:space-x-6 2xl:space-x-8">
            {navLinks.map(({ name, href }) => (
              <li key={name}>
                <Link
                  href={href}
                  className="relative text-gray-700 hover:text-amber-600 transition-colors duration-300 font-semibold group pb-1"
                >
                  {name != "Admin" ? name : null}
                  <span className="absolute left-0 bottom-0 w-full h-[2px] bg-amber-600 transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex space-x-4">
            <Link href="/bookPuja">
              <Button
                text="Book Pooja"
                icon={
                  <Image
                    src="/icons/agni-pooja.png"
                    alt="Pooja Icon"
                    width={20}
                    height={20}
                    aria-hidden="true"
                  />
                }
              />
            </Link>
            <Link
              href="https://wa.me/+919090252584"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                text="WhatsApp"
                icon={
                  <i
                    className="fa-brands fa-whatsapp w-5 h-5"
                    aria-hidden="true"
                  ></i>
                }
                fill={true}
              />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden relative z-50 p-2 text-gray-700 hover:text-amber-600 focus:outline-none cursor-pointer transition-all duration-300"
            aria-label="Toggle mobile menu"
          >
            <div className="relative">
              {/* Hamburger Icon */}
              {isMobileMenuOpen ? (
                <i className="fas fa-times text-2xl" aria-hidden="true"></i>
              ) : (
                <i className="fas fa-bars text-2xl" aria-hidden="true"></i>
              )}
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-xs z-30 lg:hidden transition-all duration-300 ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={closeMobileMenu}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 max-w-sm bg-orange-100/90 z-40 lg:hidden transform transition-transform duration-300 ease-in-out border-l border-amber-600/50 shadow-2xl ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="p-6">
          {/* Mobile Menu Header */}
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="flex items-center space-x-2 mb-6"
          >
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={50}
              height={50}
              className="rounded-full object-cover"
            />
            <span className="text-xl font-bold text-orange-400">VedVarta</span>
          </Link>

          {/* Mobile Navigation Links */}
          <ul className="space-y-2 mb-8">
            {navLinks.map(({ name, href }) => (
              <li key={name}>
                <Link
                  href={href}
                  onClick={closeMobileMenu}
                  className="block text-lg font-semibold text-gray-700 hover:text-amber-600 transition-colors duration-300 py-2"
                >
                  {name == "Admin" ? null : name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="space-y-4">
            <Link href="/bookPuja" onClick={closeMobileMenu} className="block">
              <div className="w-full">
                <Button
                  text="Book Pooja"
                  icon={
                    <Image
                      src="/icons/agni-pooja.png"
                      alt="Pooja Icon"
                      width={20}
                      height={20}
                      aria-hidden="true"
                    />
                  }
                />
              </div>
            </Link>
            <Link
              href="https://wa.me/+919090252584"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobileMenu}
              className="block"
            >
              <div className="w-full">
                <Button
                  text="WhatsApp"
                  icon={
                    <i
                      className="fa-brands fa-whatsapp w-5 h-5"
                      aria-hidden="true"
                    ></i>
                  }
                  fill={true}
                />
              </div>
            </Link>
          </div>

          {/* Mobile Menu Footer */}
          <div className="flex flex-col gap-4 mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              Transform your life with Vedic wisdom
            </p>
            <Image
              src="/images/logo2.png"
              alt="Vedic Wisdom"
              width={400}
              height={200}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
