# Clasificación Oficial de Variables de Entorno - Vital Pro

Para que el proyecto funcione de manera resiliente entre local y el paso a producción (Vercel), todas las variables detectadas han sido clasificadas según su grado de sensibilidad.

## 1. Variables Públicas del Cliente (Vite/React)
Deben ser ingresadas en Vercel de manera normal. Al llevar el prefijo `VITE_`, Vercel automáticamente las incrustará (*bake in*) en el build del frontend de React, haciéndolas visibles en el navegador web del usuario final.
*Nunca metas secretos bancarios o llaves maestras en estas.*
- `VITE_SUPABASE_URL`: La URL pública de tu API de Supabase.
- `VITE_SUPABASE_ANON_KEY`: La llave pública (anon) diseñada expresamente para exponerse e identificar el origen de la app.

## 2. Variables Privadas de la Base de Datos (Prisma)
Prisma requiere cadenas de inyección complejas que permiten modificar estructuralmente la Base de Datos nativa. Estas variables son **exclusivas del tiempo de compilación (*Build Time*) y de las Serverless Functions (*Runtime backend*)**. **NUNCA** llevan el prefijo `VITE_`.
- `DATABASE_URL`: Actúa usando el **Transaction Pooler** (Supabase puerto `6543`) diseñado para alto volumen de peticiones simultáneas desde Serverless Functions locales y de Vercel.
- `DIRECT_URL`: Actúa directamente al socket (Supabase puerto `5432`) usando una conexión persistente. Exclusivamente usada por Prisma para ejecutar acciones mayores y exclusivas del desarrollador (Como `npx prisma db pull`).

## 3. Variables Privadas del Servidor (Backend Services)
Secretos consumidos estrictamente dentro de tu carpeta `/api/`. Permanecen en el lado servidor de Vercel gracias a Node.js.
- `RESEND_API_KEY`: Llave de tu proveedor de Mail Automation. Mantenida estrictamente secreta. 

---

### ¿Cómo configurarlas para Producción en Vercel?
1. Ve a tu Vercel Dashboard -> Project Settings -> **Environment Variables**.
2. Añade, una a una, todas las variables con sus valores de producción correspondientes y asígnalas a los ambientes (`Production`, `Preview`, `Development`).
3. Vercel reconstruirá la aplicación protegiendo las que no llevan el prefijo `VITE_`.

### Resolución Técnica de Ausencias (Graceful Degradation)
El código ha sido blindado estructuralmente:
- Si falta `RESEND_API_KEY`, el endpoint `/api/emails/send` no romperá tu app ni lanzará código HTTP 500, en su lugar emitirá un Warning en los Logs de Vercel interceptando devolver un HTTP 200 de modo `Modo Simulado`, protegiendo el pipeline.
- Si faltan las claves `VITE_SUPABASE`, el cliente inyectará Placeholders silenciosos para evitar que la etapa formal `npm run vercel-build` de Vite se estanque.
