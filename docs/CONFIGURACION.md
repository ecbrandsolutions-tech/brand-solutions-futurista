# Configuración que debe hacer el propietario

Ninguna de estas cuentas genera costos si se mantienen en los planes gratuitos indicados. No se activará ningún servicio de pago sin tu autorización.

## 1. GitHub (ahora)

- Repositorio actual: `ecbrandsolutions-tech/brand-solutions-futurista`.
- Nombre elegido: **`marketing-cloud-ai`**.
- **Renombrar:** GitHub → repositorio → *Settings* → *General* → *Repository name* → `marketing-cloud-ai` → *Rename*. GitHub redirige automáticamente la URL antigua.
- Si en algún momento Claude no puede subir ramas, reconecta GitHub o instala la Claude GitHub App desde https://claude.ai/connect-github.

## 2. Supabase (Fase 3)

1. Crea una cuenta en https://supabase.com y un proyecto en el plan **Free**.
2. Guarda la contraseña de la base de datos en un lugar seguro. No la compartas en el chat.
3. En *Project Settings → API* encontrarás:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (clave anónima o *publishable*)
   - `SUPABASE_SERVICE_ROLE_KEY` (clave *service_role* o *secret*; **solo servidor**)
4. Límite del plan gratuito: los proyectos inactivos se pausan y deben reactivarse desde el panel.

## 3. Meta for Developers (Fase 4)

1. Ten un **Business Manager** (Meta Business Suite) con:
   - tus cuentas publicitarias,
   - tu página de Facebook,
   - tu cuenta de Instagram profesional vinculada.
2. En https://developers.facebook.com crea una app de tipo **Business**.
3. Añade los productos **Facebook Login for Business** y **Marketing API**.
4. En *Configuración → Básica* obtendrás `META_APP_ID` y `META_APP_SECRET` (**solo servidor**).
5. URI de redirección OAuth válida (se configurará en la Fase 4):
   - local: `http://localhost:3000/api/meta/oauth/callback`
   - producción: `https://TU-DOMINIO/api/meta/oauth/callback`
6. Permisos que se solicitarán: `ads_read`, `ads_management`, `business_management`, `pages_show_list`, `pages_read_engagement`, `instagram_basic`.

### ¿Necesito revisión de Meta?

- **Solo tus propias cuentas**, usadas por personas con rol en la app (administrador, desarrollador o tester): la app puede funcionar en modo desarrollo con acceso estándar, **sin App Review**.
- **Cuentas de otras empresas o clientes:** necesitas **Business Verification**, **App Review** de cada permiso (con video de demostración y política de privacidad pública) y **Advanced Access** a la Marketing API. Se preparará la guía en la Fase 4 si eliges esta opción.
- Los tokens de usuario de larga duración caducan en unos 60 días. Alternativa sin caducidad: un **System User** del Business Manager con acceso a tus cuentas.

## 4. Clave de cifrado (Fase 4)

Genérala en tu computadora y guárdala solo en `.env.local` y en Vercel:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Si pierdes esta clave, habrá que volver a conectar Meta.

## 5. Vercel (Fase 10)

- El plan **Hobby** es gratuito, pero según sus condiciones es para **uso personal y no comercial**. Para uso de empresa o clientes corresponde el plan Pro (de pago). Decide antes de la Fase 10.
- En Hobby los cron jobs se ejecutan como máximo una vez al día.
- Las variables de entorno se cargan en *Project → Settings → Environment Variables*.

## 6. OpenAI (Fase 9, opcional)

- Crea una API key y configura un **límite de gasto mensual** en tu cuenta de OpenAI.
- La IA solo se activa con `AI_ENABLED=true`.
