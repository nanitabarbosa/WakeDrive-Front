# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

# Working with the user

- Before making architectural changes, confirm the expected behavior with the user.
- Do not create unnecessary abstractions or generic solutions unless they are required by the project.
- Maintain the existing project structure and conventions.
- Before removing or modifying existing functionality, explain the impact.
- After creating, modifying, or deleting files, always stage changes in git (`git add` / `git rm`).

---

# Project overview

WakeDrive Frontend is an Angular 18 application developed for monitoring and managing drowsiness detection devices used by companies.

The platform allows companies to:
- Request access to the platform.
- Manage users and vehicles.
- Associate users with vehicles and devices.
- Monitor drowsiness alerts.
- Configure device behavior.
- View operational information.

The application communicates with a Spring Boot backend through REST APIs.

---

# Technology stack

## Frontend

- Angular 18
- Node.js 22 LTS
- TypeScript
- SCSS
- Angular Material
- RxJS

## Backend integration

- Spring Boot REST API
- JWT authentication
- Role-based access control

---

# Build and run commands

```bash
npm install

npm start

npm run build

npm test
```

Dev server: `http://localhost:4200`. La URL del backend se configura en `src/environments/` (`apiUrl`).

---

# Architecture

```
src/app/
├── core/         # Singleton, se usa en toda la app
│   ├── guards/        # authGuard, guestGuard, roleGuard (data: { roles: [...] })
│   ├── interceptors/  # authInterceptor: agrega el JWT y cierra la sesión si hay 401
│   ├── interfaces/    # Modelos compartidos (Page<T> de Spring, auth)
│   └── services/      # AuthService (token y roles en signals + localStorage)
├── shared/       # Componentes y layouts reutilizables
│   └── layouts/main-layout/  # Sidenav + toolbar para las rutas autenticadas
└── modules/      # Un feature por carpeta, cada uno con su <feature>.routes.ts
    ├── auth/          # login, request-access (sin sesión)
    ├── dashboard/
    ├── alerts/
    ├── users/
    ├── vehicles/
    └── devices/
```

- Standalone components, sin NgModules. Cada feature se carga con lazy loading (`loadChildren` → `<FEATURE>_ROUTES`).
- Estructura del feature: `pages/` (componentes enrutados); se agregan `components/`, `services/` e `interfaces/` dentro del feature cuando haga falta.
- Usar control flow (`@if`, `@for`), `inject()` y signals.
- Backend Spring Boot: `Page<T>` llega como `{ content, page: { size, number, totalElements, totalPages } }` (ver `core/interfaces/page.interface.ts`).
