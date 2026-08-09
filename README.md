# SubLedger

**Subscription billing, modelled correctly.** SubLedger is a billing backend that records money movement — it never touches the money itself. It manages plans, customers, subscriptions, invoices and idempotent payment records on top of an append-only ledger, while charges settle on the merchant's *own* payment gateway. The brain, not the wallet.

This repository is the **frontend of SubLedger**.

---

## What this repository is

`subledger_frontend` is the web frontend for the SubLedger product. Today it is in its public, pre-dashboard stage: a landing page that explains the billing model, a styled API reference, and the surrounding chrome. As the product matures, this same application grows into the full product surface — authentication, a dashboard, and payment-gateway setup and linking (see [Roadmap](#roadmap)).

The billing engine itself lives in a separate repository. This repo does not contain the API, database, or business logic — it presents them.

- **Backend / API:** [utkarsh-vats/subledger_backend](https://github.com/utkarsh-vats/subledger_backend) — FastAPI, PostgreSQL, Celery. The source of truth for the data model, the idempotency design, the append-only ledger, and the subscription state machine.

---

## The product

SubLedger is a subscription-billing and invoicing backend for developers and micro-SaaS builders who need correct recurring billing without becoming a payment processor. Its surface is six resources:

- **Plans** — price, currency and billing cycle a subscription snapshots from.
- **Customers** — the people and organisations being billed.
- **Subscriptions** — link a customer to a plan; move through active, paused, cancelled, expired.
- **Invoices** — subscription or one-time, a discriminated union enforced at the database level.
- **Payments** — recorded attempts against an invoice, made idempotent by a database UNIQUE constraint on the attempt.
- **Ledger** — the append-only, insert-only record of every money-flow event; balances are derived from it, never stored.

The defining constraint is that SubLedger orchestrates and records — it does not hold, pool, escrow, route, or settle funds. Money moves customer → the merchant's gateway → the merchant's bank. That keeps SubLedger out of the regulatory surface of a payment processor while still owning the billing logic.

The deeper architecture — why idempotency is a database constraint rather than a cache, how the ledger stays authoritative, how the renewal cycle runs — is documented in the [backend repository](https://github.com/utkarsh-vats/subledger_backend).

---

## What the frontend does (v1)

- **Landing page** — explains the billing model, the six primitives, and the integrity guarantees (idempotent writes, an append-only ledger, derived balances).
- **API reference** (`/docs`) — a hand-built, resource-oriented reference mirroring the real API surface, with request/response examples for every endpoint. It links out to the running instance's live OpenAPI schema.
- **Error handling** — a designed not-found page consistent with the rest of the interface.
- **Light / dark theming** — a no-flash, persisted theme system.
- **Responsive** — built mobile-first, from phone widths up.

The reference is deliberately faithful to the backend: JWT bearer auth, the `Idempotency-Key` requirement on payment recording, decimal (not integer-minor-unit) amounts, and the three real ledger entry types. If the site claims the API does something, the API does it.

---

## Built with

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS v4** — theming via CSS variables mapped to utilities, toggled by a `data-theme` attribute
- **Vercel** — continuous deployment from `main`
- Inter (body) and JetBrains Mono (code)

The visual design was authored in Claude Design and ported to Next.js by hand — components, theming, and responsive behaviour built from the design spec rather than an automated export.

---

## Status

Early access, built in public. No signup, no waitlist.

- The **frontend** is live at [subledger.obtuse.in](https://subledger.obtuse.in).
- The **API** currently runs on a self-hosted home-lab server, exposed over a Tailscale Funnel with a valid TLS certificate. It is intended for demonstration; it may be intermittently offline. A dedicated domain (`api.subledger.obtuse.in`) and hardened hosting are planned.

v1 is a working, deployed slice of the product — enough to read, run, and evaluate. It is not yet processing real money.

---

## Roadmap

**v1 (current)** — public frontend: landing, API reference, theming. Deployed.

**v2 onward** — the product surface:

- User authentication
- A dashboard for plans, customers, subscriptions, invoices, and ledger inspection
- Payment-gateway setup and linking from the dashboard UI
- A dedicated API domain and production-grade hosting

At v2, SubLedger moves from a portfolio artifact to a product.

---

## Links

- **Live site:** https://subledger.obtuse.in
- **Backend / API source:** https://github.com/utkarsh-vats/subledger_backend
- **Live API docs:** https://obtuse-labs-home.thresher-pirate.ts.net/docs the running instance serves an interactive OpenAPI schema at `/docs` (early access; may be intermittently offline)

---

## Obtuse Labs

SubLedger is the billing backbone of the **Obtuse Labs** portfolio — built to sit underneath its products (LegalReader, Togglesync, UptimeMonitor) so each ships billing without rebuilding it.

Built by Utkarsh Vats.