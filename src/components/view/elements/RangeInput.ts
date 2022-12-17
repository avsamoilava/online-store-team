import { el } from 'redom';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

class RangeInput {
  private minValue: number;
  private maxValue: number;

  constructor(minValue: number, maxValue: number) {
    this.minValue = minValue;
    this.maxValue = maxValue;
  }

  element() {
    const rangeInput = el('.range__input');
    const range = el('.range', [rangeInput]);
    noUiSlider.create(rangeInput, {
      start: [this.minValue, this.maxValue],
      connect: true,
      step: 1,
      range: {
        min: [this.minValue],
        max: [this.maxValue],
      },
      tooltips: true,
    });
    (rangeInput as noUiSlider.target).noUiSlider?.on('set', (values) => {
      console.log(values);
    });
    // const input0 = document.getElementById("input-0");
    // const input1 = document.getElementById("input-1");
    // const inputs = [input0, input1];

    // rangeSlider.noUiSlider.on("update", function (values, handle) {
    //   inputs[handle].value = Math.round(values[handle]);
    // });

    // function setRangeSlider(idx, value) {
    //   let arr = [null, null];
    //   arr[idx] = value;

    //   rangeSlider.noUiSlider.set(arr);
    // }

    // inputs.forEach((el, index) => {
    //   el.addEventListener("change", (e) => {
    //     setRangeSlider(index, e.target.value);
    //   });
    // });
    return range;
  }
}

export default RangeInput;
