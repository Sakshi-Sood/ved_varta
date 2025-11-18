import Link from "next/link";
import BlogPreviewCard from "../components/BlogPreviewCard";
import Button from "../components/Button";

// Blog data - in a real app, this would come from a CMS or database
const blogPosts = [
  {
    id: 1,
    title:
      "Understanding Your Birth Chart: A Beginner's Guide to Vedic Astrology",
    excerpt:
      "Discover how to read your birth chart and understand the fundamental principles of Vedic astrology that can guide your life decisions.",
    author: "Acharya Anoop Tripathi",
    date: "January 15, 2025",
    image: "/images/birth-chart.jpg",
    readTime: "8 min read",
    tags: ["Birth Chart", "Vedic Astrology", "Beginner Guide"],
  },
  {
    id: 2,
    title: "Powerful Vedic Remedies for Career Growth and Success",
    excerpt:
      "Learn about effective Vedic remedies and rituals that can help enhance your career prospects and remove obstacles from your professional path.",
    author: "Acharya Anoop Tripathi",
    date: "January 10, 2025",
    image: "/images/logo.jpg",
    readTime: "10 min read",
    tags: ["Career", "Remedies", "Success", "Mantras"],
  },
  {
    id: 3,
    title: "The Significance of Mahadasha and Antardasha in Life Events",
    excerpt:
      "Explore how planetary periods (Mahadasha) and sub-periods (Antardasha) influence major life events and transitions according to Vedic astrology.",
    author: "Acharya Anoop Tripathi",
    date: "January 5, 2025",
    image: "/images/logo2.jpg",
    readTime: "12 min read",
    tags: ["Mahadasha", "Dasha System", "Life Events", "Timing"],
  },
];

const BlogPreview = () => {
  return (
    <section className="py-16 px-5 sm:px-10 lg:px-44">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="textGradient">Vedic Wisdom</span> Blog
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Discover ancient Vedic insights, practical remedies, and
            astrological guidance to navigate life&apos;s journey with clarity
            and purpose.
          </p>
        </div>

        {/* Blog Preview Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {blogPosts.map((blog) => (
            <BlogPreviewCard key={blog.id} blog={blog} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="flex items-center justify-center flex-col text-center">
          <Link href="/blogs">
            <Button
              text="Discover More Articles"
              icon={
                <i className="fas fa-arrow-right ml-3" aria-hidden="true"></i>
              }
              fill
              right={true}
            />
          </Link>

          <p className="text-gray-600 mt-3 text-sm">
            Explore our complete collection of Vedic astrology insights and
            remedies
          </p>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;