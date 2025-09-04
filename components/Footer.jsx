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
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8 lg:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link className="flex items-center gap-2 mb-3" href="/">
              <Image
                src="/images/logo.png"
                alt="VedVarta Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <h3 className="text-2xl font-bold text-amber-600">VedVarta</h3>
            </Link>
            <p className="text-gray-700 mb-3 text-sm">
              Your trusted guide to ancient Vedic wisdom. Discover solutions to
              life's problems through professional astrology and spiritual
              guidance.
            </p>
            {/* Social Media Links */}
            <div className="flex gap-4">
              {socialLinks.map(({ href, label, icon }) => (
                <Link
                  key={label}
                  href={href}
                  className="w-7 h-7 text-sm bg-amber-600 hover:bg-amber-700 text-white rounded-full flex items-center justify-center transition-colors"
                  aria-label={label}
                >
                  <i className={icon} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          {/* Services Section */}
          <div>
            <h4 className="text-md font-semibold text-gray-800 mb-3">
              Services
            </h4>
            <ul className="space-y-1 text-sm">
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
            <h4 className="text-md font-semibold text-gray-800 mb-3">
              Problems We Solve
            </h4>
            <ul className="space-y-1 text-sm">
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
            <h4 className="text-md font-semibold text-gray-800 mb-3">
              Contact Us
            </h4>
            <p className="text-gray-600 mb-6 text-sm">
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
                    className="fa-brands fa-whatsapp w-5 h-5"
                    aria-hidden="true"
                  ></i>
                }
                fill={true}
              />
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div className="text-gray-600">
            © 2025 VedVarta. All rights reserved.
          </div>

          <div className="flex gap-6 text-sm">
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
