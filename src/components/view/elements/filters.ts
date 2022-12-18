import { el, setChildren } from 'redom';
import { MinAndMax } from '../../../types';
import { getParams } from '../../utils';
import FilterList from './FilterList';
import RangeInput from './RangeInput';

class Filters {
  private filtersContent: HTMLElement = el('.filters__content');
  private priceInput: RangeInput;
  private stockInput: RangeInput;
  private categoriesList: FilterList;
  private brandsList: FilterList;
  constructor(fn: () => void) {
    this.priceInput = new RangeInput(fn);
    this.stockInput = new RangeInput(fn);
    this.categoriesList = new FilterList(fn);
    this.brandsList = new FilterList(fn);
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
      this.block('Categories:', this.categoriesList.element(categoriesArr, 'category')),
      this.block('Brands:', this.brandsList.element(brandsArr, 'brand')),
      this.block('Price:', this.priceInput.element(prices, 'price')),
      this.block('Stock:', this.stockInput.element(stock, 'stock')),
    ]);
    this.restoreState();
  }

  private restoreState() {
    const { price, stock, category, brand } = getParams();

    if (price) this.priceInput.restoreState(price);
    if (stock) this.stockInput.restoreState(stock);
    if (category) this.categoriesList.restoreState(category);
    if (brand) this.brandsList.restoreState(brand);
  }
}

export default Filters;
