import { el } from 'redom';
import { Product } from '../../../types';
import Swiper from 'swiper';
import 'swiper/css/bundle';

const swiper = new Swiper('.mySwiper', {
  loop: true,
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});

const swiper2 = new Swiper('.mySwiper2', {
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

function fillSlider(wrap: HTMLElement, urls: string[]): HTMLElement {
  urls.forEach((e) => wrap.append(el('.swiper-slide', [el('img', { src: e })])));
  return wrap;
}

export const details = (product: Readonly<Product>): HTMLElement => {
  return el('section.details', [
    el('.container.details__container', [
      el('.details__content', [
        el('.details__title', product.title),
        el('.details__desc', product.description),
        el('.details__price', product.price),
        el('.details__brand', product.brand),
        el('.details__rate', product.rating),
        el('.details__category', product.category),
      ]),
      el('.details__slider', [
        el(
          '.swiper.mySwiper2',
          fillSlider(el('.swiper-wrapper'), product.images),
          el('.swiper-button-next'),
          el('.swiper-button-prev')
        ),
        el('.swiper.mySwiper', fillSlider(el('.swiper-wrapper'), product.images), {
          thumbsSlider: '',
        }),
      ]),
    ]),
  ]);
};
