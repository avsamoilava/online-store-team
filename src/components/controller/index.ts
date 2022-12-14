import { Product, ApiResponse } from '../../types';

class Controller {
  url = 'https://dummyjson.com/products';

  errorHandler(res: Response): Response {
    if (!res.ok) {
      throw Error(res.statusText);
    }

    return res;
  }

  getOne(id: string, cb: (data: Product) => void) {
    fetch(`${this.url}/${id}`)
      .then((res) => this.errorHandler(res))
      .then((res) => res.json())
      .then((data) => cb(data))
      .catch((err) => console.error(`There is an error: ${err}`));
  }

  getAll(cb: (data: ApiResponse) => void) {
    fetch(`${this.url}?limit=100`)
      .then((res) => this.errorHandler(res))
      .then((res) => res.json())
      .then((data) => cb(data))
      .catch((err) => console.error(`There is an error: ${err}`));
  }
}

export default Controller;
