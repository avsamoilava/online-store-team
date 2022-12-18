import { el } from 'redom';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { MinAndMax, QueryParams } from '../../../types';
import { setQueryString } from '../../utils';
import BaseElement from './BaseElement';

class RangeInput extends BaseElement {
  private rangeInput: HTMLElement = el('.range__input');

  constructor(fn: () => void, key: keyof QueryParams) {
    super(fn, key);
  }

  element({ min, max }: MinAndMax) {
    this.createRange(min, max);
    const range = el('.range', [this.rangeInput]);

    (this.rangeInput as noUiSlider.target).noUiSlider?.on('set', (values) => {
      setQueryString(this.key, values.join('-'));
      this.selectItemsByQuery();
    });
    return range;
  }
  private createRange(min: number, max: number) {
    noUiSlider.create(this.rangeInput, {
      start: [min, max],
      connect: true,
      step: 1,
      range: {
        min: [min],
        max: [max],
      },
      tooltips: true,
      format: {
        to: (value) => value.toFixed(0),
        from: (value) => +value,
      },
    });
  }
  restoreState() {
    const restore = (query: string) =>
      (this.rangeInput as noUiSlider.target).noUiSlider?.set(query.split('-'));
    super.restoreState(restore);
  }
}

export default RangeInput;
