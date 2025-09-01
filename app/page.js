import Hero from "../sections/Hero";
import BlogPreview from "../sections/BlogPreview";
import Expertise from "../components/Expertise";
import BannerCarousel from "@/components/BannerCarousel";
import { homeBanners } from "@/data/banner";

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-amber-200/80 via-yellow-50 to-amber-200/80 min-h-screen px-10 py-5">
      <div className="mb-20">
        <BannerCarousel banners={homeBanners} />
      </div>
      <Hero />
      <div className="px-20">
        <Expertise />
      </div>
      <BlogPreview />
    </main>
  );
}
