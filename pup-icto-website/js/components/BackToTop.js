import { qs } from '../utils/domHelpers.js';
import { rafThrottle } from '../utils/eventHelpers.js';

export class BackToTop {
  constructor() {
    this.button = qs('#back-top');
    if (!this.button) return;
    this.attachEvents();
  }

  attachEvents() {
    window.addEventListener('scroll', rafThrottle(() => {
      this.button.classList.toggle('show', window.scrollY > 400);
    }));

    this.button.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
