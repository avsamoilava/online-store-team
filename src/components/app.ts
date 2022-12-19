import { Product } from '../types';
import Controller from './controller';
import { router } from './router';
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
      .on('/', () => this.view.render('/'))
      .on('/cart', () => this.view.renderCart())
      .on('/catalog', () => this.view.render('/catalog'))
      .on('/details/:id', (data) => {
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
