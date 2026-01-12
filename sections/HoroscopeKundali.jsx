"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, SunMediumIcon } from "lucide-react";
import DailyHoroscope from "./DailyHoroscope";
import KundaliMatching from "./KundaliMatching";

const HoroscopeKundaliRedesign = () => {
  const [activeTab, setActiveTab] = useState("horoscope");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="py-16 px-5 sm:px-10 lg:px-20 bg-gradient-to-b pb-20 from-amber-100/60 via-white to-amber-100/50">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div className="text-center mb-12" variants={itemVariants}>
          {/* Main headline */}
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-serif italic font-semibold text-black mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Free Astrology Services
          </motion.h2>

          {/* Supporting paragraph */}
          <motion.p
            className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Unlock the mysteries of your destiny. Explore your daily horoscope
            and check compatibility with our Vedic astrology engine.
          </motion.p>
        </motion.div>

        {/* Tab Switcher */}
        <motion.div
          className="flex justify-center mb-12"
          variants={itemVariants}
        >
          <div className="relative inline-flex bg-white rounded-full p-1.5 shadow-lg shadow-gray-200/50">
            {/* Animated background pill */}
            <motion.div
              className="absolute top-1.5 bottom-1.5 rounded-full bg-gradient-to-r from-amber-100 to-orange-100"
              initial={false}
              animate={{
                left: activeTab === "horoscope" ? "6px" : "50%",
                width:
                  activeTab === "horoscope"
                    ? "calc(50% - 6px)"
                    : "calc(50% - 6px)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />

            <button
              onClick={() => setActiveTab("horoscope")}
              className={`relative z-10 flex items-center gap-2 px-6 py-3 rounded-full font-sm font-semibold transition-colors duration-300 cursor-pointer ${
                activeTab === "horoscope"
                  ? "text-amber-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <SunMediumIcon />
              Daily Horoscope
            </button>

            <button
              onClick={() => setActiveTab("kundali")}
              className={`relative z-10 flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-colors duration-300 cursor-pointer ${
                activeTab === "kundali"
                  ? "text-amber-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Heart />
              Kundali Matching
            </button>
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "horoscope" && <DailyHoroscope />}
          {activeTab === "kundali" && <KundaliMatching />}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default HoroscopeKundaliRedesign;
