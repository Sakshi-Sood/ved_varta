import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-yellow-100 via-orange-100 to-amber-100 min-h-screen">
      <Navbar />
      <Hero />
    </main>
  );
}
