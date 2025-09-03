"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";

const ServiceCard = ({ service }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-amber-100">
      {/* Popular Badge */}
      {service.popular && (
        <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm font-bold px-4 py-2 text-center">
          ⭐ Most Popular
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center">
              <Image
                src={service.icon}
                alt={service.title}
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600">{service.duration}</p>
            </div>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-gray-700 mb-4">{service.shortDescription}</p>

        {/* Toggle Details Button */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-amber-600 hover:text-amber-700 font-semibold mb-4 flex items-center gap-2 transition-colors"
        >
          {showDetails ? "Show Less" : "View Details"}
          <span
            className={`transform transition-transform ${
              showDetails ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </button>

        {/* Expanded Details */}
        {showDetails && (
          <div className="space-y-4 mb-4 animate-fadeIn">
            <div className="bg-amber-50 rounded-lg p-4">
              <p className="text-gray-700 text-sm leading-relaxed">
                {service.fullDescription}
              </p>
            </div>

            {/* Features */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                What's Included:
              </h4>
              <ul className="space-y-1">
                {service.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <span className="text-amber-500 mt-1">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Delivery Modes */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                Available Via:
              </h4>
              <div className="flex flex-wrap gap-2">
                {service.deliveryMode.map((mode, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {mode}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Pricing */}
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Starting from</p>
              <p className="text-2xl font-bold text-amber-600">
                {service.price.basic}
              </p>
            </div>
            {service.price.premium && (
              <div className="text-right">
                <p className="text-sm text-gray-500 mb-1">Premium</p>
                <p className="text-xl font-semibold text-gray-700">
                  {service.price.premium}
                </p>
              </div>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3">
            <Link href="tel:+919090252584" className="flex-1">
              <Button text="Book Now" fill className="w-full" />
            </Link>
            <Link
              href={`https://wa.me/+919090252584?text=Hi, I'm interested in ${service.title}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button text="Inquire" className="w-full" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
