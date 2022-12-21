import { setChildren } from 'redom';
import Pagination from '../elements/pagination';

abstract class BasePage {
  protected productsList: HTMLElement;
  protected pagesContainer: HTMLElement;
  protected pagination: Pagination;
  protected limit;
  protected page;
  private emptyElem;

  constructor(
    productsList: HTMLElement,
    pagesContainer: HTMLElement,
    page: number,
    limit: number,
    emptyElem: HTMLElement
  ) {
    this.productsList = productsList;
    this.pagesContainer = pagesContainer;
    this.page = page;
    this.limit = limit;
    this.pagination = new Pagination(100, this.limit);
    this.emptyElem = emptyElem;
  }

  renderEmpty() {
    setChildren(this.productsList, [this.emptyElem]);
    setChildren(this.pagesContainer, []);
  }
}
export default BasePage;
