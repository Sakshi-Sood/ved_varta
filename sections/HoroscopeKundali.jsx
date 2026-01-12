"use client";

import { useState, useEffect } from "react";
import BlurText from "@/components/shadcn/BlurText";
import Button from "@/components/Button";

const zodiacSigns = [
  { name: "Aries", icon: "♈", dates: "Mar 21 - Apr 19" },
  { name: "Taurus", icon: "♉", dates: "Apr 20 - May 20" },
  { name: "Gemini", icon: "♊", dates: "May 21 - Jun 20" },
  { name: "Cancer", icon: "♋", dates: "Jun 21 - Jul 22" },
  { name: "Leo", icon: "♌", dates: "Jul 23 - Aug 22" },
  { name: "Virgo", icon: "♍", dates: "Aug 23 - Sep 22" },
  { name: "Libra", icon: "♎", dates: "Sep 23 - Oct 22" },
  { name: "Scorpio", icon: "♏", dates: "Oct 23 - Nov 21" },
  { name: "Sagittarius", icon: "♐", dates: "Nov 22 - Dec 21" },
  { name: "Capricorn", icon: "♑", dates: "Dec 22 - Jan 19" },
  { name: "Aquarius", icon: "♒", dates: "Jan 20 - Feb 18" },
  { name: "Pisces", icon: "♓", dates: "Feb 19 - Mar 20" },
];

const HoroscopeKundali = () => {
  const [activeTab, setActiveTab] = useState("horoscope");
  const [selectedSign, setSelectedSign] = useState("aries");
  const [horoscope, setHoroscope] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Kundali matching states
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

    if (activeTab === "horoscope") {
      fetchHoroscope();
    }
  }, [selectedSign, activeTab]);

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
    <section className="py-16 px-5 sm:px-10 lg:px-44 bg-gradient-to-br from-amber-50/50 to-orange-50/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <BlurText
            text="Free Astrology Services"
            className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-3 textGradient justify-center"
            delay={50}
          />
          <p className="text-gray-700 sm:text-md max-w-2xl mx-auto">
            Explore your daily horoscope and check compatibility with our free
            kundali matching service powered by Vedic astrology.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab("horoscope")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer ${
              activeTab === "horoscope"
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg"
                : "bg-white text-amber-600 border-2 border-amber-400 hover:bg-amber-50"
            }`}
          >
            <i className="fas fa-sun mr-2" aria-label="true"></i>
            Daily Horoscope
          </button>
          <button
            onClick={() => setActiveTab("kundali")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer ${
              activeTab === "kundali"
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg"
                : "bg-white text-amber-600 border-2 border-amber-400 hover:bg-amber-50"
            }`}
          >
            <i className="fas fa-heart mr-2" aria-label="true"></i>
            Kundali Matching
          </button>
        </div>

        {/* Horoscope Tab Content */}
        {activeTab === "horoscope" && (
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            {/* Zodiac Sign Selector */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                Select Your Zodiac Sign
              </h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2 sm:gap-3">
                {zodiacSigns.map((sign) => (
                  <button
                    key={sign.name}
                    onClick={() => setSelectedSign(sign.name.toLowerCase())}
                    className={`flex flex-col items-center p-2 sm:p-3 rounded-xl transition-all duration-300 cursor-pointer ${
                      selectedSign === sign.name.toLowerCase()
                        ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg scale-105"
                        : "bg-amber-50 text-gray-700 hover:bg-amber-100 hover:scale-105"
                    }`}
                    title={sign.dates}
                  >
                    <span className="text-2xl sm:text-3xl mb-1">
                      {sign.icon}
                    </span>
                    <span className="text-xs font-medium hidden sm:block">
                      {sign.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Horoscope Display */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6">
              {loading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
                  <p className="mt-3 text-gray-700">
                    Loading your horoscope...
                  </p>
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <i className="fas fa-exclamation-circle text-red-500 text-3xl mb-3"></i>
                  <p className="text-red-600">{error}</p>
                  <button
                    onClick={() => setSelectedSign(selectedSign)}
                    className="mt-4 text-amber-600 underline"
                  >
                    Try Again
                  </button>
                </div>
              ) : horoscope ? (
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-5xl">
                      {
                        zodiacSigns.find(
                          (s) => s.name.toLowerCase() === selectedSign
                        )?.icon
                      }
                    </span>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 capitalize">
                        {selectedSign}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {
                          zodiacSigns.find(
                            (s) => s.name.toLowerCase() === selectedSign
                          )?.dates
                        }
                      </p>
                    </div>
                  </div>
                  <div className="prose prose-amber max-w-none">
                    <p className="text-gray-700 leading-relaxed text-justify">
                      {horoscope?.daily_prediction?.prediction ||
                        horoscope?.prediction ||
                        "Your horoscope reading will appear here. Stay positive and embrace the cosmic energy of the day!"}
                    </p>
                  </div>
                  {horoscope?.lucky_number && (
                    <div className="mt-4 flex flex-wrap gap-4">
                      <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                        Lucky Number: {horoscope.lucky_number}
                      </span>
                      {horoscope?.lucky_color && (
                        <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                          Lucky Color: {horoscope.lucky_color}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-600">
                  Select a zodiac sign to view your daily horoscope
                </div>
              )}
            </div>
          </div>
        )}

        {/* Kundali Matching Tab Content */}
        {activeTab === "kundali" && (
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
              <i className="fas fa-om text-amber-500 mr-2"></i>
              Kundali Matching (Ashtakoot Milan)
            </h3>

            <form onSubmit={handleKundaliSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Girl's Details */}
                <div className="bg-pink-50 rounded-xl p-5">
                  <h4 className="text-lg font-semibold text-pink-700 mb-4 flex items-center">
                    <i className="fas fa-venus mr-2"></i>
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
                        className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent"
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
                        className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent"
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
                        className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Boy's Details */}
                <div className="bg-blue-50 rounded-xl p-5">
                  <h4 className="text-lg font-semibold text-blue-700 mb-4 flex items-center">
                    <i className="fas fa-mars mr-2"></i>
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
                        className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
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
                        className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
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
                        className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button
                  text={
                    kundaliLoading ? "Calculating..." : "Check Compatibility"
                  }
                  type="submit"
                  fill
                  disabled={kundaliLoading}
                  icon={<i className="fas fa-heart-circle-check"></i>}
                />
              </div>
            </form>

            {/* Kundali Result */}
            {kundaliError && (
              <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                <i className="fas fa-exclamation-circle text-red-500 mr-2"></i>
                <span className="text-red-700">{kundaliError}</span>
              </div>
            )}

            {kundaliResult && (
              <div className="mt-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6">
                <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">
                  <i className="fas fa-stars text-amber-500 mr-2"></i>
                  Matching Result
                </h4>

                {/* Total Score */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg">
                    <div>
                      <span className="text-4xl font-bold">
                        {kundaliResult?.total_points ||
                          kundaliResult?.guna_milan?.total_points ||
                          "N/A"}
                      </span>
                      <span className="text-lg">/36</span>
                    </div>
                  </div>
                  <p className="mt-3 text-gray-700 font-medium">
                    {(kundaliResult?.total_points ||
                      kundaliResult?.guna_milan?.total_points ||
                      0) >= 18
                      ? "✨ Good Match! The stars favor this union."
                      : "⚠️ Further consultation recommended."}
                  </p>
                </div>

                {/* Guna Details */}
                {(kundaliResult?.guna_milan?.guna || kundaliResult?.gunas) && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {(
                      kundaliResult?.guna_milan?.guna ||
                      kundaliResult?.gunas ||
                      []
                    ).map((guna, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg p-3 text-center shadow-sm"
                      >
                        <h5 className="text-sm font-semibold text-amber-700">
                          {guna.name}
                        </h5>
                        <p className="text-lg font-bold text-gray-800">
                          {guna.obtained_points || guna.points || 0}/
                          {guna.maximum_points || guna.max_points || 0}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <p className="mt-6 text-center text-sm text-gray-600">
                  <i className="fas fa-info-circle mr-1"></i>
                  For detailed analysis, please consult with Acharya Ji for
                  personalized guidance.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default HoroscopeKundali;
