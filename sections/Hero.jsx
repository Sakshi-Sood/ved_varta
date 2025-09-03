import BannerCarousel from "@/components/BannerCarousel";
import { homeBanners } from "@/data/banner";

const Hero = () => {
  return (
    <section className="mb-10 md:mb-20">
      <BannerCarousel banners={homeBanners} />
    </section>
  );
};

export default Hero;
