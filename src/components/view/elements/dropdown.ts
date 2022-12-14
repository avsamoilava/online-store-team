import { el } from 'redom';

export const dropdownText: HTMLElement = el('span.dropdown__text', 'Sort by');
const dropdownTop: HTMLElement = el('.dropdown__top', [dropdownText]);
export const dropdownList = el('ul.dropdown__list', [
  el('li.dropdown__item', 'price asc'),
  el('li.dropdown__item', 'price desc'),
  el('li.dropdown__item', 'rating asc'),
  el('li.dropdown__item', 'rating desc'),
  el('li.dropdown__item', 'discount asc'),
  el('li.dropdown__item', 'discount desc'),
]);
document.body.addEventListener('click', () => {
  dropdownTop.classList.remove('dropdown__top--active');
});
export const dropdown: HTMLElement = el(
  '.dropdown',
  {
    onclick: (e: Event) => {
      e.stopPropagation();
      dropdownTop.classList.toggle('dropdown__top--active');
    },
  },
  [dropdownTop, dropdownList]
);
