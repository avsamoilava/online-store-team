import { el, setChildren } from 'redom';
import { Product } from '../../../types';
import { filterProducts, sortProducts } from '../../utils';
import Pagination from '../elements/pagination';
import { productCard } from '../elements/productCard';

class Catalog {
  constructor(
    protected productsData: Readonly<Product>[] = [],
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
    const productsArray = data ? data : this.productsData;
    const filteredProducts: Readonly<Product>[] =
      productsArray.length >= this.limit
        ? productsArray.filter((_, idx) => idx >= 0 + coef && idx < this.limit + coef)
        : productsArray;

    const products: HTMLElement[] = filteredProducts.map((item) => productCard(item));
    setChildren(this.productsList, products);
  }

  ////////////////////////
  // Когда сначала отфильтровал товары, а потом сортируешь,
  // сортировка работает неправильно -
  // фильтрует полный список товаров
  ////////////////////
  sort(sortOption: string) {
    sortProducts(sortOption, this.productsData);
    this.render(1);
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

  filter(query: string) {
    const filtered = this.productsData.filter((el) => filterProducts(el, query));
    this.setPages(filtered.length);
    this.render(1, filtered);
  }

  setNoItemsTitle() {
    setChildren(this.productsList, [el('h1.products__no-items', 'No products found...')]);
    setChildren(this.pagesContainer, []);
  }
}

export default Catalog;
