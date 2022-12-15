import { el, setChildren } from 'redom';

class Filters {
  private filtersContent: HTMLElement = el('.filters__content');
  element() {
    const filters: HTMLElement = el('aside.catalog__filters.filters', [
      el('.filters__top', [this.filtersContent]),
    ]);
    return filters;
  }

  block(title: string, arr: string[]): HTMLElement {
    const elements = arr.map((el) => this.item(el));
    return el('.filters__block', [
      el('h3.filters__subtitle', title),
      el('ul.filters__list', elements),
    ]);
  }

  item(item: string): HTMLElement {
    return el('li.filters__item', [
      el('label.checkbox', [
        el('input.checkbox__input', { type: 'checkbox' }),
        el('span.checkbox__text', item),
      ]),
    ]);
  }

  setBrandsAndCategories(categoriesArr: string[], brandsArr: string[]) {
    setChildren(this.filtersContent, [
      this.block('Categories:', categoriesArr),
      this.block('Brands:', brandsArr),
    ]);
  }
}

export default Filters;
