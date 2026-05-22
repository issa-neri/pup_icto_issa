import { NAV_LINKS } from '../utils/constants.js';
import { qs, qsa } from '../utils/domHelpers.js';
import { rafThrottle, delegate } from '../utils/eventHelpers.js';

export class Navbar {
  constructor(container, mobileMenu) {
    this.container = container;
    this.mobileMenu = mobileMenu;
    this.isOpen = false;
    this.render();
    this.cache();
    this.attachEvents();
    this.initObserver();
  }

  render() {
    const linksHtml = NAV_LINKS.map((link) => (
      `<li><a href="${link.href}">${link.label}</a></li>`
    )).join('');

    this.container.innerHTML = `
      <div class="nav-inner">
        <div class="nav-brand">
          <div class="nav-logo"><img src="assets/images/icto_logo.jpg" alt="PUP ICTO logo"/></div>
          <div>
            <span class="nav-logo-text">PUP ICTO</span>
            <span class="nav-subtitle">Information & Communications Technology Office</span>
          </div>
        </div>
        <ul class="nav-links">
          ${linksHtml}
        </ul>
        <div class="nav-auth">
          <button class="btn btn-outline-red" data-modal-target="signin">Sign In</button>
          <button class="btn btn-red" data-modal-target="login">Log In</button>
        </div>
        <button class="hamburger" id="hamburger" aria-label="Toggle mobile menu" aria-expanded="false" aria-controls="mobile-menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    `;

    const mobileLinks = NAV_LINKS.map((link) => (
      `<a href="${link.href}">${link.label}</a>`
    )).join('');

    this.mobileMenu.innerHTML = `
      ${mobileLinks}
      <div class="mobile-auth">
        <button class="btn btn-outline-red" data-modal-target="signin">Sign In</button>
        <button class="btn btn-red" data-modal-target="login">Log In</button>
      </div>
    `;
  }

  cache() {
    this.hamburger = qs('#hamburger', this.container);
    this.desktopLinks = qsa('.nav-links a', this.container);
    this.mobileLinks = qsa('a', this.mobileMenu);
  }

  attachEvents() {
    this.hamburger.addEventListener('click', () => this.toggleMobile());

    delegate(this.mobileMenu, 'a', 'click', () => this.closeMobile());
    delegate(this.mobileMenu, 'button', 'click', () => this.closeMobile());

    window.addEventListener('scroll', rafThrottle(() => {
      this.container.classList.toggle('scrolled', window.scrollY > 60);
    }));
  }

  toggleMobile() {
    this.isOpen = !this.isOpen;
    this.mobileMenu.classList.toggle('open', this.isOpen);
    this.mobileMenu.setAttribute('aria-hidden', this.isOpen ? 'false' : 'true');
    this.hamburger.setAttribute('aria-expanded', this.isOpen ? 'true' : 'false');

    const spans = this.hamburger.querySelectorAll('span');
    if (this.isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  }

  closeMobile() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.mobileMenu.classList.remove('open');
    this.mobileMenu.setAttribute('aria-hidden', 'true');
    this.hamburger.setAttribute('aria-expanded', 'false');

    const spans = this.hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }

  initObserver() {
    const sections = NAV_LINKS.map((link) => document.querySelector(link.href)).filter(Boolean);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.setActive(`#${entry.target.id}`);
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0.01 });

    sections.forEach((section) => observer.observe(section));
  }

  setActive(href) {
    this.desktopLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === href);
    });
  }
}
