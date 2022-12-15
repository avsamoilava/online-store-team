import { el, setChildren } from 'redom';
import { Product } from '../../../types';
import { filterProducts, sortProducts } from '../../utils';
import Dropdown from '../elements/dropdown';
import Pagination from '../elements/pagination';
import { productCard } from '../elements/productCard';
import SearchInput from '../elements/searchInput';

class Catalog {
  constructor(
    private productsData: Readonly<Product>[] = [],
    private page: number = 1,
    private limit: number = 9,
    private productsList: HTMLElement = el('.products'),
    private pagesContainer: HTMLElement = el('.catalog__pagination'),
    private dropdown: Dropdown = new Dropdown(),
    private searchInput: SearchInput = new SearchInput()
  ) {}

  element() {
    const dropdownElem = this.dropdown.element(this.sort.bind(this));
    const searchInputElem = this.searchInput.element(this.filter.bind(this));

    const element: HTMLElement = el('section.catalog', [
      el('.container', [
        el('.catalog__content', [
          el('h1.catalog__title', 'catalog'),
          el('.catalog__controls', [dropdownElem, searchInputElem]),
          this.productsList,
          this.pagesContainer,
        ]),
      ]),
    ]);
    return element;
  }

  /////// ИСПРАВИТЬ ПАГИНАЦИЮ ПРИ ФИЛЬТРЕ

  draw(data: Readonly<Product>[]) {
    this.productsData = data;
    if (!this.productsData.length) {
      this.setNoItemsTitle();
      return;
    }
    const params = new URLSearchParams(location.search);

    const pagination: Pagination = new Pagination(this.productsData.length, this.limit);
    const paginationEl: HTMLDivElement = pagination.pagesElement(1, this.render.bind(this));
    this.render();

    const sortOption = params.get('sort');
    if (sortOption) {
      this.dropdown.text.textContent = sortOption.replace('_', ' ');
      this.dropdown.closeIcon.classList.add('dropdown__close--active');
      this.sort(sortOption);
    }

    const filterOption = params.get('search');
    if (filterOption) {
      this.searchInput.setValue(filterOption);
      this.filter(filterOption);
    }

    setChildren(this.pagesContainer, [paginationEl]);
  }

  render(page?: number, data?: Readonly<Product>[]): void {
    if (data && !data.length) {
      this.setNoItemsTitle();
      return;
    }
    if (page) this.page = page;
    const coef: number = this.limit * (this.page - 1);
    const productsArray = data ? data : this.productsData;
    const filteredProducts: Readonly<Product>[] =
      productsArray.length >= this.limit
        ? productsArray.filter((_, idx) => idx >= 0 + coef && idx < this.limit + coef)
        : productsArray;

    const products: HTMLElement[] = filteredProducts.map((item) => productCard(item));
    setChildren(this.productsList, products);
  }

  setNoItemsTitle() {
    setChildren(this.productsList, [el('h1.products__no-items', 'No products found...')]);
  }

  sort(sortOption: string) {
    sortProducts(sortOption, this.productsData);
    this.render(1);
  }

  filter(query: string) {
    const filtered = this.productsData.filter((el) => filterProducts(el, query));
    this.render(1, filtered);
  }
}

export default Catalog;
