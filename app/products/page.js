"use client";

import React, { useState } from "react";
import ProductCard from "../../components/ProductCard";
import Button from "../../components/Button";
import { products, getCategories } from "@/data/products";
import Link from "next/link";
import BannerCarousel from "@/components/BannerCarousel";
import { productBanners } from "@/data/banner";

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...getCategories()];

  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter(product => product.category === selectedCategory);

  const categoryIcons = {
    "Gemstones": "💎",
    "Rudraksha": "📿",
    "Bracelets": "⌚",
    "Pendants": "🔗",
    "Vastu": "🏠",
    "Yantras": "🕉️"
  };

  return (
    <main className="bg-gradient-to-br from-yellow-200/80 via-yellow-100/80 to-amber-200/80 min-h-screen">
      {/* Banner Slideshow */}
      <section className="mb-6">
        <BannerCarousel banners={productBanners} />
      </section>
      {/* Hero Section */}
      <section className="relative px-6 py-6 lg:py-12 lg:px-15">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-2">
            Divine Astro Products
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover our collection of authentic gemstones, sacred Rudraksha beads,
            protective bracelets, and spiritual pendants to enhance your cosmic energy.
          </p>

          {/* Category Quick Links */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${selectedCategory === category
                  ? "bg-amber-600 hover:bg-amber-500 text-white shadow-lg transform scale-105"
                  : "bg-white text-gray-700 hover:bg-amber-200 hover:shadow-md"
                  }`}
              >
                {category !== "All" && (
                  <span className="text-xl">{categoryIcons[category]}</span>
                )}
                {category}
                {category === "All" && (
                  <span className="ml-2 bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs">
                    {products.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-6 lg:px-20 pb-10">
        <div className="max-w-7xl mx-auto">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                No products found
              </h3>
              <p className="text-gray-600">
                Try adjusting your filters or browse all products
              </p>
              <div className="flex justify-center items-center mt-8">
                <Button
                  text="View All Products"
                  onClick={() => setSelectedCategory("All")}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 lg:px-20 pb-16">
        <div className="text-center mt-4 bg-white/50 rounded-lg p-8 border border-amber-200">
          <h3 className="text-2xl font-semibold mb-4 textGradient">
            Need Help Choosing?
          </h3>
          <p className="text-gray-700 mb-6">
            Our expert Acharya Anoop Tripathi can help you find the perfect product based on your birth chart
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="tel:+919090252584">
              <Button text="Book Consultation" fill />
            </Link>
            <Link
              href="https://wa.me/+919090252584"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button text="WhatsApp Us" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductsPage;
