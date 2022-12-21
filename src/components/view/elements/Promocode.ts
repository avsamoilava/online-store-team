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

  constructor() {
    this.promoList = [
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
  }

  element() {
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
    return el('.cart__promo.promo', [
      el('.promo__input', [this.input], this.currentPromo),
      this.applied,
    ]);
  }

  promoListItem(coupon: Promo): HTMLElement {
    const addCouponBtn = el('button.promo__add.btn.btn-small', 'add', { 'data-id': coupon.name });
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
    //localStorage.setItem('promo', JSON.stringify(this.usePromoList.map((elem) => elem.discount)));
    updateAmount(this.usePromoList.reduce((acc, cur) => acc + cur.discount, 0));
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
}
