import { el } from 'redom';
import { setQueryString, sortOptions } from '../../utils';
import CloseIcon from '../../../assets/images/icons/close.svg';
import BaseElement from './BaseElement';
import { QueryParams } from '../../../types';

class Dropdown extends BaseElement {
  public text: HTMLElement = el('span.dropdown__text', 'Sort by');
  public closeIcon = el('img.dropdown__close', { src: CloseIcon });
  private top: HTMLElement = el('.dropdown__top', [this.text]);
  public list: HTMLElement = el(
    'ul.dropdown__list',
    sortOptions.map((val) => el('li.dropdown__item', val))
  );
  constructor(fn: () => void, key: keyof QueryParams) {
    super(fn, key);
  }

  element() {
    this.restoreState();

    this.closeIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      this.reset();
      this.selectItemsByQuery();
    });
    const handleClick = (e: Event) => {
      const element = e.target as HTMLElement;
      if (!(element instanceof HTMLLIElement)) return;
      if (element.textContent) {
        this.text.textContent = element.textContent;
        this.closeIcon.classList.add('dropdown__close--active');
        const option = element.textContent.replace(' ', '_');
        setQueryString(this.key, option);

        this.selectItemsByQuery();
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
      [this.top, this.list, this.closeIcon]
    );
    return dropdown;
  }

  restoreState() {
    const restore = (query: string) => {
      if (!sortOptions.includes(query.replace('_', ' '))) return;
      this.text.textContent = query.replace('_', ' ');
      this.closeIcon.classList.add('dropdown__close--active');
    };
    super.restoreState(restore);
  }

  reset() {
    setQueryString(this.key, '');
    this.text.textContent = 'Sort by';
    this.closeIcon.classList.remove('dropdown__close--active');
  }
}
export default Dropdown;
