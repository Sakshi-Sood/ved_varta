import Hero from "../sections/Hero";
import BlogPreview from "../sections/BlogPreview";
import Expertise from "../components/Expertise";

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-amber-200/80 via-yellow-50 to-amber-200/80 min-h-screen px-5 md:px-10 py-5">
      <Hero />
      <Expertise />
      <BlogPreview />
    </main>
  );
}
