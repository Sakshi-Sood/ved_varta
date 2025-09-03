"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const AUTO_PLAY_MS = 4000;

export default function BannerCarousel({ banners = [] }) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const count = banners.length;

  const next = useCallback(() => {
    if (count === 0) return;
    setIndex((i) => (i + 1) % count);
  }, [count]);

  const prev = () => {
    if (count === 0) return;
    setIndex((i) => (i - 1 + count) % count);
  };

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(next, AUTO_PLAY_MS);
    return () => clearInterval(id);
  }, [next, isPaused]);

  // Reset index if banners array shrinks
  useEffect(() => {
    if (index >= count && count > 0) {
      setIndex(0);
    }
  }, [count, index]);

  // If no banners passed, render a graceful placeholder
  if (count === 0) {
    console.log("No banners passed as props to BannerCarousel");

    return (
      <div className="pt-8 px-4 sm:pt-10 sm:px-6 lg:pt-12 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl bg-amber-50 border border-amber-200 p-10 text-center text-amber-700">
            <p className="font-semibold">No banners available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-4 px-2 sm:pt-8 sm:px-4 lg:pt-12 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div
          className="relative overflow-hidden group rounded-xl sm:rounded-2xl shadow-md ring-1 ring-amber-300/40 bg-amber-50/40"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {banners.map((b, i) => (
              <div
                key={b.src}
                className="min-w-full relative h-48 sm:h-56 md:h-72 lg:h-80 xl:h-96"
              >
                <Image
                  src={b.src}
                  alt={b.alt}
                  fill
                  priority={i === 0}
                  className="object-contain"
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 100vw, 1280px"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />
              </div>
            ))}
          </div>

          {/* Nav Buttons */}
          <button
            aria-label="Previous banner"
            onClick={prev}
            className="absolute top-1/2 -translate-y-1/2 left-1 sm:left-3 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full opacity-70 sm:opacity-0 sm:group-hover:opacity-100 transition"
          >
            <i
              className="fas fa-chevron-left text-sm sm:text-lg"
              aria-hidden="true"
            ></i>
          </button>
          <button
            aria-label="Next banner"
            onClick={next}
            className="absolute top-1/2 -translate-y-1/2 right-1 sm:right-3 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full opacity-70 sm:opacity-0 sm:group-hover:opacity-100 transition"
          >
            <i
              className="fas fa-chevron-right text-sm sm:text-lg"
              aria-hidden="true"
            ></i>
          </button>

          {/* Indicators */}
          <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
            {banners.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to banner ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full transition-all ${
                  i === index
                    ? "bg-white w-4 sm:w-6"
                    : "bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
