import Hero from "./sections/Hero";
import BlogPreview from "./sections/BlogPreview";

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-yellow-200/80 via-yellow-50 to-amber-200/80 min-h-screen px-10 py-5">
      <Hero />
      <BlogPreview />
    </main>
  );
}
