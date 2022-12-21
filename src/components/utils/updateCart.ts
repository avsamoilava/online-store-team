import { el } from 'redom';
import { getProductsCount, getProductsInCart, getTotalAmount } from '.';

export const headerAmountElement = el('.header__total', `Total amount: 0.00€`);
export const headerCountElement = el('span.header__cart-count', '0');
export const amountElement = el('.order__sum', `Total cost: 0.00€`);
export const countElement = el('.order__amount', `Amount: 0`);
export const promoDiscountAmountElement = el('.order__discount-sum', ``);

export function updateAmount() {
  const discount = JSON.parse(localStorage.getItem('discount') || 'null');
  const products = getProductsInCart();
  const productsCount = getProductsCount(products);
  const totalAmount = +getTotalAmount(products).toFixed(2);
  const promoAmount = discount ? totalAmount - totalAmount * (0.01 * discount) : null;
  headerAmountElement.textContent = `Total cost: ${totalAmount}€`;
  headerCountElement.textContent = `${productsCount}`;
  amountElement.textContent = `Total cost: ${totalAmount}€`;
  countElement.textContent = `Amount: ${productsCount}`;
  promoDiscountAmountElement.textContent = discount
    ? `Total cost width promo: ${promoAmount?.toFixed(2)}€`
    : '';
  amountElement.className = !discount ? 'order__sum' : 'order__sum order__sum_cross';
}
