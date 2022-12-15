import { el } from 'redom';
import { setQueryString } from '../../utils';
// import { router } from '../../router';

// export const searchInput: HTMLElement = el('input.catalog__search', {
//   placeholder: 'Search product...',
// });

class SearchInput {
  private searchInput: HTMLElement = el('input.catalog__search', {
    placeholder: 'Search product...',
  });
  element(fn: (query: string) => void) {
    let timer: ReturnType<typeof setTimeout>;
    this.searchInput.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const searchQuery = (this.searchInput as HTMLInputElement).value.trim().toLowerCase();
        setQueryString('search', searchQuery);

        fn(searchQuery);
      }, 500);
    });
    return this.searchInput;
  }
  setValue(value: string) {
    (this.searchInput as HTMLInputElement).value = value;
  }
}

export default SearchInput;
