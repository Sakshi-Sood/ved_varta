import CTA from "../../components/CTA";

const stats = [
  { number: "5,190+", label: "Consultations" },
  { number: "12+", label: "Years Experience" },
  { number: "98%", label: "Client Satisfaction" },
];

const AboutPage = () => {
  return (
    <main className="bg-gradient-to-br from-amber-200/80 via-yellow-100/60 to-amber-200/70 min-h-screen">
      {/* Hero */}
      <section className="py-12 bg-gradient-to-r from-amber-400/70 via-orange-400 to-amber-400/70 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-flex items-center px-4 py-2 bg-white/25 rounded-full text-sm font-semibold mb-4">
            About VedVarta
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Ancient Wisdom for Modern Life
          </h1>
          <p className="text-lg lg:text-xl max-w-3xl mx-auto">
            Blending classical Vedic knowledge with compassionate guidance to help
            you make timely, positive decisions.
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="px-6 sm:px-8 py-12">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 text-center shadow-md border border-amber-100"
              >
                <div className="text-3xl font-bold text-orange-400 mb-1">{stat.number}</div>
                <div className="text-gray-700 text-sm md:text-md font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Intro */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-amber-200/60">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              Ved Varta is a dedicated platform for the timeless wisdom of Jyotish (Vedic Astrology), Dharmshastra, spiritual remedies, and authentic Vedic knowledge. Rooted in the ancient traditions of Sanatan Dharma, we aim to bring clarity, guidance, and spiritual empowerment to every seeker. <br />

              At Ved Varta, we believe that the Vedas are not just scriptures but a living science that offers practical answers to life&apos;s deepest questions. Our mission is to simplify and spread the profound teachings of our sages through modern mediums—making Vedic insights accessible to all. <br /> <br />

              Whether you&apos;re seeking astrological guidance, exploring Vedic rituals, or learning about karmic remedies, Ved Varta offers authentic content based on scriptural authority and spiritual depth. <br />

              We specialize in astrological remedies based on planetary positions, doshas, and karmic imbalances—offering time-tested solutions like mantra, tantra, yantra, and puja-based guidance. Each remedy is suggested with deep respect for scriptural authority and tailored to the individual&apos;s spiritual and practical needs.
            </p>
          </div>

          <div className="flex justify-center">
            <CTA />
          </div>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;