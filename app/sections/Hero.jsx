import Button from "../components/Button";
import Image from "next/image";

const Hero = () => {
  const services = [
    {
      id: 1,
      title: "TALK ASTROLOGER",
      icon: "👨‍💻",
      bgColor: "bg-orange-100",
      iconBg: "bg-orange-200"
    },
    {
      id: 2,
      title: "BOOK YOUR POOJA",
      icon: "🪔",
      bgColor: "bg-purple-100",
      iconBg: "bg-purple-200"
    },
    {
      id: 3,
      title: "ASTRO STORE",
      icon: "💎",
      bgColor: "bg-green-100",
      iconBg: "bg-green-200"
    },
    {
      id: 4,
      title: "VASTU CONSULTANT",
      icon: "🕉️",
      bgColor: "bg-pink-100",
      iconBg: "bg-pink-200"
    }
  ];

  return (
    <section className="min-h-screen ">
        {/* Service Cards */}
        <div className="mt-16 pb-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className={`${service.bgColor} rounded-2xl p-4 lg:p-6 text-center hover:scale-105 transition-transform duration-300 cursor-pointer border border-white/20 backdrop-blur-sm`}
              >
                <div className={`${service.iconBg} w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4`}>
                  <span className="text-2xl lg:text-3xl">{service.icon}</span>
                </div>
                <h3 className="font-bold text-slate-800 text-sm lg:text-base">
                  {service.title}
                </h3>
              </div>
            ))}
          </div>
        </div>

          
    </section>
  );
};

export default Hero;
