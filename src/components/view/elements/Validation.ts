import { mount, el } from 'redom';
import { ValidateFn } from '../../utils/validation';
import {
  checkNameValue,
  checkPhoneNumValue,
  checkAddressValue,
  checkEmailValue,
  validateCardNumValue,
  validateCardYearValue,
  validateCardCodeValue,
} from '../../utils/validation';

export class Validation {
  checkPersonInfo(input: HTMLInputElement, checkFn: ValidateFn, field: string): boolean {
    if (!checkFn(input.value)) {
      this.setErrorStyle(input, `incorrect ${field} entry`);
      return false;
    } else {
      this.backStyle(input);
      return true;
    }
  }

  checkCardFields(
    input: HTMLInputElement,
    wrapper: HTMLElement,
    checkFn: ValidateFn,
    spanSelector: string,
    field: string
  ): boolean {
    if (!checkFn(input.value)) {
      const span = el(`span.${spanSelector}`, `incorrect ${field} entry`);
      if (wrapper.children.length < 3) mount(wrapper, span);
      input.classList.add('invalid');
      return false;
    } else {
      input.classList.remove('invalid');
      const span = wrapper.querySelector(`.${spanSelector}`);
      if (span) {
        span.textContent = '';
      }
      return true;
    }
  }
  checkName(input: HTMLInputElement): boolean {
    return this.checkPersonInfo(input, checkNameValue, 'name');
  }

  checkPhoneNum(input: HTMLInputElement): boolean {
    return this.checkPersonInfo(input, checkPhoneNumValue, 'phone number');
  }

  checkAddress(input: HTMLInputElement): boolean {
    return this.checkPersonInfo(input, checkAddressValue, 'delivery address');
  }

  checkEmail(input: HTMLInputElement): boolean {
    return this.checkPersonInfo(input, checkEmailValue, 'email');
  }
  checkCardNum(input: HTMLInputElement, wrapper: HTMLElement): boolean {
    return this.checkCardFields(input, wrapper, validateCardNumValue, 'span-num', 'card number');
  }
  checkCardYear(input: HTMLInputElement, wrapper: HTMLElement): boolean {
    return this.checkCardFields(
      input,
      wrapper,
      validateCardYearValue,
      'span-year',
      'card expiration date'
    );
  }
  checkCardCode(input: HTMLInputElement, wrapper: HTMLElement): boolean {
    return this.checkCardFields(input, wrapper, validateCardCodeValue, 'span-code', 'card code');
  }
  private setErrorStyle(el: HTMLInputElement, message: string) {
    if (el.nextElementSibling) {
      el.nextElementSibling.textContent = message;
      el.classList.add('invalid');
    }
  }

  private backStyle(el: HTMLInputElement) {
    if (el.nextElementSibling) {
      el.nextElementSibling.textContent = '';
      el.classList.remove('invalid');
    }
  }
}
