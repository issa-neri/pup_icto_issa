import { qs, qsa, setAriaHidden } from '../utils/domHelpers.js';
import { delegate } from '../utils/eventHelpers.js';

export class Modal {
  constructor() {
    this.activeModal = null;
    this.lastFocused = null;
    this.init();
  }

  init() {
    delegate(document, '[data-modal-target]', 'click', (event, trigger) => {
      event.preventDefault();
      this.open(trigger.getAttribute('data-modal-target'));
    });

    delegate(document, '[data-modal-close]', 'click', (event) => {
      event.preventDefault();
      this.closeActive();
    });

    delegate(document, '[data-modal-switch]', 'click', (event, trigger) => {
      event.preventDefault();
      const target = trigger.getAttribute('data-modal-switch');
      this.closeActive();
      this.open(target);
    });

    delegate(document, '[data-pw-toggle]', 'click', (event, trigger) => {
      event.preventDefault();
      const id = trigger.getAttribute('data-pw-toggle');
      const input = qs(`#${id}`);
      const icon = trigger.querySelector('i');
      if (!input || !icon) return;

      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
      } else {
        input.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
      }
    });

    delegate(document, '[data-success]', 'click', (event, trigger) => {
      event.preventDefault();
      const id = trigger.getAttribute('data-success');
      this.showSuccess(id);
    });

    delegate(document, '[data-forgot-open]', 'click', (event) => {
      event.preventDefault();
      this.showForgot(true);
    });

    delegate(document, '[data-forgot-close]', 'click', (event) => {
      event.preventDefault();
      this.showForgot(false);
    });

    delegate(document, '[data-forgot-success]', 'click', (event) => {
      event.preventDefault();
      const box = qs('#success-forgot');
      if (box) box.classList.add('show');
    });

    qsa('.modal-overlay').forEach((overlay) => {
      overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
          this.closeActive();
        }
      });
    });

    document.addEventListener('keydown', (event) => this.handleKeydown(event));
  }

  open(id) {
    const modal = qs(`#modal-${id}`);
    if (!modal) return;

    this.lastFocused = document.activeElement;
    this.activeModal = modal;
    modal.classList.add('open');
    setAriaHidden(modal, false);
    document.body.style.overflow = 'hidden';

    const focusable = this.getFocusable(modal);
    if (focusable[0]) focusable[0].focus();
  }

  closeActive() {
    if (!this.activeModal) return;
    this.activeModal.classList.remove('open');
    setAriaHidden(this.activeModal, true);
    document.body.style.overflow = '';

    this.resetForgot();

    if (this.lastFocused && this.lastFocused.focus) {
      this.lastFocused.focus();
    }

    this.activeModal = null;
  }

  showSuccess(id) {
    const box = qs(`#success-${id}`);
    if (!box) return;
    box.classList.add('show');
    window.setTimeout(() => box.classList.remove('show'), 3500);
  }

  showForgot(show) {
    const loginForm = qs('[data-login-form]');
    const forgotForm = qs('[data-forgot-form]');
    if (!loginForm || !forgotForm) return;
    loginForm.style.display = show ? 'none' : '';
    forgotForm.classList.toggle('show', show);
  }

  resetForgot() {
    const forgotForm = qs('[data-forgot-form]');
    const loginForm = qs('[data-login-form]');
    const success = qs('#success-forgot');
    if (forgotForm) forgotForm.classList.remove('show');
    if (loginForm) loginForm.style.display = '';
    if (success) success.classList.remove('show');
  }

  handleKeydown(event) {
    if (event.key === 'Escape') {
      this.closeActive();
      return;
    }

    if (!this.activeModal || event.key !== 'Tab') return;

    const focusable = this.getFocusable(this.activeModal);
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  getFocusable(modal) {
    return qsa('a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])', modal);
  }
}
