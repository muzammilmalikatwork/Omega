# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Deployment note (assets/images)

This project sets Vite `base: './'` so built assets (including images) load correctly when deployed under a subpath or opened directly from `dist/`.

## Node backend

A simple Node.js backend is included in `server/src/index.js`.

- Run frontend: `npm run dev`
- Run backend: `npm run dev:backend`
- The contact form submits to `/api/contact` and is proxied to the backend during development.
- The backend expects a MySQL server. Configure `DATABASE_URL` via `.env` (default: `mysql://root:123456@127.0.0.1:3306/OmegaDB`).
- Check `GET /api/status` for backend + database status (when DB is down, DB-backed routes return `503` instead of crashing).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
