import { el } from 'redom';
import { Product } from '../../../types';
import { getInfo, getMinAndMax } from '../../utils';
import Dropdown from '../elements/dropdown';
import Filters from '../elements/filters';
import SearchInput from '../elements/searchInput';
import { viewControls } from '../elements/viewControls';
import Catalog from './catalog';

class CatalogPage extends Catalog {
  private dropdown: Dropdown = new Dropdown(this.filterAndSort.bind(this), 'sort');
  private searchInput: SearchInput = new SearchInput(this.filterAndSort.bind(this), 'search');
  private filters: Filters = new Filters(this.filterAndSort.bind(this));

  constructor() {
    super();
  }

  element() {
    const element: HTMLElement = el('section.catalog', [
      el('.container.catalog__container', [
        el('.catalog__content', [
          el('h1.catalog__title', 'catalog'),
          this.filters.element(),
          el('.catalog__products', [
            el('.catalog__controls', [
              this.dropdown.element(),
              viewControls(this.changeView.bind(this)),
              this.searchInput.element(),
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
    this.filterAndSort();
  }
}
export default CatalogPage;
