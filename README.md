# MARKETING CLOUD AI

Centro de control de publicidad digital en la nube para **Facebook Ads e Instagram Ads**: conectar cuentas publicitarias, ver estadísticas reales, filtrar, crear campañas y administrarlas desde una sola interfaz.

> Estado: **Fase 1 — Arquitectura** (esqueleto del proyecto). Ver [docs/ROADMAP.md](docs/ROADMAP.md).

## Stack

| Capa | Tecnología |
|---|---|
| Frontend + backend | Next.js 16 (App Router), React 19, TypeScript |
| Estilos | Tailwind CSS 4 |
| Base de datos y auth | Supabase (Postgres + RLS + Auth + Storage) |
| Publicidad | Meta Marketing API (Graph API) |
| IA (opcional, apagada) | OpenAI API |
| Validación | Zod |
| Pruebas | Vitest (unitarias), Playwright (E2E, Fase 10) |
| Despliegue | Vercel + GitHub |

## Ejecutar en local

Requisitos: Node.js 22 o superior.

```bash
npm install
cp .env.example .env.local   # completa solo lo que ya tengas
npm run dev
```

Abre http://localhost:3000. La pantalla inicial indica qué integraciones están configuradas.

## Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run lint` | ESLint |
| `npm run typecheck` | Genera tipos de rutas y ejecuta TypeScript |
| `npm test` | Pruebas unitarias |
| `npm run check` | lint + typecheck + pruebas |

## Documentación

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md): arquitectura, seguridad y modelo de datos.
- [docs/ROADMAP.md](docs/ROADMAP.md): plan por fases y estado.
- [docs/CONFIGURACION.md](docs/CONFIGURACION.md): cuentas, credenciales y pasos que debe hacer el propietario.

## Reglas del proyecto

- No se muestran datos inventados: sin conexión real, la UI lo indica.
- Ningún secreto en el repositorio; solo `.env.example` sin valores.
- Los tokens de Meta nunca llegan al navegador.
- Ninguna acción que genere gasto en Meta se ejecuta sin confirmación explícita.
