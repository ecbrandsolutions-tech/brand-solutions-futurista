import Link from "next/link";
import { connection } from "next/server";
import { PlugZap } from "lucide-react";
import { getIntegrationStatus, getServerEnv } from "@/lib/env";

/** Aviso honesto sobre el origen de los datos del dashboard. */
export async function MetaStatusBanner() {
  await connection();
  const { meta } = getIntegrationStatus(getServerEnv());
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <PlugZap className="mt-0.5 size-5 shrink-0 text-amber-300" aria-hidden />
        <div className="text-sm">
          <p className="font-medium text-amber-100">
            {meta ? "Meta está configurado, pero aún no hay datos sincronizados" : "No hay ninguna cuenta de Meta conectada"}
          </p>
          <p className="mt-0.5 text-amber-200/70">
            Las métricas se mostrarán cuando se conecte una cuenta real de Facebook Ads e Instagram Ads. No se muestran datos de demostración.
          </p>
        </div>
      </div>
      <Link
        href="/configuracion"
        className="shrink-0 rounded-lg border border-amber-400/30 px-3 py-1.5 text-center text-sm text-amber-100 hover:bg-amber-400/10"
      >
        Ver configuración
      </Link>
    </div>
  );
}
