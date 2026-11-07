import { z } from "zod";

/**
 * Validación centralizada de variables de entorno.
 *
 * - `publicEnv`: variables NEXT_PUBLIC_* (se incluyen en el bundle del navegador,
 *   por lo tanto NUNCA deben contener secretos).
 * - `getServerEnv()`: secretos del servidor. Solo debe llamarse desde código de
 *   servidor (Route Handlers, Server Actions, Server Components).
 *
 * Todas las integraciones son opcionales en esta fase: si una variable falta,
 * la integración correspondiente se considera "no configurada" y la UI debe
 * mostrarlo así, sin simular datos.
 */

const emptyToUndefined = (v: unknown) =>
  typeof v === "string" && v.trim() === "" ? undefined : v;

const optionalString = z.preprocess(emptyToUndefined, z.string().min(1).optional());
const optionalUrl = z.preprocess(emptyToUndefined, z.url().optional());

export const publicEnvSchema = z.object({
  NEXT_PUBLIC_APP_URL: optionalUrl,
  NEXT_PUBLIC_SUPABASE_URL: optionalUrl,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: optionalString,
});

export const serverEnvSchema = publicEnvSchema.extend({
  SUPABASE_SERVICE_ROLE_KEY: optionalString,
  META_APP_ID: z.preprocess(emptyToUndefined, z.string().regex(/^\d+$/, "META_APP_ID debe ser numérico").optional()),
  META_APP_SECRET: optionalString,
  META_GRAPH_API_VERSION: z.preprocess(
    emptyToUndefined,
    z.string().regex(/^v\d+\.\d+$/, "Formato esperado: vXX.X").optional(),
  ),
  /** Clave de 32 bytes en base64 para cifrar tokens de Meta (AES-256-GCM). */
  TOKEN_ENCRYPTION_KEY: z.preprocess(
    emptyToUndefined,
    z
      .string()
      .refine(
        (v) => Buffer.from(v, "base64").length === 32,
        "TOKEN_ENCRYPTION_KEY debe ser 32 bytes codificados en base64",
      )
      .optional(),
  ),
  OPENAI_API_KEY: optionalString,
  /** La IA queda desactivada salvo que se active explícitamente. */
  AI_ENABLED: z.preprocess(emptyToUndefined, z.enum(["true", "false"]).default("false")),
});

export type PublicEnv = z.infer<typeof publicEnvSchema>;
export type ServerEnv = z.infer<typeof serverEnvSchema>;

export function parsePublicEnv(source: Record<string, string | undefined>): PublicEnv {
  return publicEnvSchema.parse(source);
}

export function parseServerEnv(source: Record<string, string | undefined>): ServerEnv {
  return serverEnvSchema.parse(source);
}

// Next.js solo sustituye NEXT_PUBLIC_* cuando se accede de forma literal.
export const publicEnv: PublicEnv = parsePublicEnv({
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
});

export function getServerEnv(): ServerEnv {
  if (typeof window !== "undefined") {
    throw new Error("getServerEnv() no puede usarse en el navegador");
  }
  return parseServerEnv(process.env);
}

/** Estado de cada integración, para mostrarlo honestamente en la UI. */
export function getIntegrationStatus(env: ServerEnv) {
  return {
    supabase: Boolean(env.NEXT_PUBLIC_SUPABASE_URL && env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    meta: Boolean(env.META_APP_ID && env.META_APP_SECRET && env.TOKEN_ENCRYPTION_KEY),
    ai: env.AI_ENABLED === "true" && Boolean(env.OPENAI_API_KEY),
  } as const;
}
