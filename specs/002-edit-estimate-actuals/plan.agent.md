# Implementation Plan: Edit Estimate Actuals

**Branch**: `002-edit-estimate-actuals` | **Date**: 2026-08-22 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-edit-estimate-actuals/spec.md`

**Note**: Agent plan. Not executable until `/speckit-plan-diff` Status is Finalized. Human-review **Milestones** are implement sign-off gates (one per `/speckit-implement` turn).

## Human review

Dylan reads this section only. If this is wrong, the plan is wrong.

**Pieces**:

| Piece               | Runs    | Can reach                                                            |
| ------------------- | ------- | -------------------------------------------------------------------- |
| EstimatePage        | request | Estimates, read. Renders the form.                                   |
| EstimateActualsForm | client  | Posts the form. Shows the action’s error. Cannot write the database. |
| saveEstimateActuals | server  | Estimates, read then write actuals only. Redirect home on success.   |

**Flow**: GET `/estimates/{id}` → EstimatePage loads the row or not-found → form shows locked context and editable actuals. POST save → action loads the row → checks actual minutes → if locked fields were posted and differ, refuse → else write only actuals → redirect home. Home list already reads actuals.

**Enforcement**: saveEstimateActuals. Readonly on the form is courtesy. Prisma update never sets name, date, or projection.

**Milestones**:

| #   | Milestone                    | Pass if                                                                                                                                          |
| --- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Edit page shows the estimate | Name, date, projection visible and not editable; actuals editable; Save visible; junk id is not-found                                            |
| 2   | Valid save of actuals        | Save with minutes (reasoning optional) lands on home with those actuals; projection unchanged; later valid number updates                        |
| 3   | Visible refusals             | Tamper of locked fields, invalid/missing minutes, and clear-once-set each show an error and leave stored projection/actuals as the rules require |

**Not doing**:

- New routes, overlays, tables, columns
- Restyle of home or create as this job
- Create-form validation, empty-list copy, on-page back
- Extra max-length or max-minutes caps not in the spec

**Watch**:

- Do not treat readonly inputs as the lock.
- Do not `update` locked columns even if posted.
- Do not silent-`return` on failure.
- Do not change `createEstimate`.

## Summary

Turn the existing estimate page into the place to record actual minutes and optional actual reasoning. Projection, name, and date stay as created. The server action is the lock. Success goes home. Failures re-render with a visible error.

## Technical Context

**Language/Version**: TypeScript, React 19, Next.js 16 App Router

**Primary Dependencies**: Next.js server actions, Prisma, Tailwind already in the repo. No new packages.

**Storage**: Existing `estimates` row. Write `actualMinutes` and `actualReasoning` only. No migration.

**Testing**: None. Milestone pass/fail in `quickstart.md`.

**Target Platform**: Existing web app.

**Project Type**: Single-user Next.js App Router app

**Performance Goals**: Ordinary form save.

**Constraints**: Visual lock is courtesy. Action refuses tamper and invalid/cleared actuals with a visible error. No extra schema. No new route.

**Scale/Scope**: One page plus one action. Single operator.

## Constitution Check

| Principle              | Plan time                                                                            | After Phase 1 |
| ---------------------- | ------------------------------------------------------------------------------------ | ------------- |
| I Cyborg               | Plan for diff, not implementation                                                    | Pass          |
| II Spec first          | `spec.md` on this branch                                                             | Pass          |
| III Sketch before plan | `prediction.md` Sketch filled; this plan did not read the sketch body                | Pass          |
| IV Milestones          | Three milestones with Pass if; implement one per turn                                | Pass          |
| V Branch               | `002-edit-estimate-actuals`                                                          | Pass          |
| VI UI not a boundary   | Action refuses locked-field changes and invalid actuals; errors returned to the page | Pass          |
| VII Tests              | No runner; milestone verification                                                    | Pass          |
| VIII Smallest          | Same table, same route, server action, no extra product                              | Pass          |
| IX Client habits       | Named branch, spec, quickstart. No migration                                         | Pass          |
| Settled stack          | App Router, Prisma, server actions                                                   | Pass          |

No violations to justify.

## Approach

1. **EstimatePage** (existing `app/estimates/[id]/page.tsx`) — keep id sanitize and `findUnique` / `notFound`. Render a form instead of a name-only div. Pass the row into the form. Do not add a route.

2. **EstimateActualsForm** — client boundary so a refused action can re-render with an error string on the same page. Fields: name, date, projected minutes, projected reasoning shown and not editable; actual minutes and actual reasoning editable (pre-filled when present). One Save. No back control. Locked values may still be submitted as hidden/read-only fields so the action can detect tamper; the action still loads the row.

3. **saveEstimateActuals** — `'use server'`. Load the estimate. Not found → not-found, no write. Parse actual minutes: missing / non-numeric / non-integer / negative → error, no write. If stored actual minutes is set and the post would clear it → error, no write. If posted name, date, projected minutes, or projected reasoning is present and not equal to stored (date compared as a calendar date) → error, no write. Else `update` only actual minutes and actual reasoning, `redirect('/')`.

Home list already displays actuals (`force-dynamic`). No home/create restyle in this feature.

## Project Structure

### Documentation (this feature)

```text
specs/002-edit-estimate-actuals/
├── spec.md
├── prediction.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── checklists/requirements.md
```

No `contracts/` — the save step is the server action, not a public API.

### Source Code (repository root)

```text
app/estimates/[id]/
├── page.tsx              # EstimatePage
├── actuals-form.tsx      # EstimateActualsForm (client)
└── (action lives next to these; no new route)
```

**Structure Decision**: Colocate on the existing `[id]` segment. No `components/` library, no extra table, no intercepting route.

## Complexity Tracking

None. The client form is required to show action errors (FR-008), not an extra product layer.
