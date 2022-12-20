import { el, setChildren } from 'redom';
import { MinAndMax } from '../../../types';
import Dropdown from './dropdown';
import FilterList from './FilterList';
import RangeInput from './RangeInput';
import SearchInput from './searchInput';

class Filters {
  private filtersContent: HTMLElement = el('.filters__content');
  private priceInput: RangeInput;
  private stockInput: RangeInput;
  private categoriesList: FilterList;
  private brandsList: FilterList;
  public searchInput: SearchInput;
  public dropdown: Dropdown;

  constructor(fn: () => void) {
    this.priceInput = new RangeInput(fn, 'price');
    this.stockInput = new RangeInput(fn, 'stock');
    this.categoriesList = new FilterList(fn, 'category');
    this.brandsList = new FilterList(fn, 'brand');
    this.searchInput = new SearchInput(fn, 'search');
    this.dropdown = new Dropdown(fn, 'sort');
  }

  element() {
    const filters: HTMLElement = el('aside.catalog__filters.filters', [this.filtersContent]);
    return filters;
  }

  block(title: string, element: HTMLElement) {
    return el('.filters__block', [el('h3.filters__subtitle', title), element]);
  }

  setFilters(categoriesArr: string[], brandsArr: string[], prices: MinAndMax, stock: MinAndMax) {
    setChildren(this.filtersContent, [
      this.block('Categories:', this.categoriesList.element(categoriesArr)),
      this.block('Brands:', this.brandsList.element(brandsArr)),
      this.block('Price:', this.priceInput.element(prices)),
      this.block('Stock:', this.stockInput.element(stock)),
      el('button.btn', 'Reset filters'),
      el('button.btn', 'Copy'),
    ]);
    this.restoreState();
  }

  private restoreState() {
    [this.priceInput, this.stockInput, this.categoriesList, this.brandsList].forEach((elem) =>
      elem.restoreState()
    );
  }
}

export default Filters;
