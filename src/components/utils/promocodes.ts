export type Promo = {
  name: string;
  title: string;
  discount: number;
  applied: boolean;
};

export const promocodes: Promo[] = [
  {
    name: 'RS',
    title: 'Rolling Scopes School',
    discount: 10,
    applied: false,
  },
  {
    name: 'EPM',
    title: 'EPAM Systems',
    discount: 10,
    applied: false,
  },
];

export const getPromosFromStorage = (): Promo[] =>
  JSON.parse(localStorage.getItem('promocodes') as string);
