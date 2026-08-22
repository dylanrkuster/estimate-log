# Data model

This feature does not change the data model.

## Estimate (unchanged)

One logged piece of work. Table `estimates`.

| Attribute           | Role                 | This feature                                             |
| ------------------- | -------------------- | -------------------------------------------------------- |
| date                | When the work is for | Displayed on home; collected on create. Same as today.   |
| name                | What the work is     | Same.                                                    |
| projected minutes   | Predicted duration   | Same. Numeric alignment on the home log.                 |
| projected reasoning | Why that prediction  | Same. Optional on create.                                |
| actual minutes      | What it took         | Displayed on home when present. Not collected on create. |
| actual reasoning    | Why actual differed  | Displayed on home when present. Not collected on create. |

No new entities, fields, tables, or migrations.

## Rules this feature does not touch

- Projection lock once `actualMinutes` is non-null.
- Create accept/reject behavior.
- List order.

## Validation

None added. Existing create checks stay as they are, including a silent failed save.
