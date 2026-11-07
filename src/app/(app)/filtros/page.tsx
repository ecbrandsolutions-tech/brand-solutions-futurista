import { Filter } from "lucide-react";
import { EmptyState, PageHeader, PhaseNotice } from "@/components/ui/page";

export default function Page() {
  return (
    <>
      <PageHeader href="/filtros" />
      <PhaseNotice phase={6}>Las vistas guardadas se almacenarán por usuario en Supabase.</PhaseNotice>
      <EmptyState icon={Filter} title="Sin filtros guardados" action={{ href: "/dashboard", label: "Volver al dashboard" }}>
        Combina filtros por fecha, país, cuenta, campaña, objetivo, presupuesto, estado, resultados, CTR, CPC, CPM, CPA y ROAS, y guarda tus vistas.
      </EmptyState>
    </>
  );
}
