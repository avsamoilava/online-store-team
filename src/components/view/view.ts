import { setChildren } from 'redom';
import { Elements, Product } from '../../types';
import { cart } from './pages/cart';
import { home } from './pages/home';
import Catalog from './pages/catalog';
import { details } from './pages/details';
import { page404 } from './pages/page-404';

class View {
  private rootElement = document.getElementById('root') as HTMLDivElement;
  private catalog: Catalog = new Catalog();
  private elements: Elements = {
    '/': home,
    '/catalog': this.catalog.element(),
    '/cart': cart,
    '404': page404,
  };

  render(path: string): void {
    setChildren(this.rootElement, [this.elements[path as keyof Elements]]);
  }

  renderCatalog(data: Readonly<Product>[]): void {
    this.catalog.draw(data);
  }

  renderDetails(product: Readonly<Product>) {
    setChildren(this.rootElement, [details(product)]);
  }
}

export default View;
