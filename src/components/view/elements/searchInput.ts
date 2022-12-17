import { el } from 'redom';
import { setQueryString } from '../../utils';

class SearchInput {
  private searchInput: HTMLElement = el('input.catalog__search', {
    placeholder: 'Search product...',
  });
  element(fn: () => void) {
    const params = new URLSearchParams(location.search);
    const searchOption = params.get('search');
    if (searchOption) this.setValue(searchOption);

    let timer: ReturnType<typeof setTimeout>;
    this.searchInput.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const searchQuery = (this.searchInput as HTMLInputElement).value.trim().toLowerCase();
        setQueryString('search', searchQuery);
        fn();
      }, 500);
    });
    return this.searchInput;
  }
  setValue(value: string) {
    (this.searchInput as HTMLInputElement).value = value;
  }
}

export default SearchInput;
