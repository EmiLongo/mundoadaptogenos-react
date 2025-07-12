const DEFAULT_LOCALE = { code: 'es-AR', currency: 'ARS' };

export const numberToPrice = (priceNumber: number, options?: object) => {
  if (priceNumber < 1000) return;
  const locale = DEFAULT_LOCALE;

  const fm = new Intl.NumberFormat(locale.code, {
      style: 'currency',
      currency: locale.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      ...options,
  }).format(priceNumber);

  return fm;
}