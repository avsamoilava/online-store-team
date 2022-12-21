import { el, setChildren } from 'redom';
import { Product } from '../../../types';
import Swiper, { Navigation, Thumbs } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import BaseProduct from '../classes/BaseProduct';
import { getPriceWithDiscount } from '../../utils';
import { stars } from '../elements/stars';
import { breadCrumbs } from '../elements/breadCrumbs';
import Modal from '../elements/Modal';

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

  element(): HTMLElement {
    super.element();
    this.fillSlider(this.slider1);
    this.fillSlider(this.slider2, [this.nextBtn, this.prevBtn]);
    this.initSlider();
    this.modalSlide();
    return el('section.details', [
      el('.details__header.container', breadCrumbs(this.createLinks())),
      el('.container.details__container', [
        el('.details__slider', [this.slider2, this.slider1]),
        el('.details__content', [
          el('.details__title', this.product.title),
          el('.details__desc', this.product.description),

          el('.details__brand', el('span', 'Brand: '), el('span', `${this.product.brand}`)),
          el('.details__rate', el('span', 'Rating: '), el('span', `${this.product.rating}`)),
          stars(this.product.rating),
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
              el('.details__price_final', `${getPriceWithDiscount(this.product).toFixed(2)}€`),
              el('.details__price_full', `${this.product.price}€`),
            ]),
            this.addBtn,
            this.buyNowBtn
          ),
        ]),
      ]),
    ]);
  }

  private initSlider() {
    const swiper1 = new Swiper(this.slider1, {
      modules: [Navigation],
      loop: this.product.images.length > 4,
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
      loop: this.product.images.length > 4,
      spaceBetween: 10,
      thumbs: {
        swiper: swiper1,
      },
    });
    swiper2.init();
  }

  private fillSlider(slider: HTMLElement, btns: HTMLElement[] = []) {
    setChildren(slider, [
      el(
        '.swiper-wrapper',
        this.product.images.map((url) => el('.swiper-slide', [el('img', { src: url })]))
      ),
      ...btns,
    ]);
  }

  private modalSlide() {
    this.slider2.addEventListener('click', (e) => {
      if (e.target instanceof HTMLImageElement) {
        new Modal().render(el('img.modal__image', { src: e.target.src })).show();
      }
    });
  }

  createLinks() {
    const { category, brand, title } = this.product;
    return [
      { name: 'Catalog > ', href: '/catalog' },
      { name: `${category} > `, href: `/catalog/?category=${category}` },
      { name: `${brand} > `, href: `/catalog/?category=${category}&brand=${brand}` },
      { name: title, href: '' },
    ];
  }
}
export default ProductPage;
