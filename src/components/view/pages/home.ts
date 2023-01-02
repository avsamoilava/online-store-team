import { el } from 'redom';
import { navigate } from '../../utils';

export class Home {
  element() {
    return el('section.home', [
      el('.container', [
        el('.home__content', [
          el('.home__image.home__image-left'),
          el('.home__image.home__image-right'),
          el('h1.home__greeting', 'welcome to the ', el('div', 'Online store')),
          el(
            '.home__text',
            'We save your time!\nWe offer the best prices!\nWe deliver as soon as possible!'
          ),
          el('.home__btn', [
            el('a', 'Catalog', {
              href: '/catalog',
              onclick: (e: Event) => navigate('/catalog', e),
            }),
          ]),
        ]),
      ]),
    ]);
  }
}
