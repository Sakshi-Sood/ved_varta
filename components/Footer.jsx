"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "./Button";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-t from-orange-200 to-amber-200 border-t-2 border-amber-300">
            <div className="max-w-7xl mx-auto px-6 pt-12 pb-8 lg:px-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <Image
                                src="/images/logo.png"
                                alt="VedVarta Logo"
                                width={40}
                                height={40}
                                className="rounded-lg"
                            />
                            <h3 className="text-2xl font-bold text-amber-700">VedVarta</h3>
                        </div>
                        <p className="text-gray-700 mb-3 text-sm">
                            Your trusted guide to ancient Vedic wisdom. Discover solutions to life's problems through professional astrology and spiritual guidance.
                        </p>
                        {/* Social Media Links */}
                        <div className="flex gap-4">
                            <Link
                                href="#"
                                className="w-7 h-7 text-sm bg-amber-600 hover:bg-amber-700 text-white rounded-full flex items-center justify-center transition-colors"
                                aria-label="Instagram"
                            >
                                <i className="fab fa-instagram"></i>
                            </Link>
                            <Link
                                href="#"
                                className="w-7 h-7 text-sm bg-amber-600 hover:bg-amber-700 text-white rounded-full flex items-center justify-center transition-colors"
                                aria-label="Twitter"
                            >
                                <i className="fab fa-twitter"></i>
                            </Link>
                            <Link
                                href="#"
                                className="w-7 h-7 text-sm bg-amber-600 hover:bg-amber-700 text-white rounded-full flex items-center justify-center transition-colors"
                                aria-label="Facebook"
                            >
                                <i className="fab fa-facebook-f"></i>
                            </Link>
                            <Link
                                href="#"
                                className="w-7 h-7 text-sm bg-amber-600 hover:bg-amber-700 text-white rounded-full flex items-center justify-center transition-colors"
                                aria-label="YouTube"
                            >
                                <i className="fab fa-youtube"></i>
                            </Link>
                        </div>
                    </div>

                    {/* Services Section */}
                    <div>
                        <h4 className="text-md font-semibold text-gray-800 mb-4">Services</h4>
                        <ul className="space-y-1 text-sm">
                            <li>
                                <Link href="/services/birth-chart" className="text-gray-600 hover:text-amber-600 transition-colors">
                                    Birth Chart Reading
                                </Link>
                            </li>
                            <li>
                                <Link href="/services/love-compatibility" className="text-gray-600 hover:text-amber-600 transition-colors">
                                    Love Compatibility
                                </Link>
                            </li>
                            <li>
                                <Link href="/services/career-guidance" className="text-gray-600 hover:text-amber-600 transition-colors">
                                    Career Guidance
                                </Link>
                            </li>
                            <li>
                                <Link href="/services/vedic-remedies" className="text-gray-600 hover:text-amber-600 transition-colors">
                                    Vedic Remedies
                                </Link>
                            </li>
                            <li>
                                <Link href="/services/gemstone-consultation" className="text-gray-600 hover:text-amber-600 transition-colors">
                                    Gemstone Consultation
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Problems We Solve Section */}
                    <div>
                        <h4 className="text-md font-semibold text-gray-800 mb-4">Problems We Solve</h4>
                        <ul className="space-y-1 text-sm">
                            <li>
                                <Link href="/problems/marriage-issues" className="text-gray-600 hover:text-amber-600 transition-colors">
                                    Marriage Issues
                                </Link>
                            </li>
                            <li>
                                <Link href="/problems/career-problems" className="text-gray-600 hover:text-amber-600 transition-colors">
                                    Career Problems
                                </Link>
                            </li>
                            <li>
                                <Link href="/problems/financial-troubles" className="text-gray-600 hover:text-amber-600 transition-colors">
                                    Financial Troubles
                                </Link>
                            </li>
                            <li>
                                <Link href="/problems/health-concerns" className="text-gray-600 hover:text-amber-600 transition-colors">
                                    Health Concerns
                                </Link>
                            </li>
                            <li>
                                <Link href="/problems/family-disputes" className="text-gray-600 hover:text-amber-600 transition-colors">
                                    Family Disputes
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Daily Guidance Section */}
                    <div>
                        <h4 className="text-md font-semibold text-gray-800 mb-4">Daily Guidance</h4>
                        <p className="text-gray-600 mb-6 text-sm">
                            Get daily horoscopes and Vedic wisdom delivered to your inbox.
                        </p>

                        {/* WhatsApp Contact Button */}
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
                        <div className="flex items-center gap-2 text-gray-600">
                            <span>© 2025 VedVarta. All rights reserved.</span>
                            <span className="flex items-center gap-1">
                                <i className="fas fa-om text-amber-600"></i>
                                Made with divine blessings
                                <i className="fas fa-sun text-yellow-500"></i>
                            </span>
                        </div>

                        <div className="flex gap-6 text-sm">
                            <Link href="/privacy-policy" className="text-gray-600 hover:text-amber-600 transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/terms-of-service" className="text-gray-600 hover:text-amber-600 transition-colors">
                                Terms of Service
                            </Link>
                            <Link href="/contact" className="text-gray-600 hover:text-amber-600 transition-colors">
                                Contact
                            </Link>
                        </div>
                    </div>
                </div>
    
        </footer>
    );
};

export default Footer;
