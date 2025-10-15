# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**Ved Varta** - A Vedic astrology consultation and spiritual products website built with:

- **Framework**: Next.js 15.4.5 (App Router) with React 19.1.0
- **Styling**: Tailwind CSS v4 (config-less mode) via PostCSS plugin
- **Linting**: ESLint 9 (flat config) extending next/core-web-vitals
- **Package Manager**: npm (package-lock.json present)
- **Font Loading**: Poppins via next/font
- **Icons**: Font Awesome (loaded via script tag)
- **Environment**: Sanity CMS integration configured (project ID: hudqries)

## Common Commands

```bash
# Install dependencies
npm install

# Development server with Turbopack (http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server (after build)
npm start

# Run linting
npm run lint

# Lint specific files with auto-fix
npx eslint app/products --fix
npx eslint app/blogs/[id]/page.js --fix
```

## High-Level Architecture

### Directory Structure

```plaintext
ved_varta/
├── app/                    # Next.js App Router pages
│   ├── layout.js          # Root layout with Navbar/Footer
│   ├── page.js           # Homepage
│   ├── about/            # About page
│   ├── blogs/            # Blog listing and dynamic routes
│   ├── products/         # Products catalog (client component)
│   ├── services/         # Services listing (client component)
│   └── contact/          # Contact/About Acharya page
├── components/           # Reusable UI components
├── sections/            # Page-level compositional blocks
├── data/               # Static data files
├── utils/              # Utility functions
└── public/             # Static assets (images, icons)
```

### Core Application Flow

1. **Root Layout** (`app/layout.js`)
   - Wraps all pages with Poppins font
   - Includes persistent Navbar (client component) and Footer
   - Loads Font Awesome for icons
   - Sets global metadata for SEO

2. **Component Architecture**
   - **sections/**: Page-specific sections (Hero, BlogPreview, Navbar)
   - **components/**: Reusable UI elements (Button, Cards, CTA, Modals)
   - Most components are server components by default
   - Client components: Navbar, ProductsPage, ServicesPage, BannerCarousel

3. **Data Management**
   - Static data stored in `data/` directory:
     - `products.js`: Product catalog with categories (Gemstones, Rudraksha, Bracelets, Pendants)
     - `services.js`: Service offerings data
     - `banner.js`: Banner/carousel content
   - Products use placeholder images via `utils/placeholderImages.js`
   - Blog data is currently duplicated between listing and detail pages

### Key Features

1. **Products Page** (`app/products/page.js`)
   - Client-side category filtering
   - Product cards with modal support (ProductModal component)
   - Banner carousel integration
   - Categories: Gemstones, Rudraksha, Bracelets, Pendants, Vastu, Yantras

2. **Services Page** (`app/services/page.js`)
   - Service cards with filtering (All/Popular)
   - FAQ section with details/summary elements
   - Testimonials and "Why Choose Us" sections
   - Banner carousel integration

3. **Blog System**
   - Blog listing at `/blogs`
   - Dynamic routes at `/blogs/[id]`
   - Custom 404 page for missing blog posts
   - Content rendered via dangerouslySetInnerHTML (currently safe as data is local)

4. **Contact Page** (`app/contact/page.js`)
   - Acharya profile with statistics
   - Contact information and action buttons
   - Detailed bio and expertise areas

### Styling Approach

- Tailwind v4 in config-less mode
- Imported once in `app/globals.css`
- Custom utilities: `.line-clamp-3`, selection colors
- Gradient backgrounds used throughout (amber/yellow theme)
- Responsive design with Tailwind breakpoints

### Import Aliases

- `@/` alias is used for root imports
- Configured in `jsconfig.json`:

  ```json
  {
    "compilerOptions": {
      "paths": {
        "@/*": ["./*"]
      }
    }
  }
  ```

## Important Development Notes

1. **Blog Data Synchronization**: Blog posts data is duplicated between `app/blogs/page.js` and `app/blogs/[id]/page.js`. Keep these in sync when adding/editing posts.

2. **Client Components**: Products and Services pages use "use client" for interactive filtering. Consider server components with URL params for better SEO if needed.

3. **Image Optimization**: All images use Next.js Image component for optimization. Product images map to placeholder system.

4. **No Test Framework**: Currently no testing setup. Add Jest/Vitest/React Testing Library when needed.

5. **Environment Variables**:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`: Sanity CMS project (currently "hudqries")
   - `NEXT_PUBLIC_SANITY_DATASET`: Sanity dataset (currently "production")

6. **External Links**: WhatsApp and phone links are hardcoded throughout (`+919090252584`). Consider centralizing in a config file.

7. **SEO Considerations**:
   - Metadata is set in root layout
   - Consider adding page-specific metadata for better SEO
   - Products/Services filtering happens client-side; consider SSR/SSG for category pages
