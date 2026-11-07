import { Suspense } from "react";
import { connection } from "next/server";
import { getIntegrationStatus, getServerEnv } from "@/lib/env";

async function IntegrationStatus() {
  // Se evalúa en cada solicitud: refleja la configuración real del servidor.
  await connection();
  const status = getIntegrationStatus(getServerEnv());
  const items = [
    { label: "Supabase (base de datos y autenticación)", ok: status.supabase, phase: "Fase 3" },
    { label: "Meta Marketing API (Facebook e Instagram Ads)", ok: status.meta, phase: "Fase 4" },
    { label: "Inteligencia artificial (opcional)", ok: status.ai, phase: "Fase 9" },
  ];

  return (
    <ul className="divide-y divide-white/10 rounded-xl border border-white/10 bg-white/5">
      {items.map((item) => (
        <li key={item.label} className="flex items-center justify-between gap-4 px-5 py-4">
          <span className="text-sm text-slate-200">{item.label}</span>
          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
              item.ok ? "bg-emerald-500/15 text-emerald-300" : "bg-slate-500/15 text-slate-400"
            }`}
          >
            {item.ok ? "Configurado" : `No configurado · ${item.phase}`}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center bg-slate-950 px-4 py-16 text-slate-100">
      <div className="w-full max-w-2xl space-y-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">Fase 1 · Arquitectura</p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">MARKETING CLOUD AI</h1>
          <p className="text-slate-400">
            Centro de control de publicidad digital para Facebook Ads e Instagram Ads. Esta pantalla muestra
            el estado real de las integraciones; no se muestran datos de demostración.
          </p>
        </header>
        <Suspense fallback={<div className="h-40 animate-pulse rounded-xl bg-white/5" />}>
          <IntegrationStatus />
        </Suspense>
      </div>
    </main>
  );
}
