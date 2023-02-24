import { el } from 'redom';
import { setQueryString, sortOptions } from '../../utils';
import BaseElement from '../classes/BaseElement';
import { QueryParams } from '../../../types';
import { router } from '../../router';

class Dropdown extends BaseElement {
  public text: HTMLElement = el('span.dropdown__text', 'Sort by');
  private top: HTMLElement = el('.dropdown__top', [this.text]);
  public list: HTMLElement = el(
    'ul.dropdown__list',
    sortOptions.map((val) => el('li.dropdown__item', val))
  );
  constructor(key: keyof QueryParams) {
    super(key);
  }

  element() {
    const handleClick = (e: Event) => {
      const element = e.target as HTMLElement;
      if (!(element instanceof HTMLLIElement)) return;
      if (element.textContent) {
        this.text.textContent = element.textContent;
        const option = element.textContent.replace(' ', '_');
        router.navigate(setQueryString(this.key, option));
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

  restoreState() {
    super.restoreState((query: string | undefined) => {
      if (query && !sortOptions.includes(query.replace('_', ' '))) return;
      this.text.textContent = query ? query.replace('_', ' ') : 'Sort by';
    });
  }
}
export default Dropdown;
