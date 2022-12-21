import { Product, ProductInCartType } from '../../../types';
import { getProductsInCart, navigate } from '../../utils';
import { updateAmount } from '../../utils/updateCart';
import Payment from '../pages/Payment';
import AddToCartBtn from '../elements/addToCartBtn';

abstract class BaseProduct<T extends Product> {
  protected product: T;
  protected addToCartBtn: AddToCartBtn;
  protected addBtn: HTMLElement;
  protected buyNowBtn: HTMLElement;
  constructor(product: T) {
    this.product = product;
    this.addToCartBtn = new AddToCartBtn(this.product.stock);
    this.addBtn = this.addToCartBtn.element();
    this.buyNowBtn = this.addToCartBtn.buyNowElement();
  }

  element(index?: number) {
    this.restoreState();
    this.addBtn.addEventListener('click', () => this.addToCart());
    this.buyNowBtn.addEventListener('click', () => {
      console.log('event from BaseProduct');
      this.addToCart();
      navigate('/cart');
      new Payment().render().show();
    });
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
