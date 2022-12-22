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
import { amountElement, countElement, promoDiscountAmountElement } from '../../utils/updateCart';
import BasePage from '../classes/BasePage';
import { breadCrumbs } from '../elements/breadCrumbs';
import Pagination from '../elements/pagination';
import ProductInCart from '../elements/ProductInCart';
import Payment from './Payment';
import { Promocode } from '../elements/Promocode';

export class Cart extends BasePage {
  private products: Readonly<ProductInCartType>[];
  private modal: Payment = new Payment();
  private buyBtn = el('button.btn.btn-fill', 'buy now');
  private totalSumElement: HTMLElement;
  private amountElement: HTMLElement;
  private promoSumElement: HTMLElement;
  private limitInput = el('input', { type: 'number', min: 3, max: 10 });
  private promo: Promocode;

  constructor() {
    super(
      el('ul.table__body'),
      el('.cart__pagination'),
      Number(getParams()['page']) || 1,
      Number(getParams()['limit']) || 4,
      el('.empty', 'Cart is empty.\nPlease return to the catalog to choose the products you like.')
    );
    this.products = getProductsInCart();
    this.totalSumElement = amountElement;
    this.amountElement = countElement;
    this.limitInput.value = `${this.limit}`;
    this.promo = new Promocode();
    this.promoSumElement = promoDiscountAmountElement;
  }

  element(): HTMLElement {
    this.products = getProductsInCart();
    this.modal.render();
    this.buyBtn.addEventListener('click', () => this.modal.show());
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
              this.promo.element(),
              el('.cart__order.order', [
                el('.order__header', `Total`),
                this.amountElement,
                this.totalSumElement,
                this.promoSumElement,
                el('.order__go', [this.buyBtn]),
              ]),
            ]),
          ]),
        ]
      ),
    ]);
    return element;
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
    if (getParams().page) this.page = Number(getParams().page);
    this.pagination = new Pagination(this.products.length, this.limit);
    if (this.page > this.pagination.pageCount) {
      this.page = this.pagination.pageCount;
      setQueryString('page', `${this.page}`);
    }
    const paginationEl = this.pagination.element(this.page);
    setChildren(this.pagesContainer, [paginationEl]);
  }

  changeLimit(value: number) {
    if (value > 10 || value < 3) return (this.limitInput.value = `${this.limit}`);
    this.limit = value;
    setQueryString('limit', `${this.limit}`);
    this.renderProducts();
  }
}
