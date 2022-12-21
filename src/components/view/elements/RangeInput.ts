import { el } from 'redom';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { MinAndMax, QueryParams } from '../../../types';
import { setQueryString } from '../../utils';
import BaseElement from './BaseElement';

class RangeInput extends BaseElement {
  private rangeInput: HTMLElement = el('.range__input');
  private min: number;
  private max: number;

  constructor(fn: () => void, key: keyof QueryParams) {
    super(fn, key);
    this.min = 0;
    this.max = 0;
  }

  element({ min, max }: MinAndMax) {
    this.min = min;
    this.max = max;
    this.createRange(this.min, this.max);
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
    super.restoreState((query: string) => this.setRange(query.split('-')));
  }
  setRange(range: (string | number)[]) {
    (this.rangeInput as noUiSlider.target).noUiSlider?.set(range);
  }
  reset() {
    this.setRange([this.min, this.max]);
    super.reset();
  }
}

export default RangeInput;
