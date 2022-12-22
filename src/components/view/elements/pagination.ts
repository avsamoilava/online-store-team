import { el } from 'redom';
import { CatalogRenderFn } from '../../../types';
import { router } from '../../router';
import { setQueryString } from '../../utils';

interface IPagination {
  setPages: (n: number) => number[];
  pages: (n: number) => number[];
  element: (n: number, fn: CatalogRenderFn) => HTMLElement;
}

class Pagination implements IPagination {
  constructor(private itemsCount: number, private limit: number) {}
  get pageCount(): number {
    return Math.ceil(this.itemsCount / this.limit);
  }

  setPages(num: number): [number, number, number] {
    return [num - 1, num, num + 1];
  }

  pages(page: number): number[] {
    if (this.pageCount <= 5)
      return Array(this.pageCount)
        .fill(0)
        .map((_, i) => i + 1);
    const lastPage: number = this.pageCount;
    let arr: [number, number, number] = this.setPages(page);
    if (page <= 2) arr = this.setPages(3);
    if (page >= lastPage - 1) arr = this.setPages(lastPage - 2);
    const pages = Array.from(new Set([1, ...arr, lastPage]));
    return pages.filter((el) => el > 0);
  }

  element(page: number, fn?: CatalogRenderFn) {
    const handleClick = (e: Event): void => {
      const element = e.target as HTMLElement;
      if (!(element instanceof HTMLButtonElement)) return;
      const page = Number(element.textContent);
      (element.parentElement as HTMLElement).replaceWith(this.element(page, fn));
      fn ? fn(page) : router.navigate(setQueryString('page', `${page}`));
    };

    const pagination: HTMLElement = el('.pagination', { onclick: handleClick });

    const buttons: Array<HTMLElement> = this.pages(page).map((btn) =>
      this.button(page === btn ? 'pagination__btn--current' : '', `${btn}`)
    );

    pagination.append(...buttons);
    if (this.pageCount > 5) {
      const dots1 = this.dots(page > 3 ? '.dots--active' : '');
      const dots2 = this.dots(page < this.pageCount - 2 ? '.dots--active' : '');
      pagination.append(dots1, dots2);
    }

    return pagination;
  }

  button = (className: string, text: string) =>
    el(`button.pagination__btn.${className}`, `${text}`);

  dots = (className: string) => el(`span.dots.${className}`, '...');
}

export default Pagination;
