"use client";

import Image from "next/image";
import BlurText from "./shadcn/BlurText";
import Button from "./Button";
import { Calendar } from "lucide-react";

const Expertise = () => {
  // Map the expertise areas with enhanced descriptions matching the design
  const servicesData = [
    {
      id: 1,
      title: "Vedic Astrology",
      description:
        "Decode the cosmic blueprint of your life through ancient planetary wisdom. Our expert analysis provides deep insights into your personality, destiny, and life path.",
      icon: "/icons/vedic.png",
      gridClass: "bento-large",
    },
    {
      id: 2,
      title: "Gemstone Consult",
      description:
        "Harness the healing energy of precious stones aligned with your birth chart.",
      icon: "/icons/gems.png",
      gridClass: "bento-small",
    },
    {
      id: 3,
      title: "Numerology",
      description:
        "Unlock the mystical relationship between numbers and coinciding life events.",
      icon: "/icons/numerology.png",
      gridClass: "bento-small",
    },
    {
      id: 4,
      title: "BirthChart Analysis",
      description:
        "A deep dive into your Natal Chart to reveal strengths, weaknesses, and life path. Understand the karmic influences shaping your journey.",
      icon: "/icons/talkAstrologer.png",
      gridClass: "bento-medium",
    },
    {
      id: 5,
      title: "Vastu Shastra",
      description:
        "Harmonize your living and workspaces with the natural elements and directions to invite prosperity and peace.",
      icon: "/icons/vastu.png",
      gridClass: "bento-tall",
    },
    {
      id: 6,
      title: "Palmistry",
      description: "Read the lines of destiny etched in your hands.",
      icon: "/icons/palmistry.png",
      gridClass: "bento-small",
    },
    {
      id: 7,
      title: "Face Reading",
      description: "Analyze facial features for character insights.",
      icon: "/icons/face_reading.png",
      gridClass: "bento-small",
    },
    {
      id: 8,
      title: "Marriage Compatibility",
      description:
        "Ensure lasting harmony and bliss by matching horoscopes before tying the knot.",
      icon: "/icons/LoveCompatibility.png",
      gridClass: "bento-wide",
    },
  ];

  return (
    <section
      id="services"
      className="px-4 sm:px-8 lg:px-20 py-12 sm:py-16 lg:py-20 expertise-section"
    >
      {/* Header */}
      <div className="text-center mb-10 sm:mb-14">
        <div className="flex justify-center">
          <BlurText
            text="Services We Offer"
            className="text-3xl sm:text-4xl lg:text-5xl font-serif italic font-semibold textGradient mb-4"
            delay={100}
          />
        </div>
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Comprehensive Vedic solutions tailored to your unique life challenges.
          <br className="hidden sm:block" />
          Discover ancient wisdom harmonized for modern living.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="bento-grid max-w-6xl mx-auto">
        {servicesData.map((service) => (
          <div
            key={service.id}
            className={`bento-card border border-amber-300 hover:border-amber-600 ${service.gridClass}`}
          >
            <div className="bento-card-inner">
              <div className="bento-header">
                <div className="bento-icon">
                  <Image
                    src={service.icon}
                    alt={`${service.title} Icon`}
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </div>
                <h3 className="bento-title">{service.title}</h3>
              </div>
              <p className="bento-description">{service.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="flex justify-center mt-12 sm:mt-16">
        <Button
          text="Book a Consultation Today"
          icon={<Calendar />}
          right
          fill
          href="https://wa.me/+919090252584"
        />
      </div>
    </section>
  );
};

export default Expertise;
