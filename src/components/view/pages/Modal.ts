import { el } from 'redom';
export class Modal {
  render() {
    return el('.modal', [
      el('.modal__content', [
        el(
          'form.modal__form.form',
          el(
            '.form__wrapper',
            el('.form__inputs', [
              el('input.form__name', { type: 'text', placeholder: 'enter your full name' }),
              el('input.form__phone', { type: 'tel', placeholder: 'enter your phone number' }),
              el('input.form__address', { type: 'text', placeholder: 'enter delivery address' }),
              el('input.form__email', { type: 'email', placeholder: 'enter your email' }),
            ]),
            el(
              '.form__card.card',
              el('.card__wrapper', [
                el('input.card__num', { type: 'number', placeholder: '0000 0000 0000 0000' }),
                el('input.card__valid', { type: 'number', placeholder: '00/00' }),
                el('input.card__cvv', { type: 'number', placeholder: '000' }),
              ])
            ),
            el('button.form__btn.btn.btn-fill', 'CONFIRM')
          )
        ),
      ]),
    ]);
  }
}
