import { el } from 'redom';
import { Product } from '../../../types';
import { router } from '../../router';

export const productCard = (product: Product): HTMLElement => {
  const link = el('h4.card__title', product.title, {
    onclick: () => router.navigate(`/details/${product.id}`),
  });
  link.setAttribute('data-navigo', '');
  return el('.card', [link]);
};
