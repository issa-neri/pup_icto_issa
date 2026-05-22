import { NEWS_FEATURED, NEWS_SIDE, NEWS_BOTTOM } from '../utils/constants.js';
import { createFragment } from '../utils/domHelpers.js';

export class NewsSection {
  constructor(featuredContainer, bottomContainer) {
    this.featuredContainer = featuredContainer;
    this.bottomContainer = bottomContainer;
    this.render();
  }

  render() {
    const featuredHtml = `
      <div class="news-card">
        <div class="news-img" style="background-image:url('${NEWS_FEATURED.image}');"><i class="fas ${NEWS_FEATURED.icon}"></i></div>
        <div class="news-body">
          <div class="news-meta">
            <span class="tag">${NEWS_FEATURED.tag}</span>
            <span class="news-date"><i class="far fa-calendar"></i> ${NEWS_FEATURED.date}</span>
          </div>
          <h3>${NEWS_FEATURED.title}</h3>
          <p>${NEWS_FEATURED.body}</p>
          <div class="news-read-more">Read Full Advisory <i class="fas fa-arrow-right"></i></div>
        </div>
      </div>
      <div class="news-side">
        ${NEWS_SIDE.map((item) => `
          <div class="news-card news-small" style="padding:20px;">
            <div class="news-small-img" style="background-image:url('${item.image}');"><i class="fas ${item.icon}"></i></div>
            <div class="news-small-body">
              <div class="news-meta"><span class="tag">${item.tag}</span></div>
              <h4>${item.title}</h4>
              <span class="news-date"><i class="far fa-calendar"></i> ${item.date}</span>
              <div class="news-read-more">Read More <i class="fas fa-arrow-right"></i></div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    this.featuredContainer.appendChild(createFragment(featuredHtml));

    const bottomHtml = NEWS_BOTTOM.map((item) => `
      <div class="news-card">
        <div class="news-img" style="aspect-ratio:16/7;background-image:url('${item.image}');"><i class="fas ${item.icon}"></i></div>
        <div class="news-body">
          <div class="news-meta"><span class="tag">${item.tag}</span><span class="news-date">${item.date}</span></div>
          <h3>${item.title}</h3>
          <div class="news-read-more">Read More <i class="fas fa-arrow-right"></i></div>
        </div>
      </div>
    `).join('');

    this.bottomContainer.appendChild(createFragment(bottomHtml));
  }
}
