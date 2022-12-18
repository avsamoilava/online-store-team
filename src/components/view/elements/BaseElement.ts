import { QueryParams } from '../../../types';
import { getParams } from '../../utils';

abstract class BaseElement {
  protected selectItemsByQuery: () => void;
  protected key: keyof QueryParams;

  constructor(fn: () => void, key: keyof QueryParams) {
    this.selectItemsByQuery = fn;
    this.key = key;
  }

  restoreState(fn: (s: string) => void): void {
    const paramsString = getParams()[this.key];
    if (paramsString) fn(paramsString);
  }
}
export default BaseElement;
