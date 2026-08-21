export const regions = {
  Pakistan: { currency: "PKR", symbol: "₨", rateFromUsd: 280 },
  "United States": { currency: "USD", symbol: "$", rateFromUsd: 1 },
  "United Kingdom": { currency: "GBP", symbol: "£", rateFromUsd: 0.78 },
  "United Arab Emirates": { currency: "AED", symbol: "د.إ", rateFromUsd: 3.67 },
  Europe: { currency: "EUR", symbol: "€", rateFromUsd: 0.92 },
  Other: { currency: "USD", symbol: "$", rateFromUsd: 1 }
};

export function getRegionCurrency(region) {
  return regions[region] || regions.Other;
}
