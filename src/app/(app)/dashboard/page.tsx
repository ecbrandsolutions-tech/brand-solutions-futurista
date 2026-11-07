import { Suspense } from "react";
import { BarChart3, CalendarRange, Wallet } from "lucide-react";
import { KpiGrid } from "@/components/dashboard/kpi-grid";
import { MetaStatusBanner } from "@/components/dashboard/meta-status";
import { Card, EmptyState, PageHeader } from "@/components/ui/page";

export default function DashboardPage() {
  return (
    <>
      <PageHeader href="/dashboard" />
      <div className="space-y-6">
        <Suspense fallback={<div className="h-20 animate-pulse rounded-xl bg-white/5" />}>
          <MetaStatusBanner />
        </Suspense>

        <KpiGrid />

        <div className="grid gap-6 xl:grid-cols-2">
          <Card title="Evolución por fecha" className="xl:col-span-2">
            <EmptyState icon={CalendarRange} title="Sin datos por fecha">
              Inversión, clics y conversiones diarias de las cuentas conectadas.
            </EmptyState>
          </Card>
          <Card title="Comparativa por campaña">
            <EmptyState icon={BarChart3} title="Sin campañas sincronizadas">
              Ranking de campañas por inversión y resultados.
            </EmptyState>
          </Card>
          <Card title="Comparativa por cuenta publicitaria">
            <EmptyState icon={Wallet} title="Sin cuentas conectadas">
              Distribución de la inversión entre cuentas publicitarias.
            </EmptyState>
          </Card>
        </div>
      </div>
    </>
  );
}
