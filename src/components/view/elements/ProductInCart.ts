import { el } from 'redom';
import { ProductInCart } from '../../../types';
import { getPriceWithDiscount } from '../../utils';
import AddToCartBtn from './addToCartBtn';

class ProductCart {
  private product: Readonly<ProductInCart>;
  private addToCartBtn: AddToCartBtn;
  private addBtn: HTMLElement;
  // private updateCart: () => void;
  constructor(product: Readonly<ProductInCart>) {
    this.product = product;
    this.addToCartBtn = new AddToCartBtn(this.product.stock);
    this.addBtn = this.addToCartBtn.element();
    // this.updateCart = fn;
  }

  element(index: number) {
    const priceWithDiscount = getPriceWithDiscount(this.product);
    this.addToCartBtn.count = this.product.count;

    return el('li.table__row.product', [
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
      el('.product__total', `${(priceWithDiscount * this.product.count).toFixed(2)}€`),
    ]);
  }
}
export default ProductCart;
