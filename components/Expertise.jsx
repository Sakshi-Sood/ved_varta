import Image from "next/image";
import { expertiseAreas } from "../utils";

const Expertise = ({ title }) => {
  return (
    <div className="bg-white rounded-2xl py-10 px-16 shadow-lg max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        {title || "Areas of Expertise"}
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {expertiseAreas.map((area, index) => (
          <div
            key={index}
            className="bg-orange-50 hover:bg-orange-100/90 rounded-xl p-6 text-center border border-orange-300 hover:shadow-lg hover:border-orange-500 hover:scale-105 transition-all duration-300"
          >
            <div className="mb-4">
              <Image
                src={area.icon}
                alt={`${area.title} Icon`}
                width={45}
                height={45}
                className="mx-auto"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {area.title}
            </h3>
            <p className="text-gray-600 text-sm text-balance">
              {area.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Expertise;
