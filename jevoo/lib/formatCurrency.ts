/**
 * Format currency in European format
 * @param amount - The amount to format
 * @param currency - Currency symbol (default: $)
 * @returns Formatted currency string (e.g., "$ 2.707,00")
 */
export const formatCurrency = (amount: number, currency: string = '$'): string => {
  return `${currency} ${amount.toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};