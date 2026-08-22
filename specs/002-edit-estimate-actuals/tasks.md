---
description: 'Task list for edit estimate actuals'
---

# Tasks: Edit Estimate Actuals

**Input**: Design documents from `/specs/002-edit-estimate-actuals/`

**Prerequisites**: plan.md (resolved), spec.md, research.md, data-model.md, quickstart.md, plan-diff.md (Finalized)

**Tests**: None. Spec did not request tests. Constitution VII: milestone pass/fail.

**Constraint**: No new routes, tables, or columns. Do not change `createEstimate` in `app/estimates/new/page.tsx`. Caps: actual minutes 0–10080; actual reasoning ≤2000 characters.

## Milestone map (Principle IV)

`/speckit-implement` does **one** unsigned row, then stops for sign-off.

| Plan milestone                  | Pass if                                                                                                                                                              | Tasks     |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| 1. Edit page shows the estimate | Name, date, projection visible and not editable; actuals editable; Save visible; reasoning shows characters remaining; junk id is not-found                          | T001–T004 |
| 2. Valid save of actuals        | Save with minutes in range (reasoning optional, within cap) lands on home with those actuals in date-then-id order; projection unchanged; later valid number updates | T005–T006 |
| 3. Visible refusals             | Tamper, invalid/missing/over-max minutes, over-max reasoning, and clear-once-set each show an error and leave stored values as the rules require                     | T007–T010 |

## Format: `[ID] [P?] [Story] Description`

- **[P]**: parallel (different files, no incomplete deps)
- **[Story]**: [US1] record actuals, [US2] projection cannot be rewritten
- Exact file paths in every task

## Path Conventions

`app/estimates/[id]/page.tsx`, `app/estimates/[id]/actuals-form.tsx`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Existing route and schema. No project init.

- [x] T001 Confirm work stays on `app/estimates/[id]/page.tsx` and `app/estimates/[id]/actuals-form.tsx`; leave `prisma/schema.prisma`, `app/page.tsx`, `app/estimates/new/page.tsx` (including `createEstimate`) as non-targets

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Keep load/not-found. Milestone 1 starts here.

**⚠️ CRITICAL**: Display work needs this load path.

- [x] T002 Keep id sanitize, `findUnique`, and `notFound` in `app/estimates/[id]/page.tsx`; do not add a new route

**Checkpoint**: Junk id still not-found.

---

## Phase 3: User Story 1 - Record actuals (Priority: P1) 🎯 MVP

**Goal**: See the estimate and save actuals to the home list.

**Independent Test**: Open an estimate with no actuals. Locked context + editable actuals. Save minutes (reasoning optional). Land on home with those actuals. Projection unchanged.

### Milestone 1 — display (stop for sign-off after T004)

- [x] T003 [US1] Add `EstimateActualsForm` in `app/estimates/[id]/actuals-form.tsx`: show name, date, projected minutes, projected reasoning not editable; actual minutes and actual reasoning editable and pre-filled when present; one Save; no back control; show characters remaining toward 2000 on actual reasoning
- [x] T004 [US1] Render `EstimateActualsForm` from `app/estimates/[id]/page.tsx` with the loaded estimate instead of the name-only div

**Sign-off (milestone 1)**: Name, date, projection visible and not editable; actuals editable; Save visible; remaining count visible; junk id not-found.

### Milestone 2 — valid save (stop for sign-off after T006)

- [x] T005 [US1] Add `saveEstimateActuals` next to `app/estimates/[id]/` (`'use server'`): parse actual minutes as integer 0–10080; optional reasoning ≤2000; `update` only `actualMinutes` and `actualReasoning`; `redirect('/')` on success
- [x] T006 [US1] Wire the form in `app/estimates/[id]/actuals-form.tsx` to `saveEstimateActuals`; do not write name, date, projected minutes, or projected reasoning in the Prisma `update`

**Sign-off (milestone 2)**: Valid save lands on home with actuals; projection unchanged; a later valid number updates.

---

## Phase 4: User Story 2 - Projection cannot be rewritten (Priority: P2)

**Goal**: The save step is the lock. Refusals are visible.

**Independent Test**: Post a different projection (or name/date). Stored projection unchanged. Operator sees an error. Same for invalid minutes and clearing a stored actual.

### Milestone 3 — visible refusals (stop for sign-off after T010)

- [x] T007 [US2] In `saveEstimateActuals` (`app/estimates/[id]/`), if posted name, date, projected minutes, or projected reasoning is present and differs from stored (date as calendar date), return an error and write nothing
- [x] T008 [US2] In `saveEstimateActuals`, return an error and write nothing for: missing/non-numeric/negative/non-integer actual minutes; actual minutes > 10080; reasoning length > 2000; a post that would clear already-stored actual minutes
- [x] T009 [US2] In `app/estimates/[id]/actuals-form.tsx`, re-render a visible error from the action return; do not silent-`return` on failure
- [x] T010 [US2] Confirm `createEstimate` in `app/estimates/new/page.tsx` is unchanged; run the checks in `specs/002-edit-estimate-actuals/quickstart.md`

**Sign-off (milestone 3)**: Tamper, invalid/over-max, and clear-once-set each show an error and leave stored values as required.

---

## Dependencies & Execution Order

### Milestone dependencies (implement)

- **M1** (T001–T004): first unsigned milestone
- **M2** (T005–T006): after M1 signed
- **M3** (T007–T010): after M2 signed

`/speckit-implement` MUST NOT start M2 or M3 in the same turn as M1.

### User story dependencies

- **US1**: M1 + M2
- **US2**: M3 (needs the action from M2)

### Within a milestone

- M1: T001 → T002 → T003 → T004 (T003 file then T004 page)
- M2: T005 → T006
- M3: T007 → T008 → T009 → T010 (same action file, then form, then verify)

### Parallel Opportunities

- Little parallelism: `actuals-form.tsx` and `page.tsx` are sequential once the form exists.
- T003 could start after T002; T001 is a confirm.

---

## Parallel Example

None that are safe across files before T003 exists. After T003, T004 depends on it.

---

## Implementation Strategy

### MVP

1. `/speckit-implement` → M1 → Dylan signs off
2. `/speckit-implement` → M2 → Dylan signs off
3. `/speckit-implement` → M3 → Dylan signs off
4. Principle IV audit (spec vs extras)

### Incremental

- After M1: can open Edit and see the form (save may not persist yet)
- After M2: habit works (close a row)
- After M3: lock is real

---

## Notes

- No test tasks
- Do not skip milestone sign-off
- Caps: 10080 minutes, 2000 characters
- Commit after each milestone
