"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";

// Simple autoplaying banner carousel for the Products page

const AUTO_PLAY_MS = 4000;

export default function BannerCarousel({ banners }) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % banners.length);
  }, []);

  const prev = () => {
    setIndex((i) => (i - 1 + banners.length) % banners.length);
  };

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(next, AUTO_PLAY_MS);
    return () => clearInterval(id);
  }, [next, isPaused]);

  return (
    <div className="pt-8 px-4 sm:pt-10 sm:px-6 lg:pt-12 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div
          className="relative overflow-hidden group rounded-2xl shadow-md ring-1 ring-amber-300/40 bg-amber-50/40"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {banners.map((b, i) => (
              <div key={b.src} className="min-w-full relative h-56 sm:h-72 md:h-80 lg:h-96">
                <Image
                  src={b.src}
                  alt={b.alt}
                  fill
                  priority={i === 0}
                  className="object-contain"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />
              </div>
            ))}
          </div>

          {/* Nav Buttons */}
          <button
            aria-label="Previous banner"
            onClick={prev}
            className="absolute top-1/2 -translate-y-1/2 left-3 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
          >
            <i className="fas fa-chevron-left text-lg" aria-hidden="true"></i>
          </button>
          <button
            aria-label="Next banner"
            onClick={next}
            className="absolute top-1/2 -translate-y-1/2 right-3 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
          >
            <i className="fas fa-chevron-right text-lg" aria-hidden="true"></i>
          </button>

          {/* Indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to banner ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2.5 w-2.5 rounded-full transition-all ${
                  i === index ? "bg-white w-6" : "bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
