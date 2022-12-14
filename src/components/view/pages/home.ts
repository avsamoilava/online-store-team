import { el } from 'redom';
export const home: HTMLElement = el('section.home', [
  el('.container', [el('.home__content', [el('h1', 'home')])]),
]);
