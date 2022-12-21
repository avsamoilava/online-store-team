import { el } from 'redom';

class Loader {
  private element = el('h1.loader', 'Loading');
  set() {
    document.querySelector('.wrapper')?.append(this.element);
    document.body.style.overflow = 'hidden';
  }
  delete() {
    this.element.remove();
    document.body.style.overflow = 'auto';
  }
}

export default new Loader();
