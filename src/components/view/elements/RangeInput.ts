import { el } from 'redom';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { MinAndMax } from '../../../types';
import { setQueryString } from '../../utils';

class RangeInput {
  element({ min, max }: MinAndMax, key: 'price' | 'stock') {
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
      setQueryString(key, values.join('-'));
    });
    return range;
  }
}

export default RangeInput;
