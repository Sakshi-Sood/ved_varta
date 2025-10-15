"use client";

import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "../components/Button";
import { products } from "@/data/products";

// Small, well-tested slider that pages by "itemsPerView" and never jumps past bounds.
export default function FeaturedProducts() {
  // pick up to 12 items while trying to keep category diversity (keeps your original picker)
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

  // Responsive items per view
  const getItemsPerView = () =>
    typeof window !== "undefined" && window.innerWidth >= 1024 ? 3 : 2;
  const [itemsPerView, setItemsPerView] = useState(() =>
    typeof window !== "undefined" ? getItemsPerView() : 3
  );

  useEffect(() => {
    const onResize = () => setItemsPerView(getItemsPerView());
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Chunk items into pages where each page contains <= itemsPerView items
  const pages = useMemo(() => {
    const out = [];
    for (let i = 0; i < featuredItems.length; i += itemsPerView) {
      out.push(featuredItems.slice(i, i + itemsPerView));
    }
    return out.length ? out : [[]];
  }, [featuredItems, itemsPerView]);

  const totalPages = pages.length;
  const [pageIndex, setPageIndex] = useState(0);

  // Clamp pageIndex when responsive changes
  useEffect(() => {
    if (pageIndex >= totalPages) setPageIndex(totalPages - 1);
  }, [totalPages, pageIndex]);

  // autoplay
  const [isPaused, setIsPaused] = useState(false);
  const autoplayRef = useRef(null);

  const next = useCallback(
    () => setPageIndex((p) => (p + 1) % totalPages),
    [totalPages]
  );
  const prev = useCallback(
    () => setPageIndex((p) => (p - 1 + totalPages) % totalPages),
    [totalPages]
  );

  useEffect(() => {
    if (isPaused || totalPages <= 1) return;
    autoplayRef.current = window.setInterval(() => next(), 4000);
    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    };
  }, [isPaused, next, totalPages]);

  // Build track transform: track width = totalPages * 100% and we move by (pageIndex * (100 / totalPages))% of track
  const trackTranslate = `${-(pageIndex * (100 / totalPages))}%`;

  return (
    <section className="py-16 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            <span className="textGradient">Featured Divine Products</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Handpicked authentic spiritual products to enhance your cosmic
            energy and bring positive transformations.
          </p>
        </div>

        <div
          className="relative bg-gradient-to-br from-white/60 to-amber-50/80 rounded-2xl p-8 shadow-lg border border-amber-200/50 group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* viewport */}
          <div className="overflow-hidden rounded-xl">
            {/* track */}
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{
                width: `${totalPages * 100}%`,
                transform: `translateX(${trackTranslate})`,
              }}
            >
              {pages.map((page, pIdx) => (
                <div
                  key={pIdx}
                  className="p-2"
                  style={{ width: `${100 / totalPages}%` }}
                >
                  <div className="flex gap-4 items-stretch">
                    {page.map((product) => (
                      <article
                        key={product.id}
                        className="flex-1 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group/card border border-amber-100"
                      >
                        <div className="relative h-40 sm:h-44 bg-gradient-to-br from-amber-50 to-yellow-50">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover/card:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          />
                          <div className="absolute top-2 left-2">
                            <span className="bg-amber-500/90 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                              {product.category}
                            </span>
                          </div>
                        </div>

                        <div className="p-4">
                          <h3 className="text-base font-bold text-gray-800 mb-2 line-clamp-2 group-hover/card:text-amber-600 transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-3">
                            {product.description}
                          </p>
                        </div>
                      </article>
                    ))}

                    {/* If a page has fewer items than itemsPerView, render empty placeholders to keep layout stable */}
                    {Array.from({
                      length: Math.max(0, itemsPerView - page.length),
                    }).map((_, i) => (
                      <div key={`empty-${i}`} className="flex-1" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* arrows */}
          {totalPages > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-amber-600/90 hover:bg-amber-600 text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg z-10 cursor-pointer"
                aria-label="Previous products"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 rotate-180"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 16.293a1 1 0 010-1.414L15.586 11H4a1 1 0 110-2h11.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-amber-600/90 hover:bg-amber-600 text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg z-10 cursor-pointer"
                aria-label="Next products"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 16.293a1 1 0 010-1.414L15.586 11H4a1 1 0 110-2h11.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </>
          )}

          {/* indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPageIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === pageIndex
                    ? "bg-amber-600 w-8"
                    : "bg-amber-300 w-2 hover:bg-amber-400"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <Link href="/products">
            <Button
              text="Explore All Products"
              fill={true}
              className="px-8 py-3 text-lg"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
