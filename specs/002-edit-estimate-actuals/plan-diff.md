# Plan diff

**Status**: Finalized

**Feature**: Edit Estimate Actuals
**Date**: 2026-08-22
**Sources**: `prediction.md` ## Sketch vs `plan.agent.md` ## Human review
**Verdicts**: (a) agree (b) disagree (c) human-only (d) agent-only

| #   | Topic                | Prediction                                           | Agent plan                                             | Proposed | Human ruling                                                                             |
| --- | -------------------- | ---------------------------------------------------- | ------------------------------------------------------ | -------- | ---------------------------------------------------------------------------------------- |
| 1   | Route                | Home → `/estimates/[id]` unchanged                   | Same page; no new route                                | (a)      | **(a) agree**                                                                            |
| 2   | Edit form            | Like create; pre-filled; only actuals editable; Save | Locked context + editable actuals + Save               | (a)      | **(a) agree**                                                                            |
| 3   | Save action          | Server action in the component; update actuals; home | saveEstimateActuals writes actuals only; redirect home | (a)      | **(a) agree**                                                                            |
| 4   | Actual-minutes max   | Numeric, ≥ 0, and a reasonable maximum               | ≥ 0; no extra max                                      | (b)      | **(b) go with Dylan** — enforce a reasonable maximum                                     |
| 5   | Reasoning max length | A reasonable maximum length                          | No extra max                                           | (b)      | **(b) go with Dylan** — enforce a reasonable max and show characters remaining in the UI |
| 6   | Locked-field check   | Posted locked fields must match the loaded row       | Posted-and-different → refuse; omitted → don’t write   | (b)      | **(a) agree** — same thing                                                               |
| 7   | Visible error        | Error state re-renders on the page                   | Action error shown; no silent return                   | (a)      | **(a) agree**                                                                            |
| 8   | Client form piece    | Action inside the page component                     | EstimateActualsForm (client)                           | (d)      | **(d) keep** — include the client form                                                   |

Uncertainties: none.

## Overall

- **Agreed (a)**: existing route, edit form shape, save action + home redirect, locked-field check, visible errors.
- **Disagreed (b), Dylan**: actual minutes have a max; actual reasoning has a max and a remaining-count in the UI.
- **Human-only (c)**: none.
- **Agent-only (d) kept**: EstimateActualsForm.
- **Agent-only (d) dropped**: none.

Resolved caps (from 4b/5b, named so implement can execute): actual minutes **0–10080** (seven 24-hour days in minutes); actual reasoning **at most 2000 characters**, with remaining count shown on the form.
