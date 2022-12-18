import { el } from 'redom';
import { setQueryString } from '../../utils';

class FilterList {
  private filter: () => void;
  constructor(fn: () => void) {
    this.filter = fn;
  }

  element(arr: string[], key: string) {
    const handleClick = (e: Event) => {
      const elem = e.target as HTMLElement;
      if (elem instanceof HTMLInputElement) {
        setQueryString(key, elem.checked ? elem.id : `${elem.id}-delete`);
        this.filter();
      }
    };
    const elements = arr.map((el) => this.item(el));
    return el('ul.filters__list', { onclick: handleClick }, elements);
  }

  private item(item: string): HTMLElement {
    return el('li.filters__item', [
      el('label.checkbox', [
        el(`input.checkbox__input#${item}`, { type: 'checkbox' }),
        el('span.checkbox__text', item),
      ]),
    ]);
  }

  restoreState(query: string) {
    query.split('*').forEach((val) => {
      const elem = document.getElementById(val);
      if (elem instanceof HTMLInputElement) elem.checked = true;
    });
  }
}
export default FilterList;
