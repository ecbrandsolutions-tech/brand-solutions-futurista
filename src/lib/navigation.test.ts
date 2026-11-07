import { describe, expect, it } from "vitest";
import { NAV_ITEMS, findNavItem, isActive } from "./navigation";

describe("NAV_ITEMS", () => {
  it("tiene las 10 secciones en el orden pedido", () => {
    expect(NAV_ITEMS.map((i) => i.label)).toEqual([
      "Dashboard",
      "Cuentas publicitarias",
      "Campañas",
      "Conjuntos de anuncios",
      "Anuncios",
      "Creatividades",
      "Analítica",
      "Filtros inteligentes",
      "Inteligencia artificial",
      "Configuración",
    ]);
  });

  it("usa rutas únicas", () => {
    expect(new Set(NAV_ITEMS.map((i) => i.href)).size).toBe(NAV_ITEMS.length);
  });
});

describe("isActive", () => {
  it("marca la ruta exacta y sus subrutas, pero no prefijos parciales", () => {
    expect(isActive("/campanas", "/campanas")).toBe(true);
    expect(isActive("/campanas/nueva", "/campanas")).toBe(true);
    expect(isActive("/campanas-archivadas", "/campanas")).toBe(false);
  });
});

describe("findNavItem", () => {
  it("lanza error con rutas desconocidas", () => {
    expect(() => findNavItem("/no-existe")).toThrow();
    expect(findNavItem("/ia").label).toBe("Inteligencia artificial");
  });
});
