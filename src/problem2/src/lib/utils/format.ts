const numberFormatter = new Intl.NumberFormat();

export const formatNumber = (value: number) => {
  return numberFormatter.format(value);
};
