import { el } from 'redom';
import { router } from '../../router';

export const page404: HTMLElement = el('.error', [
  el('.container.error__container', [
    el('h1.error__title', '404'),
    el('.error__text', 'Page not found'),
    el(
      '.error__subtext',
      'Oops! The page you are looking for does not exist. It might have been moved or deleted.'
    ),
    el('a.btn.btn-fill.error__btn', 'Back to home', {
      href: '/',
      onclick: (e: Event) => {
        e.preventDefault();
        router.navigate('/');
      },
    }),
  ]),
]);
