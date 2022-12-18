import { el } from 'redom';
import { ProductInCart } from '../../../types';
import { getPriceWithDiscount, getProductsInCart } from '../../utils';
import { breadCrumbs } from '../elements/breadCrumbs';
import { Modal } from './Modal';

export class Cart {
  private products: Readonly<ProductInCart>[];
  private modal: Modal = new Modal();
  private amount = 0;
  private sum = 0;
  private buyBtn = el('button.btn.btn-fill', 'buy now');

  constructor() {
    this.products = getProductsInCart();
  }

  testTemplate(): HTMLElement {
    document.querySelector('.wrapper')?.append(this.modal.render());
    if (!this.products || !this.products.length) return this.renderEmpty();
    return this.renderTable();
  }

  renderTable(): HTMLElement {
    this.buyBtn.addEventListener('click', () => this.modal.show());
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
                this.products.map((item, i) => this.item(item, i))
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
              el('.order__amount', `Amount: ${this.products.length}`),
              el('.order__sum', `Total cost: ${this.totalAmount().toFixed(2)}€`),
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

  item(product: Readonly<ProductInCart>, index: number) {
    const priceWithDiscount = getPriceWithDiscount(product);
    return el('li.table__row.product', [
      el('.product__preview', [
        el('.product_num', `${index + 1}`),
        el('img', { src: product.thumbnail }),
        el('span', product.title),
      ]),
      el('.product__disc', `${product.discountPercentage}%`),
      el('.product_price.price', [
        el('.price__item.price__item_base', `${product.price}€`),
        el('.price__item.price__item_disc', `${priceWithDiscount.toFixed(2)}€`),
      ]),
      el('.product__amount.amount', [
        el('button.amount__item.amount__item_down', '-', { 'data-id': product.id }),
        el('span.amount__item.amount__item_value', product.count),
        el('button.amount__item.amount__item_up', '+', { 'data-id': product.id }),
      ]),
      el('.product__stock', product.stock),
      el('.product__total', `${(priceWithDiscount * product.count).toFixed(2)}€`),
    ]);
  }

  totalAmount() {
    return this.products.reduce((a, b) => a + getPriceWithDiscount(b) * b.count, 0);
  }

  reset(): void {
    console.log('');
  }

  update(): void {
    console.log('');
  }
}
