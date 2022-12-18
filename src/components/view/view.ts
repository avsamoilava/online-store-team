import { setChildren } from 'redom';
import { Elements, Product } from '../../types';
import { Home } from './pages/home';
import { Cart } from './pages/cart';
import { details } from './pages/details';
import { page404 } from './pages/page-404';
import CatalogPage from './pages/CatalogPage';

class View {
  private rootElement = document.getElementById('root') as HTMLDivElement;
  private catalog: CatalogPage = new CatalogPage();
  private cart: Cart = new Cart();
  private home: Home = new Home();
  private elements: Elements = {
    '/': this.home.content,
    '/catalog': this.catalog.element(),
    '404': page404,
  };

  render(path: string): void {
    setChildren(this.rootElement, [this.elements[path as keyof Elements]]);
  }

  renderCatalog(data: Readonly<Product>[]): void {
    this.catalog.draw(data);
  }

  renderCart() {
    setChildren(this.rootElement, [this.cart.element()]);
  }

  renderDetails(product: Readonly<Product>) {
    setChildren(this.rootElement, [details(product)]);
  }
}

export default View;
