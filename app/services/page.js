"use client";
import { useState } from "react";
import Expertise from "../../components/Expertise";
import CTA from "../../components/CTA";
import ServiceCard from "../../components/ServiceCard";
import BannerCarousel from "../../components/BannerCarousel";
import { servicesData, whyChooseUs } from "../../data/services";

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Filter services based on category
  const filteredServices = selectedCategory === "all"
    ? servicesData
    : selectedCategory === "popular"
      ? servicesData.filter(service => service.popular)
      : servicesData;

  return (
    <main className="bg-gradient-to-br from-yellow-200/80 via-yellow-50 to-amber-200/80 min-h-screen px-6 md:px-10 py-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our Astrology Services
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Discover the wisdom of Vedic astrology and transform your life with personalized guidance
            from Acharya Anoop Tripathi. Choose from our comprehensive range of services tailored to
            address your specific needs.
          </p>
        </div>

        {/* Banner Carousel Section */}
        <BannerCarousel />

        {/* Areas of Expertise Section */}
        <div className="mb-16">
          <Expertise title="Services we provide!" />
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${selectedCategory === "all"
              ? "bg-amber-500 text-white shadow-lg"
              : "bg-white text-gray-700 hover:bg-amber-100"
              }`}
          >
            All Services
          </button>
          <button
            onClick={() => setSelectedCategory("popular")}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${selectedCategory === "popular"
              ? "bg-amber-500 text-white shadow-lg"
              : "bg-white text-gray-700 hover:bg-amber-100"
              }`}
          >
            Most Popular
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Why Choose Ved Varta
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section (Placeholder) */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            What Our Clients Say
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-amber-50 rounded-lg p-6">
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 italic mb-4">
                &quot;Acharya ji&apos;s predictions were incredibly accurate. His remedies helped me overcome
                career obstacles and find success. Highly recommended!&quot;
              </p>
              <p className="font-semibold text-gray-800">- Rajesh Kumar</p>
              <p className="text-sm text-gray-600">Business Owner</p>
            </div>
            <div className="bg-amber-50 rounded-lg p-6">
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 italic mb-4">
                &quot;The Vastu consultation transformed our home&apos;s energy. We&apos;ve experienced more peace
                and prosperity since following the recommendations.&quot;
              </p>
              <p className="font-semibold text-gray-800">- Priya Sharma</p>
              <p className="text-sm text-gray-600">Software Engineer</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <CTA />

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mt-16 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            <details className="bg-amber-50 rounded-lg p-4 cursor-pointer">
              <summary className="font-semibold text-gray-800">
                How accurate are the predictions?
              </summary>
              <p className="mt-3 text-gray-600">
                Our predictions are based on ancient Vedic astrology principles with over 25 years
                of experience. While we strive for maximum accuracy, results may vary based on
                individual karma and free will.
              </p>
            </details>
            <details className="bg-amber-50 rounded-lg p-4 cursor-pointer">
              <summary className="font-semibold text-gray-800">
                What information do I need to provide?
              </summary>
              <p className="mt-3 text-gray-600">
                For accurate analysis, we need your exact date of birth, time of birth (as precise
                as possible), and place of birth (city/town).
              </p>
            </details>
            <details className="bg-amber-50 rounded-lg p-4 cursor-pointer">
              <summary className="font-semibold text-gray-800">
                Are online consultations as effective as in-person?
              </summary>
              <p className="mt-3 text-gray-600">
                Yes, online consultations are equally effective. The analysis is based on your birth
                chart, which remains the same regardless of the consultation mode.
              </p>
            </details>
            <details className="bg-amber-50 rounded-lg p-4 cursor-pointer">
              <summary className="font-semibold text-gray-800">
                How soon can I book a consultation?
              </summary>
              <p className="mt-3 text-gray-600">
                We typically have slots available within 24-48 hours. For urgent consultations,
                please call us directly at +91 90902 52584.
              </p>
            </details>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Services;
