import { el } from 'redom';
import { QueryParams } from '../../../types';
import { setQueryString } from '../../utils';
import BaseElement from './BaseElement';

class FilterList extends BaseElement {
  constructor(fn: () => void, key: keyof QueryParams) {
    super(fn, key);
  }

  element(arr: string[]) {
    const handleClick = (e: Event) => {
      const elem = e.target as HTMLElement;
      if (elem instanceof HTMLInputElement) {
        setQueryString(this.key, elem.checked ? elem.id : `${elem.id}-delete`);
        this.selectItemsByQuery();
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

  restoreState() {
    super.restoreState((query: string) =>
      query.split('*').forEach((val) => {
        const elem = document.getElementById(val);
        if (elem instanceof HTMLInputElement) elem.checked = true;
      })
    );
  }
}
export default FilterList;
