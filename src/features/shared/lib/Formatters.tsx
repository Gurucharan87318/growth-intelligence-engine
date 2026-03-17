export function formatCurrency(value: number, compact = false) {
  if (compact) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number) {
  return `${value}%`;
}

export function formatMonths(value: number) {
  return `${value} mo`;
}

export function formatRatio(value: number) {
  return `${value}x`;
}

export function formatUsdMillions(value: number) {
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}B`;
  }

  return `$${value.toFixed(0)}M`;
}
