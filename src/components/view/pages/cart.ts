import { el } from 'redom';

export const cart: HTMLElement = el('section.cart', [
  el('.container', [el('.cart__content', [el('h1', 'cart')])]),
]);
