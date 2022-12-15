import { CatalogRenderFn } from '../../../types';

interface IPagination {
  getPageCount: () => number;
  getPagesArray: () => number[];
  setPages: (n: number) => number[];
  pages: (n: number) => number[];
  pagesElement: (n: number, fn: CatalogRenderFn) => HTMLDivElement;
}

class Pagination implements IPagination {
  constructor(private itemsCount: number, private limit: number) {}
  getPageCount(): number {
    return Math.ceil(this.itemsCount / this.limit);
  }

  getPagesArray(): number[] {
    const totalPages = this.getPageCount();
    return Array(totalPages)
      .fill(0)
      .map((_, i) => i + 1);
  }

  setPages(num: number): [number, number, number] {
    return [num - 1, num, num + 1];
  }

  pages(page: number): number[] {
    const lastPage: number = this.getPageCount();
    let arr: [number, number, number] = this.setPages(page);
    if (page <= 2) {
      arr = this.setPages(3);
    }
    if (page >= lastPage - 1) {
      arr = this.setPages(lastPage - 2);
    }
    const pages = Array.from(new Set([1, ...arr, lastPage]));
    return pages.filter((el) => el > 0);
  }

  pagesElement(page: number, fn: CatalogRenderFn) {
    const handleClick = (e: Event): void => {
      const element = e.target as HTMLElement;
      if (!element.classList.contains('pagination__btn')) return;
      const page = Number(element.textContent);
      (element.parentElement as HTMLElement).replaceWith(this.pagesElement(page, fn));
      fn(page);
    };

    const pagination: HTMLDivElement = document.createElement('div');
    pagination.classList.add('pagination');
    pagination.addEventListener('click', handleClick);

    const paginationBtns: number[] = this.pages(page);
    const lastPage: number = this.getPageCount();
    const buttons: Array<HTMLButtonElement> = paginationBtns.map(
      (el: number): HTMLButtonElement => {
        const buttonEl: HTMLButtonElement = document.createElement('button');
        buttonEl.classList.add(
          ...(page === el ? ['pagination__btn', 'pagination__btn--current'] : ['pagination__btn'])
        );
        buttonEl.textContent = String(el);
        return buttonEl;
      }
    );

    pagination.append(...buttons);
    if (this.getPageCount() > 5) {
      const dots1: HTMLSpanElement = document.createElement('span');
      dots1.classList.add(...(page > 3 ? ['dots', 'dots--active'] : ['dots']));
      dots1.textContent = '...';
      const dots2: HTMLSpanElement = document.createElement('span');
      dots2.classList.add(...(page < lastPage - 2 ? ['dots', 'dots--active'] : ['dots']));
      dots2.textContent = '...';
      pagination.append(dots1, dots2);
    }

    return pagination;
  }
}

export default Pagination;
