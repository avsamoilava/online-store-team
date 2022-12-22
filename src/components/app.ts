import { Product } from '../types';
import Controller from './controller';
import { router } from './router';
import { disableCurrent } from './utils';
import View from './view/view';

class App {
  private controller: Controller;
  private view: View;

  constructor() {
    this.controller = new Controller();
    this.view = new View();
  }
  start() {
    if (!localStorage.getItem('cart')) localStorage.setItem('cart', '[]');
    this.controller.getAll((data) => this.view.renderCatalog(data.products));

    router
      .on('/', () => {
        disableCurrent('home');
        this.view.render('/');
      })
      .on('/cart', () => {
        disableCurrent('cart');
        this.view.render('/cart');
      })
      .on('/catalog', () => {
        disableCurrent('catalog');
        this.view.render('/catalog');
      })
      .on('/details/:id', (data) => {
        disableCurrent();
        if (data?.data) {
          this.controller.getOne(data.data.id, (item: Readonly<Product>) =>
            this.view.renderDetails(item)
          );
        }
      })
      .notFound(() => this.view.render('404'))
      .resolve();
  }
}

export default App;
