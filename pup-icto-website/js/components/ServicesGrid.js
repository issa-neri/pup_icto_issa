import { SERVICES } from '../utils/constants.js';
import { createFragment } from '../utils/domHelpers.js';

export class ServicesGrid {
  constructor(container) {
    this.container = container;
    this.render();
  }

  render() {
    const html = SERVICES.map((item) => `
      <div class="service-card reveal">
        <div class="service-icon"><i class="fas ${item.icon}"></i></div>
        <h3>${item.title}</h3>
        <p>${item.body}</p>
        <span class="tag">${item.tag}</span>
      </div>
    `).join('');

    this.container.appendChild(createFragment(html));
  }
}
