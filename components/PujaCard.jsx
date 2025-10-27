"use client";

import React, { useState } from "react";
import Image from "next/image";

const PujaCard = ({ puja }) => {
  const [showDetails, setShowDetails] = useState(false);
  const { 
    name, 
    category, 
    shortDescription, 
    fullDescription, 
    image, 
    duration, 
    benefits, 
    items_included, 
    price, 
    occasions, 
    popular 
  } = puja;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group relative">
      {/* Popular Badge */}
      {popular && (
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            Popular
          </span>
        </div>
      )}

      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50">
        <Image
          src={image}
          alt={name}
          width={400}
          height={300}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category and Duration */}
        <div className="flex justify-between items-center mb-3">
          <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">
            {category}
          </span>
          <span className="text-gray-500 text-xs flex items-center">
            <i className="fas fa-clock mr-1"></i>
            {duration}
          </span>
        </div>

        {/* Title and Description */}
        <h3 className="text-xl font-bold text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{shortDescription}</p>

        {/* Price */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-amber-600">{price.basic}</span>
            <span className="text-xs text-gray-500">Basic Package</span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-lg font-semibold text-gray-700">{price.premium}</span>
            <span className="text-xs text-gray-500">Premium Package</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
          >
            {showDetails ? 'Hide Details' : 'View Details'}
          </button>
          <button className="flex-1 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 text-sm">
            Book Now
          </button>
        </div>

        {/* Expandable Details */}
        {showDetails && (
          <div className="mt-4 pt-4 border-t border-gray-100 space-y-4 animate-fade-in">
            {/* Full Description */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">About This Puja</h4>
              <p className="text-gray-600 text-sm">{fullDescription}</p>
            </div>

            {/* Benefits */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Benefits</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {benefits.slice(0, 3).map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2 text-xs"></i>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Items Included */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Items Included</h4>
              <div className="flex flex-wrap gap-1">
                {items_included.slice(0, 3).map((item, index) => (
                  <span key={index} className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                    {item}
                  </span>
                ))}
                {items_included.length > 3 && (
                  <span className="text-xs text-gray-500">+{items_included.length - 3} more</span>
                )}
              </div>
            </div>

            {/* Occasions */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Best For</h4>
              <div className="flex flex-wrap gap-1">
                {occasions.map((occasion, index) => (
                  <span key={index} className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                    {occasion}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PujaCard;