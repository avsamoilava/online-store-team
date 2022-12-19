import { el, setChildren } from 'redom';
import IMask from 'imask';
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
  private modalWrap = el('.cart__modal');
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
            el('input.form__email', { type: 'email', placeholder: 'enter your email' }),
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
          this.form.confirm
        ),
      ]),
    ]);
    return this.modalWrap;
  }

  private cardInputHandler(): void {
    this.form.cardNum.addEventListener('blur', () => {
      console.log(this.form.cardNum.value);
    });
    this.form.cardNum.addEventListener('input', () => {
      console.log(this.checkNum(this.form.cardNum.value));
      this.setPayIcon(this.form.cardNum.value);
    });
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

  show() {
    this.cardInputHandler();
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
}
