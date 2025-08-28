"use client";

import React, { useState } from "react";
import ProductCard from "../../components/ProductCard";
import Button from "../../components/Button";
import { products, getCategories } from "@/data/products";

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
    "Pendants": "🔗"
  };

  return (
    <main className="bg-gradient-to-br from-yellow-200/80 via-yellow-50 to-amber-200/80 min-h-screen">
      {/* Hero Section */}
      <section className="relative px-6 py-16 lg:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Divine Astro Products
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover our collection of authentic gemstones, sacred Rudraksha beads,
            protective bracelets, and spiritual pendants to enhance your cosmic energy.
          </p>

          {/* Category Quick Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
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
      <section className="px-6 lg:px-20 pb-16">
        <div className="max-w-7xl mx-auto">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
        <div className="max-w-7xl mx-auto bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl shadow-xl p-8 lg:p-12 text-center text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Need Help Choosing?
          </h2>
          <p className="text-lg lg:text-xl mb-8 opacity-95">
            Our expert astrologers can help you find the perfect product based on your birth chart
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              text="Get Free Consultation"
              icon={<i className="fas fa-phone-alt"></i>}
              className="bg-white text-amber-600 hover:bg-gray-100"
            />
            <Button
              text="Chat on WhatsApp"
              icon={<i className="fab fa-whatsapp"></i>}
              className="bg-green-500 text-white hover:bg-green-600"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductsPage;
