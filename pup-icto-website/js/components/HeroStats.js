import { HERO_STATS } from '../utils/constants.js';
import { createFragment } from '../utils/domHelpers.js';

export class HeroStats {
  constructor(container) {
    this.container = container;
    this.render();
  }

  render() {
    const html = HERO_STATS.map((stat) => `
      <div class="stat-item">
        <div class="stat-value">${stat.value}</div>
        <div class="stat-label">${stat.label}</div>
      </div>
    `).join('');

    this.container.appendChild(createFragment(html));
  }
}
