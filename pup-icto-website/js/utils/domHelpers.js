export const qs = (selector, scope = document) => scope.querySelector(selector);
export const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

export const createFragment = (html) => {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content;
};

export const setAriaHidden = (el, hidden) => {
  if (!el) return;
  el.setAttribute('aria-hidden', hidden ? 'true' : 'false');
};
