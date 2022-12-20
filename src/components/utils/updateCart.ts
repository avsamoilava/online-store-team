import { el } from 'redom';
import { getProductsCount, getProductsInCart, getTotalAmount } from '.';

export const headerAmountElement = el('.header__total', `Total amount: 0.00€`);
export const headerCountElement = el('span.header__cart-count', '0');
export const amountElement = el('.order__sum', `Total cost: 0.00€`);
export const countElement = el('.order__amount', `Amount: 0`);

export function updateAmount() {
  const products = getProductsInCart();
  const productsCount = getProductsCount(products);
  const totalAmount = getTotalAmount(products).toFixed(2);
  headerAmountElement.textContent = `Total cost: ${totalAmount}€`;
  headerCountElement.textContent = `${productsCount}`;
  amountElement.textContent = `Total cost: ${totalAmount}€`;
  countElement.textContent = `Amount: ${productsCount}`;
}
