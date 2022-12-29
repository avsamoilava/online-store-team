import { el, setChildren, mount } from 'redom';
import { MinAndMax } from '../../../types';
import { navigate } from '../../utils';
import { copyBtnEl } from './copyBtn';
import Dropdown from './dropdown';
import FilterList from './FilterList';
import RangeInput from './RangeInput';
import SearchInput from './searchInput';
import Modal from './Modal';

class Filters extends Modal {
  private filtersContent: HTMLElement = el('.filters__content');
  private priceInput: RangeInput;
  private stockInput: RangeInput;
  private categoriesList: FilterList;
  private brandsList: FilterList;
  public searchInput: SearchInput;
  public dropdown: Dropdown;

  constructor() {
    super();
    this.activeClass = 'filters--active';
    this.modalWrap = el('aside.catalog__filters.filters');
    this.priceInput = new RangeInput('price');
    this.stockInput = new RangeInput('stock');
    this.categoriesList = new FilterList('category');
    this.brandsList = new FilterList('brand');
    this.searchInput = new SearchInput('search');
    this.dropdown = new Dropdown('sort');
  }

  element() {
    this.render(this.filtersContent);
    mount(this.modalWrap, el('button.filters__close'));
    return this.modalWrap;
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
      el('.filters__btns', [
        el('button.btn', { onclick: () => this.reset() }, 'Reset filters'),
        copyBtnEl(),
      ]),
    ]);
    this.restoreState();
  }

  restoreState() {
    [
      this.priceInput,
      this.stockInput,
      this.categoriesList,
      this.brandsList,
      this.dropdown,
      this.searchInput,
    ].forEach((elem) => elem.restoreState());
  }

  reset() {
    navigate(location.pathname);
  }
}

export default Filters;
