"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "./Button";
import { navLinks } from "@/sections/Navbar";

const socialLinks = [
  { href: "#", label: "Instagram", icon: "fab fa-instagram" },
  { href: "#", label: "Twitter", icon: "fab fa-twitter" },
  { href: "#", label: "Facebook", icon: "fab fa-facebook-f" },
  { href: "#", label: "YouTube", icon: "fab fa-youtube" },
];

const serviceLinks = [
  { href: "/services/birth-chart", text: "Birth Chart Reading" },
  { href: "/services/love-compatibility", text: "Love Compatibility" },
  { href: "/services/career-guidance", text: "Career Guidance" },
  { href: "/services/vedic-remedies", text: "Vedic Remedies" },
  { href: "/services/gemstone-consultation", text: "Gemstone Consultation" },
];

const problemLinks = [
  { href: "/problems/marriage-issues", text: "Marriage Issues" },
  { href: "/problems/career-problems", text: "Career Problems" },
  { href: "/problems/financial-troubles", text: "Financial Troubles" },
  { href: "/problems/health-concerns", text: "Health Concerns" },
  { href: "/problems/family-disputes", text: "Family Disputes" },
];

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-orange-200 to-amber-200 border-t-2 border-amber-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-10 lg:pt-12 pb-6 md:pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link className="flex items-center gap-2 mb-3 md:mb-4" href="/">
              <Image
                src="/images/logo.png"
                alt="VedVarta Logo"
                width={36}
                height={36}
                className="rounded-lg sm:w-10 sm:h-10"
              />
              <h3 className="text-xl sm:text-2xl font-bold text-amber-600">VedVarta</h3>
            </Link>
            <p className="text-gray-700 mb-3 md:mb-4 text-xs sm:text-sm leading-relaxed">
              Your trusted guide to ancient Vedic wisdom. Discover solutions to
              life's problems through professional astrology and spiritual
              guidance.
            </p>
            {/* Social Media Links */}
            <div className="flex gap-3 md:gap-4">
              {socialLinks.map(({ href, label, icon }) => (
                <Link
                  key={label}
                  href={href}
                  className="w-8 h-8 sm:w-9 sm:h-9 text-sm sm:text-base bg-amber-600 hover:bg-amber-700 text-white rounded-full flex items-center justify-center transition-colors"
                  aria-label={label}
                >
                  <i className={icon} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          {/* Services Section */}
          <div>
            <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-2 md:mb-3">
              Services
            </h4>
            <ul className="space-y-1.5 md:space-y-2 text-xs sm:text-sm">
              {serviceLinks.map(({ href, text }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-gray-600 hover:text-amber-600 transition-colors"
                  >
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Problems We Solve Section */}
          <div>
            <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-2 md:mb-3">
              Problems We Solve
            </h4>
            <ul className="space-y-1.5 md:space-y-2 text-xs sm:text-sm">
              {problemLinks.map(({ href, text }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-gray-600 hover:text-amber-600 transition-colors"
                  >
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-2 md:mb-3">
              Contact Us
            </h4>
            <p className="text-gray-600 mb-4 md:mb-6 text-xs sm:text-sm leading-relaxed">
              Get in touch with us for personalized guidance and support.
            </p>

            <Link
              href="https://wa.me/+919090252584"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                text="WhatsApp"
                icon={
                  <i
                    className="fa-brands fa-whatsapp w-4 h-4 sm:w-5 sm:h-5"
                    aria-hidden="true"
                  ></i>
                }
                fill={true}
              />
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-amber-300/50 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 text-xs sm:text-sm">
          <div className="text-gray-600 text-center md:text-left">
            © 2025 VedVarta. All rights reserved.
          </div>

          <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6 text-xs sm:text-sm">
            {navLinks.map(({ href, name }) => (
              <Link
                key={href}
                href={href}
                className="text-gray-600 hover:text-amber-600 transition-colors"
              >
                {name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
