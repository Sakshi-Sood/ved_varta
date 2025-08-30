"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const BannerCarousel = () => {
  // Sample banner data - replace with actual banner images later
  const banners = [
    {
      id: 1,
      image: "/banners/banner1.jpg", // Replace with actual image path
      title: "Personal Horoscope Reading",
      subtitle: "Get detailed insights into your life path",
      cta: "Book Consultation",
      link: "tel:+919090252584",
      bgColor: "from-amber-400 to-orange-500",
    },
    {
      id: 2,
      image: "/banners/banner2.jpg", // Replace with actual image path
      title: "Marriage Compatibility Analysis",
      subtitle: "Find your perfect match with Kundli matching",
      cta: "Learn More",
      link: "#services",
      bgColor: "from-purple-400 to-pink-500",
    },
    {
      id: 3,
      image: "/banners/banner3.jpg", // Replace with actual image path
      title: "Vastu Consultation",
      subtitle: "Harmonize your living spaces for prosperity",
      cta: "Schedule Visit",
      link: "https://wa.me/+919090252584",
      bgColor: "from-green-400 to-blue-500",
    },
    {
      id: 4,
      image: "/banners/banner4.jpg", // Replace with actual image path
      title: "Special Offer - 20% Off",
      subtitle: "On all gemstone consultations this month",
      cta: "Claim Offer",
      link: "tel:+919090252584",
      bgColor: "from-red-400 to-yellow-500",
    },
    {
      id: 5,
      image: "/banners/banner5.jpg", // Replace with actual image path
      title: "Annual Predictions 2025",
      subtitle: "Know what the stars have planned for you",
      cta: "Get Your Report",
      link: "#services",
      bgColor: "from-indigo-400 to-purple-500",
    },
  ];

  const [currentBanner, setCurrentBanner] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentBanner((prev) => (prev + 1) % banners.length);
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval);
    }
  }, [currentBanner, isAutoPlaying, banners.length]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
    // Resume auto-play after manual navigation
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentBanner((prev) => (prev + 1) % banners.length);
    // Resume auto-play after manual navigation
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index) => {
    setIsAutoPlaying(false);
    setCurrentBanner(index);
    // Resume auto-play after manual navigation
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative max-w-6xl mx-auto mb-12">
      {/* Main Carousel Container */}
      <div className="relative h-[250px] md:h-[350px] lg:h-[400px] rounded-2xl overflow-hidden shadow-2xl">
        {/* Banners */}
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              index === currentBanner
                ? "translate-x-0"
                : index < currentBanner
                ? "-translate-x-full"
                : "translate-x-full"
            }`}
          >
            {/* Background Gradient Placeholder - Replace with actual image */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${banner.bgColor} opacity-90`}
            />

            {/* Use this when you have actual images */}
            {/* <Image
              src={banner.image}
              alt={banner.title}
              fill
              className="object-cover"
              priority={index === 0}
            /> */}

            {/* Overlay for better text visibility */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Banner Content */}
            <div className="relative h-full flex items-center justify-center px-8 md:px-16">
              <div className="text-center text-white max-w-3xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg animate-fadeIn">
                  {banner.title}
                </h2>
                <p className="text-lg md:text-xl mb-6 drop-shadow-lg animate-fadeIn animation-delay-200">
                  {banner.subtitle}
                </p>
                <Link
                  href={banner.link}
                  target={banner.link.startsWith("http") ? "_blank" : "_self"}
                  rel={
                    banner.link.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="inline-block"
                >
                  <button className="bg-white text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-amber-400 hover:text-white transition-all duration-300 shadow-lg animate-fadeIn animation-delay-400">
                    {banner.cta}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
          aria-label="Previous banner"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
          aria-label="Next banner"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 ${
                index === currentBanner
                  ? "w-8 h-2 bg-white"
                  : "w-2 h-2 bg-white/60 hover:bg-white/80"
              } rounded-full`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail Preview (Optional) */}
      <div className="hidden lg:flex justify-center gap-2 mt-4">
        {banners.map((banner, index) => (
          <button
            key={banner.id}
            onClick={() => goToSlide(index)}
            className={`relative w-20 h-14 rounded-lg overflow-hidden transition-all duration-300 ${
              index === currentBanner
                ? "ring-2 ring-amber-500 scale-110"
                : "opacity-60 hover:opacity-100"
            }`}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-r ${banner.bgColor}`}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-xs font-semibold">
                {index + 1}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
