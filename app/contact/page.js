import React from 'react';
import Button from '../../components/Button';
import CTA from '../../components/CTA';
import Image from 'next/image';
import Link from 'next/link';

const ContactPage = () => {
  const stats = [
    { number: "5,000+", label: "Consultations" },
    { number: "12+", label: "Years Experience" },
    { number: "98%", label: "Success Rate" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-200/70 via-yellow-200/50 to-amber-200/70">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-400/70 via-orange-400 to-amber-400/70 text-white py-6 md:py-8">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 bg-white/25 rounded-full text-xs md:text-sm font-semibold mb-2 md:mb-3">
            Meet Our Expert
          </span>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 md:mb-3 px-2">
            Acharya Anoop Tripathi
          </h1>
          <p className="text-sm sm:text-base lg:text-lg max-w-3xl mx-auto text-balance px-2">
            Renowned Vedic Astrologer, Vastu Expert & Spiritual Guide
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-6 md:py-10 lg:py-12 flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8">
        {/* Left Column - Profile Card */}
        <div className="lg:w-1/3 lg:flex-shrink-0">
          <div className="bg-white/60 rounded-2xl shadow-lg p-3 sm:p-4 md:p-6 sticky top-8">
            {/* Profile Image */}
            <div className="text-center mb-4 md:mb-6">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 mx-auto mb-3 md:mb-4">
                <div className="w-full h-full rounded-full border-3 md:border-4 border-orange-300">
                  <Image
                    src="/images/acharyaAnoop.jpg"
                    alt="Acharya Anoop Tripathi"
                    width={144}
                    height={144}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 w-6 h-6 md:w-7 md:h-7 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-white text-xs md:text-sm">✓</span>
                </div>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-1 md:mb-2">
                Acharya Anoop Tripathi
              </h2>
              <p className="text-orange-500 font-semibold mb-2 text-sm md:text-base">M.A. Jyotish Shastra</p>

              {/* Rating */}
              <div className="flex justify-center items-center mb-3 md:mb-4">
                <div className="flex text-yellow-400 text-sm md:text-base">
                  ★★★★★
                </div>
                <span className="ml-2 text-gray-600 text-sm">(4.9/5)</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
              <div className="flex items-center text-gray-600 text-sm md:text-base">
                <span className="mr-3">📍</span>
                <span>Indore, Madhya Pradesh</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm md:text-base">
                <span className="mr-3">🕒</span>
                <span>Available: 9 AM - 9 PM</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm md:text-base">
                <span className="mr-3">🗣️</span>
                <span>Hindi, Sanskrit</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-2 md:space-y-3">
              <Link href="tel:+919090252584" className="w-full">
                <Button text="📞 Book Consultation" fill={true} fullWidth />
              </Link>
              <Link href="https://wa.me/+919090252584" className="w-full">
                <Button icon={<i className="fab fa-whatsapp" aria-hidden="true"></i>} text="Send Message" fill={false} fullWidth />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column - Main Content */}
        <div className="lg:w-2/3 lg:flex-grow space-y-4 md:space-y-6">
          {/* Statistics */}
          <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="flex-1 min-w-[100px] bg-white/60 rounded-lg md:rounded-xl p-2 sm:p-3 md:p-4 lg:p-6 text-center shadow-md">
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-orange-400 mb-1 md:mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-xs sm:text-sm md:text-base font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* About Section */}
          <div className="bg-white/60 rounded-2xl p-4 md:p-6 lg:p-8 shadow-lg">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-3 md:mb-4 text-center">
              About Acharya Anoop Tripathi
            </h2>
            <div className="space-y-3 text-sm text-justify md:text-base text-gray-700 leading-relaxed">
              <p>
                Acharya Anoop is a highly esteemed practitioner specializing in Vedic Astrology, Vastu, Ashtakvarga, Palmistry, Face Reading, and Muhurta, with over a decade of experience guiding individuals towards clarity and harmony. His comprehensive expertise in these ancient disciplines offers a profound understanding of both celestial and terrestrial influences on life.
              </p>
              <p>
                Acharya Anoop&apos;s journey into these mystical arts began years ago, driven by a passion for exploring the deep connections between the cosmos and human existence. His proficiency in Vedic Astrology provides detailed insights into the planetary influences affecting personal and professional spheres. His knowledge of Vastu harmonizes living and working spaces with natural energies, while his skills in Ashtakvarga offer intricate astrological analysis. In addition, his mastery of Palmistry and Face Reading reveals personal traits and potential paths, and his expertise in Muhurta ensures that important decisions are made at the most auspicious times.
              </p>

            </div>
          </div>

          <CTA />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;