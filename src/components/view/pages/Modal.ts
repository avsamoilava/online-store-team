import { el, setChildren } from 'redom';
import IMask from 'imask';
import { Validation } from '../elements/Validation';
import maestro from '../../../assets/images/icons/maestro.png';
import mir from '../../../assets/images/icons/mir.png';
import amex from '../../../assets/images/icons/amex.png';
import jcb from '../../../assets/images/icons/jcb.png';
import dinersClub from '../../../assets/images/icons/diners-club.png';
import visa from '../../../assets/images/icons/visa.png';
import masterCard from '../../../assets/images/icons/mastercard.png';
import union from '../../../assets/images/icons/unionpa.png';
import discover from '../../../assets/images/icons/discover.png';
import placeholder from '../../../assets/images/icons/card-placeholder.png';

export class Modal {
  private validation = new Validation();
  private modalWrap = el('.cart__modal');
  private cardSpans = el('.credit__spans');
  private form = {
    fullName: el('input.form__name', {
      type: 'text',
      placeholder: 'enter your full name',
    }) as HTMLInputElement,
    phoneNum: el('input.form__phone', {
      type: 'tel',
      placeholder: 'enter your phone number',
    }) as HTMLInputElement,
    address: el('input.form__address', {
      type: 'text',
      placeholder: 'enter delivery address',
    }) as HTMLInputElement,
    email: el('input.form__email', {
      type: 'email',
      placeholder: 'enter your email',
    }) as HTMLInputElement,
    cardNum: el('input.credit__num', {
      type: 'text',
      placeholder: '0000 0000 0000 0000',
    }) as HTMLInputElement,
    year: el('input.credit__valid', { type: 'text', placeholder: '00/00' }) as HTMLInputElement,
    code: el('input.credit__cvv', { type: 'text', placeholder: '000' }) as HTMLInputElement,
    confirm: el('button.form__btn.btn.btn-fill', 'CONFIRM') as HTMLInputElement,
  };
  private payIcon = el('.credit__pay-icon');

  render(): HTMLElement {
    this.addListeners();
    this.modalWrap.addEventListener('click', (e) => this.close(e));
    setChildren(this.modalWrap, [
      el('.modal', [
        el('.modal__title', 'Personal details'),
        el('.modal__close', ''),
        el(
          'form.modal__form.form',
          el('.form__inputs', [
            this.form.fullName,
            el('span'),
            this.form.phoneNum,
            el('span'),
            this.form.address,
            el('span'),
            this.form.email,
            el('span'),
          ]),
          el(
            '.form__card.credit',
            el('.credit__wrapper', [
              this.setMask(this.form.cardNum, '0000 0000 0000 0000'),
              this.setMask(this.form.year, '00/00'),
              this.setMask(this.form.code, '000'),
              this.payIcon,
            ])
          ),
          this.cardSpans,
          this.form.confirm
        ),
      ]),
    ]);
    return this.modalWrap;
  }

  private setPayIcon(val: string): void {
    if (this.checkNum(val)) {
      const img = el('img', { src: this.checkNum(val) });
      setChildren(this.payIcon, [img]);
    }
  }

  private checkNum(v: string): string {
    if (v.slice(0, 1) === '2') return mir;
    else if (v.slice(0, 1) === '4') return visa;
    else {
      if (['30', '36', '38'].includes(v.slice(0, 2))) return dinersClub;
      if (['31', '35'].includes(v.slice(0, 2))) return jcb;
      if (['34', '37'].includes(v.slice(0, 2))) return amex;
      if (['50', '56', '57', '58', '63', '67'].includes(v.slice(0, 2))) return maestro;
      if (['51', '52', '53', '54', '55'].includes(v.slice(0, 2))) return masterCard;
      if ('60' === v.slice(0, 2)) return discover;
      if ('62' === v.slice(0, 2)) return union;
    }
    return placeholder;
  }

  show(): void {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
    if (!this.modalWrap.classList.contains('cart__modal_active')) {
      this.modalWrap.classList.add('cart__modal_active');
    }
  }

  close(e: Event): void {
    const target = e.target as HTMLElement;
    if (
      target.className === 'cart__modal cart__modal_active' ||
      target.className === 'modal__close'
    ) {
      if (this.modalWrap.classList.contains('cart__modal_active')) {
        document.body.style.overflow = 'auto';
        this.modalWrap.classList.remove('cart__modal_active');
      }
    }
  }

  private setMask(el: HTMLElement, mask: string): HTMLElement {
    const m = IMask(el, {
      mask,
    });
    return el;
  }

  private addListeners(): void {
    this.form.fullName.addEventListener('blur', () => {
      this.validation.checkName(this.form.fullName);
    });
    this.form.fullName.addEventListener('keyup', () => {
      this.form.fullName.value = this.form.fullName.value.replace(/[^\[A-Za-zА-Яа-яЁё\s]/g, '');
    });

    this.form.phoneNum.addEventListener('blur', () => {
      this.validation.checkPhoneNum(this.form.phoneNum);
    });
    this.form.phoneNum.addEventListener('input', () => {
      this.form.phoneNum.value = this.form.phoneNum.value.replace(/[^\d\+]/g, '');
    });

    this.form.address.addEventListener('blur', () => {
      this.validation.checkAddress(this.form.address);
    });

    this.form.email.addEventListener('blur', () => {
      this.validation.checkEmail(this.form.email);
    });

    this.cardInputHandler();

    this.form.confirm.addEventListener('click', (e) => {
      e.preventDefault();
      const status: boolean[] = [
        this.validation.checkName(this.form.fullName),
        this.validation.checkPhoneNum(this.form.phoneNum),
        this.validation.checkAddress(this.form.address),
        this.validation.checkEmail(this.form.email),
        this.validation.validateCardNum(this.form.cardNum, this.cardSpans),
        this.validation.validateCardYear(this.form.year, this.cardSpans),
        this.validation.validateCardCode(this.form.code, this.cardSpans),
      ];
      if (status.every((elem) => elem)) {
        setChildren(this.modalWrap, [el('.modal__complete', 'Order completed successfully!')]);
        setTimeout(() => (window.location.href = '/'), 3000);
      }
    });
  }

  private cardInputHandler(): void {
    this.form.cardNum.addEventListener('blur', () => {
      this.validation.validateCardNum(this.form.cardNum, this.cardSpans);
    });
    this.form.cardNum.addEventListener('input', () => {
      this.setPayIcon(this.form.cardNum.value);
    });

    this.form.year.addEventListener('blur', () => {
      this.validation.validateCardYear(this.form.year, this.cardSpans);
    });

    this.form.code.addEventListener('blur', () => {
      this.validation.validateCardCode(this.form.code, this.cardSpans);
    });
  }
}
