import { el, setChildren } from 'redom';
import { ProductInCartType } from '../../../types';
import { getProductsCount, getProductsInCart, getTotalAmount } from '../../utils';
import { amountElement, countElement } from '../../utils/updateCart';
import { breadCrumbs } from '../elements/breadCrumbs';
import Pagination from '../elements/pagination';
import ProductInCart from '../elements/ProductInCart';
import { Modal } from './Modal';

export class Cart {
  private products: Readonly<ProductInCartType>[];
  private modal: Modal = new Modal();
  private buyBtn = el('button.btn.btn-fill', 'buy now');
  private totalSumElement: HTMLElement;
  private amountElement: HTMLElement;
  private limit = 4;
  private page = 1;
  private pagesContainer = el('.cart__pagination');
  private productsList = el('ul.table__body');

  constructor() {
    this.products = getProductsInCart();
    this.totalSumElement = amountElement;
    this.amountElement = countElement;
  }

  element(): HTMLElement {
    this.buyBtn.addEventListener('click', () => this.modal.show());
    document.querySelector('.wrapper')?.append(this.modal.render());
    this.products = getProductsInCart();
    if (!this.products || !this.products.length) return this.renderEmpty();
    this.totalSumElement.textContent = `Total cost: ${getTotalAmount(this.products).toFixed(2)}€`;
    this.amountElement.textContent = `Amount: ${getProductsCount(this.products)}`;
    const pagination = new Pagination(this.products.length, this.limit);
    setChildren(this.pagesContainer, [pagination.element(this.page, this.renderTable.bind(this))]);
    return el('section.cart', [
      el(
        '.container.cart__container',
        [el('.cart__title', 'Cart'), breadCrumbs('Cart')],
        [
          el('.cart__content', [
            this.pagesContainer,
            el('.cart__table.table', [
              el(
                '.table__header.table-header',
                ['Item', 'Discount', 'Price', 'Amount', 'Stock', 'Total'].map((item) =>
                  el('.table-header__item', item)
                )
              ),
              this.renderTable(),
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
  }

  renderTable(page = 1) {
    if (page) this.page = page;
    const coef: number = this.limit * (this.page - 1);

    const filteredProducts =
      this.products.length >= this.limit
        ? this.products.filter((_, idx) => idx >= 0 + coef && idx < this.limit + coef)
        : this.products;
    setChildren(
      this.productsList,
      filteredProducts.map((item, i) => new ProductInCart(item).element(i))
    );
    return this.productsList;
  }

  renderEmpty(): HTMLElement {
    return el(
      '.cart__empty',
      'Cart is empty. Please return to the catalog to choose the products you like.'
    );
  }
}
