import { Layers } from "lucide-react";
import { EmptyState, PageHeader, PhaseNotice } from "@/components/ui/page";

export default function Page() {
  return (
    <>
      <PageHeader href="/conjuntos" />
      <PhaseNotice phase={5}>Los datos provienen directamente de la Meta Marketing API.</PhaseNotice>
      <EmptyState icon={Layers} title="No hay conjuntos de anuncios sincronizados" action={{ href: "/cuentas", label: "Ver cuentas" }}>
        Aquí verás públicos, ubicaciones, presupuestos y fechas de cada conjunto.
      </EmptyState>
    </>
  );
}
