import { el, setChildren } from 'redom';
import { Product, SortOptions } from '../../../types';
import { router } from '../../router';
import { sortProducts } from '../../utils/sort';
import { dropdown, dropdownList, dropdownText } from '../elements/dropdown';
import Pagination from '../elements/pagination';
import { productCard } from '../elements/productCard';
import { searchInput } from '../elements/searchInput';

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

        const params = new URLSearchParams(location.search);
        if (params.has('sort')) params.delete('sort');
        params.set('sort', option);
        router.navigate(location.pathname + `?${params.toString()}`);

        this.sort(option);
      }
    };
    dropdownList.addEventListener('click', handleClick);

    let timer: ReturnType<typeof setTimeout>;
    searchInput.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const searchQuery = (searchInput as HTMLInputElement).value.trim().toLowerCase();

        const params = new URLSearchParams(location.search);
        if (params.has('search')) params.delete('search');
        if (searchQuery) params.set('search', searchQuery);
        router.navigate(location.pathname + `?${params.toString()}`);

        this.filter(searchQuery);
      }, 500);
    });

    const element: HTMLElement = el('section.catalog', [
      el('.container', [
        el('.catalog__content', [
          el('h1.catalog__title', 'catalog'),
          el('.catalog__controls', [dropdown, searchInput]),
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

      const sortOption = params.get('sort') as SortOptions;
      if (sortOption) {
        dropdownText.textContent = sortOption.replace('_', ' ');
        this.sort(sortOption);
      }

      const filterOption = params.get('search');
      if (filterOption) {
        (searchInput as HTMLInputElement).value = filterOption;
        this.filter(filterOption);
      }

      setChildren(this.pagesContainer, [paginationEl]);
    }
  }

  render(data?: Readonly<Product>[]): void {
    const coef: number = this.limit * (this.page - 1);
    const productsArray = data ? data : this.productsData;
    const filteredProducts: Readonly<Product>[] =
      productsArray.length >= this.limit
        ? productsArray.filter((_, idx) => idx >= 0 + coef && idx < this.limit + coef)
        : productsArray;

    const products: HTMLElement[] = filteredProducts.map((item) => productCard(item));
    setChildren(this.productsList, products);
  }

  sort(sortOption: SortOptions) {
    sortProducts(sortOption, this.productsData);
    this.page = 1;
    this.render();
  }

  filter(query: string) {
    const filtered = this.productsData.filter((el) =>
      // el.brand.toLowerCase().includes(query) ||
      // el.category.toLowerCase().includes(query) ||
      // String(el.price).includes(query) ||
      // el.description.toLowerCase().includes(query) ||
      // String(el.rating).includes(query) ||
      // String(el.stock).includes(query)||
      el.title.toLowerCase().includes(query)
    );
    this.page = 1;
    this.render(filtered);
  }
}

export default Catalog;
