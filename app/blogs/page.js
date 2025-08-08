import Link from "next/link";
import BlogCard from "../components/BlogCard";
import Button from "../components/Button";
import CTA from "../components/CTA";

const blogPosts = [
  {
    id: 1,
    title: "Understanding Your Birth Chart: A Beginner's Guide to Vedic Astrology",
    excerpt: "Discover how to read your birth chart and understand the fundamental principles of Vedic astrology that can guide your life decisions.",
    content: `
      <h2>Introduction to Birth Charts</h2>
      <p>Your birth chart, or 'Janam Kundali' in Sanskrit, is a cosmic snapshot of the heavens at the exact moment of your birth. This celestial map holds profound insights into your personality, life path, and spiritual journey.</p>
      
      <h3>The 12 Houses</h3>
      <p>The birth chart is divided into 12 houses, each representing different aspects of life:</p>
      <ul>
        <li><strong>1st House (Lagna):</strong> Self, personality, physical appearance</li>
        <li><strong>2nd House:</strong> Wealth, family, speech</li>
        <li><strong>3rd House:</strong> Siblings, courage, communication</li>
        <li><strong>4th House:</strong> Mother, home, emotional foundation</li>
        <li><strong>5th House:</strong> Children, creativity, education</li>
        <li><strong>6th House:</strong> Health, service, daily routine</li>
        <li><strong>7th House:</strong> Marriage, partnerships, business</li>
        <li><strong>8th House:</strong> Transformation, occult, longevity</li>
        <li><strong>9th House:</strong> Dharma, higher learning, spirituality</li>
        <li><strong>10th House:</strong> Career, reputation, public image</li>
        <li><strong>11th House:</strong> Gains, friends, aspirations</li>
        <li><strong>12th House:</strong> Liberation, losses, foreign lands</li>
      </ul>
      
      <h3>The Nine Planets (Navagrahas)</h3>
      <p>Vedic astrology considers nine celestial bodies that influence our lives:</p>
      <ul>
        <li><strong>Sun (Surya):</strong> Soul, ego, father, authority</li>
        <li><strong>Moon (Chandra):</strong> Mind, emotions, mother</li>
        <li><strong>Mars (Mangal):</strong> Energy, courage, property</li>
        <li><strong>Mercury (Budh):</strong> Intelligence, communication, business</li>
        <li><strong>Jupiter (Guru):</strong> Wisdom, spirituality, children</li>
        <li><strong>Venus (Shukra):</strong> Love, beauty, luxury</li>
        <li><strong>Saturn (Shani):</strong> Discipline, karma, challenges</li>
        <li><strong>Rahu:</strong> Desires, materialism, innovation</li>
        <li><strong>Ketu:</strong> Spirituality, detachment, moksha</li>
      </ul>
      
      <h3>Getting Started</h3>
      <p>To create your birth chart, you'll need:</p>
      <ul>
        <li>Exact time of birth</li>
        <li>Date of birth</li>
        <li>Place of birth</li>
      </ul>
      
      <p>Understanding your birth chart is a journey of self-discovery that can provide valuable insights into your life's purpose and potential challenges. Consider consulting with an experienced Vedic astrologer for a detailed analysis.</p>
    `,
    author: "Pandit Aditya Sharma",
    date: "January 15, 2025",
    image: "/agni-pooja.png",
    readTime: "8 min read",
    tags: ["Birth Chart", "Vedic Astrology", "Beginner Guide"]
  },
  {
    id: 2,
    title: "Powerful Vedic Remedies for Career Growth and Success",
    excerpt: "Learn about effective Vedic remedies and rituals that can help enhance your career prospects and remove obstacles from your professional path.",
    content: `
      <h2>Vedic Wisdom for Professional Success</h2>
      <p>In Vedic astrology, career success is primarily governed by the 10th house, along with the positions of Sun, Mercury, and Jupiter in your birth chart. When these planetary influences are weak or afflicted, specific remedies can help restore balance and enhance career prospects.</p>
      
      <h3>Understanding Career Obstacles</h3>
      <p>Common astrological factors that can create career challenges include:</p>
      <ul>
        <li>Weak or afflicted 10th house lord</li>
        <li>Malefic planets in the 10th house</li>
        <li>Unfavorable Saturn transits</li>
        <li>Weak Sun or Mercury placement</li>
        <li>Rahu-Ketu axis affecting career houses</li>
      </ul>
      
      <h3>Powerful Remedies for Career Enhancement</h3>
      
      <h4>1. Sun Remedies (for Leadership and Authority)</h4>
      <ul>
        <li>Chant the Surya Mantra: "Om Hraam Hreem Hraum Sah Suryaya Namah" 108 times daily</li>
        <li>Offer water to the Sun every morning while facing east</li>
        <li>Wear a ruby gemstone (after proper consultation)</li>
        <li>Fast on Sundays and donate wheat or jaggery</li>
      </ul>
      
      <h4>2. Mercury Remedies (for Communication and Business)</h4>
      <ul>
        <li>Recite "Om Aim Budhaya Namah" 108 times daily</li>
        <li>Donate green clothes or vegetables on Wednesdays</li>
        <li>Wear emerald gemstone (with proper guidance)</li>
        <li>Keep a small plant of Tulsi near your workspace</li>
      </ul>
      
      <h4>3. Jupiter Remedies (for Wisdom and Growth)</h4>
      <ul>
        <li>Chant "Om Gram Greem Graum Sah Gurave Namah" 108 times</li>
        <li>Donate yellow items or turmeric on Thursdays</li>
        <li>Wear yellow sapphire (after consultation)</li>
        <li>Read spiritual texts regularly</li>
      </ul>
      
      <h3>General Career Enhancement Practices</h3>
      <ul>
        <li><strong>Workplace Vastu:</strong> Keep your desk clean and face east or north while working</li>
        <li><strong>Ganesh Worship:</strong> Offer prayers to Lord Ganesha for obstacle removal</li>
        <li><strong>Hanuman Devotion:</strong> Recite Hanuman Chalisa for strength and courage</li>
        <li><strong>Charity:</strong> Regular donations according to your planetary afflictions</li>
      </ul>
      
      <h3>Important Considerations</h3>
      <p>Remember that remedies work best when combined with sincere effort, skill development, and ethical conduct. Consult with a qualified Vedic astrologer to determine the most suitable remedies based on your individual birth chart.</p>
    `,
    author: "Pandit Aditya Sharma",
    date: "January 10, 2025",
    image: "/logo.jpg",
    readTime: "10 min read",
    tags: ["Career", "Remedies", "Success", "Mantras"]
  },
  {
    id: 3,
    title: "The Significance of Mahadasha and Antardasha in Life Events",
    excerpt: "Explore how planetary periods (Mahadasha) and sub-periods (Antardasha) influence major life events and transitions according to Vedic astrology.",
    content: `
      <h2>Understanding Planetary Periods</h2>
      <p>One of the most unique and powerful features of Vedic astrology is the Vimshottari Dasha system, which divides human life into planetary periods called Mahadasha (major periods) and Antardasha (sub-periods). This system helps predict the timing of significant life events.</p>
      
      <h3>The Vimshottari Dasha System</h3>
      <p>This 120-year cycle is based on the Moon's position at birth and assigns specific years to each planet:</p>
      <ul>
        <li><strong>Ketu:</strong> 7 years</li>
        <li><strong>Venus:</strong> 20 years</li>
        <li><strong>Sun:</strong> 6 years</li>
        <li><strong>Moon:</strong> 10 years</li>
        <li><strong>Mars:</strong> 7 years</li>
        <li><strong>Rahu:</strong> 18 years</li>
        <li><strong>Jupiter:</strong> 16 years</li>
        <li><strong>Saturn:</strong> 19 years</li>
        <li><strong>Mercury:</strong> 17 years</li>
      </ul>
      
      <h3>How Mahadasha Influences Life</h3>
      
      <h4>Sun Mahadasha (6 years)</h4>
      <p>Period of authority, government connections, and leadership roles. Good for career advancement and recognition. Health issues related to heart, bones, or eyes may arise if Sun is afflicted.</p>
      
      <h4>Moon Mahadasha (10 years)</h4>
      <p>Emotional periods with focus on family, home, and relationships. Beneficial for real estate, hospitality business, and creative pursuits. Water-related travels are common.</p>
      
      <h4>Mars Mahadasha (7 years)</h4>
      <p>Dynamic period with high energy and activity. Good for sports, military, engineering, and real estate. May bring property acquisition but also conflicts if Mars is afflicted.</p>
      
      <h4>Rahu Mahadasha (18 years)</h4>
      <p>Period of materialistic pursuits, foreign connections, and unconventional paths. Can bring sudden wealth or losses. Technology and innovation feature prominently.</p>
      
      <h4>Jupiter Mahadasha (16 years)</h4>
      <p>Auspicious period for spiritual growth, education, and wisdom. Marriage, children, and prosperity are favored. Teaching, counseling, and religious activities flourish.</p>
      
      <h4>Saturn Mahadasha (19 years)</h4>
      <p>Period of hard work, discipline, and karma. Challenges in the beginning often lead to solid foundations later. Service to society and systematic progress are highlighted.</p>
      
      <h4>Mercury Mahadasha (17 years)</h4>
      <p>Excellent for business, communication, and intellectual pursuits. Writing, teaching, trading, and technology-related work prosper. Multiple interests and activities are common.</p>
      
      <h4>Ketu Mahadasha (7 years)</h4>
      <p>Spiritual awakening and detachment from material pursuits. Research, occult studies, and meditation are favored. May bring unexpected changes and foreign connections.</p>
      
      <h4>Venus Mahadasha (20 years)</h4>
      <p>Period of luxury, comfort, and artistic pursuits. Marriage, partnerships, and creative endeavors are highlighted. Fashion, entertainment, and beauty industries prosper.</p>
      
      <h3>The Role of Antardasha</h3>
      <p>Within each Mahadasha, there are nine Antardashas (sub-periods) ruled by different planets. The combination of Mahadasha and Antardasha lords determines the specific nature of events and experiences.</p>
      
      <h3>Practical Applications</h3>
      <ul>
        <li><strong>Career Planning:</strong> Choose the right time for job changes or business ventures</li>
        <li><strong>Marriage Timing:</strong> Identify favorable periods for marriage and relationships</li>
        <li><strong>Health Awareness:</strong> Prepare for potential health challenges during difficult periods</li>
        <li><strong>Investment Decisions:</strong> Time financial investments based on planetary periods</li>
        <li><strong>Spiritual Practice:</strong> Align spiritual practices with planetary influences</li>
      </ul>
      
      <h3>Conclusion</h3>
      <p>Understanding your current Mahadasha and Antardasha can provide valuable insights into life's timing and help you make informed decisions. Remember that planetary periods work within the framework of your overall birth chart and karma.</p>
    `,
    author: "Pandit Aditya Sharma",
    date: "January 5, 2025",
    image: "/logo2.jpg",
    readTime: "12 min read",
    tags: ["Mahadasha", "Dasha System", "Life Events", "Timing"]
  }
];

export default function BlogsPage() {
  return (
    <main className="bg-gradient-to-b from-yellow-100 via-orange-100 to-amber-100 min-h-screen px-10 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="textGradient">Vedic Wisdom</span> Blog
          </h1>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Explore the ancient wisdom of Vedic astrology through our comprehensive guides,
            remedies, and insights that can help you navigate life&apos;s journey with clarity and purpose.
          </p>
        </div>

        {/* Featured Blog */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Featured Article</h2>
          <BlogCard blog={blogPosts[0]} featured={true} />
        </div>

        {/* All Blogs */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Latest Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <CTA />

      </div>
    </main>
  );
}
