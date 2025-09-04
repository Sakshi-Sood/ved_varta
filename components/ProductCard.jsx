"use client";

import React, { useState } from "react";
import Image from "next/image";
import ProductModal from "./ProductModal";

const ProductCard = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { name, category, description, image } = product;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const isMobile = window.innerWidth < 768;

  return (
    <>
      <div
        className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group cursor-pointer"
        onClick={openModal}
      >
        {/* Image */}
        <div className="relative h-56 overflow-hidden bg-gradient-to-br from-yellow-50 to-amber-50">
          <Image
            src={image}
            alt={name}
            fill
            className="mask-clip-content object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        {/* Details */}
        <div className="p-3 md:p-5">
          <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold mb-1 md:mb-3">
            {category}
          </span>
          <h3 className="text-md md:text-lg font-bold text-gray-800 mb-2 line-clamp-2">
            {name}
          </h3>
          <p className="hidden md:block text-gray-600 text-xs">{description}</p>
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default ProductCard;
