"use client";

import React from "react";
import Image from "next/image";

const ProductCard = ({ product }) => {
  const { name, category, description, image } = product;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-yellow-50 to-amber-50">
        <Image
          src={image}
          alt={name}
          width={300}
          height={300}
          className="w-full h-full xl:object-fill object-contain group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      {/* Details */}
      <div className="p-2 md:p-5">
        <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold mb-3">
          {category}
        </span>
        <h3 className="text-md md:text-lg font-bold text-gray-800 mb-2 line-clamp-2">
          {name}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
      </div>
    </div>
  );
};

export default ProductCard;
