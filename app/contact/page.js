import React from 'react';
import Button from '../../components/Button';
import CTA from '../../components/CTA';
import Image from 'next/image';
import Link from 'next/link';
import Expertise from '../../components/Expertise';

const ContactPage = () => {
  const stats = [
    { number: "5,000+", label: "Consultations" },
    { number: "12+", label: "Years Experience" },
    { number: "98%", label: "Success Rate" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-200/70 via-yellow-200/50 to-amber-200/70">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-400/70 via-orange-400 to-amber-400/70 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4">
            <span className="inline-flex items-center px-4 py-2 bg-white/25 rounded-full text-sm font-semibold">
              Meet Our Expert
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Acharya Anoop Tripathi
          </h1>
          <p className="text-xl lg:text-2xl max-w-3xl mx-auto">
            Renowned Vedic Astrologer, Vastu Expert & Spiritual Guide
          </p>
        </div>
      </div>

      <div className="container mx-auto px-10 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              {/* Profile Image */}
              <div className="text-center mb-6">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <div className="w-full h-full rounded-full border-4 border-orange-300">
                    <Image
                      src="/images/acharyaAnoop.jpg"
                      alt="Acharya Anoop Tripathi"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Acharya Anoop Tripathi
                </h2>
                <p className="text-orange-500 font-semibold mb-2">M.A. Jyotish Shastra</p>

                {/* Rating */}
                <div className="flex justify-center items-center mb-4">
                  <div className="flex text-yellow-400 text-lg">
                    ★★★★★
                  </div>
                  <span className="ml-2 text-gray-600">(4.9/5)</span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-600">
                  <span className="mr-3">📍</span>
                  <span>Indore, Madhya Pradesh</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="mr-3">🕒</span>
                  <span>Available: 9 AM - 9 PM</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="mr-3">🗣️</span>
                  <span>Hindi, Sanskrit</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-3">
                <Link href="tel:+919090252584"><Button text="📞 Book Consultation" fill={true} /></Link>
                <Link href="https://wa.me/+919090252584">
                  <Button icon={<i className="fab fa-whatsapp" aria-hidden="true"></i>} text="Send Message" fill={false} />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Statistics */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-6 text-center shadow-md">
                  <div className="text-3xl font-bold text-orange-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 text-sm md:text-md font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* About Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                About Acharya Anoop Tripathi
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Acharya Anoop is a highly esteemed practitioner specializing in Vedic Astrology, Vastu, Ashtakvarga, Palmistry, Face Reading, and Muhurta, with over a decade of experience guiding individuals towards clarity and harmony. His comprehensive expertise in these ancient disciplines offers a profound understanding of both celestial and terrestrial influences on life.
                </p>
                <p>
                  Acharya Anoop&apos;s journey into these mystical arts began years ago, driven by a passion for exploring the deep connections between the cosmos and human existence. His proficiency in Vedic Astrology provides detailed insights into the planetary influences affecting personal and professional spheres. His knowledge of Vastu harmonizes living and working spaces with natural energies, while his skills in Ashtakvarga offer intricate astrological analysis. In addition, his mastery of Palmistry and Face Reading reveals personal traits and potential paths, and his expertise in Muhurta ensures that important decisions are made at the most auspicious times.
                </p>
                <p>
                  Fluent in Hindi, Acharya Anoop offers his guidance in a culturally resonant manner, ensuring that his insights are both accessible and deeply impactful. His compassionate and personalized approach creates a supportive environment, empowering clients to navigate their lives with confidence and clarity.
                </p>
                <p>
                  Embark on a transformative journey with Acharya Anoop and experience the profound wisdom and empowerment that Vedic Astrology, Vastu, Ashtakvarga, Palmistry, Face Reading, and Muhurta offer. Let him illuminate your path, revealing the insights and opportunities that lie ahead, and guide you towards a more harmonious and fulfilling life.
                </p>
              </div>
            </div>

            {/* Areas of Expertise */}
            <Expertise />

            <CTA />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;