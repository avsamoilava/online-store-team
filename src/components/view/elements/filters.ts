import { el, setChildren } from 'redom';
import { MinAndMax } from '../../../types';
import FilterList from './FilterList';
import RangeInput from './RangeInput';

class Filters {
  private filtersContent: HTMLElement = el('.filters__content');
  private priceInput: RangeInput;
  private stockInput: RangeInput;
  private categoriesList: FilterList;
  private brandsList: FilterList;

  constructor(fn: () => void) {
    this.priceInput = new RangeInput(fn, 'price', 'Price:');
    this.stockInput = new RangeInput(fn, 'stock', 'Stock:');
    this.categoriesList = new FilterList(fn, 'category', 'Categories:');
    this.brandsList = new FilterList(fn, 'brand', 'Brands:');
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
      this.block(this.categoriesList.title, this.categoriesList.element(categoriesArr)),
      this.block(this.brandsList.title, this.brandsList.element(brandsArr)),
      this.block(this.priceInput.title, this.priceInput.element(prices)),
      this.block(this.stockInput.title, this.stockInput.element(stock)),
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
