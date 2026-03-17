export type BusinessModel = "SaaS" | "E-commerce" | "Marketplace";

export interface BusinessModelConfig {
  name: BusinessModel;
  defaultCac: number;
  defaultArpu: number;
  defaultRetention: number;
  retentionLabel: string;
  months: number;
}

export interface SimulationCashflowPoint {
  month: number;
  cashOut: number;
  cashIn: number;
  cumulative: number;
}

export interface SimulationResult {
  ltv: number;
  paybackMonths: number;
  ltvToCacRatio: number;
  monthlyRevenue: number;
  healthStatus: "healthy" | "warning" | "critical";
  insight: string;
  cashflow: SimulationCashflowPoint[];
}

export function simulateBusinessModel(
  cac: number,
  arpu: number,
  retention: number,
  model: BusinessModelConfig
): SimulationResult {
  const safeCac = Math.max(1, cac);
  const safeArpu = Math.max(1, arpu);
  const safeRetention = Math.min(0.99, Math.max(0.01, retention));
  const months = model.months ?? 12;

  let ltv = 0;
  let monthlyRevenue = 0;

  if (model.name === "SaaS") {
    const monthlyChurn = Math.max(0.01, 1 - safeRetention);
    ltv = safeArpu / monthlyChurn;
    monthlyRevenue = safeArpu * safeRetention;
  } else if (model.name === "E-commerce") {
    const annualPurchaseFrequency = Math.max(1, safeRetention * 12);
    ltv = safeArpu * annualPurchaseFrequency;
    monthlyRevenue = safeArpu * safeRetention;
  } else {
    const monthlyChurn = Math.max(0.01, 1 - safeRetention);
    ltv = (safeArpu * 0.8) / monthlyChurn;
    monthlyRevenue = safeArpu * safeRetention;
  }

  const paybackMonths = Math.max(
    1,
    Number((safeCac / Math.max(1, monthlyRevenue)).toFixed(1))
  );

  const ltvToCacRatio = Number((ltv / safeCac).toFixed(2));

  let healthStatus: SimulationResult["healthStatus"] = "critical";
  let insight =
    "Warning: High CAC is outstripping LTV. Improve acquisition efficiency or retention.";

  if (ltvToCacRatio >= 4 && paybackMonths <= 6) {
    healthStatus = "healthy";
    insight =
      "Strong unit economics. The model supports scaling with healthy recovery of acquisition spend.";
  } else if (ltvToCacRatio >= 3 && paybackMonths <= 9) {
    healthStatus = "warning";
    insight =
      "Economics are acceptable but not yet strong. Focus on improving retention and shortening payback.";
  }

  const cashflow: SimulationCashflowPoint[] = [];
  let cumulative = -safeCac;

  for (let month = 1; month <= months; month += 1) {
    const cashOut = month === 1 ? safeCac : 0;
    const decayFactor =
      model.name === "E-commerce"
        ? 1
        : Math.pow(safeRetention, month - 1);

    const cashIn = Number((monthlyRevenue * decayFactor).toFixed(0));
    cumulative += cashIn - cashOut;

    cashflow.push({
      month,
      cashOut: Number(cashOut.toFixed(0)),
      cashIn,
      cumulative: Number(cumulative.toFixed(0)),
    });
  }

  return {
    ltv: Number(ltv.toFixed(0)),
    paybackMonths,
    ltvToCacRatio,
    monthlyRevenue: Number(monthlyRevenue.toFixed(0)),
    healthStatus,
    insight,
    cashflow,
  };
}
