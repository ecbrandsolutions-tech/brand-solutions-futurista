import Link from "next/link";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { findNavItem } from "@/lib/navigation";

export function PageHeader({ href, actions }: { href: string; actions?: ReactNode }) {
  const item = findNavItem(href);
  const Icon = item.icon;
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-xl bg-sky-500/10 text-sky-300">
          <Icon className="size-5" aria-hidden />
        </span>
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">{item.label}</h1>
          <p className="mt-1 text-sm text-slate-400">{item.description}</p>
        </div>
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function Card({ title, children, className = "" }: { title?: string; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-xl border border-white/10 bg-white/[0.03] p-5 ${className}`}>
      {title && <h2 className="mb-4 text-sm font-medium text-slate-300">{title}</h2>}
      {children}
    </section>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  children,
  action,
}: {
  icon?: LucideIcon;
  title: string;
  children?: ReactNode;
  action?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-white/10 px-6 py-12 text-center">
      {Icon && <Icon className="size-8 text-slate-600" aria-hidden />}
      <p className="font-medium text-slate-200">{title}</p>
      {children && <div className="max-w-md text-sm text-slate-400">{children}</div>}
      {action && (
        <Link
          href={action.href}
          className="mt-2 rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-slate-950 transition-colors hover:bg-sky-400"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}

export function PhaseNotice({ phase, children }: { phase: number; children: ReactNode }) {
  return (
    <p className="mb-6 rounded-lg border border-sky-500/20 bg-sky-500/5 px-4 py-3 text-sm text-sky-200">
      <span className="font-medium">Disponible en la Fase {phase}.</span> {children}
    </p>
  );
}

export function StatusBadge({ ok, okLabel = "Configurado", offLabel = "No configurado" }: { ok: boolean; okLabel?: string; offLabel?: string }) {
  return (
    <span
      className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
        ok ? "bg-emerald-500/15 text-emerald-300" : "bg-slate-500/15 text-slate-400"
      }`}
    >
      {ok ? okLabel : offLabel}
    </span>
  );
}
