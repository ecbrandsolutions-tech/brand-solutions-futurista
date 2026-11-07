# Plan por fases

Cada fase se entrega en su propia rama. Nada se fusiona a `main` sin aprobación del propietario.

| Fase | Entregable | Rama | Estado |
|---|---|---|---|
| 1 | Análisis, arquitectura, esqueleto Next.js, `.env.example`, CI, documentación | `fase-1-arquitectura` | Terminada |
| 2 | Layout con menú lateral (10 secciones), dashboard con estados vacíos reales, responsive | `fase-2-frontend` | Pendiente |
| 3 | Migraciones Supabase, RLS, login, roles, rutas protegidas | `fase-3-supabase-auth` | Pendiente |
| 4 | OAuth de Meta, token cifrado, listado de cuentas publicitarias | `fase-4-meta-oauth` | Pendiente |
| 5 | Sincronización de campañas, conjuntos, anuncios e insights; dashboard con datos reales | `fase-5-meta-api` | Pendiente |
| 6 | Filtros combinables, vistas guardadas, analítica comparativa | `fase-6-filtros` | Pendiente |
| 7 | Constructor de campañas (borradores, públicos, ubicaciones, creatividades, vista previa) | `fase-7-constructor` | Pendiente |
| 8 | Publicación controlada (confirmación, PAUSED por defecto, pausar y reactivar) | `fase-8-publicacion` | Pendiente |
| 9 | IA opcional, desactivada por defecto, con límite de uso | `fase-9-ia` | Pendiente |
| 10 | Pruebas E2E, revisión de seguridad, despliegue en Vercel | `fase-10-deploy` | Pendiente |

## Fase 1: realizado

- Análisis del repositorio `brand-solutions-futurista`: solo contenía un `README.md`, que se sustituyó por la documentación del proyecto.
- Proyecto Next.js 16.4.5 + React 19 + TypeScript + Tailwind 4 + ESLint.
- `src/lib/env.ts`: validación de variables de entorno con zod y estado de integraciones.
- Página inicial que muestra el estado real de las integraciones, sin datos de demostración.
- Pruebas unitarias con Vitest (6 pruebas).
- CI de GitHub Actions: lint, typecheck, pruebas y build.
- `.env.example` sin valores secretos.

### Avisos conocidos

- `npm audit` reporta 8 vulnerabilidades moderadas en `minimatch`, a través de `eslint-config-next` → `typescript-eslint`. Solo afectan a herramientas de desarrollo (lint), no al código desplegado. Se revisarán en la Fase 10.
- Instalar dependencias nuevas con npm 10.9 provocó un error interno de npm (`edgesOut`); con npm 11 (`npx npm@11 install ...`) funciona. `npm ci` no está afectado.
