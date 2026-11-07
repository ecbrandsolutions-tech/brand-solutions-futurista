import { Image } from "lucide-react";
import { EmptyState, PageHeader, PhaseNotice } from "@/components/ui/page";

export default function Page() {
  return (
    <>
      <PageHeader href="/anuncios" />
      <PhaseNotice phase={5}>Los datos provienen directamente de la Meta Marketing API.</PhaseNotice>
      <EmptyState icon={Image} title="No hay anuncios sincronizados" action={{ href: "/cuentas", label: "Ver cuentas" }}>
        Aquí verás cada anuncio con su estado y rendimiento.
      </EmptyState>
    </>
  );
}
