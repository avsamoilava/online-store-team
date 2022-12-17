import { el, setChildren } from 'redom';
import { Product } from '../../../types';
import { filterProducts, sortProducts } from '../../utils';
import Pagination from '../elements/pagination';
import { productCard } from '../elements/productCard';

class Catalog {
  constructor(
    protected productsData: Readonly<Product>[] = [],
    protected filteredData: Readonly<Product>[] = [],
    protected productsList: HTMLElement = el('.products#columns3'),
    protected page: number = 1,
    protected limit: number = 9,
    protected pagination: Pagination = new Pagination(100, 9),
    protected pagesContainer: HTMLElement = el('.catalog__pagination')
  ) {}

  draw(data: Readonly<Product>[]) {
    this.productsData = data;

    if (!this.productsData.length) {
      this.setNoItemsTitle();
      return;
    }

    this.setPages(this.productsData.length);
    this.render();
  }

  render(page?: number, data?: Readonly<Product>[]): void {
    if (data && !data.length) {
      this.setNoItemsTitle();
      return;
    }
    if (page) this.page = page;
    const coef: number = this.limit * (this.page - 1);

    const productsArray = data
      ? data
      : this.filteredData.length
      ? this.filteredData
      : this.productsData;

    const filteredProducts: Readonly<Product>[] =
      productsArray.length >= this.limit
        ? productsArray.filter((_, idx) => idx >= 0 + coef && idx < this.limit + coef)
        : productsArray;

    const products: HTMLElement[] = filteredProducts.map((item) => productCard(item));
    setChildren(this.productsList, products);
  }

  setPages(itemsCount: number) {
    this.pagination = new Pagination(itemsCount, this.limit);
    const paginationEl: HTMLDivElement = this.pagination.pagesElement(1, this.render.bind(this));
    setChildren(this.pagesContainer, [paginationEl]);
  }

  changeView(columns: number) {
    this.limit = columns ** 2;
    this.setPages(this.productsData.length);
    this.render();
    this.productsList.id = `columns${columns}`;
  }

  sort(sortOption: string) {
    if (!sortOption) {
      this.render(this.page);
      return;
    }
    const arrayToSort = [...(this.filteredData.length ? this.filteredData : this.productsData)];
    sortProducts(sortOption, arrayToSort);
    this.render(1, arrayToSort);
  }

  filter() {
    const filtered = filterProducts(this.productsData);
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
