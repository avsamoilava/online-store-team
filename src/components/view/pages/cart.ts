import { el, setChildren } from 'redom';
import { ProductInCartType } from '../../../types';
import {
  getParams,
  getProductsByPage,
  getProductsCount,
  getProductsInCart,
  getTotalAmount,
  setQueryString,
} from '../../utils';
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
  private page;
  private pagesContainer = el('.cart__pagination');
  private productsList = el('ul.table__body');
  private pagination: Pagination;
  private limitInput = el('input', { type: 'number', min: 3, max: 10 });

  constructor() {
    this.products = getProductsInCart();
    this.totalSumElement = amountElement;
    this.amountElement = countElement;
    this.pagination = new Pagination(this.products.length, this.limit);
    this.page = Number(getParams()['page']) || 1;
    this.limit = Number(getParams()['limit']) || 4;
    this.limitInput.value = `${this.limit}`;
  }

  element(): HTMLElement {
    this.products = getProductsInCart();
    this.buyBtn.addEventListener('click', () => this.modal.show());
    document.querySelector('.wrapper')?.append(this.modal.render());
    this.totalSumElement.textContent = `Total cost: ${getTotalAmount(this.products).toFixed(2)}€`;
    this.amountElement.textContent = `Amount: ${getProductsCount(this.products)}`;
    this.renderProducts();
    this.limitInput.addEventListener('change', () =>
      this.changeLimit(Number(this.limitInput.value))
    );
    const element = el('section.cart', [
      el(
        '.container.cart__container',
        [el('.cart__title', 'Cart'), breadCrumbs([{ name: 'Cart', href: '' }])],
        [
          el('.cart__content', [
            el('.cart__controls', [
              el('.cart__limit', `Limit: `, [this.limitInput]),
              this.pagesContainer,
            ]),
            el('.cart__table.table', [
              el(
                '.table__header.table-header',
                ['Item', 'Discount', 'Price', 'Amount', 'Stock', 'Total'].map((item) =>
                  el('.table-header__item', item)
                )
              ),
              this.productsList,
              el('.table__reset'),
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
          ]),
        ]
      ),
    ]);
    return element;
  }

  renderTable(page?: number) {
    if (page) this.page = page;
    this.renderProducts();
    if (location.pathname === '/cart') setQueryString('page', `${this.page}`);
  }

  renderProducts() {
    this.products = getProductsInCart();
    if (!this.products || !this.products.length) return this.renderEmpty();
    this.setPages();
    const filteredProducts = getProductsByPage(this.products, this.page, this.limit);
    const products = filteredProducts.map((item, i) =>
      new ProductInCart(item, this.renderProducts.bind(this)).element(
        i + this.limit * (this.page - 1)
      )
    );
    setChildren(this.productsList, products);
  }

  setPages() {
    this.pagination = new Pagination(this.products.length, this.limit);
    if (this.page > this.pagination.pageCount) {
      this.page = this.pagination.pageCount;
      setQueryString('page', `${this.page}`);
    }
    const paginationEl = this.pagination.element(this.page, this.renderTable.bind(this));
    setChildren(this.pagesContainer, [paginationEl]);
  }

  renderEmpty() {
    setChildren(this.productsList, [
      el(
        '.cart__empty',
        'Cart is empty.\nPlease return to the catalog to choose the products you like.'
      ),
    ]);
    setChildren(this.pagesContainer, []);
  }

  changeLimit(value: number) {
    if (value > 10 || value < 3) return (this.limitInput.value = `${this.limit}`);
    this.limit = value;
    setQueryString('limit', `${this.limit}`);
    this.renderProducts();
  }
}
