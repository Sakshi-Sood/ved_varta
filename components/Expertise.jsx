import Image from "next/image";
import { expertiseAreas } from "../utils";

const Expertise = () => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Areas of Expertise
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {expertiseAreas.map((area, index) => (
          <div
            key={index}
            className="bg-orange-50 hover:bg-orange-100/90 rounded-xl p-6 text-center border border-orange-300 hover:shadow-lg hover:border-orange-500 hover:scale-105 transition-all duration-300"
          >
            <div className="text-4xl mb-4">
              <Image
                src={area.icon}
                alt={`${area.title} Icon`}
                width={40}
                height={40}
                className="mx-auto"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              {area.title}
            </h3>
            <p className="text-gray-600 text-sm">{area.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Expertise;
