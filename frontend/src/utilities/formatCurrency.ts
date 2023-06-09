const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency",
  currencyDisplay: "narrowSymbol",
});

export function formatCurrency(number: number) {
  return CURRENCY_FORMATTER.format(number);
}
