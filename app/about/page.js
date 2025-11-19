import CTA from "../../components/CTA";
import Image from "next/image";

const stats = [
  { number: "5,190+", label: "Consultations" },
  { number: "12+", label: "Years Experience" },
  { number: "98%", label: "Client Satisfaction" },
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
          {/* Left Column - Empty spacer for layout consistency */}
          <div className="hidden lg:block lg:w-1/3 lg:flex-shrink-0" />

          {/* Right Column - Main Content */}
          <div className="lg:w-2/3 lg:flex-grow space-y-4 md:space-y-6">
            {/* Stats */}
            <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="flex-1 min-w-[100px] bg-white/60 rounded-lg md:rounded-xl p-2 sm:p-3 md:p-4 lg:p-6 text-center shadow-md"
                >
                  <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-orange-400 mb-1 md:mb-2">{stat.number}</div>
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