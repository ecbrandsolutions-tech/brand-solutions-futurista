import { Megaphone } from "lucide-react";
import { EmptyState, PageHeader, PhaseNotice } from "@/components/ui/page";

export default function Page() {
  return (
    <>
      <PageHeader href="/campanas" />
      <PhaseNotice phase={5}>El constructor de campañas llegará en la Fase 7, y la publicación controlada en la Fase 8.</PhaseNotice>
      <EmptyState icon={Megaphone} title="No hay campañas sincronizadas" action={{ href: "/cuentas", label: "Ver cuentas" }}>
        Las campañas aparecerán aquí después de conectar una cuenta publicitaria y sincronizarla.
      </EmptyState>
    </>
  );
}
