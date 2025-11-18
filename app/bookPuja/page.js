"use client";

import React from "react";
import { pujasData } from "../../data/pujas";
import PujaCard from "../../components/PujaCard";
import Button from "../../components/Button";
import Link from "next/link";

const BookPujaPage = () => {
  return (
    <main className="bg-gradient-to-br from-yellow-200/80 via-yellow-100/80 to-amber-200/80 min-h-screen px-6 md:px-10 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="textGradient">Book Sacred Pujas</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-semibold mb-8 max-w-3xl mx-auto">
            Experience divine blessings through authentic Vedic rituals performed by experienced pandits
          </p>
        </section>

        {/* Pujas Section */}
        <section className="mb-16">
          {/* Pujas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pujasData.map((puja) => (
              <PujaCard key={puja.id} puja={puja} />
            ))}
          </div>
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
