import BannerCarousel from "@/components/BannerCarousel";
import { homeBanners } from "@/data/banner";

const Hero = () => {
  return (
    <section className="mb-10 md:mb-15 px-5 sm:px-10 lg:px-44 pt-5">
      <BannerCarousel banners={homeBanners} />
    </section>
  );
};

export default Hero;
