# Arquitectura técnica

## Visión general

```
Navegador (PC / móvil)
   │  solo cookie de sesión de Supabase (httpOnly); nunca tokens de Meta
   ▼
Next.js 16 en Vercel
   ├─ UI: Server Components + Tailwind + Recharts
   ├─ proxy.ts (antes "middleware"): protección de rutas y refresco de sesión
   ├─ Server Actions / Route Handlers: toda operación sensible
   │    ├─ /api/meta/oauth/start     → redirige a Meta con `state` firmado
   │    ├─ /api/meta/oauth/callback  → valida `state`, cambia code por token
   │    ├─ /api/meta/sync            → sincronización bajo demanda
   │    └─ acciones de campañas      → requieren confirmación explícita
   ├─ src/lib/meta     cliente de la Marketing API (paginación, límites, errores)
   ├─ src/lib/crypto   cifrado AES-256-GCM de tokens
   └─ src/lib/env.ts   validación de variables de entorno (zod)
   ▼
Supabase: Postgres con RLS + Auth + Storage privado
   ▼
Meta Graph API / Marketing API
```

## Estructura de carpetas (objetivo)

```
src/
  app/
    (auth)/login/            páginas públicas
    (app)/                   área protegida con menú lateral
      dashboard/  cuentas/  campanas/  conjuntos/  anuncios/
      creatividades/  analitica/  filtros/  ia/  configuracion/
    api/meta/...             Route Handlers de Meta
  components/                UI reutilizable
  lib/
    env.ts  supabase/  meta/  crypto/  validation/  audit/
supabase/
  migrations/                SQL versionado (tablas, RLS, funciones)
docs/
```

## Seguridad

| Riesgo | Medida |
|---|---|
| Exposición de secretos | Secretos solo en variables de entorno del servidor; nada con prefijo `NEXT_PUBLIC_` salvo URL y clave anónima de Supabase. `.env*` ignorado por git. |
| Robo de tokens de Meta | Token cifrado (AES-256-GCM, clave `TOKEN_ENCRYPTION_KEY`) en `meta_connections`; tabla sin políticas RLS para clientes, accesible solo con la service role desde el servidor. |
| CSRF en OAuth | Parámetro `state` aleatorio guardado en cookie httpOnly y verificado en el callback. |
| Acceso entre organizaciones | RLS en todas las tablas por `organization_id`, usando la pertenencia del usuario en `organization_members`. |
| Escalada de privilegios | Roles `owner`, `admin`, `editor`, `viewer`; las acciones que modifican Meta exigen `editor` o superior y se comprueban en el servidor. |
| Entrada maliciosa | Validación con zod en cada Server Action y Route Handler. |
| Gasto no autorizado | Campañas creadas en `PAUSED`; activar, publicar o subir presupuesto exige un paso de confirmación con resumen de gasto; todo queda en `audit_log`. |
| Trazabilidad | `audit_log` (quién, qué, cuándo, objetivo, resultado) y `sync_runs`. |

## Modelo de datos (borrador para la Fase 3)

| Tabla | Propósito | Claves principales |
|---|---|---|
| `profiles` | Datos del usuario (1:1 con `auth.users`) | `id` |
| `organizations` | Empresa o espacio de trabajo | `id`, `name` |
| `organization_members` | Usuario ↔ organización con rol | `organization_id`, `user_id`, `role` |
| `meta_connections` | Conexión OAuth con Meta (token cifrado, scopes, expiración) | `organization_id`, `meta_user_id` |
| `ad_accounts` | Cuentas publicitarias (`act_...`), moneda, zona horaria, estado | `organization_id`, `meta_id` |
| `campaigns` | Campañas: objetivo, estado, presupuesto | `ad_account_id`, `meta_id` |
| `ad_sets` | Conjuntos: público, ubicaciones, puja, fechas | `campaign_id`, `meta_id` |
| `ads` | Anuncios | `ad_set_id`, `meta_id` |
| `creatives` | Creatividades: textos, imagen o video, enlace | `ad_account_id`, `meta_id` |
| `insights_daily` | Métricas diarias por nivel y desglose (país, plataforma) | nivel, objeto, fecha, desglose |
| `sync_runs` | Historial de sincronizaciones y errores | `organization_id`, `started_at` |
| `audit_log` | Registro de acciones de usuarios | `organization_id`, `actor_id`, `action` |
| `saved_views` | Filtros guardados | `organization_id`, `user_id` |
| `campaign_drafts` | Borradores del constructor (aún no enviados a Meta) | `organization_id` |
| `ai_settings` | Configuración de IA (desactivada por defecto, límite de uso) | `organization_id` |

Métricas almacenadas en `insights_daily`: inversión, impresiones, alcance, frecuencia, clics, CTR, CPC, CPM, leads, conversiones, CPA, ROAS. Las métricas derivadas se recalculan a partir de los totales para evitar promediar ratios.

## Decisiones

- **Next.js 16 con Cache Components** (`cacheComponents: true`): el contenido dinámico se renderiza dentro de `<Suspense>`.
- **Sincronización bajo demanda + cron diario**: el plan Hobby de Vercel solo permite cron diario; el botón "Sincronizar" cubre el resto.
- **Sin SDK de Meta**: llamadas `fetch` tipadas a la Graph API, para controlar versión, errores y límites.
