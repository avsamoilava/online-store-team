import { el } from 'redom';
import { QueryParams } from '../../../types';
import { setQueryString } from '../../utils';
import BaseElement from './BaseElement';

class SearchInput extends BaseElement {
  private searchInput: HTMLElement = el('input.catalog__search', {
    placeholder: 'Search product...',
  });
  constructor(fn: () => void, key: keyof QueryParams) {
    super(fn, key);
  }
  element() {
    this.restoreState();

    let timer: ReturnType<typeof setTimeout>;
    this.searchInput.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const searchQuery = (this.searchInput as HTMLInputElement).value.trim().toLowerCase();
        setQueryString(this.key, searchQuery);
        this.selectItemsByQuery();
      }, 500);
    });
    return this.searchInput;
  }
  restoreState() {
    const restore = (query: string) => ((this.searchInput as HTMLInputElement).value = query);
    super.restoreState(restore);
  }
}

export default SearchInput;
