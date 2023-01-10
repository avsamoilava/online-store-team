import { el } from 'redom';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { MinAndMax, QueryParams } from '../../../types';
import { getParams, setQueryString } from '../../utils';
import { router } from '../../router';

class RangeInput {
  private rangeInput: HTMLElement = el('.range__input');
  private min: number;
  private max: number;
  protected key: keyof QueryParams;

  constructor(key: keyof QueryParams) {
    this.key = key;
    this.min = 0;
    this.max = 0;
  }

  element({ min, max }: MinAndMax) {
    this.min = min;
    this.max = max;
    this.createRange(this.min, this.max);
    const range = el('.range', [this.rangeInput]);

    (this.rangeInput as noUiSlider.target).noUiSlider?.on('change', (values) => {
      router.navigate(setQueryString(this.key, values.join('-')));
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

  restoreState(min?: number, max?: number) {
    if (min && max) {
      this.setRange([min, max]);
      return;
    }
    const paramsString = getParams()[this.key];
    this.setRange(paramsString ? paramsString.split('-') : [this.min, this.max]);
  }
  setRange(range: (string | number)[]) {
    (this.rangeInput as noUiSlider.target).noUiSlider?.set(range);
  }
}

export default RangeInput;
