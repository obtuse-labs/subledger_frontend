# SubLedger frontend: redesign brief

You are restyling a working Next.js app (App Router, TypeScript, Tailwind v4, deployed on Vercel) to a new visual design. The design changes how the app **looks**. It does not change how auth, data fetching or routing **work**.

- Work on the `redesign` branch. Never push to `main`. The tag `v1-pre-redesign` is the fallback.
- Design sources: `design/` (PNG exports, index in `design/README.md`) and `src/app/tokens.css`.
- Figma: https://www.figma.com/design/TMdAgfFwSUvrJYCTKjuvGT/Subledger-v1-MVP
- Backend contract: the live OpenAPI schema at https://api-subledger.obtuse.in/openapi.json. Nothing else is a source of truth for the API.

If this repo already has a `CLAUDE.md`, merge this into it rather than replacing it.

## Hard rules

1. **Don't change behaviour in the auth and data plumbing.** Restyling the JSX these files render is fine; changing what they do is not. The paths below are as last documented, so confirm them first, and stop and ask if the structure differs.
   - `src/lib/api.ts`: `server-only`; `accountRequest` (JWT only) and `projectRequest` (JWT + `X-Project-Id`).
   - Route Handlers under `app/api/auth/` (login, signup, signout) and the `auth-token` cookie (httpOnly, Secure, SameSite=Lax).
   - `(app)/layout.tsx`: the auth gate that calls `accountRequest("/auth/me")`.
   - `(auth)/login/layout.tsx` and `(auth)/signup/layout.tsx`: these read the cookie directly. **Never** swap that for `accountRequest`; it redirects to `/login` when there is no token and causes an infinite redirect loop.
   - `getProjects`, wrapped in React `cache()`.
   - Server Actions in `plans/actions.ts`: signatures, `revalidatePath`, `router.refresh()`.
2. **Every backend call stays on the server**, through `accountRequest` / `projectRequest`. No client-side fetch to the API, no token in client JS, no `localStorage` for server data.
3. **Never invent an endpoint, field or query param.** If a screen needs data the API doesn't return, stop and list what's missing. Don't fill it with placeholder numbers, and don't loop requests per row to get it. The known gaps are in `local_docs/docs/frontend-backend-gaps.md`. That folder is gitignored, so search may skip it; open the file by this exact path.
4. **No dead chrome.** If a control has no backend, leave it out (list below). Don't build it disabled, and don't wire it to nothing.
5. **Tokens only.** No hex values, no Tailwind palette colours (`bg-zinc-900`), no arbitrary colour values. Tailwind can't see interpolated class names (`bg-[${x}]`), so data-driven colours go in inline `style` with a CSS variable.
6. **No new dependencies without asking.** `lucide-react` is already here and is the icon set. Ask before adding a chart or UI library.
7. **Small commits**, one component or one screen each.

## Design sources

- Look at the PNG for a screen before building it. Tall pages have per-section slices next to them (`design/website/01-landing-light-sections/`).
- The text and numbers in the PNGs are sample data. Real data comes from the API.
- Parts of the PNG copy are out of date. Where a PNG and this file disagree, this file wins.
- Put `tokens.css` at `src/app/tokens.css` and import it in `globals.css` right after `@import "tailwindcss"`. Remove old colour variables from `globals.css` once nothing uses them.

## Theming

- Both themes are required. Components use semantic tokens (`bg-canvas`, `text-fg`, `border-line`) and never check the theme themselves.
- Keep the existing `ThemeProvider` and the no-flash inline script. Match the dark selector in `tokens.css` to the attribute or class that provider already sets, and delete the other selector.
- Code blocks are dark in both themes. `bg-inverse` bands (the "brain, not wallet" section, the CTA) are dark in both themes.
- Ember (`accent`) is used sparingly: `/ SECTION` eyebrows, the active nav indicator, the focus ring, and at most one accent button per view.
- Green, red, amber and blue are for status only.

## Type

Fonts are Inter (UI and headings) and JetBrains Mono (code, IDs, amounts in tables, eyebrows, API enum values). Load both with `next/font` and put their CSS variables first in `--font-sans` / `--font-mono`.

| Use | Class |
|---|---|
| Landing hero | `type-display-xl` |
| Page-level marketing headline | `type-display-l` |
| Section headline | `type-display-m` |
| Dashboard page title | `type-heading-h1` |
| Card or docs section title | `type-heading-h2` / `type-heading-h3` |
| Card header, modal title | `type-heading-h4` |
| Body | `type-body-l` (marketing lead), `type-body-m` (default), `type-body-s` (tables, help text), `type-body-xs` |
| Buttons, form labels, nav | `type-label-l` / `type-label-m` / `type-label-s` |
| Section eyebrow, written `/ CORE PRIMITIVES`, in `text-accent-text` | `type-mono-eyebrow` |
| Table header | `type-mono-eyebrow` in `text-fg-subtle` |
| Code | `type-mono-code` |
| IDs, amounts and timestamps in tables | `type-mono-data` |
| Badge text, small mono | `type-mono-small` |
| KPI number | `type-mono-value` |

Check that ₹ renders in mono amounts. The `--font-mono` stack falls back to Inter for any glyph JetBrains Mono lacks; don't "fix" it by changing fonts.

## Components

Build these in `src/components/ui/`. Reuse the existing logic where a component already exists (`CodePanel`, `ToggleButton`, `Sidebar` / `SidebarTab`, `Navbar`, `UserDropdown`, `ProjectDropdown`, `MenuButton`, `PlanForm`, `PlanFormPanel`, `ErrorState`, `ComingSoon`) and restyle it. References are in `design/components/`.

| Component | Variants | Notes |
|---|---|---|
| Button | `primary` `secondary` `ghost` `accent` `danger` × `sm` (32px) `md` (40px) `lg` (48px) | Radius 6px for `sm`, 8px otherwise. Optional leading or trailing icon. Disabled is 40% opacity. `danger` only for destructive confirms. |
| IconButton | `secondary` `ghost` `primary` × `sm` `md` | Square. Needs an `aria-label`. |
| Badge | tone `success` `danger` `warning` `info` `neutral` `accent` × kind `soft` `dot` `outline` | Mono, lowercase. The label is the API enum value, unchanged. |
| MethodBadge | `GET` `POST` `PATCH` `DELETE` | Docs only. |
| TechChip, Kbd, Avatar | Avatar `sm` 24, `md` 32, `lg` 40 | Avatar shows initials. |
| Input | `text` `select` `search` `password` × default, focus, error, disabled | 40px tall, radius 8px, label above, hint below. An error replaces the hint. Focus is an accent border plus `shadow-focus`. |
| Textarea, Checkbox, Radio, Switch | | |
| Tabs | `underline` (sections of a page, optional count), `segment` (chart range, modal toggles), `pill` (quick filters above a list) | |
| Menu, MenuItem | default, hover, selected (check mark), destructive | 240px wide, 6px padding, 36px rows, `shadow-2`. Close on outside click with the existing ref-based pattern. |
| StatCard | `default` `inverse` | At most one `inverse` card per row. |
| LedgerEntry | `invoice_created` `payment_success` `payment_failure` | Timeline row: dot, type, timestamp, reference, amount. |
| CodeBlock | title or language tabs, copy button | Always dark. Keep `CodePanel`'s copy logic. |
| Table | | Header 40px on `bg-subtle` with eyebrow text. Rows 56px. Amounts right-aligned, mono, `tabular`. Wrapped in a 12px-radius card. |
| Modal | `default` `destructive` | 480 to 560px wide, footer on `bg-subtle`, `shadow-3`, `bg-scrim` behind. Esc and scrim click close it; focus is trapped. |
| Alert | `info` `warning` `danger` `success` `accent` | Inline. |
| Toast, Tooltip, EmptyState | | |
| Pagination | | **Prev / Next plus a rows-per-page select (10, 25, 50, 100). No page numbers and no totals.** The PNGs show page numbers; ignore that. Until a list endpoint returns cursors, render the list without pagination controls. |
| SiteNav, DocsNav, SiteFooter | | Marketing shell. |
| AppSidebar, AppTopbar | | App shell, see below. |

## Status colours

Labels are the API's enum values. Map them like this:

| Resource | Value → tone |
|---|---|
| Subscription | `active` success · `paused` warning · `cancelled` danger · `expired` neutral |
| Invoice | `draft` neutral · `issued` warning · `partially_paid` info · `paid` success · `overdue` danger · `void` neutral |
| Payment | `success` success · `failed` danger |
| Ledger entry | `invoice_created` info · `payment_success` success · `payment_failure` danger |
| Plan, customer | `active` success · `inactive` neutral |
| Invoice type | `subscription` neutral · `one_time` accent |

`overdue` and `draft` aren't in the PNGs; the mapping above covers them.

## Formatting

- **Money.** The API returns decimal strings plus a `currency`. Never do arithmetic on them with floats. Display with `Intl.NumberFormat("en-IN", { style: "currency", currency })`, which gives `₹4,82,300.00`.
- **Dates.** `01 Jun 2026`. Periods as `Jun 01 → Jul 01`. Ledger timestamps in mono.
- **IDs.** API IDs are UUIDs. The short IDs in the PNGs (`sub_8f21`) are display only: show a prefix plus the first 8 characters, and always link and copy the full UUID.
- **Invoice numbers** (`INV-2026-0418`) don't exist in the API yet. Show the short ID until an invoice `number` field ships.

## Where the PNGs are wrong

- Invoice status `open` is really `issued`. Plan status `Archived` is really `inactive`.
- Plans table and Create plan modal: there is no "Product" field. The project is the product. The modal needs a `payment_terms_days` field instead.
- Record payment modal: the real body is `invoice_id`, `amount`, `currency`, `status`, `provider_reference`, `failure_reason`. There is no `method` and no `simulate_failure`.
- Docs content: login is JSON `{ email, password }`, not a form with `username`. Document `X-Project-Id`, API keys (`sk_live_…`) and per-project idempotency. There is no `ADMIN_EMAIL`.
- Any copy saying "single-tenant", "one admin" or "multi-tenancy arrives in v2" is wrong. Multi-tenancy is built. Remove it.
- The sidebar's "workspace" switcher is the **project** switcher.
- Settings: no "Rotate SECRET_KEY" and no "Token lifetime".
- API keys table: no scope column.
- Landing numbers ("63 tests", "32 endpoints") are stale. Ask for current figures; don't guess.

## Leave out (no backend yet)

⌘K search, the notifications bell, the top-bar date range, the "API health" card, Continue with GitHub, Forgot password, Download PDF, Void invoice, anything showing MRR, the idempotency stats card, API key management, the Team tab.

## App shell

Follow the design's layout, keeping today's behaviour:

- **Sidebar** (256px): logo, the project switcher (existing `ProjectDropdown` logic; switching keeps the current tab), nav groups from the existing config in `lib/api-data.ts`, and the user card at the bottom opening the existing user menu and sign-out.
- **Top bar** (64px): the existing account › project breadcrumb, the theme toggle, and page-level action buttons only where the action works.
- Account-level pages (`/dashboard`) use the account nav groups. Project pages use the project groups.
- Keep the current mobile behaviour. The PNGs are 1440px desktop only; marketing pages must still stack sensibly on small screens.

## Screens and routes

| Route | PNG | Status |
|---|---|---|
| `/` | `website/01-landing-light.png`, `02-landing-dark.png`, plus section slices | Restyle |
| `/docs` | `website/03-docs-introduction.png` to `07-docs-list-invoices.png` | Restyle. Static content. Splitting into several pages with the docs sidebar is fine. |
| `/contact` | `website/10-contact.png` | New, static. There is no form backend: ask how the form should submit before building it. |
| `/login`, `/signup` | `website/11-auth-log-in.png`, `12-auth-log-in-error.png`, `13-auth-sign-up.png` | Restyle. Keep the handlers. |
| not-found | `website/15-404.png` | Restyle `ErrorState`. |
| `/dashboard` (project cards) | none | Restyle with the new components. No PNG exists for this page. |
| `/dashboard/[projectId]/plans` | `dashboard-light/05-plans.png`, `06-plans-create-plan-modal.png` | Restyle. Works today. |
| customers, subscriptions, invoices, payments, ledger | `dashboard-light/07` to `19` | Endpoints exist, but lists return IDs without names and have no counts. Build one screen at a time, **only when asked**, and report what the API is missing first. |
| project overview | `dashboard-light/01-overview.png` | Needs analytics endpoints that don't exist. Leave the route as it is today. |
| renewal cycle, API keys, settings | `dashboard-light/20` to `22` | No backend. Keep `ComingSoon`. |

Dark versions of every dashboard screen are in `design/dashboard-dark/` under the same file names.

## Build order

1. Tokens, fonts, theme wiring. Nothing else changes yet; the app should still build.
2. UI primitives: Button, Badge, Input, Tabs, Menu, Table, Modal, Alert, StatCard, CodeBlock.
3. Shells: SiteNav and SiteFooter, then AppSidebar and AppTopbar.
4. Marketing and auth pages.
5. Plans, on the new components, against real data.
6. The `/dashboard` project cards page.
7. Stop. Each remaining dashboard screen is a separate task, started on request.

## Done means

Check all of these on the Vercel preview before proposing a merge:

- Log in, sign up and sign out work.
- A signed-in user opening `/login` lands on `/dashboard`. A signed-out user opening `/dashboard` lands on `/login`. No redirect loop either way.
- Switching projects keeps the current tab.
- Plans: create, edit, deactivate and reactivate all work, and the list updates.
- Both themes render correctly, with no flash of the wrong theme on load.
- The repo's build, lint and typecheck scripts pass.
- No hex colours outside `tokens.css`.
- Each restyled page matches its PNG at 1440px wide, in both themes.