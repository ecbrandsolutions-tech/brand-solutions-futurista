import { describe, expect, it } from "vitest";
import { getIntegrationStatus, parseServerEnv } from "./env";

const validKey = Buffer.alloc(32, 1).toString("base64");

describe("parseServerEnv", () => {
  it("acepta un entorno vacío y deja todas las integraciones desactivadas", () => {
    const env = parseServerEnv({});
    expect(env.AI_ENABLED).toBe("false");
    expect(getIntegrationStatus(env)).toEqual({ supabase: false, meta: false, ai: false });
  });

  it("trata cadenas vacías como no configuradas", () => {
    const env = parseServerEnv({ META_APP_ID: "", NEXT_PUBLIC_SUPABASE_URL: "  " });
    expect(env.META_APP_ID).toBeUndefined();
    expect(env.NEXT_PUBLIC_SUPABASE_URL).toBeUndefined();
  });

  it("rechaza una clave de cifrado de longitud incorrecta", () => {
    expect(() => parseServerEnv({ TOKEN_ENCRYPTION_KEY: "corta" })).toThrow();
  });

  it("rechaza un META_APP_ID no numérico y una versión de API mal formada", () => {
    expect(() => parseServerEnv({ META_APP_ID: "abc" })).toThrow();
    expect(() => parseServerEnv({ META_GRAPH_API_VERSION: "21" })).toThrow();
  });

  it("marca Meta como configurado solo con id, secreto y clave de cifrado", () => {
    const partial = parseServerEnv({ META_APP_ID: "123", META_APP_SECRET: "s" });
    expect(getIntegrationStatus(partial).meta).toBe(false);
    const full = parseServerEnv({ META_APP_ID: "123", META_APP_SECRET: "s", TOKEN_ENCRYPTION_KEY: validKey });
    expect(getIntegrationStatus(full).meta).toBe(true);
  });

  it("no activa la IA solo por tener API key", () => {
    const env = parseServerEnv({ OPENAI_API_KEY: "x" });
    expect(getIntegrationStatus(env).ai).toBe(false);
    const on = parseServerEnv({ OPENAI_API_KEY: "x", AI_ENABLED: "true" });
    expect(getIntegrationStatus(on).ai).toBe(true);
  });
});
