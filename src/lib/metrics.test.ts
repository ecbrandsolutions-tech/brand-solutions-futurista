import { describe, expect, it } from "vitest";
import { METRICS, computeMetrics, formatMetric, sumTotals, type MetricTotals } from "./metrics";

const zero: MetricTotals = { spend: 0, impressions: 0, reach: 0, clicks: 0, leads: 0, conversions: 0, conversionValue: 0 };

describe("METRICS", () => {
  it("incluye las 12 métricas del dashboard sin duplicados", () => {
    const keys = METRICS.map((m) => m.key);
    expect(keys).toHaveLength(12);
    expect(new Set(keys).size).toBe(12);
  });
});

describe("computeMetrics", () => {
  it("calcula las métricas derivadas a partir de totales", () => {
    const m = computeMetrics({
      spend: 100,
      impressions: 20000,
      reach: 8000,
      clicks: 400,
      leads: 10,
      conversions: 5,
      conversionValue: 350,
    });
    expect(m.frequency).toBe(2.5);
    expect(m.ctr).toBe(2);
    expect(m.cpc).toBe(0.25);
    expect(m.cpm).toBe(5);
    expect(m.cpa).toBe(20);
    expect(m.roas).toBe(3.5);
  });

  it("devuelve null (no inventa valores) cuando el denominador es 0", () => {
    const m = computeMetrics(zero);
    expect([m.frequency, m.ctr, m.cpc, m.cpm, m.cpa, m.roas]).toEqual([null, null, null, null, null, null]);
  });
});

describe("sumTotals", () => {
  it("suma filas y no promedia ratios", () => {
    const a = { ...zero, spend: 10, impressions: 1000, clicks: 10 };
    const b = { ...zero, spend: 90, impressions: 1000, clicks: 90 };
    const m = computeMetrics(sumTotals([a, b]));
    // CTR correcto = 100 / 2000 = 5 %, no el promedio de (1 % + 9 %) / 2.
    expect(m.ctr).toBe(5);
    expect(m.cpc).toBe(1);
  });

  it("con lista vacía devuelve ceros", () => {
    expect(sumTotals([])).toEqual(zero);
  });
});

describe("formatMetric", () => {
  it("muestra un guion cuando no hay dato", () => {
    expect(formatMetric(null, "currency")).toBe("—");
    expect(formatMetric(Number.NaN, "integer")).toBe("—");
  });

  it("formatea porcentajes y multiplicadores", () => {
    expect(formatMetric(2, "percent")).toBe("2,00 %");
    expect(formatMetric(3.5, "multiplier")).toBe("3,50x");
  });

  it("formatea moneda con el código de la cuenta", () => {
    expect(formatMetric(1234.5, "currency", { currency: "USD", locale: "en-US" })).toBe("$1,234.50");
  });
});
