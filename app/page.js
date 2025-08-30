import BlogPreview from "../sections/BlogPreview";
import Expertise from "../components/Expertise";
import BannerCarousel from "@/components/BannerCarousel";

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-yellow-200/80 via-yellow-50 to-amber-200/80 min-h-screen p-10">
      <BannerCarousel />
      <div className="px-20">
        <Expertise />
      </div>
      <BlogPreview />
    </main>
  );
}
