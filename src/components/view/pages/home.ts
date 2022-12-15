import { el } from 'redom';

export class Home {
  public content: HTMLElement = el('section.home', [
    el('.container', [
      el('.home__title', 'home'),
      el('.home__content', [
        el('.home__image.home__image-left'),
        el('.home__image.home__image-right'),
        el('h1.home__greeting', 'welcome to the ', el('div', 'Online store')),
        el(
          '.home__text',
          'We save your time! We offer the best prices! We deliver as soon as possible!'
        ),
        el('.home__btn', [el('a', 'Catalog', { href: '/catalog', data: 'data-navigo' })]),
      ]),
    ]),
  ]);
}
