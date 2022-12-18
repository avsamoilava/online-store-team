import { el } from 'redom';
import { getParams, setQueryString } from '../../utils';

class SearchInput {
  private searchInput: HTMLElement = el('input.catalog__search', {
    placeholder: 'Search product...',
  });
  private search: () => void;
  constructor(fn: () => void) {
    this.search = fn;
  }
  element() {
    const { search } = getParams();
    if (search) this.setValue(search);

    let timer: ReturnType<typeof setTimeout>;
    this.searchInput.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const searchQuery = (this.searchInput as HTMLInputElement).value.trim().toLowerCase();
        setQueryString('search', searchQuery);
        this.search();
      }, 500);
    });
    return this.searchInput;
  }
  setValue(value: string) {
    (this.searchInput as HTMLInputElement).value = value;
  }
}

export default SearchInput;
