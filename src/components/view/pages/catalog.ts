import { el, setChildren } from 'redom';
import { Product } from '../../../types';
import Pagination from '../elements/pagination';
import { productCard } from '../elements/productCard';

class Catalog {
  element: HTMLElement = el('section.catalog', [
    el('.container', [
      el('.catalog__content', [el('h1', 'catalog'), this.productsList, this.pagesContainer]),
    ]),
  ]);
  constructor(
    private productsData: Readonly<Product>[] = [],
    private page: number = 1,
    private limit: number = 9,
    private productsList: HTMLElement = el('.products'),
    private pagesContainer: HTMLElement = el('.catalog__pagination')
  ) {}

  draw(data: Readonly<Product>[]) {
    this.productsData = data;
    if (this.productsData.length) {
      const pagination: Pagination = new Pagination(this.productsData.length, this.limit);
      const handleClick = (e: Event): void => {
        const element = e.target as HTMLElement;
        if (!element.classList.contains('pagination__btn')) return;
        const page = Number(element.textContent);
        this.page = page;
        (element.parentElement as HTMLElement).replaceWith(
          pagination.pagesElement(page, handleClick)
        );
        this.render();
      };

      const paginationEl: HTMLDivElement = pagination.pagesElement(1, handleClick);
      this.render();
      setChildren(this.pagesContainer, [paginationEl]);
    }
  }
  render(): void {
    const coef: number = this.limit * (this.page - 1);
    const filteredProducts: Readonly<Product>[] =
      this.productsData.length >= this.limit
        ? this.productsData.filter((_, idx) => idx >= 0 + coef && idx < this.limit + coef)
        : this.productsData;

    const products: HTMLElement[] = filteredProducts.map((item) => productCard(item));
    setChildren(this.productsList, products);
  }
  sort() {
    return;
  }
  filter() {
    return;
  }
}

export default Catalog;
