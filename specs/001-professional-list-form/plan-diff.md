# Plan diff

**Status**: Finalized

**Feature**: Professional List and Create Form
**Date**: 2026-08-22
**Sources**: `prediction.md` ## Sketch vs `plan.agent.md` ## Human review
**Verdicts**: constitution v3.0.0 — (a) agree (b) disagree (c) human-only (d) agent-only

Grain: class names and above. Not Tailwind class lists, not `research.md`.

| #   | Topic                     | Prediction                                                                                            | Agent plan                                                           | Proposed                            | Human ruling                                                                                                                                                             |
| --- | ------------------------- | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | HomePage                  | `page.tsx` for `/` is modified; JSX structure massively modified; Tailwind class names where relevant | HomePage markup rebuilt with class names; same read of estimates     | (a) agree                           | **(a) agree**                                                                                                                                                            |
| 2   | CreateEstimatePage        | `page.tsx` for `/estimates/new` modified the same way                                                 | CreateEstimatePage markup rebuilt with class names; same form fields | (a) agree                           | **(a) agree**                                                                                                                                                            |
| 3   | RootLayout                | root `layout.tsx` **may** get JSX and class names for shared chrome                                   | RootLayout **is** milestone 1 — shared chrome required               | (b) disagree — optional vs required | **(a) agree** — go with the agent: shared chrome in RootLayout is in                                                                                                     |
| 4   | New modules               | no new routes or components                                                                           | no new routes, no component modules                                  | (a) agree                           | **(a) agree**                                                                                                                                                            |
| 5   | TypeScript logic          | no new TypeScript logic                                                                               | do not edit `createEstimate`                                         | (a) agree                           | **(a) agree**                                                                                                                                                            |
| 6   | Phone-width wrap          | not in the sketch                                                                                     | milestone 4: 360px wrap of the same layout, not a second layout      | (d) agent-only                      | **(d) keep** — agent is correct to include this                                                                                                                          |
| 7   | createEstimate as a piece | not named; no files beyond the three pages/layout                                                     | named as a fourth piece (server, estimates write, unchanged)         | (d) agent-only                      | **(d) keep** — agent is correct to name it as do-not-touch. Go further: do not touch any TypeScript logic. This action is the only real TS logic, so naming it is enough |

No (c) human-only row: every piece in the sketch appears in the agent plan.

Uncertainties: none (blank).

## Overall

- **Agreed (a)**: HomePage restyle, CreateEstimatePage restyle, RootLayout shared chrome (Dylan confirmed agreement with the agent), no new modules, no new TypeScript logic.
- **Disagreed (b)**: none after ruling. Row 3 was proposed (b); Dylan classified it (a).
- **Human-only (c)**: none.
- **Agent-only (d) kept**: ordinary wrapping at phone width; `createEstimate` named as do-not-touch, extended to “do not touch any TypeScript logic.”
- **Agent-only (d) dropped**: none.
