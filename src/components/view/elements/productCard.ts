import { el } from 'redom';
import { Product } from '../../../types';
import { router } from '../../router';

export const productCard = (product: Product): HTMLElement => {
  const cardInfo = el('.card__info', { onclick: () => router.navigate(`/details/${product.id}`) }, [
    el('span.card__info-title', 'Category: ', [el('span', product.category)]),
    el('span.card__info-title', 'Brand: ', [el('span', product.brand)]),
    el('span.card__info-title', 'Stock: ', [el('span', product.stock)]),
    el('span.card__info-title', 'Rating: ', [el('span', product.rating)]),
    el('span.card__info-link', 'More info'),
  ]);
  cardInfo.setAttribute('data-navigo', '');

  return el('.card', [
    el('.card__top', [el('img.card__image', { src: product.images[0] }), cardInfo]),
    el('h4.card__title', product.title),
    el('span.card__price', `$${product.price}`),
    el('.card__buttons', [
      el('button.card__btn.btn', 'Add to cart'),
      el('button.card__btn.btn.btn-fill', 'Buy now'),
    ]),
  ]);
};
