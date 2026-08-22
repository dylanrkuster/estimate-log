# Implementation Plan: Edit Estimate Actuals

**Branch**: `002-edit-estimate-actuals` | **Date**: 2026-08-22 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-edit-estimate-actuals/spec.md`

**Note**: Resolved by `/speckit-plan-diff` on 2026-08-22. Original agent plan is `plan.agent.md`. This file is what `/speckit-tasks` and `/speckit-implement` execute. Human-review **Milestones** are implement sign-off gates (one per `/speckit-implement` turn).

## Human review

Dylan reads this section only. If this is wrong, the plan is wrong.

**Pieces**:

| Piece               | Runs    | Can reach                                                                                     |
| ------------------- | ------- | --------------------------------------------------------------------------------------------- |
| EstimatePage        | request | Estimates, read. Renders the form.                                                            |
| EstimateActualsForm | client  | Posts the form. Shows the action’s error and remaining characters. Cannot write the database. |
| saveEstimateActuals | server  | Estimates, read then write actuals only. Redirect home on success.                            |

**Flow**: GET `/estimates/{id}` → EstimatePage loads the row or not-found → form shows locked context and editable actuals (reasoning shows characters remaining). POST save → action loads the row → checks actual minutes (0–10080) and reasoning length (≤2000) → if locked fields were posted and differ, refuse → else write only actuals → redirect home.

**Enforcement**: saveEstimateActuals. Readonly on the form is courtesy. Caps are in the action, not only in the UI. Prisma update never sets name, date, or projection.

**Milestones**:

| #   | Milestone                    | Pass if                                                                                                                                                              |
| --- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Edit page shows the estimate | Name, date, projection visible and not editable; actuals editable; Save visible; reasoning shows characters remaining; junk id is not-found                          |
| 2   | Valid save of actuals        | Save with minutes in range (reasoning optional, within cap) lands on home with those actuals in date-then-id order; projection unchanged; later valid number updates |
| 3   | Visible refusals             | Tamper of locked fields, invalid/missing/over-max minutes, over-max reasoning, and clear-once-set each show an error and leave stored values as the rules require    |

**Not doing**:

- New routes, overlays, tables, columns
- Restyle of home or create as this job
- Create-form validation, empty-list copy, on-page back

**Watch**:

- Do not treat readonly inputs or the remaining-count as the lock.
- Do not `update` locked columns even if posted.
- Do not silent-`return` on failure.
- Do not change `createEstimate`.

## Summary

Turn the existing estimate page into the place to record actual minutes and optional actual reasoning. Projection, name, and date stay as created. The server action is the lock and the cap. Success goes home. Failures re-render with a visible error. Reasoning shows characters remaining.

## Technical Context

**Language/Version**: TypeScript, React 19, Next.js 16 App Router

**Primary Dependencies**: Next.js server actions, Prisma, Tailwind already in the repo. No new packages.

**Storage**: Existing `estimates` row. Write `actualMinutes` and `actualReasoning` only. No migration.

**Testing**: None. Milestone pass/fail in `quickstart.md`.

**Target Platform**: Existing web app.

**Project Type**: Single-user Next.js App Router app

**Performance Goals**: Ordinary form save.

**Constraints**: Visual lock is courtesy. Action refuses tamper, invalid/cleared actuals, minutes outside 0–10080, and reasoning over 2000 characters, with a visible error. No extra schema. No new route.

**Scale/Scope**: One page, one client form, one action. Single operator.

## Constitution Check

| Principle              | After resolve                                                                                   |
| ---------------------- | ----------------------------------------------------------------------------------------------- |
| I Cyborg               | Diff finalized with per-row rulings                                                             | Pass |
| II Spec first          | `spec.md` on this branch                                                                        | Pass |
| III Sketch before plan | `plan-diff.md` Finalized                                                                        | Pass |
| IV Milestones          | Three milestones with Pass if; implement one per turn                                           | Pass |
| V Branch               | `002-edit-estimate-actuals`                                                                     | Pass |
| VI UI not a boundary   | Action refuses locked-field changes, invalid actuals, and over-max; errors returned to the page | Pass |
| VII Tests              | No runner; milestone verification                                                               | Pass |
| VIII Smallest          | Same table, same route, server action. Caps are from the plan-diff ruling, not extra product    | Pass |
| IX Client habits       | Named branch, spec, quickstart. No migration                                                    | Pass |
| Settled stack          | App Router, Prisma, server actions                                                              | Pass |

No violations to justify.

## Approach

1. **EstimatePage** (existing `app/estimates/[id]/page.tsx`) — keep id sanitize and `findUnique` / `notFound`. Render EstimateActualsForm instead of a name-only div. Pass the row. Do not add a route.

2. **EstimateActualsForm** (client, kept from 8d) — refused actions re-render with an error string. Fields: name, date, projected minutes, projected reasoning shown and not editable; actual minutes and actual reasoning editable (pre-filled when present). Actual reasoning shows characters remaining toward 2000. One Save. No back control. Locked values may be submitted as read-only/hidden fields so the action can detect tamper; the action still loads the row.

3. **saveEstimateActuals** — `'use server'`. Load the estimate. Not found → not-found, no write. Parse actual minutes: missing / non-numeric / non-integer / negative / **greater than 10080** → error, no write. If stored actual minutes is set and the post would clear it → error, no write. Actual reasoning longer than **2000** characters → error, no write. If posted name, date, projected minutes, or projected reasoning is present and not equal to stored (date compared as a calendar date) → error, no write. If those locked fields are omitted → do not write them. Else `update` only actual minutes and actual reasoning, `redirect('/')`.

Home list already displays actuals (`force-dynamic`). No home/create restyle in this feature.

Caps named at resolve (Dylan, 4b/5b): **10080** minutes, **2000** characters.

## Project Structure

### Documentation (this feature)

```text
specs/002-edit-estimate-actuals/
├── spec.md
├── prediction.md
├── plan.md
├── plan.agent.md
├── plan-diff.md
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

None. The client form is required to show action errors (FR-008). Caps are the plan-diff ruling.
