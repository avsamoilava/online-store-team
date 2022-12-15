import { el } from 'redom';
const filterItem = (): HTMLElement =>
  el('li.filters__item', [
    el('label.checkbox', [
      el('input.checkbox__input', { type: 'checkbox' }),
      el('span.checkbox__text', 'Smartphones'),
    ]),
  ]);
export const filters: HTMLElement = el('aside.catalog__filters.filters', [
  el('.filters__top', [
    el('h2.filters__title', 'Filter by:'),
    el('.filters__content', [
      el('.filters__block', [
        el('h3.filters__subtitle', 'Category'),
        el('ul.filters__list', [filterItem(), filterItem(), filterItem()]),
      ]),
      el('.filters__block', [
        el('h3.filters__subtitle', 'Brand'),
        el('ul.filters__list', [filterItem(), filterItem(), filterItem()]),
      ]),
      el('.filters__block', [el('h3.filters__subtitle', 'Price'), el('input', { type: 'range' })]),
      el('.filters__block', [el('h3.filters__subtitle', 'Stock'), el('input', { type: 'range' })]),
    ]),
  ]),
]);
