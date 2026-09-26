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
└── modules/      # Un feature por carpeta
    ├── administration.routes.ts  # TODAS las rutas del panel (layout + páginas)
    ├── auth/          # login, request-access (sin sesión) — auth.routes.ts
    ├── dashboard/
    ├── alerts/
    ├── users/
    ├── vehicles/
    ├── devices/
    └── settings/
```

- Standalone components, sin NgModules.
- **Rutas**: todas las rutas del panel van en una sola hoja, `modules/administration.routes.ts` (cada página con `loadComponent`). Los features NO tienen su propio `*.routes.ts`. La única excepción es `auth/auth.routes.ts` (pantallas sin sesión). `app.routes.ts` solo carga `auth` y `administration`.
- Usar control flow (`@if`, `@for`) y signals.
- Backend Spring Boot: `Page<T>` llega como `{ content, page: { size, number, totalElements, totalPages } }` (ver `core/interfaces/page.interface.ts`).

---

# Code conventions (reglas obligatorias)

## Estructura de carpetas

- Cada componente vive en su propia carpeta con su `.ts` y su `.html` (el `.scss` del componente NO se usa, ver Estilos).
- Cada feature tiene sus carpetas `interfaces/` y `services/`:

```
modules/<feature>/
├── interfaces/
│   └── <nombre>.interface.ts
├── services/
│   └── <nombre>.service.ts
└── pages/
    └── <componente>/
        ├── <componente>.component.ts
        └── <componente>.component.html
```

## Estilos

- No se usa el `styleUrl` / `.scss` que genera el componente. Al generar componentes usar `--style=none` (o borrar el `.scss` y quitar `styleUrl`).
- Todos los estilos van en `src/styles/`, en parciales con prefijo `_` (ej. `src/styles/modules/_onboarding.scss`).
- Cada parcial se importa en `src/styles.scss` (la hoja principal).

## Componentes reutilizables (`shared/components/`) — obligatorio usarlos

Toda página empieza así:

```html
<section class="wrapper-section">
  <app-page-header title="Usuarios" subtitle="Gestiona los usuarios de tu empresa.">
    <!-- botones opcionales a la derecha -->
  </app-page-header>
  ...
</section>
```

- **`.wrapper-section`** (`styles/components/_wrapper-section.scss`): contenedor raíz de cada página; define el padding y la separación entre bloques. No poner padding propio en las páginas.
- **`app-page-header`**: título + subtítulo; lo proyectado va a la derecha.
- **`app-table`**: toda tabla usa este componente.
  - `[columns]` (`TableColumn[]`), `[data]`, `title`, `icon`, `iconClass`, `emptyMessage`.
  - Filtros/botones del encabezado: contenido con el atributo `table-actions`.
  - Celdas personalizadas: `[customColumns]="['status']"` + `<ng-template #cellTemplate let-row let-column="column">` con `@switch (column.key)`.
  - Paginación: `[paginated]="true" [page] [pageSize] [total] (pageChange)`.
- **`app-drawer`**: panel derecho para crear/editar. Se superpone al contenido (no lo desplaza). `[open]`, `title`, `(closed)`; el pie se proyecta con el atributo `drawer-footer`. Dentro usar `.form-section` / `.form-field`.
- **`app-form-actions`**: botones Cancelar / Guardar. `saveLabel`, `cancelLabel`, `[disabled]`, `[loading]`, `(save)`, `(dismiss)`.

```html
<app-drawer title="Nuevo usuario" [open]="drawerOpen()" (closed)="closeDrawer()">
  <div class="form-section">...</div>
  <app-form-actions drawer-footer saveLabel="Guardar usuario" (save)="save()" (dismiss)="closeDrawer()" />
</app-drawer>
```

## Componentes

- Las dependencias se inyectan por constructor y su nombre lleva prefijo `_`:

```typescript
constructor(
  private _authService: AuthService,
  private _router: Router,
) {}
```

- `ngOnInit` solo llama métodos de inicialización; no contiene lógica:

```typescript
ngOnInit(): void {
  this.buildForm();
  this.loadCompanies();
}
```
