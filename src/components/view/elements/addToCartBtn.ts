import { el, setChildren } from 'redom';

class AddToCartBtn {
  private wrapper: HTMLElement = el('.card__btn.card__btn-wrapper');
  private addBtn = el('button.card__add-btn.btn', 'Add to cart');
  private countElement = el('span.card__counter', '1');
  private plusBtn = el('button.card__btn-small.plus');
  private minusBtn = el('button.card__btn-small.minus');
  private counter = 0;
  private disabled = false;
  private maxCount: number;
  constructor(maxCount: number) {
    this.maxCount = maxCount;
  }
  private increaseCounter() {
    this.counter++;
    this.countElement.textContent = String(this.counter);
    if (this.counter === this.maxCount) this.disable();
  }
  private decreaseCounter() {
    if (this.disabled) this.enable();
    this.counter--;
    if (this.counter === 0) {
      setChildren(this.wrapper, [this.addBtn]);
      return;
    }
    this.countElement.textContent = String(this.counter);
  }
  private startCounter(count?: number) {
    this.counter = count ? count : this.counter + 1;
    this.countElement.textContent = `${this.counter}`;
    setChildren(this.wrapper, [this.minusBtn, this.countElement, this.plusBtn]);
    if (count && count === this.maxCount) this.disable();
  }
  get count() {
    return this.counter;
  }
  set count(count: number) {
    this.startCounter(count);
  }
  element() {
    this.addBtn.addEventListener('click', () => this.startCounter());
    this.plusBtn.addEventListener('click', () => this.increaseCounter());
    this.minusBtn.addEventListener('click', () => this.decreaseCounter());
    setChildren(
      this.wrapper,
      this.counter > 0 ? [this.minusBtn, this.countElement, this.plusBtn] : [this.addBtn]
    );
    return this.wrapper;
  }
  private disable() {
    this.disabled = true;
    this.wrapper.classList.add('card__btn--disabled');
  }
  private enable() {
    this.disabled = false;
    this.wrapper.classList.remove('card__btn--disabled');
  }
}

export default AddToCartBtn;
