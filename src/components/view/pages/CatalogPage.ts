import { el } from 'redom';
import { Product } from '../../../types';
import { getInfo, getMinAndMax } from '../../utils';
import Dropdown from '../elements/dropdown';
import Filters from '../elements/filters';
import SearchInput from '../elements/searchInput';
import { viewControls } from '../elements/viewControls';
import Catalog from './catalog';

class CatalogPage extends Catalog {
  private dropdown: Dropdown = new Dropdown();
  private searchInput: SearchInput = new SearchInput();
  private filters: Filters = new Filters(this.filter.bind(this));

  constructor() {
    super();
  }

  element() {
    const dropdownElem = this.dropdown.element(this.sort.bind(this));
    const searchInputElem = this.searchInput.element(this.filter.bind(this));
    const filtersElem = this.filters.element();

    const element: HTMLElement = el('section.catalog', [
      el('.container.catalog__container', [
        el('.catalog__content', [
          el('h1.catalog__title', 'catalog'),
          filtersElem,
          el('.catalog__products', [
            el('.catalog__controls', [
              dropdownElem,
              viewControls(this.changeView.bind(this)),
              searchInputElem,
            ]),
            this.productsList,
            this.pagesContainer,
          ]),
        ]),
      ]),
    ]);
    return element;
  }

  draw(data: Readonly<Product>[]) {
    super.draw(data);

    const categories = getInfo('category', this.productsData);
    const brand = getInfo('brand', this.productsData);
    const priceValues = getMinAndMax('price', this.productsData);
    const stockValues = getMinAndMax('stock', this.productsData);
    this.filters.setFilters(categories, brand, priceValues, stockValues);
    this.restorePreviousState();
  }

  private restorePreviousState() {
    const params = new URLSearchParams(location.search);
    const sortOption = params.get('sort');
    this.filter();
    if (sortOption) {
      this.dropdown.restoreState(sortOption);
      this.sort(sortOption);
    }
  }
}
export default CatalogPage;
