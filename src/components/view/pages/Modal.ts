import { el } from 'redom';
export class Modal {
  render(): HTMLElement {
    return el('.modal', [
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
    ]);
  }
}
