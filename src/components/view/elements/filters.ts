import { el, setChildren } from 'redom';
import { setQueryString } from '../../utils';
import RangeInput from './RangeInput';

class Filters {
  private filtersContent: HTMLElement = el('.filters__content');
  private priceInput: RangeInput = new RangeInput(2, 1000);
  private stockInput: RangeInput = new RangeInput(1, 150);
  private filterItems: () => void;
  constructor(fn: () => void) {
    this.filterItems = fn;
  }

  element() {
    const filters: HTMLElement = el('aside.catalog__filters.filters', [this.filtersContent]);
    return filters;
  }

  block(title: string, element: HTMLElement) {
    return el('.filters__block', [el('h3.filters__subtitle', title), element]);
  }

  filterList(arr: string[], key: string): HTMLElement {
    const handleClick = (e: Event) => {
      const elem = e.target as HTMLElement;
      if (elem instanceof HTMLInputElement) {
        setQueryString(key, elem.checked ? elem.id : `${elem.id}-delete`);
        this.filterItems();
      }
    };
    const elements = arr.map((el) => this.item(el));
    return el('ul.filters__list', { onclick: handleClick }, elements);
  }

  item(item: string): HTMLElement {
    return el('li.filters__item', [
      el('label.checkbox', [
        el(`input.checkbox__input#${item}`, { type: 'checkbox' }),
        el('span.checkbox__text', item),
      ]),
    ]);
  }

  setFilters(categoriesArr: string[], brandsArr: string[]) {
    setChildren(this.filtersContent, [
      this.block('Categories:', this.filterList(categoriesArr, 'category')),
      this.block('Brands:', this.filterList(brandsArr, 'brand')),
      this.block('Price:', this.priceInput.element()),
      this.block('Stock:', this.stockInput.element()),
    ]);
    this.restoreState();
  }

  private restoreState() {
    const params = new URLSearchParams(location.search);
    const [categories, brands] = [params.get('category'), params.get('brand')];
    this.markCheckedElements(categories);
    this.markCheckedElements(brands);
  }

  private markCheckedElements(query: string | null) {
    if (query) {
      query.split('*').forEach((val) => {
        const elem = document.getElementById(val);
        if (elem instanceof HTMLInputElement) elem.checked = true;
      });
    }
  }
}

export default Filters;
