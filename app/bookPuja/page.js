"use client";

import React, { useState } from "react";
import { pujasData, pujaCategories, pujaFeatures } from "../../data/pujas";
import PujaCard from "../../components/PujaCard";
import Button from "../../components/Button";
import Link from "next/link";

const BookPujaPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter pujas based on category and search term
  const filteredPujas = pujasData.filter((puja) => {
    const matchesCategory = selectedCategory === "all" || puja.category === selectedCategory;
    const matchesSearch = puja.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         puja.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="bg-gradient-to-br from-yellow-200/80 via-yellow-50 to-amber-200/80 min-h-screen px-6 md:px-10 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="textGradient">Book Sacred Pujas</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Experience divine blessings through authentic Vedic rituals performed by experienced pandits
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search pujas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 bg-white rounded-full shadow-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
              <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
        </section>

        {/* Category Filter and Pujas Section */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our <span className="textGradient">Sacred Puja Services</span>
          </h2>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {pujaCategories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                  selectedCategory === category.value
                    ? "bg-gradient-to-r from-amber-600 to-yellow-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-center mb-8">
            <p className="text-gray-600">
              Showing {filteredPujas.length} puja{filteredPujas.length !== 1 ? 's' : ''} 
              {selectedCategory !== "all" && ` in ${selectedCategory}`}
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </div>

          {/* Pujas Grid */}
          {filteredPujas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPujas.map((puja) => (
                <PujaCard key={puja.id} puja={puja} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No Pujas Found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or category filter to find the perfect puja for you.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchTerm("");
                }}
                className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-6 py-3 rounded-full font-semibold hover:from-amber-700 hover:to-yellow-700 transition-all duration-200"
              >
                View All Pujas
              </button>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="mb-8">
          <div className="text-center bg-white/50 rounded-lg p-8 border border-amber-200">
            <h3 className="text-2xl font-semibold mb-4 textGradient">
              Need a Custom Puja Service?
            </h3>
            <p className="text-gray-700 mb-6">
              Can't find what you're looking for? Our experts can create a personalized puja plan for your specific needs.
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
      </div>
    </main>
  );
};

export default BookPujaPage;
