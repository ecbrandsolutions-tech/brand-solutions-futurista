import {
  ChartLine,
  Filter,
  Image,
  Layers,
  LayoutDashboard,
  Megaphone,
  Palette,
  Settings,
  Sparkles,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
};

/** Menú lateral: las 10 secciones de la plataforma, en orden. */
export const NAV_ITEMS: readonly NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, description: "Resumen de inversión y resultados." },
  { href: "/cuentas", label: "Cuentas publicitarias", icon: Wallet, description: "Cuentas de Meta conectadas." },
  { href: "/campanas", label: "Campañas", icon: Megaphone, description: "Campañas de Facebook e Instagram." },
  { href: "/conjuntos", label: "Conjuntos de anuncios", icon: Layers, description: "Públicos, ubicaciones y presupuestos." },
  { href: "/anuncios", label: "Anuncios", icon: Image, description: "Anuncios individuales y su rendimiento." },
  { href: "/creatividades", label: "Creatividades", icon: Palette, description: "Imágenes, videos y textos." },
  { href: "/analitica", label: "Analítica", icon: ChartLine, description: "Comparativas por fecha, campaña y cuenta." },
  { href: "/filtros", label: "Filtros inteligentes", icon: Filter, description: "Filtros combinables y vistas guardadas." },
  { href: "/ia", label: "Inteligencia artificial", icon: Sparkles, description: "Análisis y recomendaciones (opcional)." },
  { href: "/configuracion", label: "Configuración", icon: Settings, description: "Integraciones, usuarios y seguridad." },
] as const;

export function isActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function findNavItem(href: string): NavItem {
  const item = NAV_ITEMS.find((i) => i.href === href);
  if (!item) throw new Error(`Ruta de navegación desconocida: ${href}`);
  return item;
}
