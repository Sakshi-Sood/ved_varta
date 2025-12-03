# Ved Varta

A modern Vedic astrology and spiritual services platform built with Next.js 15. Ved Varta connects users with expert astrology consultations, puja services, spiritual products, and Vedic wisdom content.

## Features

### Core Services

- **Astrology Services** - Birth chart readings, love compatibility, career guidance, Vedic remedies, and gemstone consultations
- **Puja Booking** - Book authentic Vedic pujas performed by experienced pandits
- **Spiritual Products** - Shop for gemstones, rudraksha, yantras, vastu items, and more
- **Blog Platform** - Read articles on Vedic astrology, spirituality, and wellness

### YouTube Integration

- Fetches latest videos from the Ved Varta YouTube channel
- Featured video player with playlist sidebar
- Auto-displays video duration and upload date

### Admin Dashboard

- Secure admin authentication
- Blog management (create, edit, delete posts)
- Rich text editor with image uploads
- Appwrite backend integration

### UI/UX

- Responsive design for all devices
- Smooth animations with Framer Motion
- Modern gradient-based design system
- Interactive components (carousels, modals, cards)

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | [Next.js 15](https://nextjs.org/) with App Router |
| Language | JavaScript (ES6+) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Backend | [Appwrite](https://appwrite.io/) (Database, Storage, Auth) |
| Icons | [Lucide React](https://lucide.dev/), Font Awesome |
| Deployment | Vercel / Hostinger |

## Project Structure

```plaintext
ved_varta/
├── app/                    # Next.js App Router pages
│   ├── about/              # About page
│   ├── admin/              # Admin dashboard & login
│   ├── api/                # API routes (YouTube, uploads)
│   ├── blogs/              # Blog listing & detail pages
│   ├── bookPuja/           # Puja booking page
│   ├── contact/            # Contact page
│   ├── products/           # Products listing
│   └── services/           # Services page
├── components/             # Reusable UI components
│   └── shadcn/             # shadcn-style components
├── sections/               # Page sections (Navbar, Footer, etc.)
├── data/                   # Static data (products, pujas, services)
├── lib/                    # Utilities (Appwrite client, auth)
├── public/                 # Static assets (images, icons)
└── utils/                  # Helper functions
```

## Appwrite Setup

### Database Collections

**Blogs Collection** schema:

- `title` (String) - Blog title
- `content` (String) - HTML content
- `excerpt` (String) - Short description
- `featuredImage` (String) - Image URL
- `author` (String) - Author name
- `status` (String) - "published" or "draft"
- `createdAt` (DateTime) - Creation timestamp
- `updatedAt` (DateTime) - Last update timestamp

### Storage Bucket

Create a bucket for blog images with public read access.

## Key Components

- **BannerCarousel** - Hero image carousel with auto-play
- **BlogCard** - Blog post preview cards
- **ProductCard** - Product display with modal details
- **PujaCard** - Puja service cards with booking links
- **ProfileCard** - Interactive 3D profile card with tilt effect
- **BlurText** - Animated text reveal effect
- **CountUp** - Animated number counter

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with all sections |
| `/about` | About Acharya Anoop Tripathi |
| `/services` | Astrology services listing |
| `/blogs` | Blog articles listing |
| `/blogs/[id]` | Individual blog post |
| `/bookPuja` | Puja booking catalog |
| `/products` | Spiritual products shop |
| `/contact` | Contact information |
| `/admin` | Admin dashboard (protected) |
| `/admin/login` | Admin login |

## Contact

**Ved Varta** - Acharya Anoop Tripathi

- Phone: +91 9090252584
- Location: Indore, Madhya Pradesh
- YouTube: [@AcharyaAnoopTripathi](https://www.youtube.com/@AcharyaAnoopTripathi)
