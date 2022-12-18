import { el, setChildren } from 'redom';
import { Product } from '../../../types';
import Swiper from 'swiper';
import 'swiper/css/bundle';

export class Details {
  private slider1: HTMLElement = el('.swiper.mySwiper', {
    thumbsSlider: '',
  });
  private slider2: HTMLElement = el('.swiper.mySwiper2');

  fillSlider(wrap: HTMLElement, urls: string[]): HTMLElement {
    urls.forEach((e) => wrap.append(el('.swiper-slide', [el('img', { src: e })])));
    return wrap;
  }

  createDetails(product: Readonly<Product>): HTMLElement {
    setChildren(this.slider1, [this.fillSlider(el('.swiper-wrapper'), product.images)]);
    setChildren(this.slider2, [
      this.fillSlider(el('.swiper-wrapper'), product.images),
      el('.swiper-button-next'),
      el('.swiper-button-prev'),
    ]);
    const swiper = new Swiper(this.slider1, {
      loop: true,
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });
    const swiper2 = new Swiper(this.slider2, {
      loop: true,
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      thumbs: {
        swiper: swiper,
      },
    });
    return el('section.details', [
      el('.container.details__container', [
        el('.details__slider', [this.slider2, this.slider1]),
        el('.details__content', [
          el('.details__title', product.title),
          el('.details__desc', product.description),
          el('.details__price', product.price),
          el('.details__brand', product.brand),
          el('.details__rate', product.rating),
          el('.details__category', product.category),
        ]),
      ]),
    ]);
  }
}
