import { el } from 'redom';
import { router } from '../../router';
import { Links } from '../../../types';

export const breadCrumbs = (page: string, links?: Links) =>
  el('.breadcrumbs', [
    el('a.breadcrumbs__link', 'Home > ', {
      href: '/',
      onclick: (e: Event) => {
        e.preventDefault();
        router.navigate('/');
      },
    }),
    page !== 'Cart'
      ? el('a.breadcrumbs__link', 'Catalog > ', {
          href: '/catalog',
          onclick: (e: Event) => {
            e.preventDefault();
            router.navigate('/catalog');
          },
        })
      : null,
    links ? crumbs(links) : null,
    el('span.breadcrumbs__current', page),
  ]);

const crumbs = (links: Links): HTMLElement[] => {
  let href = '/catalog?';
  const linksList: HTMLElement[] = [];
  Object.keys(links).forEach((item, index) => {
    href +=
      index === 0
        ? `${item}=${links[item as keyof Links]}`
        : `&${item}=${links[item as keyof Links]}`;
    const link = el('a.breadcrumbs__link', `${item} > `, {
      href: href,
      onclick: (e: Event) => {
        e.preventDefault();
        router.navigate(href);
      },
    });
    linksList.push(link);
  });
  return linksList;
};
