import { el } from 'redom';

const dropdownText: HTMLElement = el('span', 'Sort by');
const dropdownTop: HTMLElement = el('.dropdown__top', [dropdownText]);

const handleClick = (e: Event) => {
  const element = e.target as HTMLElement;
  if (!element.classList.contains('dropdown__item')) return;
  dropdownText.textContent = element.textContent;
};
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
  [
    dropdownTop,
    el('ul.dropdown__list', { onclick: handleClick }, [
      el('li.dropdown__item', 'price asc'),
      el('li.dropdown__item', 'price desc'),
      el('li.dropdown__item', 'rating asc'),
      el('li.dropdown__item', 'rating desc'),
      el('li.dropdown__item', 'discount asc'),
      el('li.dropdown__item', 'discount desc'),
    ]),
  ]
);
