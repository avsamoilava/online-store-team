import { el } from 'redom';
import { getProductsCount, getProductsInCart, getTotalAmount } from '.';

export const headerAmountElement = el('.header__total', `Total amount: 0.00€`);
export const headerCountElement = el('span.header__cart-count', '0');
export const amountElement = el('.order__sum', `Total cost: 0.00€`);
export const countElement = el('.order__amount', `Amount: 0`);
export const promoDiscountAmountElement = el('.order__discount-sum', ``);

export function updateAmount(promo?: number) {
  const products = getProductsInCart();
  const productsCount = getProductsCount(products);
  const totalAmount = +getTotalAmount(products).toFixed(2);
  const promoAmount = promo ? totalAmount - totalAmount * (0.01 * promo) : null;
  headerAmountElement.textContent = `Total cost: ${totalAmount}€`;
  headerCountElement.textContent = `${productsCount}`;
  amountElement.textContent = `Total cost: ${totalAmount}€`;
  countElement.textContent = `Amount: ${productsCount}`;
  promoDiscountAmountElement.textContent = promo
    ? `Total cost width promo: ${promoAmount?.toFixed(2)}€`
    : '';
  amountElement.className = !promo ? 'order__sum' : 'order__sum order__sum_cross';
}
