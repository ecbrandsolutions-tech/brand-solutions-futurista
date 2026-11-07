import { METRICS, formatMetric, type MetricValues } from "@/lib/metrics";

/**
 * Cuadrícula de las 12 métricas del dashboard.
 * Sin `values` (sin datos sincronizados) muestra "—" en cada tarjeta.
 */
export function KpiGrid({ values, currency }: { values?: MetricValues; currency?: string }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
      {METRICS.map((m) => (
        <div key={m.key} className="rounded-xl border border-white/10 bg-white/[0.03] p-4" title={m.description}>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{m.label}</p>
          <p className="mt-2 truncate text-xl font-semibold tabular-nums text-white sm:text-2xl">
            {formatMetric(values?.[m.key], m.format, { currency })}
          </p>
          <p className="mt-1 truncate text-xs text-slate-500">{values ? m.description : "Sin datos"}</p>
        </div>
      ))}
    </div>
  );
}
