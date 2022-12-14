import { el, setChildren } from 'redom';
import { Product, SortOptions } from '../../../types';
import { router } from '../../router';
import { sortProducts } from '../../utils/sort';
import { dropdown, dropdownList, dropdownText } from '../elements/dropdown';
import Pagination from '../elements/pagination';
import { productCard } from '../elements/productCard';

class Catalog {
  constructor(
    private productsData: Readonly<Product>[] = [],
    private page: number = 1,
    private limit: number = 9,
    private productsList: HTMLElement = el('.products'),
    private pagesContainer: HTMLElement = el('.catalog__pagination')
  ) {}

  element() {
    const handleClick = (e: Event) => {
      const element = e.target as HTMLElement;
      if (!element.classList.contains('dropdown__item')) return;
      if (element.textContent) {
        dropdownText.textContent = element.textContent;
        const option = element.textContent.replace(' ', '_') as SortOptions;
        router.navigate(location.pathname + `?sort=${option}`);
        this.sort(option);
      }
    };
    dropdownList.addEventListener('click', handleClick);

    const element: HTMLElement = el('section.catalog', [
      el('.container', [
        el('.catalog__content', [
          el('h1.catalog__title', 'catalog'),
          dropdown,
          this.productsList,
          this.pagesContainer,
        ]),
      ]),
    ]);
    return element;
  }

  draw(data: Readonly<Product>[]) {
    this.productsData = data;

    if (this.productsData.length) {
      const params = new URLSearchParams(location.search);
      const sortOption = params.get('sort') as SortOptions;
      if (sortOption) {
        dropdownText.textContent = sortOption.replace('_', ' ');
        this.sort(sortOption);
      }

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

  sort(sortOption: SortOptions) {
    sortProducts(sortOption, this.productsData);
    this.page = 1;
    this.render();
  }

  filter() {
    return;
  }
}

export default Catalog;
