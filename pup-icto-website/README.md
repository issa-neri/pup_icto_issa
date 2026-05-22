# PUP ICTO Frontend

## Run
- Open index.html in any modern browser, or use a simple live server.

## Deploy (Vercel)
- Set Root Directory to `pup-icto-website` in the Vercel Project Settings.

## Structure
- index.html: page skeleton and semantic sections.
- css/: modular styles split by base, layout, components, pages, utilities.
- js/: ES module entry point and UI components.
- assets/: reserved for future images or icons.

## Components
- Navbar: renders navigation + mobile menu, active link highlighting via IntersectionObserver.
- Modal: manages sign in, log in, forgot password, focus trap, and success states.
- ScrollReveal: reveal-on-scroll animations.
- BackToTop: visibility toggle and smooth scroll.
- Timeline, ServicesGrid, NewsSection, FooterLinks, HeroStats: data-driven rendering.

## Notes
- Scroll handling uses requestAnimationFrame throttling.
- All content is centralized in js/utils/constants.js for easy updates.
- No build tools or backend required.
  