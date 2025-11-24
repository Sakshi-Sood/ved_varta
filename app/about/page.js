"use client";

import CTA from "../../components/CTA";
import Image from "next/image";
import Button from "../../components/Button";
import Link from "next/link";
import CountUp from "../../components/shadcn/CountUp";
import { Star, MapPin, Clock, Languages, Phone } from "lucide-react";

const stats = [
  { number: 5190, label: "Consultations", suffix: "+" },
  { number: 12, label: "Years Experience", suffix: "+" },
  { number: 98, label: "Client Satisfaction", suffix: "%" },
];

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-200/70 via-yellow-200/50 to-amber-200/70">
      {/* Hero */}
      <section className="bg-gradient-to-r from-amber-400/70 via-orange-400 to-amber-400/70 text-white py-6 md:py-8">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 bg-white/25 rounded-full text-xs md:text-sm font-semibold mb-2 md:mb-3">
            About Us
          </span>
          <div className="flex items-center justify-center gap-4 md:gap-6 lg:gap-8 mb-2 md:mb-3">

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight px-2">
              Ancient Wisdom for Modern Life
            </h1>

          </div>
          <p className="text-sm sm:text-base lg:text-lg max-w-3xl mx-auto text-balance px-2">
            Blending classical Vedic knowledge with compassionate guidance to help
            you make timely, positive decisions.
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-10 py-6 md:py-10 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8">
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

                <div className="flex justify-center items-center mb-3 md:mb-4">
                  <div className="flex text-yellow-400 text-sm md:text-base gap-1">
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                  </div>
                  <span className="ml-2 text-gray-600 text-sm">(4.9/5)</span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                <div className="flex items-center text-gray-600 text-sm md:text-base">
                  <MapPin size={18} className="mr-3 flex-shrink-0" />
                  <span>Indore, Madhya Pradesh</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm md:text-base">
                  <Clock size={18} className="mr-3 flex-shrink-0" />
                  <span>Available: 9 AM - 9 PM</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm md:text-base">
                  <Languages size={18} className="mr-3 flex-shrink-0" />
                  <span>Hindi, Sanskrit</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-2 md:space-y-3">
                <Link href="tel:+919090252584" className="w-full">
                  <Button icon={<Phone size={18} />} text="Book Consultation" fill={true} fullWidth />
                </Link>
                <Link href="https://wa.me/+919090252584" className="w-full">
                  <Button icon={<i className="fab fa-whatsapp" aria-hidden="true"></i>} text="Send Message" fill={false} fullWidth />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:w-2/3 lg:flex-grow space-y-4 md:space-y-6">
            {/* Stats */}
            <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="flex-1 min-w-[100px] bg-white/60 rounded-lg md:rounded-xl p-2 sm:p-3 md:p-4 lg:p-6 text-center shadow-md"
                >
                  <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-orange-400 mb-1 md:mb-2">
                    <CountUp
                      from={0}
                      to={stat.number}
                      separator=","
                      direction="up"
                      duration={0.5}
                      className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-orange-400"
                    />
                    {stat.suffix}
                  </div>
                  <div className="text-gray-600 text-xs sm:text-sm md:text-base font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Intro */}
            <div className="bg-white/60 rounded-2xl p-4 md:p-6 lg:p-8 shadow-lg">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 text-center mb-3 md:mb-4">Our Mission</h2>
              <div className="space-y-3 text-sm text-justify md:text-base text-gray-700 leading-relaxed">
                <p>
                  Ved Varta is a dedicated platform for the timeless wisdom of Jyotish (Vedic Astrology), Dharmshastra, spiritual remedies, and authentic Vedic knowledge. Rooted in the ancient traditions of Sanatan Dharma, we aim to bring clarity, guidance, and spiritual empowerment to every seeker.
                </p>
                <p>
                  At Ved Varta, we believe that the Vedas are not just scriptures but a living science that offers practical answers to life&apos;s deepest questions. Our mission is to simplify and spread the profound teachings of our sages through modern mediums—making Vedic insights accessible to all.
                </p>
                <p>
                  Whether you&apos;re seeking astrological guidance, exploring Vedic rituals, or learning about karmic remedies, Ved Varta offers authentic content based on scriptural authority and spiritual depth.
                </p>
                <p>
                  We specialize in astrological remedies based on planetary positions, doshas, and karmic imbalances—offering time-tested solutions like mantra, tantra, yantra, and puja-based guidance. Each remedy is suggested with deep respect for scriptural authority and tailored to the individual&apos;s spiritual and practical needs.
                </p>
              </div>
            </div>

            <CTA />
          </div>
        </div>
      </section>
    </main >
  );
}

export default AboutPage;