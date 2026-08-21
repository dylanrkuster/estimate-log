# Gated work — command order

Law is `.specify/memory/constitution.md` (Principle III). This page is the cheat sheet.

Skip this flow only for typo / comment / formatting-only changes.

```text
/speckit-specify
        ↓
/speckit-clarify          (optional)
        ↓
/speckit-predict          you write the sketch. agent records, does not draft.
        ↓
/speckit-plan             agent plan. does not read the sketch.
        ↓
/speckit-plan-diff        you rule each delta. then plan.md is the resolved plan.
        ↓
/speckit-tasks
        ↓
/speckit-implement
```

Do not jump to `/speckit-plan` after the spec, or to `/speckit-tasks` after the agent plan. Those commands will refuse.

## What has to exist

| Before you run       | This file in `specs/<feature>/`                          |
| -------------------- | -------------------------------------------------------- |
| `/speckit-predict`   | `spec.md` agreed                                         |
| `/speckit-plan`      | `prediction.md` with no `_(unfilled)_` required sections |
| `/speckit-plan-diff` | `prediction.md` + filled `plan.md`                       |
| `/speckit-tasks`     | `plan-diff.md` with **Status: Finalized**                |
| `/speckit-implement` | same, plus `tasks.md`                                    |

After a finalized diff: `plan.agent.md` is the agent's original; `plan.md` is what gets built.

## Diff verdicts

Each row, not a blanket "looks good":

- (a) you had it
- (b) you missed — name the piece
- (c) agent plan is worse — you overrule
