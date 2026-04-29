# Legacy Landing Route Manifest

This manifest documents every link target reachable from the legacy landing experience (`/landing` in the original app), validated by:

- static code scan of landing UI source files, and
- browser click-through at `http://localhost:8080/landing`.

## Source files audited

- `src/pages/Homepage.tsx`
- `src/components/home/Header.tsx`
- `src/components/home/Footer.tsx`
- `src/components/about/CallToActionSection.tsx`

## Internal routes used by landing links

| Route | Where used | Notes |
| --- | --- | --- |
| `/` | Header logo, Footer logo | Home/root navigation |
| `/for-companies` | Header product menu, CTA section, Footer solutions | Public marketing page |
| `/for-nonprofits` | Header product menu, CTA section, Footer solutions | Public marketing page |
| `/for-volunteers` | Header product menu, CTA section, Footer solutions | Public marketing page |
| `/pricing` | Header nav, Footer company | Public pricing page |
| `/about-us` | Header nav, Footer company | Public about page |
| `/landing-brisa` | Header "Open app" | Legacy route; in standalone normalized to `/` |
| `/register` | Header "Get free trial" | Public registration page |
| `/help-center` | Footer legal | Public help center page |
| `/terms-conditions` | Footer legal | Public legal page |
| `/privacy-policy` | Footer legal | Public legal page |

## External links used by landing links

| URL | Where used |
| --- | --- |
| `https://coompass.medium.com/` | Header blog, Footer social, Footer company blog |
| `https://x.com/coompassio` | Footer social |
| `https://www.linkedin.com/company/coompass/` | Footer social |
| `https://t.me/coompass_official` | Footer social |
| `https://coompass.notion.site/e08be489d94c45acbf0fa6eabc3067c7?v=1eea2173815c4944a21d93e4301d8e04` | Footer roadmap |
| `mailto:hello@coompass.org` | Footer contact |
| `https://sdgs.un.org/goals` | Footer partnership section |
| `https://grace.pt/pt` | Footer partnership section |
| `https://vpa.pt/` | Footer partnership section |

## Navigation logic notes

- Landing navigation is implemented with `useNavigate()` helpers in header, footer, and CTA.
- Header contains two `a href` entries (`/pricing`, `/about-us`) that call `preventDefault` and then use SPA navigation.
- In the original app, `/landing-brisa` redirects to `/`.
- In the standalone extraction, landing is normalized so:
  - `/` renders the extracted legacy landing,
  - `/landing` redirects to `/`,
  - header "Open app" navigates directly to `/`.
