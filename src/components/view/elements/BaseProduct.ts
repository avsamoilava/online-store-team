import { Product, ProductInCartType } from '../../../types';
import { getProductsInCart } from '../../utils';
import { updateAmount } from '../../utils/updateCart';
import AddToCartBtn from './addToCartBtn';

abstract class BaseProduct<T extends Product> {
  protected product: T;
  protected addToCartBtn: AddToCartBtn;
  protected addBtn: HTMLElement;
  constructor(product: T) {
    this.product = product;
    this.addToCartBtn = new AddToCartBtn(this.product.stock);
    this.addBtn = this.addToCartBtn.element();
  }

  addToCart(itemToAdd?: ProductInCartType) {
    if (!itemToAdd) itemToAdd = { ...this.product, count: this.addToCartBtn.count };
    const cart = getProductsInCart().filter((item) => item.title !== itemToAdd?.title);
    if (itemToAdd && this.addToCartBtn.count) cart.push(itemToAdd);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateAmount();
  }

  protected restoreState() {
    const prod = getProductsInCart().find((item) => item.title === this.product.title);
    if (prod) this.addToCartBtn.count = prod.count;
  }
}
export default BaseProduct;
