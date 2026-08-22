# Quickstart: Edit Estimate Actuals

Verification is the milestone pass/fail. No test script (constitution VII).

## Prerequisites

- Branch `002-edit-estimate-actuals`
- `npm run dev` against the existing Postgres
- At least one estimate on the home list

## Run

```bash
npm run dev
```

## Checks (pass/fail)

1. **Open**: Home list Edit opens `/estimates/{id}` (same link as today). Page shows name, date, projected minutes, projected reasoning (not editable) and actual minutes + actual reasoning (editable). Save is visible. No on-page back control.
2. **First close**: Enter actual minutes, omit reasoning, save. Land on home. That row’s actual minutes match; reasoning empty; projection unchanged. The row is not at a new place in the list (order is work date, then id).
3. **Close with reasoning**: Enter both actuals, save. Home shows both. Projection unchanged.
4. **Update actuals**: Open a row that already has actuals. Change actual minutes to another valid number (including 0). Save. Home shows the new number. Projection unchanged.
5. **Refuse clear**: On a row with actual minutes, save with actual minutes blank. Stay with a visible error. Stored actual minutes unchanged.
6. **Refuse invalid minutes**: Save with non-numeric, negative, or greater than 10080 actual minutes. Visible error. No bogus actual stored.
   6b. **Refuse long reasoning**: Save with actual reasoning over 2000 characters. Visible error. Stored row unchanged. The form shows characters remaining before save.
7. **Refuse tamper**: POST a different projected minutes (or name/date/projected reasoning) than stored. Visible error. Stored projection/name/date unchanged.
8. **Unknown id**: `/estimates/0` or a missing id → not-found. No write.

## Out of this guide

Schema, home/create restyle, create-form validation.
