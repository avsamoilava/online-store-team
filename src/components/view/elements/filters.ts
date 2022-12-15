import { el } from 'redom';
const filterItem = (item: string): HTMLElement =>
  el('li.filters__item', [
    el('label.checkbox', [
      el('input.checkbox__input', { type: 'checkbox' }),
      el('span.checkbox__text', item),
    ]),
  ]);
export const filterBlock = (title: string, arr: string[]): HTMLElement => {
  const elements = arr.map((el) => filterItem(el));
  return el('.filters__block', [
    el('h3.filters__subtitle', title),
    el('ul.filters__list', elements),
  ]);
};
export const filtersContent = el('.filters__content');
export const filters: HTMLElement = el('aside.catalog__filters.filters', [
  el('.filters__top', [
    el('h2.filters__title', 'Filter by:'),
    filtersContent,
    // el('.filters__content', [
    //   // filterBlock('Categories'),
    //   // filterBlock('Brands'),
    //   // el('.filters__block', [el('h3.filters__subtitle', 'Price'), el('input', { type: 'range' })]),
    //   // el('.filters__block', [el('h3.filters__subtitle', 'Stock'), el('input', { type: 'range' })]),
    // ]),
  ]),
]);
