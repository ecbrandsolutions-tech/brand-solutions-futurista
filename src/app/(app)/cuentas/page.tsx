import { Wallet } from "lucide-react";
import { EmptyState, PageHeader, PhaseNotice } from "@/components/ui/page";

export default function Page() {
  return (
    <>
      <PageHeader href="/cuentas" />
      <PhaseNotice phase={4}>La conexión con Meta se realiza con OAuth oficial; nunca se te pedirá tu contraseña de Facebook.</PhaseNotice>
      <EmptyState icon={Wallet} title="No hay cuentas publicitarias conectadas" action={{ href: "/configuracion", label: "Ir a configuración" }}>
        Conecta tu cuenta de Facebook mediante el inicio de sesión oficial de Meta para ver aquí tus cuentas publicitarias.
      </EmptyState>
    </>
  );
}
