import { el } from 'redom';
import { Product } from '../../../types';
import { router } from '../../router';
import { getProductsInCart } from '../../utils';
import AddToCartBtn from './addToCartBtn';

class ProductCard {
  private product: Readonly<Product>;
  private addToCartBtn: AddToCartBtn;
  constructor(product: Readonly<Product>) {
    this.product = product;
    this.addToCartBtn = new AddToCartBtn();
  }

  element() {
    this.restoreState();
    const addBtn = this.addToCartBtn.element();
    addBtn.addEventListener('click', () => this.addToCart());
    const cardInfo = el(
      '.card__info',
      { onclick: () => router.navigate(`/details/${this.product.id}`) },
      [
        el('span.card__info-title', 'Category: ', [el('span', this.product.category)]),
        el('span.card__info-title', 'Brand: ', [el('span', this.product.brand)]),
        el('span.card__info-title', 'Stock: ', [el('span', this.product.stock)]),
        el('span.card__info-title', 'Rating: ', [el('span', this.product.rating)]),
        el('span.card__info-title', 'Discount: ', [
          el('span', `${this.product.discountPercentage}%`),
        ]),
        el('span.card__info-link', 'More info'),
      ]
    );
    cardInfo.setAttribute('data-navigo', '');

    return el('.card', [
      el('.card__top', [el('img.card__image', { src: this.product.images[0] }), cardInfo]),
      el('h4.card__title', this.product.title),
      el('span.card__price', `$${this.product.price}`),
      el('.card__buttons', [addBtn, el('button.card__btn.btn.btn-fill', 'Buy now')]),
    ]);
  }

  addToCart() {
    const itemToAdd = { ...this.product, count: this.addToCartBtn.count };
    const cart = getProductsInCart().filter((item) => item.title !== itemToAdd.title);
    if (this.addToCartBtn.count) cart.push(itemToAdd);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  private restoreState() {
    const prod = getProductsInCart().find((item) => item.title === this.product.title);
    if (prod) this.addToCartBtn.count = prod.count;
  }
}

export default ProductCard;
