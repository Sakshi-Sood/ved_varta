# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project overview

- Framework: Next.js 15 (App Router) with React 19
- Styling: Tailwind CSS v4 (configless). Tailwind is brought in via PostCSS plugin and imported once in app/globals.css
- Linting: ESLint 9 (flat config) extending next/core-web-vitals
- Package manager: npm (package-lock.json present)

Common commands

- Install dependencies
  - npm install
- Start the dev server (Turbopack)
  - npm run dev
  - Opens <http://localhost:3000> by default
- Build production assets
  - npm run build
- Start the production server (after build)
  - npm start
- Lint the project
  - npm run lint
- Lint a specific file or directory (targeted)
  - npx eslint app/about/page.js --fix
  - npx eslint app/blogs --fix

Notes on testing

- No test tooling is configured (no test scripts or frameworks present). Add Jest/Vitest only if needed by the work at hand.

High-level architecture

- App Router structure (app/)
  - app/layout.js
    - Sets global HTML shell, loads Poppins via next/font, injects Font Awesome via a `<script>` tag in `<head>`, and renders the persistent Navbar before route children.
    - Imports app/globals.css which pulls in Tailwind v4 ("@import 'tailwindcss'").
  - app/page.js
    - Home route. Composes presentational “sections”: Hero and BlogPreview.
  - app/about/page.js
    - Standalone About page with local arrays for stats and “Areas of Expertise”, uses next/image and shared Button/CTA components.
- “Sections” vs “Components”
  - app/sections/*
    - Page-level compositional blocks used by top-level routes (e.g., Hero, BlogPreview, Navbar). Navbar is a client component ("use client") to manage mobile menu state; others are server components by default.
  - app/components/*
    - Reusable UI building blocks (Button, CTA, BlogCard, BlogPreviewCard). These are presentation-focused and consumed by sections/pages.
- Blog feature
  - Listing page: app/blogs/page.js defines a blogPosts[] array and renders a featured card plus a grid of cards.
  - Dynamic detail route: app/blogs/[id]/page.js defines its own blogPosts[] array, looks up a post by params.id, and calls notFound() if missing. Content is rendered with dangerouslySetInnerHTML from an HTML string stored in the blog object.
  - Custom 404 for blog posts: app/blogs/[id]/not-found.js renders a tailored not-found experience and provides navigation back to /blogs or home.
  - Important: Post data is duplicated between the list (app/blogs/page.js) and the dynamic route (app/blogs/[id]/page.js). Keep these in sync when adding/removing posts or IDs will 404.
- Styling pipeline
  - app/globals.css imports Tailwind v4 and defines a small number of global utilities (e.g., ::selection colors, a .line-clamp-3 helper).
  - postcss.config.mjs enables "@tailwindcss/postcss". No tailwind.config.* file is present (Tailwind v4 config-less mode).
- Assets
  - public/ contains icons/ and images/ referenced by components via next/image.
- ESLint
  - eslint.config.mjs uses FlatCompat to extend "next/core-web-vitals" from the repository root.
- Next config
  - next.config.mjs is currently the default export of an empty config object.

Important repo notes for Warp

- Route links not yet implemented: Navbar links to /products, /services, /contact, /book but those routes aren’t present. To add them, create `app/<route>/page.js`.
- Alias imports: One file uses an alias import path (import CTA from "@/app/components/CTA"). No jsconfig/tsconfig paths are present in the repo. If you encounter module-resolution errors, define a jsconfig.json with baseUrl and a paths entry for @/*.
- Blog HTML rendering: Blog detail uses dangerouslySetInnerHTML, but all HTML is from local constants within the repo. If this later sources remote content, ensure proper sanitization before rendering.

Key references from README

- Standard Next.js dev flow applies: start the dev server and open <http://localhost:3000>. Pages live under app/, edit app/page.js to update the home route.
