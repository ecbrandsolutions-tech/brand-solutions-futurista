import { Palette } from "lucide-react";
import { EmptyState, PageHeader, PhaseNotice } from "@/components/ui/page";

export default function Page() {
  return (
    <>
      <PageHeader href="/creatividades" />
      <PhaseNotice phase={7}>Las creatividades existentes se sincronizan en la Fase 5.</PhaseNotice>
      <EmptyState icon={Palette} title="No hay creatividades" action={{ href: "/cuentas", label: "Ver cuentas" }}>
        Imágenes, videos y textos de tus anuncios, y los que subas para nuevas campañas.
      </EmptyState>
    </>
  );
}
