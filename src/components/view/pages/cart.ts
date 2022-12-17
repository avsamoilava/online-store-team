import { el, setChildren } from 'redom';
import { Product } from '../../../types';
import { router } from '../../router';
import { Modal } from './Modal';

export class Cart {
  private products: Readonly<Product>[] = [
    {
      id: 1,
      title: 'iPhone 9',
      description: 'An apple mobile which is nothing like apple',
      price: 549,
      discountPercentage: 12.96,
      rating: 4.69,
      stock: 94,
      brand: 'Apple',
      category: 'smartphones',
      thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
      images: [
        'https://i.dummyjson.com/data/products/1/1.jpg',
        'https://i.dummyjson.com/data/products/1/2.jpg',
        'https://i.dummyjson.com/data/products/1/3.jpg',
        'https://i.dummyjson.com/data/products/1/4.jpg',
        'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
      ],
    },
    {
      id: 2,
      title: 'iPhone X',
      description:
        'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...',
      price: 899,
      discountPercentage: 17.94,
      rating: 4.44,
      stock: 34,
      brand: 'Apple',
      category: 'smartphones',
      thumbnail: 'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
      images: [
        'https://i.dummyjson.com/data/products/2/1.jpg',
        'https://i.dummyjson.com/data/products/2/2.jpg',
        'https://i.dummyjson.com/data/products/2/3.jpg',
        'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
      ],
    },
    {
      id: 3,
      title: 'Samsung Universe 9',
      description: "Samsung's new variant which goes beyond Galaxy to the Universe",
      price: 1249,
      discountPercentage: 15.46,
      rating: 4.09,
      stock: 36,
      brand: 'Samsung',
      category: 'smartphones',
      thumbnail: 'https://i.dummyjson.com/data/products/3/thumbnail.jpg',
      images: ['https://i.dummyjson.com/data/products/3/1.jpg'],
    },
    {
      id: 4,
      title: 'OPPOF19',
      description: 'OPPO F19 is officially announced on April 2021.',
      price: 280,
      discountPercentage: 17.91,
      rating: 4.3,
      stock: 123,
      brand: 'OPPO',
      category: 'smartphones',
      thumbnail: 'https://i.dummyjson.com/data/products/4/thumbnail.jpg',
      images: [
        'https://i.dummyjson.com/data/products/4/1.jpg',
        'https://i.dummyjson.com/data/products/4/2.jpg',
        'https://i.dummyjson.com/data/products/4/3.jpg',
        'https://i.dummyjson.com/data/products/4/4.jpg',
        'https://i.dummyjson.com/data/products/4/thumbnail.jpg',
      ],
    },
    {
      id: 5,
      title: 'Huawei P30',
      description:
        'Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.',
      price: 499,
      discountPercentage: 10.58,
      rating: 4.09,
      stock: 32,
      brand: 'Huawei',
      category: 'smartphones',
      thumbnail: 'https://i.dummyjson.com/data/products/5/thumbnail.jpg',
      images: [
        'https://i.dummyjson.com/data/products/5/1.jpg',
        'https://i.dummyjson.com/data/products/5/2.jpg',
        'https://i.dummyjson.com/data/products/5/3.jpg',
      ],
    },
  ];
  private modal: Modal = new Modal();
  private amount = 0;
  private sum = 0;
  private buyBtn = el('button.btn.btn-fill', 'buy now');
  private modalWrap = el('.cart__modal');

  testTemplate(items?: Readonly<Product>[]): HTMLElement {
    if (items) this.products = items; //! тестовые входные данные
    if (!this.products || !this.products.length) {
      return this.renderEmpty();
    }
    const template = this.renderTable(this.products);
    return template;
  }

  renderTable(list: Readonly<Product>[]): HTMLElement {
    this.buyBtnListener(this.buyBtn);
    this.appendModal(this.modalWrap);
    const table = el('section.cart', [
      this.modalWrap,
      el(
        '.container.cart__container',
        [
          el('.cart__title', 'Cart'),
          el('.cart__drops', [
            el('a', 'Home > ', {
              href: '/',
              onclick: (e: Event) => {
                e.preventDefault();
                router.navigate('/');
              },
            }),
            el('span', 'Cart'),
          ]),
        ],
        [
          el('.cart__content', [
            el('.cart__table.table', [
              el('.table__header.table-header', [
                el('.table-header__item', 'Item'),
                el('.table-header__item', 'Discount'),
                el('.table-header__item', 'Price'),
                el('.table-header__item', 'Amount'),
                el('.table-header__item', 'Stock'),
                el('.table-header__item', 'Total'),
              ]),
              el('ul.table__body', this.renderItems(list)),
              el('.table__reset'),
            ]),
          ]),
          el('.cart__footer', [
            el('.cart__promo', [
              el('input.cart__input', { placeholder: 'enter promo code' }),
              el('button.btn', 'apply'),
            ]),
            el('.cart__order.order', [
              el('.order__header', `Total`),
              el('.order__amount', `Amount: ${this.products.length}`),
              el('.order__sum', 'Total cost: ??'),
              el('.order__go', [this.buyBtn]),
            ]),
          ]),
        ]
      ),
    ]);
    return table;
  }

  renderEmpty(): HTMLElement {
    return el(
      '.cart__empty',
      'Cart is empty. Please return to the catalog to choose the products you like.'
    );
  }

  renderItems(products: Readonly<Product>[]): HTMLElement[] {
    const prods = products.map(
      (product: Readonly<Product>, index: number): HTMLElement => {
        return el('li.table__row.product', [
          el('.product__preview', [
            el('.product_num', `${index + 1}`),
            el('img', { src: product.thumbnail }),
            el('span', product.title),
          ]),
          el('.product__disc', `${product.discountPercentage}%`),
          el('.product_price.price', [
            el('.price__item.price__item_base', `${product.price}€`),
            el(
              '.price__item.price__item_disc',
              `${((product.price * (100 - product.discountPercentage)) / 100).toFixed(2)}€`
            ),
          ]),
          el('.product__amount.amount', [
            el('button.amount__item.amount__item_down', '-', { 'data-id': product.id }),
            el('span.amount__item.amount__item_value', 1),
            el('button.amount__item.amount__item_up', '+', { 'data-id': product.id }),
          ]),
          el('.product__stock', product.stock),
          el(
            '.product__total',
            `${((product.price * (100 - product.discountPercentage)) / 100).toFixed(2)}€`
          ),
        ]);
      }
    );
    return prods;
  }

  appendModal(wrap: HTMLElement): void {
    const inner = this.modal.render();
    setChildren(wrap, [inner]);
    //document.body.append(this.modal.render());
  }

  buyBtnListener(btn: HTMLElement): void {
    btn.addEventListener('click', () => {
      console.log(1);
      this.modalWrap.classList.toggle('cart__modal_active');
    });
  }

  reset(): void {
    console.log('');
  }
  update(): void {
    console.log('');
  }
}
