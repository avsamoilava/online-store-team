import { mount, el } from 'redom';

export class Validation {
  checkName(input: HTMLInputElement): boolean {
    if (input.value.split(' ').length < 2 || !input.value.split(' ').every((e) => e.length >= 3)) {
      this.setErrorStyle(input, 'incorrect name entry');
      return false;
    } else {
      this.backStyle(input);
      return true;
    }
  }

  checkPhoneNum(input: HTMLInputElement): boolean {
    const reg = /\+375\d{9}/;
    if (!reg.test(input.value)) {
      this.setErrorStyle(input, 'incorrect phone number entry');
      return false;
    } else {
      this.backStyle(input);
      return true;
    }
  }

  checkAddress(input: HTMLInputElement): boolean {
    if (input.value.split(' ').length < 3 || !input.value.split(' ').every((e) => e.length >= 5)) {
      this.setErrorStyle(input, 'incorrect delivery address entry');
      return false;
    } else {
      this.backStyle(input);
      return true;
    }
  }

  checkEmail(input: HTMLInputElement): boolean {
    const reg = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    if (!reg.test(input.value)) {
      this.setErrorStyle(input, 'incorrect email entry');
      return false;
    } else {
      this.backStyle(input);
      return true;
    }
  }

  validateCardNum(input: HTMLInputElement, wrapper: HTMLElement): boolean {
    if (input.value.split(' ').join('').length !== 16) {
      const span = el('span.span-num', 'incorrect card number entry');
      if (wrapper.children.length < 3) mount(wrapper, span);
      input.classList.add('invalid');
      return false;
    } else {
      input.classList.remove('invalid');
      const span = wrapper.querySelector('.span-num');
      if (span) {
        span.textContent = '';
      }
      return true;
    }
  }

  validateCardYear(input: HTMLInputElement, wrapper: HTMLElement): boolean {
    if (+input.value.split('/')[0] > 12 || +input.value.split('/')[0] < 1) {
      const span = el('span.span-year', 'incorrect card expiration date');
      if (wrapper.children.length < 3) mount(wrapper, span);
      input.classList.add('invalid');
      return false;
    } else {
      input.classList.remove('invalid');
      const span = wrapper.querySelector('.span-year');
      if (span) {
        span.textContent = '';
      }
      return true;
    }
  }

  validateCardCode(input: HTMLInputElement, wrapper: HTMLElement): boolean {
    if (+input.value.length < 3) {
      const span = el('span.span-code', 'incorrect card code entry');
      if (wrapper.children.length < 3) mount(wrapper, span);
      input.classList.add('invalid');
      return false;
    } else {
      input.classList.remove('invalid');
      const span = wrapper.querySelector('.span-code');
      if (span) {
        span.textContent = '';
      }
      return true;
    }
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
