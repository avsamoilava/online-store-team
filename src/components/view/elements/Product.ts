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
    const cart = getProductsInCart().filter((item) => item.title !== itemToAdd?.title);
    if (itemToAdd && this.addToCartBtn.count) cart.push(itemToAdd);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateAmount();
  }
}
export default BaseProduct;
