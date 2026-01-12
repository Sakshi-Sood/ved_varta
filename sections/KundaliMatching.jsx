"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Button from "@/components/Button";

const KundaliMatching = () => {
  const [kundaliResult, setKundaliResult] = useState(null);
  const [kundaliLoading, setKundaliLoading] = useState(false);
  const [kundaliError, setKundaliError] = useState(null);
  const [formData, setFormData] = useState({
    girlName: "",
    girlDob: "",
    girlTob: "",
    boyName: "",
    boyDob: "",
    boyTob: "",
  });

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

  return (
    <motion.div
      key="kundali"
      className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-6 sm:p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h3
        className="text-xl font-serif italic font-semibold text-black mb-6 text-center flex items-center justify-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="text-amber-500"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
            fill="currentColor"
          />
        </svg>
        Kundali Matching (Ashtakoot Milan)
      </motion.h3>

      <form onSubmit={handleKundaliSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Girl's Details */}
          <motion.div
            className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-5 border border-pink-100"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-lg font-serif italic font-semibold text-black mb-4 flex items-center gap-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2a4 4 0 0 0-4 4v2H6v14h12V8h-2V6a4 4 0 0 0-4-4zm0 2a2 2 0 0 1 2 2v2h-4V6a2 2 0 0 1 2-2z" />
              </svg>
              Bride&apos;s Details
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="girlName"
                  value={formData.girlName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all outline-none"
                  placeholder="Enter bride's name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="girlDob"
                  value={formData.girlDob}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  name="girlTob"
                  value={formData.girlTob}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all outline-none"
                />
              </div>
            </div>
          </motion.div>

          {/* Boy's Details */}
          <motion.div
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-100"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-lg font-serif italic font-semibold text-black mb-4 flex items-center gap-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <circle cx="12" cy="4" r="2" />
                <path d="M15.89 8.11C15.5 7.72 14.83 7 13.53 7h-3.06c-1.3 0-1.97.72-2.36 1.11L5.69 10.5c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L9 10v12h2v-5h2v5h2V10l1.89 1.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41l-2.41-2.37z" />
              </svg>
              Groom&apos;s Details
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="boyName"
                  value={formData.boyName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all outline-none"
                  placeholder="Enter groom's name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="boyDob"
                  value={formData.boyDob}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  name="boyTob"
                  value={formData.boyTob}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all outline-none"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            text={kundaliLoading ? "Calculating..." : "Check Compatibility"}
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

      {/* Kundali Error */}
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

      {/* Kundali Result */}
      <AnimatePresence>
        {kundaliResult && (
          <motion.div
            className="mt-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <h4 className="text-xl font-serif italic font-semibold text-black mb-4 text-center flex items-center justify-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#f59e0b">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              Matching Result
            </h4>

            {/* Total Score */}
            <div className="text-center mb-6">
              <motion.div
                className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-orange-300/50"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2,
                }}
              >
                <div>
                  <span className="text-4xl font-bold">
                    {kundaliResult?.total_points ||
                      kundaliResult?.guna_milan?.total_points ||
                      "N/A"}
                  </span>
                  <span className="text-lg">/36</span>
                </div>
              </motion.div>
              <motion.p
                className="mt-3 text-gray-700 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {(kundaliResult?.total_points ||
                  kundaliResult?.guna_milan?.total_points ||
                  0) >= 18
                  ? "✨ Good Match! The stars favor this union."
                  : "⚠️ Further consultation recommended."}
              </motion.p>
            </div>

            {/* Guna Details */}
            {(kundaliResult?.guna_milan?.guna || kundaliResult?.gunas) && (
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-4 gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {(
                  kundaliResult?.guna_milan?.guna ||
                  kundaliResult?.gunas ||
                  []
                ).map((guna, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-xl p-3 text-center shadow-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                  >
                    <h5 className="text-sm font-semibold text-amber-700">
                      {guna.name}
                    </h5>
                    <p className="text-lg font-bold text-gray-800">
                      {guna.obtained_points || guna.points || 0}/
                      {guna.maximum_points || guna.max_points || 0}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            )}

            <motion.p
              className="mt-6 text-center text-sm text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              For detailed analysis, please consult with Acharya Ji for
              personalized guidance.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default KundaliMatching;
