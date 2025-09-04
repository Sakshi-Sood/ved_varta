import Image from "next/image";
import { expertiseAreas } from "../utils";
import Link from "next/link";

const Expertise = () => {
  return (
    <>
      <div className="text-center mb-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-3">
          <span className="textGradient">Services We</span> Offer
        </h2>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
          Comprehensive Vedic solutions tailored to your unique life challenges.
        </p>
      </div>
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl py-4 px-4 sm:py-6 sm:px-6 lg:py-8 lg:px-12 max-w-7xl mx-auto border border-amber-200">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {expertiseAreas.map((area, index) => (
            <Link
              href="/services"
              key={index}
              className="bg-yellow-50/90 hover:bg-amber-100/90 rounded-xl p-2 sm:p-4 text-center border border-orange-200 hover:shadow-md hover:border-orange-300 hover:scale-105 transition-all duration-300"
            >
              <div className="mb-1 sm:mb-3">
                <Image
                  src={area.icon}
                  alt={`${area.title} Icon`}
                  width={32}
                  height={32}
                  className="mx-auto sm:w-[48px] sm:h-[48px]"
                />
              </div>
              <h3 className="text-sm sm:text-lg font-bold text-gray-800 mb-1 leading-tight">
                {area.title}
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm text-balance px-1">
                {area.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Expertise;
