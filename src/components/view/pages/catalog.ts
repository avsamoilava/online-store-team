import { el, setChildren } from 'redom';
import { Product } from '../../../types';
import { filterAndSortProducts, getProductsByPage } from '../../utils';
import HeaderCart from '../elements/HeaderCart';
import Pagination from '../elements/pagination';
import ProductCard from '../elements/productCard';

class Catalog {
  constructor(
    protected productsData: Readonly<Product>[] = [],
    protected filteredData: Readonly<Product>[] = [],
    protected productsList: HTMLElement = el('.products#columns3'),
    protected page: number = 1,
    protected limit: number = 9,
    protected pagination: Pagination = new Pagination(100, 9),
    protected pagesContainer: HTMLElement = el('.catalog__pagination'),
    protected headerCart: HeaderCart = new HeaderCart(),
    protected productsInfo = el('.catalog__info')
  ) {}

  draw(data: Readonly<Product>[]) {
    this.productsData = data;

    if (!this.productsData.length) {
      this.setNoItemsTitle();
      return;
    }
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
    if (data && !data.length) return this.setNoItemsTitle();
    if (page) this.page = page;

    const productsArray = data
      ? data
      : this.filteredData.length
      ? this.filteredData
      : this.productsData;

    const filteredProducts = getProductsByPage(productsArray, this.page, this.limit);
    this.productsListEl(filteredProducts);
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

  setNoItemsTitle() {
    setChildren(this.productsList, [el('h1.products__no-items', 'No products found...')]);
    setChildren(this.pagesContainer, []);
  }
}

export default Catalog;
