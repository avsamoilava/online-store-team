import { el } from 'redom';
import { SortOptions } from '../../../types';
import { setQueryString } from '../../utils';

// export const dropdownText: HTMLElement = el('span.dropdown__text', 'Sort by');
// const dropdownTop: HTMLElement = el('.dropdown__top', [dropdownText]);
// export const dropdownList = el('ul.dropdown__list', [
//   el('li.dropdown__item', 'price asc'),
//   el('li.dropdown__item', 'price desc'),
//   el('li.dropdown__item', 'rating asc'),
//   el('li.dropdown__item', 'rating desc'),
//   el('li.dropdown__item', 'discount asc'),
//   el('li.dropdown__item', 'discount desc'),
// ]);
// document.body.addEventListener('click', () => {
//   dropdownTop.classList.remove('dropdown__top--active');
// });
// export const dropdown: HTMLElement = el(
//   '.dropdown',
//   {
//     onclick: (e: Event) => {
//       e.stopPropagation();
//       dropdownTop.classList.toggle('dropdown__top--active');
//     },
//   },
//   [dropdownTop, dropdownList]
// );

class Dropdown {
  public text: HTMLElement = el('span.dropdown__text', 'Sort by');
  private top: HTMLElement = el('.dropdown__top', [this.text]);
  public list: HTMLElement = el('ul.dropdown__list', [
    el('li.dropdown__item', 'price asc'),
    el('li.dropdown__item', 'price desc'),
    el('li.dropdown__item', 'rating asc'),
    el('li.dropdown__item', 'rating desc'),
    el('li.dropdown__item', 'discount asc'),
    el('li.dropdown__item', 'discount desc'),
  ]);

  element(fn: (a: string) => void) {
    const handleClick = (e: Event) => {
      const element = e.target as HTMLElement;
      if (!element.classList.contains('dropdown__item')) return;
      if (element.textContent) {
        this.text.textContent = element.textContent;
        const option = element.textContent.replace(' ', '_') as SortOptions;
        setQueryString('sort', option);

        fn(option);
      }
    };
    this.list.addEventListener('click', handleClick);
    document.body.addEventListener('click', () => {
      this.top.classList.remove('dropdown__top--active');
    });
    const dropdown: HTMLElement = el(
      '.dropdown',
      {
        onclick: (e: Event) => {
          e.stopPropagation();
          this.top.classList.toggle('dropdown__top--active');
        },
      },
      [this.top, this.list]
    );
    return dropdown;
  }
}
export default Dropdown;
