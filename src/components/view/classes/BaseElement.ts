import { QueryParams } from '../../../types';
import { getParams } from '../../utils';

abstract class BaseElement {
  protected key: keyof QueryParams;

  constructor(key: keyof QueryParams) {
    this.key = key;
  }

  restoreState(fn: (s: string | undefined) => void): void {
    const paramsString = getParams()[this.key];
    fn(paramsString);
  }
}
export default BaseElement;
