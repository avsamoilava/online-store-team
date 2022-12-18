import { el } from 'redom';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { MinAndMax } from '../../../types';
import { setQueryString } from '../../utils';

class RangeInput {
  private rangeInput: HTMLElement = el('.range__input');
  private filter: () => void;

  constructor(fn: () => void) {
    this.filter = fn;
  }

  element({ min, max }: MinAndMax, key: 'price' | 'stock') {
    this.createRange(min, max);
    const range = el('.range', [this.rangeInput]);

    (this.rangeInput as noUiSlider.target).noUiSlider?.on('set', (values) => {
      setQueryString(key, values.join('-'));
      this.filter();
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
  restoreState(query: string) {
    (this.rangeInput as noUiSlider.target).noUiSlider?.set(query.split('-'));
  }
}

export default RangeInput;
