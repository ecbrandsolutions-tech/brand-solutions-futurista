import { ChartLine } from "lucide-react";
import { EmptyState, PageHeader, PhaseNotice } from "@/components/ui/page";

export default function Page() {
  return (
    <>
      <PageHeader href="/analitica" />
      <PhaseNotice phase={6}>Requiere datos sincronizados desde Meta (Fase 5).</PhaseNotice>
      <EmptyState icon={ChartLine} title="Sin datos para analizar" action={{ href: "/dashboard", label: "Volver al dashboard" }}>
        Comparativas por fecha, campaña y cuenta publicitaria con métricas reales.
      </EmptyState>
    </>
  );
}
