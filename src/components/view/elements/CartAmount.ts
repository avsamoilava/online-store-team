import { el, setChildren } from 'redom';
import { router } from '../../router';
import { getProductsCount, getProductsInCart, getTotalAmount } from '../../utils';

class CartAmount {
  private container = document.querySelector('.header__cart-info') as HTMLElement;
  private countElement = el('span.header__cart-count', '0');
  private amountElement = el('.header__total', `Total amount: 0.00€`);
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
    this.renderAmount();
  }

  renderAmount() {
    const products = getProductsInCart();
    const productsCount = getProductsCount(products);
    const totalAmount = getTotalAmount(products).toFixed(2);
    this.amountElement.textContent = `Total amount: ${totalAmount}€`;
    this.countElement.textContent = `${productsCount}`;
  }
}

export default CartAmount;
