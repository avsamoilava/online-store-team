import { el, mount, setChildren } from 'redom';
import { updateAmount } from '../../utils/updateCart';

type Promo = {
  name: string;
  title: string;
  discount: number;
};

type PromoOptions = {
  from: HTMLElement;
  to: HTMLElement;
  fromList: Promo[];
  toList: Promo[];
  cleanBlock?: boolean;
};

export class Promocode {
  private promoList: Promo[];
  private usePromoList: Promo[] = [];
  private input: HTMLElement = el('input.cart__input', {
    placeholder: 'enter promo code',
  });
  private currentPromo = el('ul.promo__current');
  private applied = el('ul.promo__list');
  private initPromoList: Promo[] = [
    {
      name: 'RS',
      title: 'Rolling Scopes School',
      discount: 10,
    },
    {
      name: 'EPM',
      title: 'EPAM Systems',
      discount: 10,
    },
  ];

  constructor() {
    this.promoList = this.initPromoList;
  }

  element() {
    this.addListeners();
    this.getStorageState();
    setChildren(this.applied, this.renderPromo(this.usePromoList));
    return el('.cart__promo.promo', [
      el('.promo__input', [this.input], this.currentPromo),
      this.applied,
    ]);
  }

  promoListItem(coupon: Promo, drop?: boolean): HTMLElement {
    const addCouponBtn = el('button.promo__add.btn.btn-small', 'add', { 'data-id': coupon.name });
    if (drop) {
      addCouponBtn.classList.remove('promo__add');
      addCouponBtn.textContent = 'drop';
    }
    return el(
      'li.promo__item',
      [el('span.promo__name', `${coupon.title} - ${coupon.discount}%`), addCouponBtn],
      { 'data-id': coupon.name }
    );
  }

  couponHandler(e: Event, options: PromoOptions): void {
    if (e.target instanceof HTMLButtonElement) {
      const id = e.target.dataset.id;
      e.target.classList.toggle('promo__add');
      e.target.textContent = e.target.classList.contains('promo__add') ? 'add' : 'drop';

      const item = Array.from(options.from.children).find((elem) => {
        if (elem instanceof HTMLElement) return elem.dataset.id === id;
      }) as Node;
      if (options.cleanBlock) options.to.innerHTML = '';
      mount(options.to, item.cloneNode(true));
      item.parentNode?.removeChild(item);

      const coupon = options.fromList.find((elem) => elem.name === id);
      if (coupon) {
        options.fromList.splice(options.fromList.indexOf(coupon), 1);
        options.toList.push(coupon);
      }
    }
    this.setStorageState();
    updateAmount();
  }

  inputHandler() {
    if (this.input instanceof HTMLInputElement) {
      const val = this.input.value;
      const coupon = this.promoList.find((e) => e.name.toUpperCase() === val.toUpperCase());
      if (coupon) {
        setChildren(this.currentPromo, [this.promoListItem(coupon)]);
      } else this.currentPromo.innerHTML = '';
    }
  }

  setStorageState() {
    localStorage.setItem(
      'promo',
      JSON.stringify({ initList: this.promoList, useList: this.usePromoList })
    );
    localStorage.setItem(
      'discount',
      JSON.stringify(this.usePromoList.reduce((acc, cur) => acc + cur.discount, 0))
    );
  }
  getStorageState() {
    this.promoList =
      JSON.parse(localStorage.getItem('promo') || '[]').initList || this.initPromoList;
    this.usePromoList = JSON.parse(localStorage.getItem('promo') || '[]').useList || [];
  }

  renderPromo(list: Promo[]): HTMLElement[] {
    return list.map((e) => {
      return this.promoListItem(e, true);
    });
  }

  addListeners() {
    this.input.addEventListener('input', () => {
      this.inputHandler();
    });
    this.applied.addEventListener('click', (e) => {
      this.couponHandler(e, {
        from: this.applied,
        to: this.currentPromo,
        fromList: this.usePromoList,
        toList: this.promoList,
        cleanBlock: true,
      });
    });
    this.currentPromo.addEventListener('click', (e) => {
      this.couponHandler(e, {
        from: this.currentPromo,
        to: this.applied,
        fromList: this.promoList,
        toList: this.usePromoList,
      });
    });
  }
}
