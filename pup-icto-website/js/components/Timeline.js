import { TIMELINE_ITEMS } from '../utils/constants.js';
import { createFragment } from '../utils/domHelpers.js';

export class Timeline {
  constructor(container) {
    this.container = container;
    this.render();
  }

  render() {
    const html = TIMELINE_ITEMS.map((item) => `
      <div class="tl-item reveal">
        <div class="tl-content">
          <div class="tl-year">${item.year}</div>
          <h3>${item.title}</h3>
          <p>${item.body}</p>
        </div>
        <div class="tl-dot"></div>
        <div class="tl-spacer"></div>
      </div>
    `).join('');

    this.container.appendChild(createFragment(html));
  }
}
