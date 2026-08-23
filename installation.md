# Installation & Tech Stack Guide

> Comprehensive technical report, system prerequisites, package dependencies, and setup instructions for **restaurant_template** (SaLira Studio).

---

## 1. Executive Summary & Tech Stack Overview

This project is a modern, responsive Single Page Web Application (SPA) with Progressive Web App (PWA) capabilities, built with React 19, Vite, TypeScript, and Tailwind CSS v4.

| Layer | Technology / Tool | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Runtime & Language** | [Node.js](https://nodejs.org/) & [TypeScript](https://www.typescriptlang.org/) | Node `>=18.x`, TS `~6.0.2` | Type-safe JavaScript runtime and tooling |
| **Frontend Framework** | [React](https://react.dev/) & [React DOM](https://react.dev/) | `^19.2.8` | Core UI rendering engine with Concurrent Mode & modern hooks |
| **Build Tool & Dev Server** | [Vite](https://vite.dev/) | `^8.2.0` | Ultra-fast HMR dev server and Rollup-based production bundler |
| **Styling & CSS Engine** | [Tailwind CSS](https://tailwindcss.com/) & [@tailwindcss/vite](https://tailwindcss.com/docs/v4-beta) | `^4.3.3` | Next-generation utility-first styling with native CSS `@theme` tokens |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) | `^13.1.1` | Production-ready motion, fluid transitions, and gesture animations |
| **Routing** | [React Router DOM](https://reactrouter.com/) | `^7.18.2` | Client-side routing and page management |
| **State Management** | [Zustand](https://github.com/pmndrs/zustand) | `^5.0.15` | Fast, lightweight client-side state management |
| **Icons & Design Assets** | [Lucide React](https://lucide.dev/) | `^1.33.0` | High-performance SVG icon collection |
| **Typography** | Fontsource (`@fontsource-variable/fraunces`, `@fontsource-variable/inter`) | `^5.3.0` | Self-hosted variable serif & sans-serif fonts |
| **Progressive Web App** | [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) | `^1.3.0` | Offline caching, web app manifest, service worker automation |
| **Linting & Code Quality** | [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) | `^1.75.0` | Blazing-fast Rust-based JavaScript/TypeScript linter |

---

## 2. Prerequisites for Developers

Before setting up the repository locally, ensure the following software is installed on your workstation:

1. **Node.js**: `v18.18.0` or higher (Recommended: `v20.x` or `v22.x LTS`).
   - Verify installation: `node -v`
2. **Package Manager**: **npm** (bundled with Node.js) or compatible alternatives (**pnpm**, **yarn**, **bun**).
   - Verify installation: `npm -v`
3. **Git**: Version control client.
   - Verify installation: `git --version`

---

## 3. Step-by-Step Installation Guide

Follow these steps to clone, install, and run the project locally.

### Step 1: Open the Project Directory
Open your terminal (PowerShell, Command Prompt, or Bash) and navigate to the project directory:
```bash
cd restaurant_template
```

### Step 2: Install Node Dependencies
Run the standard package installation command:
```bash
npm install
```
*(If you are setting up in a CI/CD environment or require strict lockfile resolution, run `npm ci`)*

### Step 3: Run the Development Server
Launch Vite's local development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Once started, open your browser and navigate to the displayed local URL (typically `http://localhost:5173`).

---

## 4. Package & Dependency Reference

### A. Production Dependencies (`dependencies`)

| Package Name | Version | Description & Why It Is Used |
| :--- | :--- | :--- |
| `react` | `^19.2.8` | Core UI library for component creation and rendering. |
| `react-dom` | `^19.2.8` | DOM rendering adapter for React. |
| `react-router` | `^8.3.0` | Core routing primitive utilities. |
| `react-router-dom` | `^7.18.2` | Client-side routing, navigation hooks, and link wrappers. |
| `tailwindcss` | `^4.3.3` | Tailwind CSS v4 core engine. |
| `@tailwindcss/vite` | `^4.3.3` | Official Vite plugin for Tailwind CSS v4 compiler integration. |
| `framer-motion` | `^13.1.1` | Advanced animations for UI transitions, hero motion, and interactive cards. |
| `lucide-react` | `^1.33.0` | Accessible and customizable SVG icon component library. |
| `zustand` | `^5.0.15` | Minimal, scalable global state store (e.g., cart, menu, filter state). |
| `clsx` | `^2.1.1` | Lightweight utility for conditionally constructing class names. |
| `tailwind-merge` | `^3.6.0` | Efficient utility to safely merge Tailwind CSS classes without style conflicts. |
| `@fontsource-variable/fraunces` | `^5.3.0` | Variable serif typography for luxury / editorial headings. |
| `@fontsource-variable/inter` | `^5.3.0` | Variable sans-serif typography for clean, readable body text. |
| `vite-plugin-pwa` | `^1.3.0` | Generates service workers and Web App Manifest for PWA readiness. |

---

### B. Development & Tooling Dependencies (`devDependencies`)

| Package Name | Version | Description & Why It Is Used |
| :--- | :--- | :--- |
| `typescript` | `~6.0.2` | TypeScript compiler for static type checking. |
| `vite` | `^8.2.0` | Next-generation frontend build tool and dev server. |
| `@vitejs/plugin-react` | `^6.0.4` | Official Vite plugin to support React Fast Refresh and JSX transformation. |
| `oxlint` | `^1.75.0` | High-speed Rust linter for detecting errors and maintaining clean code. |
| `@types/react` | `^19.2.17` | TypeScript type definitions for React. |
| `@types/react-dom` | `^19.2.3` | TypeScript type definitions for React DOM. |
| `@types/node` | `^24.13.3` | TypeScript definitions for Node.js APIs (paths, environment variables). |

---

## 5. NPM Available Scripts

| Command | Script Action | Description |
| :--- | :--- | :--- |
| `npm run dev` | `vite` | Starts local development server on port 5173 with instant HMR. |
| `npm run build` | `tsc -b && vite build` | Type-checks code with `tsc` and compiles an optimized production bundle into `dist/`. |
| `npm run preview` | `vite preview` | Locally serves the compiled production build from `dist/` for pre-release verification. |
| `npm run lint` | `oxlint` | Runs the high-performance Oxlint linter across JavaScript & TypeScript source files. |

---

## 6. Directory & Codebase Structure

```
restaurant_template/
├── public/                 # Static assets (favicons, manifests, public media)
│   └── favicon.svg
├── src/                    # Application source code
│   ├── portfolio/          # Portfolio showcase pages, case studies & components
│   │   ├── components/     # Portfolio navigation, footers, showcase widgets
│   │   ├── data/           # Structured case studies, metrics & portfolio data
│   │   └── pages/          # Home, Restaurant Showcase, Case Studies, Contact
│   ├── shared/             # Reusable UI primitives (buttons, modals, badge components)
│   ├── templates/          # Restaurant demo templates, menus, order flows & booking UI
│   ├── App.tsx             # Main router, route definitions & layout wrapper
│   ├── index.css           # Global Tailwind CSS imports, theme variables & base styles
│   └── main.tsx            # Application entrypoint & font bundle imports
├── tools/                  # Automation & asset download scripts (e.g. PowerShell asset scrapers)
├── .oxlintrc.json          # Oxlint linter configuration
├── index.html              # HTML entry template & viewport configuration
├── package.json            # Dependencies, scripts and metadata
├── tsconfig.json           # Base TypeScript configuration
├── tsconfig.app.json       # TypeScript configuration for application code
├── tsconfig.node.json      # TypeScript configuration for Vite/Node tooling
└── vite.config.ts          # Vite build, Tailwind & PWA plugin configurations
```

---

## 7. Troubleshooting & Common Issues

### 1. Port `5173` is already in use
Vite will automatically attempt to use the next free port (e.g., `5174`). You can specify a custom port if required:
```bash
npx vite --port 3000
```

### 2. Node Version Incompatibility
If you encounter build or dependency errors, ensure your active Node.js version is `>= 18.18.0`.
```bash
node -v
```
Use `nvm` (Node Version Manager) or `nvm-windows` to switch versions if needed:
```bash
nvm use 20
```

### 3. Clearing Node Modules & Reinstalling
If package locks or dependencies become corrupted:
```bash
# Windows PowerShell
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install

# Linux / macOS / Git Bash
rm -rf node_modules package-lock.json
npm install
```
