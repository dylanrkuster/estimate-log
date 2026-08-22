# Research: Edit Estimate Actuals

## Decision: Existing `/estimates/[id]` route; no new route or overlay

**Rationale**: Spec FR-001. Home list already links here. Constitution VIII: routes, not modals.

**Alternatives considered**: New close route; intercepting modal. Both out of spec.

## Decision: Server action is the lock; readonly display is courtesy

**Rationale**: Constitution VI and spec FR-007. Posted changes to name, date, projected minutes, or projected reasoning are refused even if the page marked those controls read-only.

**How**: The action loads the estimate. If a locked field is present in the post and differs from stored, refuse and return a visible error. If a locked field is omitted, do not write it (not “update to blank”). Prisma `update` sets only `actualMinutes` and `actualReasoning`.

**Alternatives considered**: Ignore posted locked fields and always save actuals (silent). Violates FR-007 for altered values. Strip locked fields from the form (no post). Then tamper is untested; still must refuse if posted.

## Decision: Visible errors via action return + client form boundary

**Rationale**: Spec FR-008 forbids a silent failed save. A Server Action return value is only usable for re-render if a client boundary holds the form state (React `useActionState` / form state). The page stays a Server Component that loads the row.

**Alternatives considered**: `redirect('?error=')` — ugly and easy to miss. `error.tsx` — not a form-level message. Throw — not observable copy on the same page.

## Decision: Actual minutes 0–10080; reasoning at most 2000 characters, remaining shown in the UI

**Rationale**: Plan-diff 4b/5b — Dylan overruled “no extra caps.” 10080 is seven 24-hour days in minutes. 2000 characters is a long note, not a document. Remaining count is on the form; the action still enforces both caps.

**Alternatives considered**: No caps (original agent plan). Rejected at plan-diff.

## Decision: No schema change; home and create are not restyled

**Rationale**: `actualMinutes` and `actualReasoning` already exist. Spec out of scope: restyle home/create, extra columns.

**Alternatives considered**: New `closedAt` column. Not asked.

## Decision: No test runner in this feature

**Rationale**: Constitution VII. Milestone pass/fail in `quickstart.md`.
