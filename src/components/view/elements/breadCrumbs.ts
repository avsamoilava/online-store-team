import { el } from 'redom';
import { router } from '../../router';

export const breadCrumbs = (page: string) =>
  el('.breadcrumbs', [
    el('a.breadcrumbs__link', 'Home > ', {
      href: '/',
      onclick: (e: Event) => {
        e.preventDefault();
        router.navigate('/');
      },
    }),
    el('span.breadcrumbs__current', page),
  ]);
