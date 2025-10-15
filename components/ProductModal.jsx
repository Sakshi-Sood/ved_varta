"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";

const ProductModal = ({ product, isOpen, onClose }) => {
  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const { name, category, description, image, benefits } = product;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex items-center justify-center bg-white/80 hover:bg-white rounded-full w-10 h-10 p-3 shadow-lg transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <i
            className="fas fa-times text-gray-600 text-base"
            aria-hidden="true"
          ></i>
        </button>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Image Section */}
          <div className="relative flex items-center justify-center">
            <div className="relative my-auto h-64 sm:h-80 md:h-96 overflow-hidden rounded-xl w-full max-w-md">
              <Image
                src={image}
                alt={name}
                fill
                className="mask-clip-content object-contain"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-3">
            {/* Category Badge */}
            <span className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-[10px] md:text-xs font-semibold">
              {category}
            </span>

            {/* Product Name */}
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              {name}
            </h2>

            {/* Description */}
            <p className="text-gray-700 text-sm">{description}</p>

            {/* Benefits */}
            {benefits && benefits.length > 0 && (
              <div className="border-t border-gray-200 pt-3">
                <h3 className="text-base font-bold text-gray-800 mb-1 md:mb-2">
                  Benefits
                </h3>
                <ul className="space-y-2">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <i
                        className="fas fa-check-circle text-green-500 mt-0.5 flex-shrink-0"
                        aria-hidden="true"
                      ></i>
                      <span className="text-gray-700 text-xs">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Contact Section */}
            <div className="border-t border-gray-200 pt-3">
              <h3 className="text-base font-bold text-gray-800 mb-2">
                Get This Product
              </h3>
              <p className="text-gray-600 text-xs mb-4">
                Contact us for personalized guidance and to place your order.
              </p>
              <div className="flex gap-3">
                <Link href="tel:+919090252584">
                  <Button
                    text="Call Now!"
                    icon={<i className="fas fa-phone" aria-hidden="true"></i>}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
