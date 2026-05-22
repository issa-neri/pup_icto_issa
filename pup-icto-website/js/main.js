import { qs } from './utils/domHelpers.js';
import { Navbar } from './components/Navbar.js';
import { Modal } from './components/Modal.js';
import { ScrollReveal } from './components/ScrollReveal.js';
import { BackToTop } from './components/BackToTop.js';
import { Timeline } from './components/Timeline.js';
import { ServicesGrid } from './components/ServicesGrid.js';
import { NewsSection } from './components/NewsSection.js';
import { FooterLinks } from './components/FooterLinks.js';
import { HeroStats } from './components/HeroStats.js';

const init = () => {
  const navbar = qs('#navbar');
  const mobileMenu = qs('#mobile-menu');
  if (navbar && mobileMenu) {
    new Navbar(navbar, mobileMenu);
  }

  const stats = qs('#hero-stats');
  if (stats) new HeroStats(stats);

  const timeline = qs('#timeline');
  if (timeline) new Timeline(timeline);

  const services = qs('#services-grid');
  if (services) new ServicesGrid(services);

  const newsFeatured = qs('#news-featured');
  const newsBottom = qs('#news-bottom');
  if (newsFeatured && newsBottom) new NewsSection(newsFeatured, newsBottom);

  new FooterLinks();
  new Modal();
  new ScrollReveal();
  new BackToTop();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
