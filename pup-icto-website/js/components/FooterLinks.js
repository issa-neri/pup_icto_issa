import { FOOTER_LINKS } from '../utils/constants.js';
import { qs, createFragment } from '../utils/domHelpers.js';

export class FooterLinks {
  constructor() {
    this.renderList('#footer-quick', FOOTER_LINKS.quick);
    this.renderList('#footer-services', FOOTER_LINKS.services);
    this.renderList('#footer-pup', FOOTER_LINKS.pup);
  }

  renderList(selector, items) {
    const list = qs(selector);
    if (!list) return;

    const html = items.map((item) => (
      `<li><a href="${item.href}">${item.label}</a></li>`
    )).join('');

    list.appendChild(createFragment(html));
  }
}
