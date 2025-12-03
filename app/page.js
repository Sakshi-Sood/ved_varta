import BannerCarousel from "@/components/BannerCarousel";
import BlogPreview from "../sections/BlogPreview";
import Expertise from "../components/Expertise";
import FeaturedProducts from "../sections/FeaturedProducts";
import PujaPreview from "../sections/PujaPreview";
import YouTubeVideos from "../sections/YouTubeVideos";
import { homeBanners } from "@/data/banner";

export default function Home() {
  return (
    <main>
      <div className="mb-10 md:mb-15 px-5 sm:px-10 lg:px-44 pt-5">
        <BannerCarousel banners={homeBanners} />
      </div>
      <Expertise />
      <FeaturedProducts />
      <PujaPreview />
      <BlogPreview />
      <YouTubeVideos />
    </main>
  );
}
