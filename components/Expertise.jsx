import Image from "next/image";
import { expertiseAreas } from "../utils";
import Link from "next/link";

const Expertise = () => {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl py-6 px-4 sm:py-8 sm:px-6 lg:py-10 lg:px-12 shadow-lg max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold textGradient mb-4 sm:mb-6 text-center">
        Services we provide!
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {expertiseAreas.map((area, index) => (
          <Link
            href="/services"
            key={index}
            className="bg-orange-50 hover:bg-orange-100/90 rounded-xl p-2 sm:p-4 text-center border border-orange-300 hover:shadow-lg hover:border-orange-500 hover:scale-105 transition-all duration-300"
          >
            <div className="mb-2 sm:mb-4">
              <Image
                src={area.icon}
                alt={`${area.title} Icon`}
                width={32}
                height={32}
                className="mx-auto sm:w-[45px] sm:h-[45px]"
              />
            </div>
            <h3 className="text-sm sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2 leading-tight">
              {area.title}
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm text-balance leading-relaxed px-1">
              {area.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Expertise;
