import { el } from 'redom';

class RangeInput {
  private minValue: number;
  private maxValue: number;

  constructor(minValue: number, maxValue: number) {
    this.minValue = minValue;
    this.maxValue = maxValue;
  }

  element() {
    return el('.range', `${this.minValue}-${this.maxValue}`);
  }
}

export default RangeInput;
