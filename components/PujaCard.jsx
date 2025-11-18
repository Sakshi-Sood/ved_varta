"use client";

import  { useState } from "react";
import Image from "next/image";
import Button from "./Button";
import { redirect } from "next/navigation";
import Link from "next/link";

const PujaCard = ({ puja }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  const { 
    name, 
    category, 
    fullDescription, 
    image, 
    benefits
  } = puja;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group h-full flex flex-col">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50 flex-shrink-0">
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
      <div className="p-5 flex flex-col flex-grow">
        {/* Category */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">
            {category}
          </span>
        </div>

        {/* Title and Description */}
        <h3 className="text-xl font-bold text-gray-800 mb-2">{name}</h3>
        <p className={`text-gray-700 text-sm mb-2 leading-relaxed ${!showFullDescription ? 'line-clamp-4' : ''}`}>
          {fullDescription}
        </p>
        <button 
          onClick={() => setShowFullDescription(!showFullDescription)}
          className="text-amber-600 hover:text-amber-700 text-xs font-semibold mb-4 text-left"
        >
          {showFullDescription ? 'Show less' : 'Read more'}
        </button>

        {/* Spacer to push benefits and button to bottom */}
        <div className="flex-grow"></div>

        {/* Benefits - Horizontal */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-800 mb-2 text-sm">Key Benefits:</h4>
          <div className="flex flex-wrap gap-2">
            {benefits.slice(0, 3).map((benefit, index) => (
              <span key={index} className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center">
                {benefit}
              </span>
            ))}
          </div>
        </div>

        {/* Book Now Button */}
        <Link
          href={`https://wa.me/+919090252584?text=I%20am%20interested%20in%20booking%20the%20${encodeURIComponent(name)}.`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            text="Book Now"
            fill
            fullWidth
          />
        </Link>
      </div>
    </div>
  );
};

export default PujaCard;