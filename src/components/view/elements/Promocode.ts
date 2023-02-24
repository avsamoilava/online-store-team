import { el, mount, setChildren } from 'redom';
import { getPromosFromStorage, Promo } from '../../utils/promocodes';
import { updateAmount } from '../../utils/updateCart';

export class Promocode {
  private promoList: Promo[];
  private input: HTMLElement = el('input.cart__input', {
    placeholder: 'enter promo code',
  });
  private currentPromo = el('ul.promo__current');
  private applied = el('ul.promo__list');

  constructor() {
    this.promoList = getPromosFromStorage();
  }

  element() {
    this.input.addEventListener('input', () => this.inputHandler());
    this.promoList = getPromosFromStorage();

    setChildren(this.applied, this.renderAppliedPromo());
    return el('.cart__promo.promo', [
      el('.promo__input', [this.input], this.currentPromo),
      this.applied,
    ]);
  }

  promoListItem(coupon: Promo): HTMLElement {
    const { name, title, applied, discount } = coupon;
    const addCouponBtn = el('button.btn.btn-small', `${applied ? 'drop' : 'add'}`, {
      'data-id': name,
    });
    addCouponBtn.addEventListener('click', (e) => this.couponHandler(e));
    return el('li.promo__item', [el('span.promo__name', `${title} - ${discount}%`), addCouponBtn]);
  }

  couponHandler(e: Event): void {
    if (e.target instanceof HTMLButtonElement) {
      const id = e.target.dataset.id;
      const isAddBtn = e.target.textContent === 'add';
      if (isAddBtn) (this.input as HTMLInputElement).value = '';

      this.promoList.forEach((e) => {
        if (e.name === id) e.applied = !e.applied;
      });
      localStorage.setItem('promocodes', JSON.stringify(this.promoList));

      const coupon = this.promoList.find((e) => e.name === id);
      if (coupon && isAddBtn) mount(this.applied, this.promoListItem(coupon));
      e.target.parentElement?.remove();

      this.promoList = getPromosFromStorage();
      updateAmount();
    }
  }

  inputHandler() {
    if (this.input instanceof HTMLInputElement) {
      const val = this.input.value;
      const coupon = this.promoList.find((e) => e.name.toUpperCase() === val.toUpperCase());
      setChildren(this.currentPromo, coupon && !coupon.applied ? [this.promoListItem(coupon)] : []);
    }
  }

  renderAppliedPromo(): HTMLElement[] {
    return this.promoList.filter((e) => e.applied).map((e) => this.promoListItem(e));
  }
}
