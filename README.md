# Praxis — Simulador de Entrevistas Técnicas con IA (Frontend)

Aplicación web (ReactJS + Vite) que consume la API REST en NestJS del simulador de
entrevistas técnicas. Permite configurar una entrevista, conversar con una IA
entrevistadora, resolver código en un editor integrado y recibir un reporte de
evaluación. Incluye área pública, autenticación JWT, dashboard con gráficos y
módulos administrativos CRUD.

## Integrantes

- Rahí Ruilova
- Carlos Baños
- Domenica Carrera

## Descripción funcional

- **Área pública:** página de inicio, catálogo público con búsqueda / paginación /
  ordenamiento y vista de detalle.
- **Autenticación:** registro e inicio de sesión con JWT, persistencia de sesión y
  rutas protegidas.
- **Dashboard:** tarjetas resumen, gráficos (Recharts) y actividad reciente.
- **Simulación:** configuración de entrevista, chat con la IA + editor de código, y
  reporte final de evaluación.
- **Administración:** módulos CRUD de catálogos (roles, tipos de entrevista,
  seniority, roles objetivo, dificultades, empresas) con validación de formularios.
- **Roles:** la interfaz se adapta según el rol del usuario (admin vs. usuario).

## Tecnologías utilizadas

- ReactJS + Vite
- React Router DOM (navegación y rutas protegidas)
- Axios (con interceptor para el token JWT)
- React Hook Form + Zod (formularios y validación)
- Recharts (gráficos)
- TailwindCSS v4 (estilos, design system propio)
- Context API (autenticación y notificaciones)

## Instalación

```bash
# 1. Clonar el repositorio
git clone <url-del-repositorio>
cd frontend_simulador_entrevistas

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# editar .env.local con la URL del backend

# 4. Ejecutar en desarrollo
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`.

## Variables de entorno

| Variable | Descripción | Ejemplo |
|---|---|---|
| `VITE_API_BASE_URL` | URL base del backend NestJS | `https://simulador-entrevistas-api.uaeftt-ute.site` |

> Las variables `VITE_` se incluyen en el build y se exponen al navegador: no colocar
> secretos. Al cambiarlas hay que reconstruir la aplicación.

## Uso

1. **Registro / Login:** crear una cuenta o iniciar sesión. El token se guarda y la
   sesión persiste.
2. **Navegación pública:** el catálogo público es accesible sin autenticación.
3. **Dashboard:** tras iniciar sesión se accede al panel con métricas y gráficos.
4. **Simulación:** desde el dashboard, "Nueva simulación" configura y arranca una
   entrevista; al finalizar se genera el reporte.
5. **Administración:** los usuarios con rol `admin` ven los módulos CRUD en el menú
   lateral para gestionar los catálogos.

## Scripts

```bash
npm run dev      # servidor de desarrollo
npm run build    # build de producción (genera dist/)
npm run preview  # sirve el build de producción localmente
npm run test     # pruebas unitarias (Vitest)
npm run lint     # análisis estático (oxlint)
```

## Despliegue

La aplicación se construye como sitio estático y se sirve con Nginx (u otra
plataforma como Vercel / Netlify).

```bash
npm run build          # genera dist/
# servir el contenido de dist/ con Nginx (con fallback SPA a index.html)
```

Variables de entorno requeridas en producción:

- `VITE_API_BASE_URL` — URL pública del backend desplegado.

Configuración recomendada (VPS): Ubuntu Server + Nginx + HTTPS (Let's Encrypt).
El servidor debe redirigir todas las rutas a `index.html` para que React Router
funcione correctamente (SPA fallback).

## URLs de producción

- Frontend: _(URL pública del frontend desplegado)_
- Backend: `https://simulador-entrevistas-api.uaeftt-ute.site`
- Documentación API (Swagger): `https://simulador-entrevistas-api.uaeftt-ute.site/api/docs`
