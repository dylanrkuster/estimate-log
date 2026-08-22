---
description: 'Task list for professional list and create form'
---

# Tasks: Professional List and Create Form

**Input**: Design documents from `/specs/001-professional-list-form/`

**Prerequisites**: plan.md (resolved), spec.md, research.md, data-model.md, quickstart.md, plan-diff.md (Finalized)

**Tests**: None. Spec did not request tests. Constitution VII: no runner; milestone pass/fail is enough.

**Constraint**: Markup and class names only. Do not add or change TypeScript logic (`createEstimate` included). Do not add files, routes, packages, or components.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: User story (US1, US2)
- Exact file paths in every task

## Path Conventions

App Router at repo root: `app/layout.tsx`, `app/page.tsx`, `app/estimates/new/page.tsx`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Existing app. Confirm the file set. No project init.

- [x] T001 Confirm work is only `app/layout.tsx`, `app/page.tsx`, and `app/estimates/new/page.tsx`; leave `prisma/schema.prisma`, `package.json`, `app/globals.css`, and `app/estimates/[id]/page.tsx` untouched as targets

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared chrome both stories sit in. Milestone 1.

**⚠️ CRITICAL**: No user story work until this phase is complete

- [x] T002 Restyle shared page frame in `app/layout.tsx` (inset readable width, one light presentation). Do not change TypeScript logic. Do not add a per-route layout to freeze `app/estimates/[id]/page.tsx`

**Checkpoint**: Home and create sit inset in a readable width. Detail/edit may pick up the frame; that is accepted.

---

## Phase 3: User Story 1 - Scan the home log (Priority: P1) 🎯 MVP

**Goal**: Home is a titled, labeled columnar log with a primary create action.

**Independent Test**: Open `/` with at least two estimates. Confirm title, create action, all six fields plus open/edit, distinguishable rows, aligned minutes. Do not use the create form.

### Implementation for User Story 1

- [x] T003 [US1] Rebuild the page structure in `app/page.tsx`: product title, one primary control to `/estimates/new`, labeled columnar log of date, name, projected minutes, projected reasoning, actual minutes, actual reasoning, and open/edit. Keep the existing `findMany` and column set. Do not add TypeScript logic
- [x] T004 [US1] Make consecutive rows distinguishable and align projected vs actual minutes in `app/page.tsx`
- [x] T005 [US1] Keep long name/reasoning on the page by wrapping in the same table in `app/page.tsx` (no expand widget, no second layout)

**Checkpoint**: User Story 1 is scannable on its own. Create form may still look old.

---

## Phase 4: User Story 2 - Record a new estimate on a structured form (Priority: P2)

**Goal**: Create is a labeled form on its own page. Same fields. Same save.

**Independent Test**: Open `/estimates/new`. Same four fields, visible labels, one distinct save, no on-page back. A create that already worked still works.

### Implementation for User Story 2

- [x] T006 [P] [US2] Rebuild form markup in `app/estimates/new/page.tsx`: page title, labeled name, date, projected minutes, projected reasoning, one visually distinct save. Stack with ordinary wrapping. Same `name` attributes and `action={createEstimate}`. Do not add an on-page back control
- [x] T007 [US2] Leave the `createEstimate` function in `app/estimates/new/page.tsx` unchanged (no TypeScript logic edits in that file)

**Checkpoint**: Home log and create form both work independently. Save path unchanged.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Milestone 4 — wrap and non-regression. Not extra polish.

- [x] T008 Confirm 360px-wide wrapping of the same layout on `app/page.tsx` and `app/estimates/new/page.tsx` (no distinct mobile layout)
- [x] T009 Run the checks in `specs/001-professional-list-form/quickstart.md`: valid create still saves; invalid still fails the same way with no new messages; no empty-state copy; `createEstimate` untouched; `app/estimates/[id]/page.tsx` not redesigned as a target

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Start immediately
- **Foundational (Phase 2)**: After T001 — BLOCKS US1 and US2
- **User Story 1 (Phase 3)**: After T002
- **User Story 2 (Phase 4)**: After T002; T006 can run in parallel with US1 (`app/page.tsx` vs `app/estimates/new/page.tsx`)
- **Polish (Phase 5)**: After US1 and US2

### User Story Dependencies

- **User Story 1 (P1)**: After Foundational. No dependency on US2
- **User Story 2 (P2)**: After Foundational. No dependency on US1 except sharing RootLayout

### Within Each User Story

- US1: T003 → T004 → T005 (same file)
- US2: T006 then T007 (confirm action untouched)

### Parallel Opportunities

- After T002: T003 (US1, `app/page.tsx`) in parallel with T006 (US2, `app/estimates/new/page.tsx`)

---

## Parallel Example: After Foundational

```bash
Task: "Rebuild the page structure in app/page.tsx"          # T003
Task: "Rebuild form markup in app/estimates/new/page.tsx"  # T006
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. T001
2. T002 (shared chrome)
3. T003–T005 (home log)
4. **STOP and VALIDATE** US1 independent test
5. Demo home if ready

### Incremental Delivery

1. Setup + Foundational → frame ready
2. US1 → home log → validate
3. US2 → create form → validate
4. T008–T009 wrap and non-regression

### Parallel Team Strategy

Single operator. After T002, home and create files can be edited in parallel if desired.

---

## Notes

- [P] only when different files
- No test tasks
- Do not touch TypeScript logic
- Do not add files
- Commit after each task or phase
- Stop at checkpoints to validate
