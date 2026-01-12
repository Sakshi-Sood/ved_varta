"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Button from "@/components/Button";
import { Sun } from "lucide-react";

// Zodiac signs data
export const zodiacSigns = [
  {
    name: "Leo",
    icon: "leo",
    dates: "July 23 - August 22",
    element: "Fire",
    ruler: "Sun",
    color: "#F97316",
    bgColor: "bg-orange-100",
  },
  {
    name: "Aries",
    icon: "aries",
    dates: "March 21 - April 19",
    element: "Fire",
    ruler: "Mars",
    color: "#EF4444",
    bgColor: "bg-red-100",
  },
  {
    name: "Taurus",
    icon: "taurus",
    dates: "April 20 - May 20",
    element: "Earth",
    ruler: "Venus",
    color: "#84CC16",
    bgColor: "bg-lime-100",
  },
  {
    name: "Gemini",
    icon: "gemini",
    dates: "May 21 - June 20",
    element: "Air",
    ruler: "Mercury",
    color: "#FACC15",
    bgColor: "bg-yellow-100",
  },
  {
    name: "Cancer",
    icon: "cancer",
    dates: "June 21 - July 22",
    element: "Water",
    ruler: "Moon",
    color: "#06B6D4",
    bgColor: "bg-cyan-100",
  },
  {
    name: "Virgo",
    icon: "virgo",
    dates: "August 23 - September 22",
    element: "Earth",
    ruler: "Mercury",
    color: "#22C55E",
    bgColor: "bg-green-100",
  },
  {
    name: "Libra",
    icon: "libra",
    dates: "September 23 - October 22",
    element: "Air",
    ruler: "Venus",
    color: "#EC4899",
    bgColor: "bg-pink-100",
  },
  {
    name: "Scorpio",
    icon: "scorpio",
    dates: "October 23 - November 21",
    element: "Water",
    ruler: "Pluto",
    color: "#DC2626",
    bgColor: "bg-red-100",
  },
  {
    name: "Sagittarius",
    icon: "sagittarius",
    dates: "November 22 - December 21",
    element: "Fire",
    ruler: "Jupiter",
    color: "#A855F7",
    bgColor: "bg-purple-100",
  },
  {
    name: "Capricorn",
    icon: "capricorn",
    dates: "December 22 - January 19",
    element: "Earth",
    ruler: "Saturn",
    color: "#6B7280",
    bgColor: "bg-gray-100",
  },
  {
    name: "Aquarius",
    icon: "aquarius",
    dates: "January 20 - February 18",
    element: "Air",
    ruler: "Uranus",
    color: "#3B82F6",
    bgColor: "bg-blue-100",
  },
  {
    name: "Pisces",
    icon: "pisces",
    dates: "February 19 - March 20",
    element: "Water",
    ruler: "Neptune",
    color: "#8B5CF6",
    bgColor: "bg-violet-100",
  },
];

// Zodiac Icon Component
export const ZodiacIcon = ({
  sign,
  className = "",
  color = "currentColor",
}) => {
  const icons = {
    leo: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M12 3c-1.5 0-2.5 1.5-2.5 3s1 2.5 2.5 2.5 2.5-1 2.5-2.5-1-3-2.5-3zm-4 6c-2 0-3.5 1.5-3.5 3.5 0 1.5.8 2.8 2 3.5-.5 1-1 2.2-1 3.5 0 2 1.5 3.5 3.5 3.5s3-1.2 3-3c0 1.8 1 3 3 3s3.5-1.5 3.5-3.5c0-1.3-.5-2.5-1-3.5 1.2-.7 2-2 2-3.5 0-2-1.5-3.5-3.5-3.5-1.5 0-2.8.9-3.5 2.2-.7-1.3-2-2.2-3.5-2.2z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="17" cy="5" r="1.5" fill={color} />
        <circle cx="19" cy="7" r="1" fill={color} />
      </svg>
    ),
    aries: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M5 20V10c0-3.5 2.5-6 5.5-6 2 0 3.5 1 3.5 3s-1.5 3-3.5 3M19 20V10c0-3.5-2.5-6-5.5-6-2 0-3.5 1-3.5 3s1.5 3 3.5 3"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    taurus: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="15" r="6" stroke={color} strokeWidth="1.8" />
        <path
          d="M4 5c1 2 3 3 5 3M20 5c-1 2-3 3-5 3"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
    gemini: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M6 4h12M6 20h12M8 4v16M16 4v16"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="8" cy="10" r="1.5" fill={color} />
        <circle cx="16" cy="14" r="1.5" fill={color} />
      </svg>
    ),
    cancer: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M19 8c0-2.2-1.8-4-4-4-3 0-5 2-7 2-2.2 0-4 1.8-4 4M5 16c0 2.2 1.8 4 4 4 3 0 5-2 7-2 2.2 0 4-1.8 4-4"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="7" cy="8" r="2" fill={color} />
        <circle cx="17" cy="16" r="2" fill={color} />
      </svg>
    ),
    virgo: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M5 4v12c0 2.2 1.8 4 4 4M10 4v16M15 4v10c0 2 1 4 4 4 0 0 0-2-1-4M15 10c2 0 4-1 4-4"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    libra: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M4 18h16M4 14h16"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M12 14V8M8 8c0-2.2 1.8-4 4-4s4 1.8 4 4"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
    scorpio: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M4 4v12c0 2.2 1.8 4 4 4M10 4v16M16 4v14l3 3m0 0l-2-1m2 1l-1-2"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    sagittarius: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M4 20L20 4M20 4h-8M20 4v8M8 12l4 4"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    capricorn: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M4 10c0-3 2-6 5-6s4 2 4 5v7c0 2.2 1.8 4 4 4s4-1.8 4-4c0-3-2-5-4-5"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="17" cy="16" r="2" stroke={color} strokeWidth="1.5" />
      </svg>
    ),
    aquarius: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M4 9l3 2 4-4 4 4 5-2M4 16l3 2 4-4 4 4 5-2"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    pisces: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M4 12h16M6 4c3 0 6 3.5 6 8s-3 8-6 8M18 4c-3 0-6 3.5-6 8s3 8 6 8"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  };

  return icons[sign] || null;
};

// Element Icon Component
export const ElementIcon = ({ element, className = "" }) => {
  const icons = {
    Fire: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M12 2c0 4-4 6-4 10 0 3.3 2.7 6 6 6s6-2.7 6-6c0-6-8-10-8-10z"
          fill="currentColor"
          opacity="0.9"
        />
        <path
          d="M12 22c-2.2 0-4-1.8-4-4 0-2 2-3 2-5 0 2 2 3 2 5 0 2.2 1.8 4 0 4z"
          fill="currentColor"
          opacity="0.6"
        />
      </svg>
    ),
    Water: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M12 2L6 12c0 3.3 2.7 6 6 6s6-2.7 6-6L12 2z"
          fill="currentColor"
        />
      </svg>
    ),
    Earth: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.3" />
        <path
          d="M2 12h20M12 2v20M5 5l14 14M19 5L5 19"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
    ),
    Air: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M4 8h12c2 0 4-1 4-3s-2-3-4-3M4 12h16c2 0 3 1 3 2.5S22 17 20 17M4 16h10c1.5 0 3 1 3 2.5s-1.5 2.5-3 2.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  };
  return icons[element] || null;
};

// Orbital Rings animation background
const OrbitalRings = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
    {/* Outer ring */}
    <motion.div
      className="absolute w-[280px] h-[280px] rounded-full border border-white/20"
      animate={{ rotate: 360 }}
      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
    />
    {/* Middle ring */}
    <motion.div
      className="absolute w-[220px] h-[220px] rounded-full border border-white/15"
      animate={{ rotate: -360 }}
      transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
    />
    {/* Inner ring */}
    <motion.div
      className="absolute w-[160px] h-[160px] rounded-full border border-white/10"
      animate={{ rotate: 360 }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    />
    {/* Decorative dots on rings */}
    <motion.div
      className="absolute w-[280px] h-[280px]"
      animate={{ rotate: 360 }}
      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-white/40 rounded-full" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white/30 rounded-full" />
    </motion.div>
    <motion.div
      className="absolute w-[220px] h-[220px]"
      animate={{ rotate: -360 }}
      transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white/35 rounded-full" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white/25 rounded-full" />
    </motion.div>
  </div>
);

// Floating decorations
const FloatingDecorations = () => (
  <>
    {/* Top right flower/star decoration */}
    <motion.div
      className="absolute top-4 right-4"
      animate={{ rotate: [0, 15, -15, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="4" fill="white" opacity="0.9" />
        <circle cx="16" cy="6" r="3" fill="white" opacity="0.7" />
        <circle cx="16" cy="26" r="3" fill="white" opacity="0.7" />
        <circle cx="6" cy="16" r="3" fill="white" opacity="0.7" />
        <circle cx="26" cy="16" r="3" fill="white" opacity="0.7" />
        <circle cx="9" cy="9" r="2" fill="white" opacity="0.5" />
        <circle cx="23" cy="9" r="2" fill="white" opacity="0.5" />
        <circle cx="9" cy="23" r="2" fill="white" opacity="0.5" />
        <circle cx="23" cy="23" r="2" fill="white" opacity="0.5" />
      </svg>
    </motion.div>
    {/* Small star */}
    <motion.div
      className="absolute top-16 right-8"
      animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="white"
        opacity="0.7"
      >
        <path d="M6 0L7 5L12 6L7 7L6 12L5 7L0 6L5 5L6 0Z" />
      </svg>
    </motion.div>
  </>
);

const DailyHoroscope = () => {
  const [selectedSign, setSelectedSign] = useState("leo");
  const [horoscope, setHoroscope] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get current date formatted
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Get selected sign data
  const selectedSignData = zodiacSigns.find(
    (s) => s.name.toLowerCase() === selectedSign
  );

  // Fetch horoscope when sign changes
  useEffect(() => {
    const fetchHoroscope = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `/api/prokerala/horoscope?sign=${selectedSign}`
        );
        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setHoroscope(data.data);
      } catch (err) {
        setError(err.message || "Failed to fetch horoscope");
      } finally {
        setLoading(false);
      }
    };

    fetchHoroscope();
  }, [selectedSign]);

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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      key="horoscope"
      className="grid grid-cols-1 lg:grid-cols-[300px_1fr_1fr] gap-6 lg:gap-8 items-start"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: 20 }}
    >
      {/* LEFT PANEL - SIGN SELECTION */}
      <motion.div variants={itemVariants} className="lg:order-1 order-2">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-amber-500">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </span>
          <h3 className="text-lg font-serif italic font-semibold text-black">
            Select Sign
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-2 lg:gap-3">
          {zodiacSigns.map((sign, index) => (
            <motion.button
              key={sign.name}
              onClick={() => setSelectedSign(sign.name.toLowerCase())}
              className={`zodiac-pill flex items-center gap-2.5 px-3 lg:px-4 py-2.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                selectedSign === sign.name.toLowerCase()
                  ? "border-transparent shadow-lg"
                  : "border-gray-300 bg-white"
              }`}
              style={{
                "--hover-color": sign.color,
                "--hover-bg": `${sign.color}15`,
                background:
                  selectedSign === sign.name.toLowerCase()
                    ? `linear-gradient(135deg, ${sign.color} 0%, ${sign.color}dd 100%)`
                    : undefined,
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
            >
              <span
                className={`w-6 h-6 flex-shrink-0 ${
                  selectedSign === sign.name.toLowerCase() ? "text-white" : ""
                }`}
                style={{
                  color:
                    selectedSign === sign.name.toLowerCase()
                      ? "white"
                      : sign.color,
                }}
              >
                <ZodiacIcon sign={sign.icon} className="w-full h-full" />
              </span>
              <span
                className={`text-[15px] font-medium ${
                  selectedSign === sign.name.toLowerCase()
                    ? "text-white"
                    : "text-gray-700"
                }`}
              >
                {sign.name}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* CENTER - ZODIAC CARD */}
      <motion.div
        variants={cardVariants}
        className="lg:order-2 order-1 flex justify-center"
      >
        <motion.div
          className="relative w-full max-w-[320px] rounded-3xl overflow-hidden"
          style={{
            background: `linear-gradient(160deg, #f97316 0%, #fb923c 40%, #fbbf24 100%)`,
          }}
          animate={{
            boxShadow: [
              "0 25px 50px -12px rgba(249, 115, 22, 0.35)",
              "0 30px 60px -15px rgba(249, 115, 22, 0.4)",
              "0 25px 50px -12px rgba(249, 115, 22, 0.35)",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 35px 70px -15px rgba(249, 115, 22, 0.45)",
          }}
        >
          <OrbitalRings />

          <FloatingDecorations />

          <div className="relative z-10 p-6 min-h-[420px] flex flex-col">
            {/* Header with date and share */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-white text-sm font-medium">
                {currentDate}
              </span>
            </div>

            {/* Main zodiac symbol */}
            <div className="flex-1 flex flex-col items-center justify-center">
              <motion.div
                className="w-28 h-28 mb-6"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ZodiacIcon
                  sign={selectedSignData?.icon}
                  className="w-full h-full"
                  color="rgba(255,255,255,0.95)"
                />
              </motion.div>

              <motion.h2
                className="text-3xl font-semibold text-white mb-1"
                key={selectedSignData?.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {selectedSignData?.name}
              </motion.h2>

              <motion.p
                className="text-white/80 text-sm"
                key={selectedSignData?.dates}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                {selectedSignData?.dates}
              </motion.p>
            </div>

            {/* Footer with element and ruler */}
            <div className="flex bg-white/15 backdrop-blur-sm rounded-xl overflow-hidden">
              <div className="flex-1 py-4 px-5 border-r border-white/10">
                <span className="block text-sm uppercase tracking-wider text-white mb-1">
                  Element
                </span>
                <div className="flex items-center gap-1.5 text-white font-medium">
                  <ElementIcon
                    element={selectedSignData?.element}
                    className="w-4 h-4"
                  />
                  {selectedSignData?.element}
                </div>
              </div>
              <div className="flex-1 py-4 px-5">
                <span className="block text-sm uppercase tracking-wider text-white mb-1">
                  Ruler
                </span>
                <div className="flex items-center gap-1.5 text-white font-medium">
                  {selectedSignData?.ruler}
                  <Sun className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* RIGHT PANEL - PREDICTION */}
      <motion.div
        variants={itemVariants}
        className="lg:order-3 order-3 bg-white rounded-2xl p-6 shadow-xl shadow-gray-200/50"
      >
        {/* Lucky badges */}
        <div className="flex gap-4 mb-6">
          {/* Lucky Number */}
          <motion.div
            className="flex-1 flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100"
            whileHover={{ scale: 1.02, backgroundColor: "#f9fafb" }}
          >
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-bold text-sm">5</span>
            </div>
            <div>
              <span className="block text-sm uppercase tracking-wider text-gray-500 font-medium">
                Lucky Number
              </span>
              <span className="text-gray-900 font-semibold">
                {horoscope?.lucky_number || "5, 9"}
              </span>
            </div>
          </motion.div>

          {/* Lucky Color */}
          <motion.div
            className="flex-1 flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100"
            whileHover={{ scale: 1.02, backgroundColor: "#f9fafb" }}
          >
            <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#db2777">
                <path d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.04 10 9c0 3.31-2.69 6-6 6h-1.77c-.28 0-.5.22-.5.5 0 .12.05.23.13.33.41.47.64 1.06.64 1.67A2.5 2.5 0 0 1 12 22zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8c.28 0 .5-.22.5-.5a.54.54 0 0 0-.14-.35c-.41-.46-.63-1.05-.63-1.65a2.5 2.5 0 0 1 2.5-2.5H16c2.21 0 4-1.79 4-4 0-3.86-3.59-7-8-7z" />
                <circle cx="6.5" cy="11.5" r="1.5" />
                <circle cx="9.5" cy="7.5" r="1.5" />
                <circle cx="14.5" cy="7.5" r="1.5" />
                <circle cx="17.5" cy="11.5" r="1.5" />
              </svg>
            </div>
            <div>
              <span className="block text-sm uppercase tracking-wider text-gray-500 font-medium">
                Lucky Color
              </span>
              <span className="text-gray-900 font-semibold">
                {horoscope?.lucky_color || "Gold"}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Today's Prediction */}
        <div className="mb-6">
          <h3 className="text-xl font-serif italic font-semibold text-black mb-4">
            Today&apos;s Prediction
          </h3>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                className="flex items-center gap-3 py-8 justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <span className="text-gray-500 text-sm">
                  Reading the stars...
                </span>
              </motion.div>
            ) : error ? (
              <motion.p
                key="error"
                className="text-red-500 text-sm py-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {error}
              </motion.p>
            ) : (
              <motion.div
                key="prediction"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {horoscope?.daily_prediction?.prediction ||
                    horoscope?.prediction ||
                    `You are full of energy and ready to take on the world today, ${selectedSignData?.name}. The sun's position suggests a strong drive to achieve your personal goals. However, take a moment to ensure your roar doesn't drown out the valuable input of those around you. Collaboration is key to your success today.`}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Financially, a surprise gain is on the cards. Romance may take
                  a backseat as you focus on career, but a small gesture towards
                  your partner will go a long way.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-3">
          <motion.div
            className="flex-1"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <Button
              text="Read Full Report"
              fill
              right
              fullWidth
              icon={
                <motion.span
                  className="inline-block"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </motion.span>
              }
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DailyHoroscope;
