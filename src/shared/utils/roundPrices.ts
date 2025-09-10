// src/shared/utils/roundPrices.ts

//Redondeo de precios en miles
export const roundToThousands = (price: number): number => {
  return Math.round(price / 1000) * 1000;
};