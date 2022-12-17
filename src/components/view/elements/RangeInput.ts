import { el } from 'redom';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { MinAndMax } from '../../../types';

class RangeInput {
  element({ min, max }: MinAndMax) {
    const rangeInput = el('.range__input');
    const range = el('.range', [rangeInput]);
    noUiSlider.create(rangeInput, {
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
    (rangeInput as noUiSlider.target).noUiSlider?.on('set', (values) => {
      console.log(values);
    });
    return range;
  }
}

export default RangeInput;
