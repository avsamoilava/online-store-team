import { el, setChildren } from 'redom';
export class Modal {
  private modalWrap = el('.cart__modal');
  render(): HTMLElement {
    this.modalWrap.addEventListener('click', (e) => this.close(e));
    setChildren(this.modalWrap, [
      el('.modal', [
        el('.modal__title', 'Personal details'),
        el('.modal__close', ''),
        el(
          'form.modal__form.form',
          el('.form__inputs', [
            el('input.form__name', { type: 'text', placeholder: 'enter your full name' }),
            el('input.form__phone', { type: 'tel', placeholder: 'enter your phone number' }),
            el('input.form__address', { type: 'text', placeholder: 'enter delivery address' }),
            el('input.form__email', { type: 'email', placeholder: 'enter your email' }),
          ]),
          el(
            '.form__card.credit',
            el('.credit__wrapper', [
              el('input.credit__num', { type: 'number', placeholder: '0000 0000 0000 0000' }),
              el('input.credit__valid', { type: 'number', placeholder: '00/00' }),
              el('input.credit__cvv', { type: 'number', placeholder: '000' }),
            ])
          ),
          el('button.form__btn.btn.btn-fill', 'CONFIRM')
        ),
      ]),
    ]);
    return this.modalWrap;
  }
  show() {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
    if (!this.modalWrap.classList.contains('cart__modal_active')) {
      this.modalWrap.classList.add('cart__modal_active');
    }
  }
  close(e: MouseEvent): void {
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
}
