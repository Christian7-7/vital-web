# Guía Oficial de Despliegue de Vital Pro en Vercel

Esta guía detalla el proceso estructurado y libre de ambigüedades para desplegar la arquitectura React + Serverless + Prisma/Supabase de Vital Pro en un entorno productivo de Vercel.

---

## 1. Requisitos Previos
- Cuenta activa en **Vercel** vinculada a tu GitHub/GitLab.
- Cuenta en **Supabase** (Proyecto inicializado con tu Base de Datos PostgreSQL).
- Cuenta en **Resend** (Dominio preferiblemente verificado).
- Repositorio Git inicializado y subido con la rama `main` actualizada.

## 2. Variables de Entorno Necesarias
Ten a la mano los siguientes valores. Solo los del bloque `VITE_` serán expuestos públicamente; el resto se inyectará de forma segura en las *Serverless Functions* de Vercel.

**Públicas (Frontend):**
- `VITE_SUPABASE_URL`: (Ej. `https://XXXXX.supabase.co`)
- `VITE_SUPABASE_ANON_KEY`: Larga cadena anon pública suministrada por Supabase.

**Privadas (Backend & Build):**
- `DATABASE_URL`: Cadena de conexión usando el **Transaction Pooler** de Supabase (puerto `6543`, e.g., `postgres://...:6543/...?pgbouncer=true`). Usado por Prisma.
- `DIRECT_URL`: Cadena de conexión directa (puerto `5432`). Usado para aplicar migraciones de esquema.
- `RESEND_API_KEY`: Token maestro de tu cuenta Resend (`re_...`).
- `RESEND_FROM_EMAIL`: Remitente validado (Ej. `Vital Pro <ventas@midominio.com>`).

## 3. Conformación del Repositorio (Git)
Asegúrate de que tu `git commit` final esté limpio según nuestras reglas.

✅ **Archivos que SÍ deben ir al repositorio:**
- `src/`, `api/`, `public/`, `supabase/`, `prisma/` (Excepto `dev.db`).
- `package.json`, `vercel.json`, `vite.config.ts`, `tailwind.config.js`, `tsconfig*.json` y los `.md` de documentación.
- `.env.example` (Plantilla de guía estructural).

❌ **Archivos que NO deben subirse nunca:**
- `node_modules/`, `dist/` (Se compilan automáticamente en Vercel).
- `.env` o `.env.local` (Contienen secretos reales, arruinarían tu seguridad si se filtran).
- Archivos `.rar`, `.zip`, `.txt` o `.log` residuales de diagnóstico local.

## 4. Preparar la Base de Datos (Supabase)
Antes de desplegar Frontend, el backend de datos debe existir.
1. Abre la terminal de **Supabase CLI** o el **SQL Editor** web de tu proyecto.
2. Asegúrate de ejecutar el archivo SQL donde creas la tabla `products` *(Ej. `supabase/migrations/01_create_products.sql`)*.
3. Inserta la información mínima ejecutando el comando seed en tu terminal local (conectada a tu BD real):
   ```bash
   npm run seed
   ```

## 5. Validación Local del Build
Asegúrate de que el código no romperá Vercel haciendo simulacros locales primero. En tu consola ejecuta:
```bash
npm run typecheck
npm run lint
npm run build
```
*(Cualquier código de error emitido aquí debe ser arreglado antes del Push a GitHub).*

---

## 6. Proceso de Conexión en Vercel
1. Ingresa a tu Dashboard de **Vercel** y haz click en **Add New -> Project**.
2. De la lista de repositorios importables, selecciona tu repositorio `vital`.
3. Vercel detectará automáticamente que el Framework es **Vite** gracias a las dependencias.

## 7. Configuración en la Consola de Vercel
Antes de darle al click final a "Deploy", ve a la pestaña **Environment Variables** en la misma pantalla de configuración:
1. Copia y pega las 6 variables detalladas en el **Paso 2**. Presiona *Add* por cada una.
2. Baja al fondo de la pantalla y presiona **Deploy**. 

Vercel ejecutará automáticamente `npm run vercel-build`, que a su vez orquesta a `prisma generate` y luego a `vite build`, todo usando las configuraciones mapeadas del `vercel.json`.

---

## 8. Cómo Probar Después del Despliegue
Al recibir la URL `.vercel.app`:
1. **Accede a la Interfaz:** Tu landing page y el header deben renderizarse fluidamente sin errores 500.
2. **Navega al Catálogo:** Selecciona categorías (Ej. *GYM*).
3. **Simula una Compra (Correos):** Selecciona el producto e ingresa datos en el Formulario. Corrobora si llega el correo a tu bandeja de entrada o al log.

## 9. Troubleshooting Lógico (¿Qué revisar si falla?)

| Si la Falla es... | Qué revisar primero | Solución / Diagnóstico |
|-------------------|----------------------|-----------------------|
| **Catálogo Vacío (Array []) o Error 500** | Falla de conexión a Prisma. | Verifica que `DATABASE_URL` esté usando el puerto correcto (`6543`) y el parámetro `?pgbouncer=true`. Asegúrate de que los productos existan y tengan `featured` acorde al esquema. |
| **Correos no llegan** | Consola de Vercel y variables. | Ve a los Logs en Vercel de `api/emails/send`. Revisa si `RESEND_API_KEY` fue olvidada (aparecerá mensaje de *Modo Simulado*) o si usaste un target de email al que tu Resend gratuito no te permite enviar por falta de dominio verificado. |
| **Error 404 en Rutas SPA al Actualizar** | Archivo `vercel.json` no detectado. | Comprueba en Vercel que configuraste las reglas `rewrites` para dirigir todo a `index.html`. |
| **Typecheck falla en Vercel pero no Local** | Variables obligatorias / Entornos desalineados. | El build falló porque introdujiste `any` en una función vital. Descarga los logs del Build en Vercel, lee la línea en error, corrígela local, comitea y repite. |
