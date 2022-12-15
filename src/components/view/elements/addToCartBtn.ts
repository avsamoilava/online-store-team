import { el, setChildren } from 'redom';

class AddToCartBtn {
  constructor(
    private wrapper: HTMLElement = el('.card__btn.btn'),
    private addBtn = el('button', 'Add to cart'),
    private countElement = el('span', '1'),
    private plusBtn = el('button', '+'),
    private minusBtn = el('button', '-'),
    private counter = 0
  ) {}
  private increaseCounter() {
    this.counter++;
    this.countElement.textContent = String(this.counter);
  }
  private decreaseCounter() {
    this.counter--;
    if (this.counter === 0) {
      setChildren(this.wrapper, [this.addBtn]);
      return;
    }
    this.countElement.textContent = String(this.counter);
  }
  private startCounter() {
    this.counter++;
    this.countElement.textContent = '1';
    setChildren(this.wrapper, [this.minusBtn, this.countElement, this.plusBtn]);
  }
  element() {
    this.addBtn.addEventListener('click', () => this.startCounter());
    this.plusBtn.addEventListener('click', () => this.increaseCounter());
    this.minusBtn.addEventListener('click', () => this.decreaseCounter());
    setChildren(this.wrapper, [this.addBtn]);
    return this.wrapper;
  }
}

export default AddToCartBtn;
