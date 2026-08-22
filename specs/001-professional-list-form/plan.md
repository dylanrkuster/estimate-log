# Implementation Plan: Professional List and Create Form

**Branch**: `001-professional-list-form` | **Date**: 2026-08-22 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-professional-list-form/spec.md`

**Note**: Resolved by `/speckit-plan-diff` on 2026-08-22. Original agent plan is `plan.agent.md`. This file is what `/speckit-tasks` and `/speckit-implement` execute.

## Human review

Dylan reads this section only. If this is wrong, the plan is wrong.

**Pieces**:

| Piece                     | Runs    | Can reach                                |
| ------------------------- | ------- | ---------------------------------------- |
| RootLayout                | request | The page it wraps. Not the database.     |
| HomePage                  | request | Estimates, read. Browser as HTML.        |
| CreateEstimatePage markup | request | The existing create action via the form. |
| createEstimate action     | server  | Estimates, write. Do not touch.          |

**Flow**: GET home → RootLayout wraps HomePage → HomePage reads estimates → HTML log. GET create → RootLayout wraps the form. POST the form → existing createEstimate → redirect home. No new writes, redirects, or revalidation.

**Enforcement**: None added. Create accept/reject stays in createEstimate as it is today. Visual treatment is not a rule. No TypeScript logic is added or changed.

**Milestones**:

| #   | Milestone                   | Pass if                                                                                     |
| --- | --------------------------- | ------------------------------------------------------------------------------------------- |
| 1   | Shared chrome in RootLayout | Home and create sit inset in a readable width; one light page frame                         |
| 2   | Home log                    | Title, one create action, labeled columns, distinguishable rows, aligned minutes            |
| 3   | Create form                 | Same four labeled fields, one distinct save, no on-page back, still its own page            |
| 4   | Non-regression and wrap     | Valid create still saves; invalid still fails the same way; 360px wrap, not a second layout |

**Not doing**:

- Any TypeScript logic change, including `createEstimate`
- Validation, error copy, empty-state copy, on-page back
- Redesigning detail/edit; isolating it with one-off tricks
- New routes, modals, tables, columns, packages, component modules, tests

**Watch**:

- Do not touch TypeScript logic (`createEstimate` is the existing logic).
- Do not add a second layout at a breakpoint.
- Shared chrome may restyle detail/edit; that is accepted — do not hack around it.
- Do not “fix” silent save failure.

## Summary

Make the home log and the create form look and hold together like a professional tool. Same fields, same routes, same save path. Tailwind already in the repo. Work is markup and class names on RootLayout, HomePage, and CreateEstimatePage. Shared chrome in RootLayout is in. Phone-width wrapping of the same layout is in. No TypeScript logic changes.

## Technical Context

**Language/Version**: TypeScript, React 19, Next.js 16 App Router

**Primary Dependencies**: Next.js, React, Tailwind CSS 4 (already present). No new packages.

**Storage**: Existing Prisma `estimates` table on Railway Postgres. Read on home; write only through the existing create action. No schema change.

**Testing**: None. No test script in this repo. Verification is the milestone pass/fail in `quickstart.md`.

**Target Platform**: The existing web app at the local dev server and `estimates.dylankuster.com`.

**Project Type**: Single-user Next.js App Router app

**Performance Goals**: Ordinary page load. Not a performance feature.

**Constraints**: Visual only. No TypeScript logic changes. One light presentation. Phone width by wrapping. Constitution VIII/VI/VII as applied by the spec.

**Scale/Scope**: Two screens. Single operator.

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

| Principle              | Plan time                                                                         | After Phase 1 |
| ---------------------- | --------------------------------------------------------------------------------- | ------------- |
| I Cyborg               | Diff finalized with per-row rulings                                               | Pass          |
| II Spec first          | `spec.md` on this branch                                                          | Pass          |
| III Sketch before plan | `prediction.md` Sketch filled; `plan-diff.md` Finalized                           | Pass          |
| IV Milestones          | Four milestones with observable pass/fail                                         | Pass          |
| V Branch               | `001-professional-list-form`                                                      | Pass          |
| VI UI not a boundary   | Create action untouched; no new UI-only rules                                     | Pass          |
| VII Tests              | No runner; milestone verification                                                 | Pass          |
| VIII Smallest          | No new table, route, package, modal, or overlay. Spec is the polish justification | Pass          |
| IX Client habits       | Named branch, written spec, quickstart checks. No migration, no secrets           | Pass          |
| Settled stack          | App Router, TS, Prisma, server actions, routes                                    | Pass          |

No violations to justify. Complexity Tracking is empty.

## Approach

Three surface pieces plus the existing action, left alone.

1. **RootLayout** — page frame: background, readable max width, inset, type. Applies to every route. Detail/edit may pick it up. This is in, not optional.
2. **HomePage** — keep the server read. Rebuild the JSX into a titled page with one primary create control and a labeled columnar log. Alternate row treatment. Numeric minutes aligned. Long text wraps in the same table. Same columns as today. Same `findMany` order.
3. **CreateEstimatePage markup** — same field `name`s and the same `action={createEstimate}`. Stacked labeled fields, distinct save. No back control.
4. **createEstimate** — do not open this function. Do not add or change TypeScript logic anywhere.

Phone width: flex/table wrapping on the same structure. No `@media` card redesign. This milestone is in.

## Project Structure

### Documentation (this feature)

```text
specs/001-professional-list-form/
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

No `contracts/` — no new interface. Form field names stay.

### Source Code (repository root)

```text
app/
├── layout.tsx                 # RootLayout — shared chrome
├── page.tsx                   # HomePage — list
├── globals.css                # unchanged unless Tailwind import already there
└── estimates/
    ├── new/page.tsx           # CreateEstimatePage markup; action untouched
    └── [id]/page.tsx          # not a target
```

**Structure Decision**: Existing App Router tree. No `components/`, `src/`, or extra apps.

## Complexity Tracking

None. No constitution violations to justify.
