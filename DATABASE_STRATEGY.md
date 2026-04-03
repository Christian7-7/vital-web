# Estrategia Oficial de Base de Datos - Vital Pro

Para evitar desalineaciones en infraestructura como las previamente suscitadas, Vital Pro centraliza la evolución de su Base de Datos en un enfoque de jerarquía unidireccional.

## El Enfoque Maestro: Supabase SQL Migrations
Los archivos dentro de `supabase/migrations/` (gestionados mediante *Supabase CLI*) son la **única fuente de verdad (Source of Truth)** para realizar cualquier modificación estructural de la base de datos (tablas, columnas, restricciones).
**Prisma** debe actuar **de forma estricta y pasiva** como un cliente ORM para la aplicación (Type-safe Query Builder), pero nunca como el gestor de migraciones.

### ¿Por qué esta decisión?
El motor de migraciones de Prisma no maneja de forma eficiente funciones nativas intrínsecas del paradigma de Supabase: *Row Level Security (RLS)*, Triggers, Políticas y Roles. Dado que Vital Pro utiliza Supabase y precisa RLS habilitado (como se observa en la migración fundacional `01_create_products`), otorgarle control a Prisma destruiría, desalinearía e ignoraría sistemáticamente esas políticas de seguridad e inyección.

---

## Flujo Oficial de Desarrollo (Paso a Paso)

### 1. Inicializar la Base de Datos Nueva
Cuando instales el repositorio desde cero o te unas al equipo, **NO** asumas la base desde Prisma. 
Construye la estructura ejecutando las migraciones ya testeadas de Supabase:
```bash
# 1. Asocia tu proyecto a bash o levanta Supabase Local
supabase start

# 2. Empuja las migraciones SQL al cluster local/dev
supabase db push
```

### 2. Cómo Aplicar Nuevos Cambios de Esquema
Los cambios (creación de tablas, alteración de una columna) se resuelven siempre escribiendo SQL plano y haciéndole *pull* a Prisma después. Sigue estos 4 pasos mandatorios:

1. **Crear Archivo SQL**:
   ```bash
   supabase migration new nombre_descriptivo_de_migracion
   ```
2. **Programar y Ejecutar**:
   Escribe el código `ALTER TABLE / CREATE TABLE` exacto en tu nuevo archivo de la carpeta `supabase/migrations/`. Empújalo a la base de datos real para aplicarlo:
   ```bash
   supabase db push
   ```
3. **Alinear Prisma (Sincronización Pasiva)**:
   Ahora que la base de datos se alteró con éxito, le informaremos a Prisma cómo luce:
   ```bash
   npx prisma db pull
   ```
   *Nota Crítica:* Revisa tu archivo `schema.prisma`. Si los tipos abstraídos difieren del estándar manejado en tu Frontend (ej. agregaste una columna `featured` pero Typescript requiere otro sintaxis, o nombres abstractos que Prisma desconoce), utiliza manualmente el atributo protector `@map("tu_columna_sql")` para enmascarar los nombres sin corromper tu migración SQL base.
4. **Regenerar Types de Cliente**:
   ```bash
   npx prisma generate
   ```

### 3. Validar Lectura de API
Para confirmar que el ciclo de actualización no rompió la aplicación:
1. Revisa tu archivo maestro `src/types.ts` o tus hooks. Las interfaces exportadas deben consumir exactamente las sub-keys que enviará el endpoint `/api/products.ts`.
2. Corre en terminal `npm run typecheck`. TypeScript lanzará una falla explícita si la alteración de la estructura del modelo no concuerda con las funciones de renderizado React actuales, sirviendo de bloqueo temprano antes del build.

⚠️ **Advertencia General DANGER:**
Nunca, bajo ninguna circunstancia, escribas tipos sueltos en `schema.prisma` para posteriormente intentar enviarlos a la BD ejecutando `npx prisma db push` o `npx prisma migrate dev`. Perderás de vista tu sincronización RLS y chocarás los metadatos SQL guardados por Supabase en su historial de validación.
