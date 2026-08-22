# Data model

This feature does not change the schema. Table `estimates` already has the fields.

## Estimate (unchanged columns)

| Attribute           | Create        | Edit                                  |
| ------------------- | ------------- | ------------------------------------- |
| name                | set           | locked — shown, never written         |
| date                | set           | locked — shown, never written         |
| projected minutes   | set           | locked — shown, never written         |
| projected reasoning | set, optional | locked — shown, never written         |
| actual minutes      | unset         | written on valid save                 |
| actual reasoning    | unset         | written on valid save (empty allowed) |

## Lifecycle

1. Created: projection present, actual minutes null.
2. Actuals recorded: actual minutes is a whole number ≥ 0. Reasoning may be empty.
3. Actuals updated: actual minutes replaced by another valid number. Must not become null.
4. Projection never moves after create.

## Save rules (enforced in the action)

- Load the row by id. Missing → not-found, no write.
- Actual minutes: present, numeric, integer, ≥ 0 and ≤ 10080. Else refuse, no write.
- Actual reasoning: optional; if present, at most 2000 characters. Else refuse, no write.
- If stored actual minutes is already non-null and the post would clear it: refuse, stored value stays.
- If posted name, date, projected minutes, or projected reasoning is present and differs from stored: refuse, no write.
- If those locked fields are omitted: do not write them.
- On success: write only `actualMinutes` and `actualReasoning`, then the operator is on the home list.

## Date compare

Stored date is a timestamp. Compare as a calendar date against the posted date string so a display-only date cannot fail for time-of-day.
