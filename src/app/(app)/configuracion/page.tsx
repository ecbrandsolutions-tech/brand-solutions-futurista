import { Suspense } from "react";
import { connection } from "next/server";
import { Card, PageHeader, StatusBadge } from "@/components/ui/page";
import { getIntegrationStatus, getServerEnv } from "@/lib/env";

async function Integrations() {
  // Se evalúa en cada solicitud: refleja la configuración real del servidor.
  await connection();
  const status = getIntegrationStatus(getServerEnv());
  const items = [
    { label: "Supabase", detail: "Base de datos y autenticación", ok: status.supabase, phase: 3 },
    { label: "Meta Marketing API", detail: "Facebook Ads e Instagram Ads", ok: status.meta, phase: 4 },
    { label: "Inteligencia artificial", detail: "Opcional, desactivada por defecto", ok: status.ai, phase: 9 },
  ];
  return (
    <ul className="divide-y divide-white/10">
      {items.map((i) => (
        <li key={i.label} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
          <div>
            <p className="text-sm font-medium text-slate-100">{i.label}</p>
            <p className="text-xs text-slate-500">
              {i.detail} · Fase {i.phase}
            </p>
          </div>
          <StatusBadge ok={i.ok} />
        </li>
      ))}
    </ul>
  );
}

export default function ConfiguracionPage() {
  return (
    <>
      <PageHeader href="/configuracion" />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Estado de las integraciones">
          <Suspense fallback={<div className="h-32 animate-pulse rounded-lg bg-white/5" />}>
            <Integrations />
          </Suspense>
        </Card>
        <Card title="Seguridad">
          <ul className="list-disc space-y-2 pl-5 text-sm text-slate-400">
            <li>Los secretos se configuran como variables de entorno del servidor, nunca en el navegador.</li>
            <li>Los tokens de Meta se guardarán cifrados y nunca se envían al navegador.</li>
            <li>Ninguna acción que genere gasto se ejecuta sin tu confirmación explícita.</li>
            <li>Usuarios, roles y registro de actividad: Fase 3.</li>
          </ul>
        </Card>
      </div>
    </>
  );
}
