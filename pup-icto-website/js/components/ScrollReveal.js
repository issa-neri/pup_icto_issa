import { qsa } from '../utils/domHelpers.js';

export class ScrollReveal {
  constructor() {
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    qsa('.reveal').forEach((el) => observer.observe(el));
  }
}
