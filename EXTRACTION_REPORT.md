# Legacy Landing Extraction Report

## Outcome

A standalone project was created at `legacy-landing-standalone/` with independent config, dependencies, source code, and assets.  
The extracted legacy landing now runs as root (`/`) in the standalone app.

## What was copied

- Root project runtime/config files:
  - `index.html`
  - `package.json`, `package-lock.json`
  - `vite.config.ts`
  - `tailwind.config.ts`
  - `postcss.config.js`
  - `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
  - `eslint.config.js`
  - `.env.example`
- Frontend code:
  - full `src/` tree (ensures all linked marketing routes and dependencies resolve)
- Assets:
  - full `public/` tree

## Standalone-specific changes

- `src/App.tsx`
  - `/` now renders `Homepage` (legacy landing root)
  - `/landing` now redirects to `/`
  - `/landing-brisa` continues redirecting to `/`
- `src/components/home/Header.tsx`
  - "Open app" button now navigates directly to `/`
- `vite.config.ts`
  - dev server port changed to `8081` (to run side-by-side with original on `8080`)
- `package.json`
  - package renamed to `legacy-landing-standalone`
  - standalone scripts simplified to local frontend-only scripts (`dev`, `build`, `build:dev`, `lint`, `typecheck`)

## Browser verification summary

Verified side-by-side:

- Original app: `http://localhost:8080/landing` still loads.
- Standalone app: `http://localhost:8081/` loads with legacy landing content.
- Standalone redirect: `/landing -> /` works.
- Standalone internal marketing routes verified:
  - `/for-companies`
  - `/for-nonprofits`
  - `/for-volunteers`
  - `/pricing`
  - `/about-us`
  - `/register`
  - `/help-center`
  - `/terms-conditions`
  - `/privacy-policy`
- Header product dropdown links and footer legal links navigate correctly.
- No blocking browser console errors observed during validation.

## Dependencies and assets status

- Dependencies are installed in `legacy-landing-standalone/node_modules`.
- The standalone app has all copied local assets and source required to run without referencing parent project files.

## Components copied and reuse notes

- Reused/shared components were copied as part of `src/` (for full independence).
- Landing-focused component set is included (home sections, header/footer, CTA, SEO utilities, UI primitives, i18n, hooks, and route pages linked from landing).

## Deletion candidates in original repo (if old legacy landing is retired later)

These appear landing-specific based on import scans and can be evaluated for deletion only after confirming no runtime/dynamic usage:

- `src/components/home/Hero.tsx`
- `src/components/home/TrustedCompanies.tsx`
- `src/components/home/ImpactAndESGSection.tsx`
- `src/components/home/ValuePropositionCards.tsx`
- `src/components/home/FeaturesOverview.tsx`
- `src/components/home/ESGKPISection.tsx` (currently imported in `Homepage` but not rendered)
- `src/components/home/ImpactOutcomesSection.tsx` (currently imported in `Homepage` but not rendered)

Keep these (shared by multiple routes/pages):

- `src/components/home/Header.tsx`
- `src/components/home/Footer.tsx`
- `src/components/about/CallToActionSection.tsx`
