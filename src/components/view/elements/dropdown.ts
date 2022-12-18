import { el } from 'redom';
import { getParams, setQueryString, sortOptions } from '../../utils';
import CloseIcon from '../../../assets/images/icons/close.svg';

class Dropdown {
  public text: HTMLElement = el('span.dropdown__text', 'Sort by');
  public closeIcon = el('img.dropdown__close', { src: CloseIcon });
  private top: HTMLElement = el('.dropdown__top', [this.text]);
  public list: HTMLElement = el(
    'ul.dropdown__list',
    sortOptions.map((val) => el('li.dropdown__item', val))
  );
  private sortItems: () => void;
  constructor(fn: () => void) {
    this.sortItems = fn;
  }

  element() {
    const { sort } = getParams();
    if (sort) this.restoreState(sort);

    this.closeIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      this.reset();
      this.sortItems();
    });
    const handleClick = (e: Event) => {
      const element = e.target as HTMLElement;
      if (!(element instanceof HTMLLIElement)) return;
      if (element.textContent) {
        this.text.textContent = element.textContent;
        this.closeIcon.classList.add('dropdown__close--active');
        const option = element.textContent.replace(' ', '_');
        setQueryString('sort', option);

        this.sortItems();
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

  restoreState(value: string) {
    if (!sortOptions.includes(value.replace('_', ' '))) return;
    this.text.textContent = value.replace('_', ' ');
    this.closeIcon.classList.add('dropdown__close--active');
  }

  reset() {
    setQueryString('sort', '');
    this.text.textContent = 'Sort by';
    this.closeIcon.classList.remove('dropdown__close--active');
  }
}
export default Dropdown;
