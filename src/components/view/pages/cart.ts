import { el } from 'redom';
import { ProductInCartType } from '../../../types';
import { getProductsCount, getProductsInCart, getTotalAmount } from '../../utils';
import { amountElement, countElement } from '../../utils/updateCart';
import { breadCrumbs } from '../elements/breadCrumbs';
import ProductInCart from '../elements/ProductInCart';
import { Modal } from './Modal';

export class Cart {
  private products: Readonly<ProductInCartType>[];
  private modal: Modal = new Modal();
  private buyBtn = el('button.btn.btn-fill', 'buy now');
  private totalSumElement: HTMLElement;
  private amountElement: HTMLElement;

  constructor() {
    this.products = getProductsInCart();
    this.totalSumElement = amountElement;
    this.amountElement = countElement;
  }

  element(): HTMLElement {
    document.querySelector('.wrapper')?.append(this.modal.render());
    this.products = getProductsInCart();
    if (!this.products || !this.products.length) return this.renderEmpty();
    return this.renderTable();
  }

  renderTable(): HTMLElement {
    this.buyBtn.addEventListener('click', () => this.modal.show());
    this.totalSumElement.textContent = `Total cost: ${getTotalAmount(this.products).toFixed(2)}€`;
    this.amountElement.textContent = `Amount: ${getProductsCount(this.products)}`;
    const table = el('section.cart', [
      el(
        '.container.cart__container',
        [el('.cart__title', 'Cart'), breadCrumbs('Cart')],
        [
          el('.cart__content', [
            el('.cart__table.table', [
              el(
                '.table__header.table-header',
                ['Item', 'Discount', 'Price', 'Amount', 'Stock', 'Total'].map((item) =>
                  el('.table-header__item', item)
                )
              ),
              el(
                'ul.table__body',
                this.products.map((item, i) => new ProductInCart(item).element(i))
              ),
              el('.table__reset'),
            ]),
          ]),
          el('.cart__footer', [
            el('.cart__promo', [
              el('input.cart__input', { placeholder: 'enter promo code' }),
              el('button.btn', 'apply'),
            ]),
            el('.cart__order.order', [
              el('.order__header', `Total`),
              this.amountElement,
              this.totalSumElement,
              el('.order__go', [this.buyBtn]),
            ]),
          ]),
        ]
      ),
    ]);
    return table;
  }

  renderEmpty(): HTMLElement {
    return el(
      '.cart__empty',
      'Cart is empty. Please return to the catalog to choose the products you like.'
    );
  }
}
