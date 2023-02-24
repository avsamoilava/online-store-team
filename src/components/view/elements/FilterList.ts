import { el } from 'redom';
import { QueryParams } from '../../../types';
import { router } from '../../router';
import { setQueryString } from '../../utils';
import BaseElement from '../classes/BaseElement';

class FilterList extends BaseElement {
  private elements: HTMLElement[] = [];
  constructor(key: keyof QueryParams) {
    super(key);
  }

  element(arr: string[]) {
    const handleClick = (e: Event) => {
      const elem = e.target as HTMLElement;
      if (elem instanceof HTMLInputElement) {
        router.navigate(setQueryString(this.key, elem.checked ? elem.id : `${elem.id}-delete`));
      }
    };
    this.elements = arr.map((el) => this.item(el));
    return el('ul.filters__list', { onclick: handleClick }, this.elements);
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
    this.clearElements();
    super.restoreState((query: string | undefined) => {
      if (query)
        query.split('*').forEach((val) => {
          const elem = document.getElementById(val);
          if (elem instanceof HTMLInputElement) elem.checked = true;
        });
    });
  }
  clearElements() {
    this.elements.forEach((elem) => {
      (elem.querySelector('.checkbox__input') as HTMLInputElement).checked = false;
    });
  }
}
export default FilterList;
