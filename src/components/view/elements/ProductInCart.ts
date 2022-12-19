import { el, setChildren } from 'redom';
import { ProductInCartType } from '../../../types';
import { getPriceWithDiscount } from '../../utils';
import BaseProduct from './BaseProduct';

class ProductInCart extends BaseProduct<ProductInCartType> {
  private totalSum: number;
  private totalSumElement: HTMLElement;
  private container = el('li.table__row.product');
  constructor(product: ProductInCartType) {
    super(product);
    this.totalSum = getPriceWithDiscount(this.product) * this.product.count;
    this.totalSumElement = el('.product__total', `${this.totalSum.toFixed(2)}€`);
  }

  element(index: number) {
    const priceWithDiscount = getPriceWithDiscount(this.product);
    this.addToCartBtn.count = this.product.count;
    this.addBtn.addEventListener('click', () => this.addToCart());

    setChildren(this.container, [
      el('.product__preview', [
        el('.product_num', `${index + 1}`),
        el('img', { src: this.product.thumbnail }),
        el('span', this.product.title),
      ]),
      el('.product__disc', `${this.product.discountPercentage}%`),
      el('.product_price.price', [
        el('.price__item.price__item_base', `${this.product.price}€`),
        el('.price__item.price__item_disc', `${priceWithDiscount.toFixed(2)}€`),
      ]),
      el('.product__amount.amount', [this.addBtn]),
      el('.product__stock', this.product.stock),
      this.totalSumElement,
    ]);

    return this.container;
  }
  addToCart() {
    if (!this.addToCartBtn.count) this.container.remove();
    this.product.count = this.addToCartBtn.count;
    this.totalSum = getPriceWithDiscount(this.product) * this.product.count;
    this.totalSumElement.textContent = `${this.totalSum.toFixed(2)}€`;
    super.addToCart(this.product);
  }
}
export default ProductInCart;
