import { el } from 'redom';

class Loader {
  private element = el('.loader', [
    el('h1', 'Loading...'),
    el(
      '.spinner',
      Array(12)
        .fill(0)
        .map((_, i) => el(`.spinner-circle.spinner-circle${i + 1}`))
    ),
  ]);
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
