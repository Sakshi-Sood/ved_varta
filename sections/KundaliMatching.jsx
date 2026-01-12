"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Button from "@/components/Button";
import {
  CheckCircle2,
  MapPin,
  RefreshCw,
  Share2,
  Download,
  AlertTriangle,
  FileText,
} from "lucide-react";

// Circular Progress Ring Component
const CircularProgress = ({ score, maxScore = 36 }) => {
  const percentage = (score / maxScore) * 100;
  const radius = 70;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-44 h-44">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
        {/* Background circle */}
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="#f3f4f6"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <motion.circle
          cx="80"
          cy="80"
          r={radius}
          stroke="#d97706"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-5xl font-bold text-amber-600"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          {score}
        </motion.span>
        <motion.span
          className="text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          out of {maxScore}
        </motion.span>
      </div>
    </div>
  );
};

// Guna Card Component
const GunaCard = ({ guna, index }) => {
  const percentage = (guna.obtained / guna.max) * 100;
  const getScoreColor = () => {
    if (percentage >= 75)
      return { bg: "bg-emerald-500", text: "text-emerald-600" };
    if (percentage >= 40) return { bg: "bg-amber-500", text: "text-amber-600" };
    return { bg: "bg-red-500", text: "text-red-600" };
  };
  const colors = getScoreColor();

  return (
    <motion.div
      className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 + index * 0.08, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between mb-1">
        <h5 className="font-semibold text-gray-800">{guna.name}</h5>
        <span className={`text-sm font-bold ${colors.text}`}>
          {guna.obtained} / {guna.max}
        </span>
      </div>
      <p className="text-xs text-gray-500 mb-3">{guna.description}</p>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${colors.bg} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{
            delay: 0.6 + index * 0.08,
            duration: 0.6,
            ease: "easeOut",
          }}
        />
      </div>
    </motion.div>
  );
};

// Female symbol icon
const FemaleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <circle
      cx="12"
      cy="8"
      r="5"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <line
      x1="12"
      y1="13"
      x2="12"
      y2="21"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line
      x1="9"
      y1="18"
      x2="15"
      y2="18"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

// Male symbol icon
const MaleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <circle
      cx="10"
      cy="14"
      r="5"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <line
      x1="14"
      y1="10"
      x2="20"
      y2="4"
      stroke="currentColor"
      strokeWidth="2"
    />
    <polyline
      points="15,4 20,4 20,9"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

const KundaliMatching = () => {
  const [showResults, setShowResults] = useState(false);
  const [kundaliResult, setKundaliResult] = useState(null);
  const [kundaliLoading, setKundaliLoading] = useState(false);
  const [kundaliError, setKundaliError] = useState(null);
  const [formData, setFormData] = useState({
    girlName: "",
    girlDob: "",
    girlTob: "",
    girlPob: "",
    boyName: "",
    boyDob: "",
    boyTob: "",
    boyPob: "",
  });

  // Sample result data for display (matching the reference UI)
  const sampleGunas = [
    { name: "Varna", description: "Work compatibility", obtained: 1, max: 1 },
    { name: "Vashya", description: "Dominance", obtained: 2, max: 2 },
    { name: "Tara", description: "Destiny", obtained: 1.5, max: 3 },
    { name: "Yoni", description: "Mentality", obtained: 3, max: 4 },
    { name: "Graha Maitri", description: "Friendship", obtained: 5, max: 5 },
    { name: "Gana", description: "Temperament", obtained: 6, max: 6 },
    { name: "Bhakoot", description: "Love", obtained: 7, max: 7 },
    { name: "Nadi", description: "Health", obtained: 1.5, max: 8 },
  ];

  // Kundali submit handler
  const handleKundaliSubmit = async (e) => {
    e.preventDefault();
    setKundaliLoading(true);
    setKundaliError(null);

    try {
      const response = await fetch("/api/prokerala/kundali", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          girlDob: formData.girlDob,
          girlTob: formData.girlTob,
          boyDob: formData.boyDob,
          boyTob: formData.boyTob,
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setKundaliResult(data.data);
      setShowResults(true);
    } catch (err) {
      setKundaliError(err.message || "Failed to calculate kundali matching");
    } finally {
      setKundaliLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckAnother = () => {
    setShowResults(false);
    setKundaliResult(null);
  };

  // Get display values
  const brideName = formData.girlName || "Ananya";
  const groomName = formData.boyName || "Rahul";
  const totalScore =
    kundaliResult?.total_points ||
    kundaliResult?.guna_milan?.total_points ||
    27;

  // Map API gunas to display format or use sample
  const displayGunas =
    kundaliResult?.guna_milan?.guna?.map((g) => ({
      name: g.name,
      description: g.description || "",
      obtained: g.obtained_points || g.points || 0,
      max: g.maximum_points || g.max_points || 0,
    })) ||
    kundaliResult?.gunas?.map((g) => ({
      name: g.name,
      description: g.description || "",
      obtained: g.obtained_points || g.points || 0,
      max: g.maximum_points || g.max_points || 0,
    })) ||
    sampleGunas;

  // Check for Nadi Dosha (low Nadi score)
  const nadiGuna = displayGunas.find((g) => g.name.toLowerCase() === "nadi");
  const hasNadiDosha = nadiGuna && nadiGuna.obtained / nadiGuna.max < 0.5;

  return (
    <motion.div
      className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-6 sm:p-8 lg:p-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence mode="wait">
        {!showResults ? (
          /* ==================== FORM VIEW ==================== */
          <motion.div
            key="form"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {/* Header */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-7 h-7 text-amber-500" />
                Kundali Matching (Ashtakoot Milan)
              </h3>
            </motion.div>

            <form onSubmit={handleKundaliSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Bride's Details */}
                <motion.div
                  className="bg-gradient-to-br from-pink-50/80 to-rose-50/60 rounded-2xl p-5 border border-pink-100"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h4 className="text-lg font-semibold text-rose-500 mb-5 flex items-center gap-2">
                    <span className="text-rose-400">♀</span>
                    Bride's Details
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Name
                      </label>
                      <input
                        type="text"
                        name="girlName"
                        value={formData.girlName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all outline-none text-gray-700 placeholder:text-gray-400"
                        placeholder="Enter bride's name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Date of Birth <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          name="girlDob"
                          value={formData.girlDob}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all outline-none text-gray-700"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Time of Birth <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="time"
                          name="girlTob"
                          value={formData.girlTob}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all outline-none text-gray-700"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Place of Birth
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="girlPob"
                          value={formData.girlPob}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all outline-none text-gray-700 placeholder:text-gray-400 pr-10"
                          placeholder="Enter city name"
                        />
                        <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500" />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Groom's Details */}
                <motion.div
                  className="bg-gradient-to-br from-blue-50/80 to-indigo-50/60 rounded-2xl p-5 border border-blue-100"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h4 className="text-lg font-semibold text-blue-500 mb-5 flex items-center gap-2">
                    <span className="text-blue-400">♂</span>
                    Groom's Details
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Name
                      </label>
                      <input
                        type="text"
                        name="boyName"
                        value={formData.boyName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all outline-none text-gray-700 placeholder:text-gray-400"
                        placeholder="Enter groom's name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Date of Birth <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          name="boyDob"
                          value={formData.boyDob}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all outline-none text-gray-700"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Time of Birth <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="time"
                          name="boyTob"
                          value={formData.boyTob}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all outline-none text-gray-700"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Place of Birth
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="boyPob"
                          value={formData.boyPob}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all outline-none text-gray-700 placeholder:text-gray-400 pr-10"
                          placeholder="Enter city name"
                        />
                        <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Submit Button */}
              <motion.div
                className="pt-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  text={
                    kundaliLoading ? "Calculating..." : "Check Compatibility"
                  }
                  type="submit"
                  fill
                  disabled={kundaliLoading}
                  icon={
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  }
                />
              </motion.div>
            </form>

            {/* Error Display */}
            <AnimatePresence>
              {kundaliError && (
                <motion.div
                  className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <span className="text-red-700">{kundaliError}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* ==================== RESULTS VIEW ==================== */
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {/* Header */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center justify-center gap-2 mb-2">
                <CheckCircle2 className="w-7 h-7 text-amber-500" />
                Kundali Matching (Ashtakoot Milan)
              </h3>
              <p className="text-gray-500">
                Detailed compatibility report for {brideName} & {groomName}
              </p>
            </motion.div>

            {/* Score & Summary Section */}
            <motion.div
              className="flex flex-col lg:flex-row items-center gap-8 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {/* Circular Score */}
              <div className="flex-shrink-0">
                <CircularProgress score={totalScore} maxScore={36} />
              </div>

              {/* Match Summary */}
              <div className="flex-1 text-center lg:text-left">
                <motion.span
                  className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 text-sm font-semibold rounded-full mb-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Highly Compatible
                </motion.span>
                <motion.h4
                  className="text-2xl font-bold text-gray-800 mb-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Excellent Match
                </motion.h4>
                <motion.p
                  className="text-gray-600 leading-relaxed mb-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  The compatibility between {brideName} and {groomName} is very
                  strong. With a score of {totalScore} out of 36, this union is
                  considered auspicious according to Vedic Astrology. The couple
                  shares excellent mental compatibility and mutual respect.
                </motion.p>

                {/* Bride & Groom Pills */}
                <motion.div
                  className="flex flex-wrap justify-center lg:justify-start gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-pink-50 text-pink-700 rounded-full text-sm font-medium border border-pink-100">
                    <FemaleIcon />
                    {brideName} (Bride)
                  </span>
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border border-gray-200">
                    <MaleIcon />
                    {groomName} (Groom)
                  </span>
                </motion.div>
              </div>
            </motion.div>

            {/* Guna Milan Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
                <FileText className="w-5 h-5 text-gray-600" />
                Guna Milan Details
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {displayGunas.map((guna, index) => (
                  <GunaCard key={guna.name} guna={guna} index={index} />
                ))}
              </div>
            </motion.div>

            {/* Nadi Dosha Alert */}
            {hasNadiDosha && (
              <motion.div
                className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-semibold text-gray-800 mb-1">
                    Nadi Dosha Detected
                  </h5>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    There is a minor Nadi Dosha present. However, the high
                    overall score mitigates its effects. Consult an astrologer
                    for specific remedies.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <button
                onClick={handleCheckAnother}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium transition-colors group"
              >
                <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                Check Another Match
              </button>

              <div className="flex items-center gap-3">
                <motion.button
                  className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-full text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all hover:shadow-sm active:scale-95"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </motion.button>
                <motion.button
                  className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-white rounded-full font-medium hover:bg-amber-600 transition-all shadow-lg shadow-amber-200/50 hover:shadow-xl hover:shadow-amber-300/50 active:scale-95"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-4 h-4" />
                  Download PDF Report
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default KundaliMatching;
