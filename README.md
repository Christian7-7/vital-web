# Vital Pro - E-Commerce Platform

Vital Pro es una plataforma de comercio electrónico de alto rendimiento diseñada para la venta y exhibición de equipamiento deportivo. Construida bajo una arquitectura de microservicios estática (SPA) impulsada por Serverless Functions, está optimizada para despliegues instantáneos y escalables en la nube.

## 🚀 Tecnologías Core (Stack)
- **Frontend:** React + TypeScript + Vite + Tailwind CSS.
- **Backend (API):** Vercel Serverless Node.js (cero configuraciones adicionales).
- **Base de Datos:** PostgreSQL alojado en **Supabase** (usando Transaction Poolers).
- **ORM:** Prisma Client (Edge caching local).
- **Correos:** Resend Email API.

---

## 🏗️ Características del Proyecto
- **Catálogo Dinámico:** Filtrado robusto por categoría y segmento deportivo.
- **Motor Asíncrono Transaccional:** Sistema de compras blindado con variables locales de estados y prevenciones de doble click para una experiencia (UX) sin fricción en el Frontend.
- **Comunicaciones al Cliente (Mock Caching):** Envío de alertas y confirmaciones enlazados al API de Resend. Incorpora tolerancia a fallos por variables faltantes (Graceful Degradation).
- **Control de Estado de DB:** Migraciones maestras en SQL puro, con un modelo transpirado impecablemente a Prisma.

---

## 🛠️ Ejecución Local para Desarrolladores

### 1. Requisitos
- Node.js (v18+)
- Gestor NPM habilitado.
- Acceso al panel de Supabase y Resend.

### 2. Configuración del Entorno
Duplica el archivo transaccional y crea tu propio `.env`:
```bash
cp .env.example .env
```
Rellena las variables públicas (`VITE_SUPABASE...`) y privadas (`RESEND_KEY, DATABASE_URL, DIRECT_URL`) guiándote de los comentarios impresos directamente en el `.env.example` y el documento referencial `ENVIRONMENT_VARIABLES.md`.

### 3. Instalación e Iniciación de Base de Datos
Instala las dependencias y sincroniza el tipado interno de Prisma localmente conectándote a Supabase.
```bash
npm install
npx prisma generate
```

**(Sólo en ambientes nuevos):** Inyecta el catálogo inicial predefinido (Seed) ejecutando:
```bash
npm run seed
```

### 4. Lanzamiento del Servidor Local
Para correr tanto el Frontend (Vite) como habilitar las integraciones que simulen la Interfaz Lógica Serverless local de Vercel:
```bash
npm run dev
# O en su defecto
npm run dev:all
```
Visita `http://localhost:5173`.

---

## ☁️ Despliegue en Producción (Vercel)

El repositorio está fuertemente configurado bajo reglas *Zero-Config* y el `vercel.json` se encuentra en modo transparente listo para CI/CD de Vercel. 
Por favor, **refiérete obligatoriamente** al archivo interno **[`DEPLOY_VERCEL.md`](./DEPLOY_VERCEL.md)** para seguir paso a paso la verificación de dominios DNS y protección de conexiones de la Base de Datos.

---

*Desarrollado y estabilizado arquitectónicamente de principio a fin para un lanzamiento 100% optimizado y sin ambigüedades.*
