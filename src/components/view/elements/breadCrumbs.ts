import { el } from 'redom';
import { navigate } from '../../utils';

export const breadCrumbs = (links: { name: string; href: string }[]) => {
  return el(
    '.breadcrumbs',
    [{ name: 'Home > ', href: `/` }, ...links].map((el) => link(el.href, el.name))
  );
};

function link(href: string, name: string) {
  return el('a.breadcrumbs__link', name, {
    href: href,
    onclick: (e: Event) => navigate(href, e),
  });
}
