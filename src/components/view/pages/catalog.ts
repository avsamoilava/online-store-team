import { el, setChildren } from 'redom';
import { Product } from '../../../types';
import { filterAndSortProducts, getMinAndMax, getProductsByPage } from '../../utils';
import BasePage from '../classes/BasePage';
import Filters from '../elements/filters';
import HeaderCart from '../elements/HeaderCart';
import Pagination from '../elements/pagination';
import ProductCard from '../elements/productCard';

class Catalog extends BasePage {
  public productsData: Readonly<Product>[] = [];
  public filteredData: Readonly<Product>[] = [];
  protected headerCart: HeaderCart = new HeaderCart();
  protected productsInfo = el('.catalog__info');
  public filters: Filters = new Filters();

  constructor() {
    super(
      el('.products#columns3'),
      el('.catalog__pagination'),
      1,
      9,
      el('h1.empty', 'No products found...')
    );
  }

  draw(data: Readonly<Product>[]) {
    this.productsData = data;

    if (!this.productsData.length) return this.renderEmpty();
    this.headerCart.setElement();
    this.setPages(this.productsData.length);
    this.render();
  }

  render(page = 1, data?: Readonly<Product>[]): void {
    setChildren(
      this.productsInfo,
      this.filteredData.length && this.filteredData.length < this.productsData.length
        ? [el('span', `Products found: ${this.filteredData.length}`)]
        : []
    );
    if (data && !data.length) return this.renderEmpty();
    if (page) this.page = page;

    const productsArray = data
      ? data
      : this.filteredData.length
      ? this.filteredData
      : this.productsData;

    const filteredProducts = getProductsByPage(productsArray, this.page, this.limit);
    this.productsListEl(filteredProducts);
    if (this.filteredData.length) {
      const priceValues = getMinAndMax('price', this.filteredData);
      const stockValues = getMinAndMax('stock', this.filteredData);
      this.filters.priceInput.restoreState(priceValues.min, priceValues.max);
      this.filters.stockInput.restoreState(stockValues.min, stockValues.max);
    } else if (!this.filteredData.length) {
    }
  }

  productsListEl(filteredProducts?: Readonly<Product>[]) {
    if (filteredProducts) {
      const products: HTMLElement[] = filteredProducts.map((item) =>
        new ProductCard(item).element()
      );
      setChildren(this.productsList, products);
    } else {
      this.render();
    }
    return this.productsList;
  }

  setPages(itemsCount: number) {
    this.pagination = new Pagination(itemsCount, this.limit);
    const paginationEl: HTMLElement = this.pagination.element(1, this.render.bind(this));
    setChildren(this.pagesContainer, [paginationEl]);
  }

  changeView(columns: number) {
    this.limit = columns ** 2;
    this.setPages(this.filteredData.length ? this.filteredData.length : this.productsData.length);
    this.render();
    this.productsList.id = `columns${columns}`;
  }

  filterAndSort() {
    const filtered = filterAndSortProducts(this.productsData);
    this.filteredData = filtered;
    this.setPages(this.filteredData.length);
    this.render(1, this.filteredData);
  }
}

export default Catalog;
