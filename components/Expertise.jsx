import Image from "next/image";
import { expertiseAreas } from "../utils";
import Link from "next/link";

const Expertise = () => {
  return (
    <section className="px-3 sm:px-10 lg:px-44">
      <div className="text-center mb-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
          <span className="textGradient">Services We</span>{" "}
          <span className="text-black">Offer</span>
        </h2>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
          Comprehensive Vedic solutions tailored to your unique life challenges.
        </p>
      </div>
      <div className="bg-transparent rounded-2xl py-4 sm:py-6 lg:py-8 max-w-[90rem] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {expertiseAreas.map((area, index) => (
            <div
              href="/services"
              key={index}
              className="bg-yellow-50/90 hover:bg-amber-100/90 rounded-xl p-3 flex items-center gap-2 sm:gap-4 border border-orange-200 hover:shadow-md hover:border-orange-300 hover:scale-105 transition-all duration-300"
            >
              <div className="flex-shrink-0">
                <Image
                  src={area.icon}
                  alt={`${area.title} Icon`}
                  width={32}
                  height={32}
                  className="sm:w-[52px] sm:h-[52px]"
                />
              </div>
              <h3 className="text-sm sm:text-base sm:font-semibold text-gray-800 leading-tight">
                {area.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertise;