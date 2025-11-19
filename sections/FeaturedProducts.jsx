"use client";

import { useMemo } from "react";
import Image from "next/image";
import { products } from "@/data/products";

export default function FeaturedProducts() {
  const pickFeatured = () => {
    const categories = [
      "Gemstones",
      "Rudraksha",
      "Bracelets",
      "Pendants",
      "Vastu",
      "Yantras",
    ];
    const picked = [];

    for (const category of categories) {
      const list = products.filter((p) => p.category === category);
      if (list[0]) picked.push(list[0]);
    }

    let depth = 1;
    while (picked.length < 12 && picked.length < products.length) {
      let added = false;
      for (const category of categories) {
        if (picked.length >= 12) break;
        const list = products.filter((p) => p.category === category);
        if (list[depth]) {
          picked.push(list[depth]);
          added = true;
        }
      }
      if (!added) break;
      depth += 1;
    }

    return picked.slice(0, 12);
  };

  const featuredItems = useMemo(pickFeatured, []);

  return (
    <section className="py-5 sm:pt-16 sm:pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 mb-8 sm:mb-12">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">
            <span className="textGradient">Featured Divine</span>
            <span className="text-black"> Products</span>
          </h2>
          <p className="text-gray-600 sm:text-lg max-w-3xl mx-auto">
            Handpicked authentic spiritual products to enhance your cosmic
            energy and bring positive transformations.
          </p>
        </div>
      </div>

      {/* Infinite scrolling strip */}
      <div className="relative w-full">
        <div className="inline-flex animate-scroll-left">
          {/* First set */}
          {featuredItems.map((product, index) => (
            <article
              key={`set1-${product.id}-${index}`}
              className="flex-shrink-0 w-[calc(50vw-2rem)] sm:w-72 lg:w-80 mx-1 sm:mx-3 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-amber-100"
            >
              <div className="relative h-32 sm:h-52 bg-gradient-to-br from-amber-50 to-yellow-50">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-2 sm:p-4 group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 256px, (max-width: 1024px) 288px, 320px"
                />
                <div className="absolute top-1 left-1 sm:top-2 sm:left-2">
                  <span className="bg-amber-500/90 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-medium">
                    {product.category}
                  </span>
                </div>
              </div>

              <div className="p-2 sm:p-4">
                <h3 className="text-base font-bold text-gray-800 mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {product.description}
                </p>
              </div>
            </article>
          ))}

          {featuredItems.map((product, index) => (
            <article
              key={`set2-${product.id}-${index}`}
              className="flex-shrink-0 w-[calc(50vw-1rem)] sm:w-72 lg:w-80 mx-3 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-amber-100"
            >
              <div className="relative h-32 sm:h-52 bg-gradient-to-br from-amber-50 to-yellow-50">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-2 sm:p-4 group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 256px, (max-width: 1024px) 288px, 320px"
                />
                <div className="absolute top-1 left-1 sm:top-2 sm:left-2">
                  <span className="bg-amber-500/90 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-medium">
                    {product.category}
                  </span>
                </div>
              </div>

              <div className="p-2 sm:p-4">
                <h3 className="text-sm font-semibold text-gray-800 sm:mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {product.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
          will-change: transform;
        }

        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}