"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BlurText from "@/components/shadcn/BlurText";
import Button from "@/components/Button";

// Featured deity cards for puja preview
const pujaCards = [
  {
    id: 1,
    name: "Lord Vishnu Puja",
    image: "/images/lakshmiPujaCard.png",
  },
  {
    id: 2,
    name: "Lord Shiva Puja",
    image: "/images/shivPujaCard.png",
  },
  {
    id: 3,
    name: "Lord Ganesha Puja",
    image: "/images/ganeshPujaCard.png",
  },
  {
    id: 4,
    name: "Goddess Lakshmi Puja",
    image: "/images/durgapujaCard.png",
  },
  {
    id: 5,
    name: "Vastu Puja",
    image: "/images/vastuPujaCard.png",
  },
];

export default function PujaPreview() {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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
      const scrollAmount = cardWidth * 2;
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
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 textGradient justify-center"
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
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-300 ${canScrollLeft
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
            className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {pujaCards.map((puja) => (
              <Link
                key={puja.id}
                href="/bookPuja"
                className="group relative flex-shrink-0 w-[calc(50%-0.5rem)] sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] aspect-[3/4] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              >
                {/* Main Image */}
                <Image
                  src={puja.image}
                  alt={puja.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />

                {/* Default gradient at bottom for text visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Top Overlay - slides down on hover */}
                <div className="absolute top-0 left-0 right-0 h-[45%] -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out pointer-events-none z-10 opacity-50">
                  <Image
                    src="/images/overlay.svg"
                    alt=""
                    fill
                    className="object-cover object-bottom"
                    style={{ objectPosition: "center bottom" }}
                  />
                </div>

                {/* Puja Name - always visible at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-10 text-center">
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white drop-shadow-lg font-serif tracking-wide">
                    {puja.name}
                  </h3>
                </div>

                {/* Hover Button - appears at bottom center on hover */}
                <div className="absolute bottom-16 sm:bottom-20 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                  <span className="px-4 py-2 bg-white/70 backdrop-blur-sm text-amber-700 rounded-full text-xs font-semibold shadow-lg border border-amber-100 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out hover:bg-white/80">
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
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-300 ${canScrollRight
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
