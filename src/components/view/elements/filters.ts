import { el, setChildren } from 'redom';
import { setQueryString } from '../../utils';

class Filters {
  private filtersContent: HTMLElement = el('.filters__content');
  element() {
    const filters: HTMLElement = el('aside.catalog__filters.filters', [
      el('.filters__top', [this.filtersContent]),
    ]);
    return filters;
  }

  block(title: string, arr: string[], queryKey: string): HTMLElement {
    const handleClick = (e: Event) => {
      const elem = e.target as HTMLElement;
      if (elem instanceof HTMLInputElement) {
        setQueryString(queryKey, elem.checked ? elem.id : `${elem.id}-delete`);
      }
    };
    const elements = arr.map((el) => this.item(el));
    return el('.filters__block', [
      el('h3.filters__subtitle', title),
      el('ul.filters__list', { onclick: handleClick }, elements),
    ]);
  }

  item(item: string): HTMLElement {
    return el('li.filters__item', [
      el('label.checkbox', [
        el(`input.checkbox__input#${item}`, { type: 'checkbox' }),
        el('span.checkbox__text', item),
      ]),
    ]);
  }

  setBrandsAndCategories(categoriesArr: string[], brandsArr: string[]) {
    setChildren(this.filtersContent, [
      this.block('Categories:', categoriesArr, 'category'),
      this.block('Brands:', brandsArr, 'brand'),
    ]);
    this.restoreState();
  }

  private restoreState() {
    const params = new URLSearchParams(location.search);
    const [categories, brands] = [params.get('category'), params.get('brand')];
    this.markCheckedElements(categories);
    this.markCheckedElements(brands);
  }

  private markCheckedElements(query: string | null) {
    if (query) {
      query.split('*').forEach((val) => {
        const elem = document.getElementById(val);
        if (elem instanceof HTMLInputElement) elem.checked = true;
      });
    }
  }
}

export default Filters;
