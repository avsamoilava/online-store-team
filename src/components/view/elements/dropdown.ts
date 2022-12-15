import { el } from 'redom';
import { SortOptions } from '../../../types';
import { setQueryString } from '../../utils';
import CloseIcon from '../../../assets/images/icons/close.svg';

class Dropdown {
  public text: HTMLElement = el('span.dropdown__text', 'Sort by');
  public closeIcon = el('img.dropdown__close', { src: CloseIcon });
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
    this.closeIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      this.reset();
    });
    const handleClick = (e: Event) => {
      const element = e.target as HTMLElement;
      if (!element.classList.contains('dropdown__item')) return;
      if (element.textContent) {
        this.text.textContent = element.textContent;
        this.closeIcon.classList.add('dropdown__close--active');
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
      [this.top, this.list, this.closeIcon]
    );
    return dropdown;
  }

  reset() {
    setQueryString('sort', '');
    this.text.textContent = 'Sort by';
    this.closeIcon.classList.remove('dropdown__close--active');
  }
}
export default Dropdown;
