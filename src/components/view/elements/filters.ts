import { el, setChildren } from 'redom';
import { MinAndMax } from '../../../types';
import { getParams, setQueryString } from '../../utils';
import RangeInput from './RangeInput';

class Filters {
  private filtersContent: HTMLElement = el('.filters__content');
  private priceInput: RangeInput;
  private stockInput: RangeInput;
  private filterItems: () => void;
  constructor(fn: () => void) {
    this.filterItems = fn;
    this.priceInput = new RangeInput();
    this.stockInput = new RangeInput();
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

  setFilters(categoriesArr: string[], brandsArr: string[], prices: MinAndMax, stock: MinAndMax) {
    setChildren(this.filtersContent, [
      this.block('Categories:', this.filterList(categoriesArr, 'category')),
      this.block('Brands:', this.filterList(brandsArr, 'brand')),
      this.block('Price:', this.priceInput.element(prices, 'price', this.filterItems)),
      this.block('Stock:', this.stockInput.element(stock, 'stock', this.filterItems)),
    ]);
    this.restoreState();
  }

  private restoreState() {
    const params = getParams();

    if (params.price) this.restoreRanges(params.price, 'price');
    if (params.stock) this.restoreRanges(params.stock, 'stock');
    if (params.category) this.markCheckedElements(params.category);
    if (params.brand) this.markCheckedElements(params.brand);
  }

  private markCheckedElements(query: string | null) {
    if (query) {
      query.split('*').forEach((val) => {
        const elem = document.getElementById(val);
        if (elem instanceof HTMLInputElement) elem.checked = true;
      });
    }
  }

  private restoreRanges(query: string, key: 'price' | 'stock') {
    const minAndMax = query.split('-').map(Number);
    key === 'price'
      ? this.priceInput.setRange(minAndMax[0], minAndMax[1])
      : this.stockInput.setRange(minAndMax[0], minAndMax[1]);
  }
}

export default Filters;
