"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { pujasData } from "@/data/pujas";
import BlurText from "@/components/shadcn/BlurText";
import Button from "@/components/Button";

export default function PujaPreview() {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Pick featured pujas (popular ones first, then others)
  const featuredPujas = useMemo(() => {
    const popular = pujasData.filter((p) => p.popular);
    const others = pujasData.filter((p) => !p.popular);
    return [...popular, ...others];
  }, []);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.offsetWidth / 4;
      const scrollAmount = cardWidth * 4;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScrollButtons, 300);
    }
  };

  return (
    <section className="pt-12">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-20">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <BlurText
            text="Sacred Puja Services"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 textGradient justify-center"
            delay={50}
          />
          <p className="text-gray-600 sm:text-lg max-w-3xl mx-auto">
            Experience divine blessings through our authentic Vedic rituals
            performed by experienced priests for peace, prosperity, and
            spiritual growth.
          </p>
        </div>

        {/* Puja Cards Carousel */}
        <div className="relative mb-10">
          {/* Left Scroll Button */}
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-300 ${
              canScrollLeft
                ? "opacity-100 hover:bg-amber-50 hover:shadow-xl cursor-pointer"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <i className="fas fa-chevron-left text-amber-600"></i>
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScrollButtons}
            className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {featuredPujas.map((puja) => (
              <Link
                key={puja.id}
                href={`https://wa.me/+919090252584?text=I%20am%20interested%20in%20booking%20the%20${encodeURIComponent(
                  puja.name
                )}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex-shrink-0 w-[calc(50%-0.5rem)] lg:w-[calc(25%-1.125rem)] aspect-[2/3] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 cursor-pointer"
              >
                {/* Main Image */}
                <Image
                  src={puja.image}
                  alt={puja.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />

                {/* Subtle gradient at bottom for text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Top Overlay - fades in from top on hover */}
                <div className="absolute top-0 left-0 right-0 h-40 opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none">
                  <Image
                    src="/images/overlay.svg"
                    alt=""
                    fill
                    className="object-cover object-top"
                  />
                </div>

                {/* Puja Name */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white drop-shadow-lg font-serif">
                    {puja.name}
                  </h3>
                </div>

                {/* Hover Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-amber-700 rounded-full text-sm font-semibold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    Explore Poojas
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Right Scroll Button */}
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-300 ${
              canScrollRight
                ? "opacity-100 hover:bg-amber-50 hover:shadow-xl cursor-pointer"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <i className="fas fa-chevron-right text-amber-600"></i>
          </button>
        </div>

        {/* View All Button */}
        <div className="flex items-center justify-center flex-col text-center">
          <Link href="/bookPuja">
            <Button
              text="Explore All Puja Services"
              icon={<i className="fas fa-om ml-2" aria-hidden="true"></i>}
              fill
              right={true}
            />
          </Link>
          <p className="text-gray-600 mt-3 text-sm">
            Discover our complete range of authentic Vedic rituals and
            ceremonies
          </p>
        </div>
      </div>
    </section>
  );
}
