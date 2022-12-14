import { el, setChildren } from 'redom';
import { Product } from '../../../types';
import { productCard } from '../elements/productCard';

class Catalog {
  private productsList = el('.products');
  element: HTMLElement = el('section.catalog', [
    el('.container', [el('.catalog__content', [el('h1', 'catalog'), this.productsList])]),
  ]);

  draw(data: Product[]) {
    const products: HTMLElement[] = data.map((item) => productCard(item));
    setChildren(this.productsList, products);
  }
  sort() {
    return;
  }
  filter() {
    return;
  }
}

export default Catalog;
