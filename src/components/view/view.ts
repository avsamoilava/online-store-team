import { setChildren } from 'redom';
import { Elements, Product } from '../../types';
import { Home } from './pages/home';
import { Cart } from './pages/cart';
import ProductPage from './pages/ProductPage';
import { Page404 } from './pages/page-404';
import CatalogPage from './pages/CatalogPage';

class View {
  private rootElement = document.getElementById('root') as HTMLDivElement;
  private catalog: CatalogPage = new CatalogPage();
  private cart: Cart = new Cart();
  private home: Home = new Home();
  private page404 = new Page404();
  private elements: Elements = {
    '/': this.home,
    '/catalog': this.catalog,
    '/cart': this.cart,
    '404': this.page404,
  };

  render(path: string): void {
    setChildren(this.rootElement, [this.elements[path as keyof Elements].element()]);
    if (path === '/catalog') {
      this.catalog.filters.restoreState();
      this.catalog.filterAndSort();
    }
  }

  renderCatalog(data: Readonly<Product>[]): void {
    this.catalog.draw(data);
  }

  renderDetails(product: Readonly<Product>) {
    setChildren(this.rootElement, [new ProductPage(product).element()]);
  }
}

export default View;
