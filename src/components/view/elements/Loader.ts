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
    // <div class="spinner">
    //   <div class="spinner-circle1 spinner-circle"></div>
    //   <div class="spinner-circle2 spinner-circle"></div>
    //   <div class="spinner-circle3 spinner-circle"></div>
    //   <div class="spinner-circle4 spinner-circle"></div>
    //   <div class="spinner-circle5 spinner-circle"></div>
    //   <div class="spinner-circle6 spinner-circle"></div>
    //   <div class="spinner-circle7 spinner-circle"></div>
    //   <div class="spinner-circle8 spinner-circle"></div>
    //   <div class="spinner-circle9 spinner-circle"></div>
    //   <div class="spinner-circle10 spinner-circle"></div>
    //   <div class="spinner-circle11 spinner-circle"></div>
    //   <div class="spinner-circle12 spinner-circle"></div>
    // </div>
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
