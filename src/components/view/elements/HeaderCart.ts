import { el, setChildren } from 'redom';
import { router } from '../../router';
import { headerAmountElement, headerCountElement, updateAmount } from '../../utils/updateCart';

class HeaderCart {
  private container = document.querySelector('.header__cart-info') as HTMLElement;
  private countElement = headerCountElement;
  private amountElement = headerAmountElement;
  element() {
    return [
      this.amountElement,
      el('.header__cart', [
        this.countElement,
        el('a', {
          href: '/cart',
          onclick: (e: Event) => {
            e.preventDefault();
            router.navigate('/cart');
          },
        }),
      ]),
    ];
  }

  setElement() {
    setChildren(this.container, this.element());
    updateAmount();
  }
}

export default HeaderCart;
