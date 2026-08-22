# Research: Professional List and Create Form

## Decision: Restyle in existing App Router files with Tailwind already in the repo

**Rationale**: Settled stack is Next.js App Router, React 19, Tailwind 4. The home page and create page already render those screens. Principle VIII: use the framework directly; no new UI kit, CSS framework, or package.

**Alternatives considered**:

- New component library (shadcn, etc.): extra package and extra files. Rejected.
- New `components/` module for chrome: extra layer for two screens. Rejected.
- Cards instead of a columnar log: contradicts the spec’s labeled columnar log.

## Decision: Shared chrome lives in the root layout; no isolation of the detail screen

**Rationale**: Spec FR-013 — target home and create; do not add one-off isolation so detail/edit stays frozen. Incidental change via shared layout styling is accepted. Root layout already wraps every route.

**Alternatives considered**:

- Per-route layout only under `/` and `/estimates/new`: non-standard split, rejected by Dylan.
- Restyle `app/estimates/[id]` as its own job: out of spec.

## Decision: Do not change the create server action or any Prisma schema

**Rationale**: Spec FR-011 — visual only. Silent failed save and empty-list sparsity stay. Constitution VI’s “observable invalid” is not this feature; Dylan ruled validation out. No migrations (VIII, IX).

**Alternatives considered**:

- “While we’re here” visible errors or empty copy: rejected in spec.
- On-page back control: rejected (browser back only).

## Decision: One light presentation; phone width via wrapping, not a second layout

**Rationale**: Spec FR-010 / SC-003. Same markup. Text wraps. No card-stack breakpoint, no dark mode.

**Alternatives considered**: Distinct mobile layout; theme switcher. Both out of spec.

## Decision: No test runner in this feature

**Rationale**: Constitution VII — until a runner exists, milestone pass/fail is enough. Do not add coverage machinery.

**Alternatives considered**: Add Vitest/Playwright now. Out of this spec.

## Decision: No new contracts or API layer

**Rationale**: Mutations already go through the existing server action. No public API. Field `name` attributes stay.

**Alternatives considered**: REST/GraphQL. Constitution VIII forbids.
