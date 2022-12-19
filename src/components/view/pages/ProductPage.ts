import { el, setChildren } from 'redom';
import { Product } from '../../../types';
import Swiper, { Navigation, Thumbs } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import BaseProduct from '../elements/BaseProduct';

class ProductPage extends BaseProduct<Product> {
  private slider1: HTMLElement = el('.swiper.mySwiper', {
    thumbsSlider: '',
  });
  private slider2: HTMLElement = el('.swiper.mySwiper2');
  private nextBtn = el('.swiper-button-next');
  private prevBtn = el('.swiper-button-prev');

  constructor(product: Product) {
    super(product);
  }

  createDetails(): HTMLElement {
    this.restoreState();
    this.addBtn.addEventListener('click', () => this.addToCart());
    setChildren(this.slider1, [this.fillSlider(el('.swiper-wrapper'), this.product.images)]);
    setChildren(this.slider2, [
      this.fillSlider(el('.swiper-wrapper'), this.product.images),
      this.nextBtn,
      this.prevBtn,
    ]);

    const swiper1 = new Swiper(this.slider1, {
      modules: [Navigation],
      loop: true,
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });
    const swiper2 = new Swiper(this.slider2, {
      modules: [Navigation, Thumbs],
      navigation: {
        nextEl: this.nextBtn,
        prevEl: this.prevBtn,
      },
      loop: true,
      spaceBetween: 10,
      thumbs: {
        swiper: swiper1,
      },
    });
    return el('section.details', [
      el('.container.details__container', [
        el('.details__slider', [this.slider2, this.slider1]),
        el('.details__content', [
          el('.details__title', this.product.title),
          el('.details__desc', this.product.description),

          el('.details__brand', el('span', 'Manufacturer: '), el('span', `${this.product.brand}`)),
          el('.details__rate', el('span', 'Rating: '), el('span', `${this.product.rating}`)),
          el(
            '.details__category',
            el('span', 'Category: '),
            el('span', `${this.product.category}`)
          ),
          el(
            '.details__discount',
            el('span', 'Discount: '),
            el('span', `${this.product.discountPercentage}%`)
          ),
          el(
            '.details__buy-info',
            el('.details__price', [
              el(
                '.details__price_final',
                `${((this.product.price * (100 - this.product.discountPercentage)) / 100).toFixed(
                  2
                )}€`
              ),
              el('.details__price_full', `${this.product.price}€`),
            ]),
            this.addBtn,
            el('button.card__btn.btn.btn-fill', 'Buy now')
          ),
        ]),
      ]),
    ]);
  }

  private fillSlider(wrap: HTMLElement, urls: string[]): HTMLElement {
    urls.forEach((e) => wrap.append(el('.swiper-slide', [el('img', { src: e })])));
    return wrap;
  }
}
export default ProductPage;
