import { Sparkles } from "lucide-react";
import { EmptyState, PageHeader, PhaseNotice } from "@/components/ui/page";

export default function Page() {
  return (
    <>
      <PageHeader href="/ia" />
      <PhaseNotice phase={9}>Es opcional y no generará ningún gasto sin tu autorización.</PhaseNotice>
      <EmptyState icon={Sparkles} title="Inteligencia artificial desactivada" action={{ href: "/configuracion", label: "Ver configuración" }}>
        Análisis de resultados, detección de bajo rendimiento, recomendaciones de presupuesto y textos, comparativa de creatividades e informes automáticos.
      </EmptyState>
    </>
  );
}
