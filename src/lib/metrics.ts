/**
 * Definición y cálculo de métricas publicitarias.
 *
 * Las métricas derivadas (CTR, CPC, CPM, CPA, ROAS, frecuencia) se calculan
 * SIEMPRE a partir de totales agregados, nunca promediando ratios. Si el
 * denominador es 0 o falta un dato, el resultado es `null` (se muestra "—"),
 * nunca un valor inventado.
 */

export type MetricTotals = {
  spend: number;
  impressions: number;
  reach: number;
  clicks: number;
  leads: number;
  conversions: number;
  /** Valor de las conversiones (para ROAS), en la moneda de la cuenta. */
  conversionValue: number;
};

export type MetricKey =
  | "spend"
  | "impressions"
  | "reach"
  | "frequency"
  | "clicks"
  | "ctr"
  | "cpc"
  | "cpm"
  | "leads"
  | "conversions"
  | "cpa"
  | "roas";

export type MetricFormat = "currency" | "integer" | "decimal" | "percent" | "multiplier";

export type MetricDefinition = {
  key: MetricKey;
  label: string;
  format: MetricFormat;
  description: string;
  /** true si un valor mayor es mejor (para colorear variaciones). */
  higherIsBetter: boolean;
};

export const METRICS: readonly MetricDefinition[] = [
  { key: "spend", label: "Inversión", format: "currency", higherIsBetter: false, description: "Importe gastado en el periodo." },
  { key: "impressions", label: "Impresiones", format: "integer", higherIsBetter: true, description: "Veces que se mostraron los anuncios." },
  { key: "reach", label: "Alcance", format: "integer", higherIsBetter: true, description: "Personas únicas que vieron los anuncios." },
  { key: "frequency", label: "Frecuencia", format: "decimal", higherIsBetter: false, description: "Impresiones ÷ alcance." },
  { key: "clicks", label: "Clics", format: "integer", higherIsBetter: true, description: "Clics en los anuncios." },
  { key: "ctr", label: "CTR", format: "percent", higherIsBetter: true, description: "Clics ÷ impresiones." },
  { key: "cpc", label: "CPC", format: "currency", higherIsBetter: false, description: "Inversión ÷ clics." },
  { key: "cpm", label: "CPM", format: "currency", higherIsBetter: false, description: "Inversión por cada 1.000 impresiones." },
  { key: "leads", label: "Leads", format: "integer", higherIsBetter: true, description: "Clientes potenciales obtenidos." },
  { key: "conversions", label: "Conversiones", format: "integer", higherIsBetter: true, description: "Conversiones atribuidas." },
  { key: "cpa", label: "CPA", format: "currency", higherIsBetter: false, description: "Inversión ÷ conversiones." },
  { key: "roas", label: "ROAS", format: "multiplier", higherIsBetter: true, description: "Valor de conversiones ÷ inversión." },
] as const;

export type MetricValues = Record<MetricKey, number | null>;

const ratio = (num: number, den: number, factor = 1): number | null =>
  Number.isFinite(num) && Number.isFinite(den) && den > 0 ? (num / den) * factor : null;

export function computeMetrics(t: MetricTotals): MetricValues {
  return {
    spend: t.spend,
    impressions: t.impressions,
    reach: t.reach,
    frequency: ratio(t.impressions, t.reach),
    clicks: t.clicks,
    ctr: ratio(t.clicks, t.impressions, 100),
    cpc: ratio(t.spend, t.clicks),
    cpm: ratio(t.spend, t.impressions, 1000),
    leads: t.leads,
    conversions: t.conversions,
    cpa: ratio(t.spend, t.conversions),
    roas: ratio(t.conversionValue, t.spend),
  };
}

/** Suma totales de varias filas (días, campañas o cuentas). */
export function sumTotals(rows: readonly MetricTotals[]): MetricTotals {
  return rows.reduce<MetricTotals>(
    (acc, r) => ({
      spend: acc.spend + r.spend,
      impressions: acc.impressions + r.impressions,
      // El alcance no es aditivo entre días/campañas (personas repetidas);
      // la suma es una cota superior. El alcance exacto se pide a Meta por periodo.
      reach: acc.reach + r.reach,
      clicks: acc.clicks + r.clicks,
      leads: acc.leads + r.leads,
      conversions: acc.conversions + r.conversions,
      conversionValue: acc.conversionValue + r.conversionValue,
    }),
    { spend: 0, impressions: 0, reach: 0, clicks: 0, leads: 0, conversions: 0, conversionValue: 0 },
  );
}

export function formatMetric(
  value: number | null | undefined,
  format: MetricFormat,
  opts: { locale?: string; currency?: string } = {},
): string {
  if (value === null || value === undefined || !Number.isFinite(value)) return "—";
  const locale = opts.locale ?? "es";
  switch (format) {
    case "currency":
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: opts.currency ?? "USD",
        maximumFractionDigits: 2,
      }).format(value);
    case "integer":
      return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value);
    case "decimal":
      return new Intl.NumberFormat(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
    case "percent":
      return `${new Intl.NumberFormat(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)} %`;
    case "multiplier":
      return `${new Intl.NumberFormat(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)}x`;
  }
}
