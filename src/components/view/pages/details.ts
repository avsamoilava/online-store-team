import { el } from 'redom';
import { Product } from '../../../types';

export const details = (product: Readonly<Product>): HTMLElement =>
  el('section.details', [
    el('.container', [
      el('.details__content', [
        el('h1', product.title),
        el('p', product.description),
        el('img', { src: product.images[0] }),
      ]),
    ]),
  ]);
