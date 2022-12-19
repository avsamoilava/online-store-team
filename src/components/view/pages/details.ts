import { el, setChildren } from 'redom';
import { Product } from '../../../types';
import AddToCartBtn from '../elements/addToCartBtn';
import Swiper, { Navigation, Thumbs } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

export class Details {
  private slider1: HTMLElement = el('.swiper.mySwiper', {
    thumbsSlider: '',
  });
  private slider2: HTMLElement = el('.swiper.mySwiper2');
  private addToCart = new AddToCartBtn();
  private nextBtn = el('.swiper-button-next');
  private prevBtn = el('.swiper-button-prev');

  private fillSlider(wrap: HTMLElement, urls: string[]): HTMLElement {
    urls.forEach((e) => wrap.append(el('.swiper-slide', [el('img', { src: e })])));
    return wrap;
  }

  createDetails(product: Readonly<Product>): HTMLElement {
    setChildren(this.slider1, [this.fillSlider(el('.swiper-wrapper'), product.images)]);
    setChildren(this.slider2, [
      this.fillSlider(el('.swiper-wrapper'), product.images),
      this.nextBtn,
      this.prevBtn,
    ]);

    const addBtn = this.addToCart.element();
    addBtn.classList.add('details__btn', 'details__btn_addCart');
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
          el('.details__title', product.title),
          el('.details__desc', product.description),

          el('.details__brand', el('span', 'Manufacturer: '), el('span', `${product.brand}`)),
          el('.details__rate', el('span', 'Rating: '), el('span', `${product.rating}`)),
          el('.details__category', el('span', 'Category: '), el('span', `${product.category}`)),
          el(
            '.details__discount',
            el('span', 'Discount: '),
            el('span', `${product.discountPercentage}%`)
          ),
          el(
            '.details__buy-info',
            el('.details__price', [
              el(
                '.details__price_final',
                `${((product.price * (100 - product.discountPercentage)) / 100).toFixed(2)}€`
              ),
              el('.details__price_full', `${product.price}€`),
            ]),
            addBtn,
            el('button.details__btn.details__btn_buy.btn.btn-fill', 'Buy now')
          ),
        ]),
      ]),
    ]);
  }
}
