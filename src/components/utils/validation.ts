export type ValidateFn = (value: string) => boolean;

export const checkNameValue = (value: string): boolean => {
  return value.split(' ').length >= 2 && value.split(' ').every((e) => e.length >= 3);
};
export const checkPhoneNumValue = (value: string): boolean => {
  const reg = /\+375\d{9}/;
  return reg.test(value);
};
export const checkAddressValue = (value: string): boolean => {
  return value.split(' ').length >= 3 && value.split(' ').every((e) => e.length >= 5);
};
export const checkEmailValue = (value: string): boolean => {
  const reg = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
  return reg.test(value);
};
export const validateCardNumValue = (value: string): boolean => {
  const cutStr = value.replace(/ /g, '');
  return cutStr.length === 16 && cutStr.split('').every((char) => !isNaN(Number(char)));
};
export const validateCardYearValue = (value: string): boolean => {
  return (
    value.replace('/', '').length === 4 &&
    Number(value.split('/')[0]) <= 12 &&
    Number(value.split('/')[0]) >= 1
  );
};
export const validateCardCodeValue = (value: string): boolean => {
  return Number(value.length) === 3;
};
