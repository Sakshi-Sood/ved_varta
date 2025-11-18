import Hero from "../sections/Hero";
import BlogPreview from "../sections/BlogPreview";
import Expertise from "../components/Expertise";
import FeaturedProducts from "../sections/FeaturedProducts";
import YouTubeVideos from "../sections/YouTubeVideos";

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-yellow-200/80 via-yellow-100/80 to-amber-200/80 min-h-screen px-5 s:px-10 lg:px-44 py-5">
      <Hero />
      <Expertise />
      <FeaturedProducts />
      <BlogPreview />
      <YouTubeVideos />
    </main>
  );
}
