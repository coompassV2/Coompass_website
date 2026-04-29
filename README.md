# Legacy Landing Standalone

Standalone copy of the legacy landing experience extracted from the main Coompass app.

## Run

```bash
npm install
npm run dev
```

The app runs on `http://localhost:8081`.

## Route normalization

- `/` -> legacy landing page
- `/landing` -> redirects to `/`
- `/landing-brisa` -> redirects to `/`

## Route/link inventory

See `ROUTE_MANIFEST.md` for the complete link audit and `EXTRACTION_REPORT.md` for extraction details.
