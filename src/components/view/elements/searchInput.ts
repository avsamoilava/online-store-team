import { el } from 'redom';
import { QueryParams } from '../../../types';
import { router } from '../../router';
import { setQueryString } from '../../utils';
import BaseElement from '../classes/BaseElement';

class SearchInput extends BaseElement {
  private searchInput: HTMLElement = el('input.catalog__search', {
    placeholder: 'Search product...',
  });
  constructor(key: keyof QueryParams) {
    super(key);
  }
  element() {
    let timer: ReturnType<typeof setTimeout>;
    this.searchInput.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const searchQuery = (this.searchInput as HTMLInputElement).value.trim().toLowerCase();
        router.navigate(setQueryString(this.key, searchQuery));
      }, 500);
    });
    return this.searchInput;
  }

  restoreState() {
    super.restoreState((query: string | undefined) => {
      (this.searchInput as HTMLInputElement).value = query ? query : '';
    });
  }
}

export default SearchInput;
