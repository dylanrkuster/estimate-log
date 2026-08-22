# Gated work — command order

Law is `.specify/memory/constitution.md` (Principle III). This page is the cheat sheet.

Skip this flow only for typo / comment / formatting-only changes.

```text
/speckit-specify
        ↓
/speckit-clarify          (optional)
        ↓
/speckit-predict          you write a raw high-level plan (class names and
                          above). agent records, does not draft. uncertainties
                          optional (blank = none).
        ↓
/speckit-plan             agent plan. does not read the sketch.
        ↓
/speckit-plan-diff        you rule each delta. then plan.md is the resolved plan.
        ↓
/speckit-tasks
        ↓
/speckit-implement        one unsigned milestone, then STOP for sign-off.
                          Repeat until every plan.md milestone is signed.
```

Do not jump to `/speckit-plan` after the spec, or to `/speckit-tasks` after the agent plan. Those commands will refuse.

On `spec.md` and `plan.md`, read **`## Human review` only** (first `##` in the file). If that section is wrong, the artifact is wrong.

## What has to exist

| Before you run       | This file in `specs/<feature>/`                        |
| -------------------- | ------------------------------------------------------ |
| `/speckit-predict`   | `spec.md` agreed                                       |
| `/speckit-plan`      | `prediction.md` with `## Sketch` filled                |
| `/speckit-plan-diff` | `prediction.md` + filled `plan.md`                     |
| `/speckit-tasks`     | `plan-diff.md` with **Status: Finalized**              |
| `/speckit-implement` | same, plus `tasks.md`. One unsigned milestone per turn |

After a finalized diff: `plan.agent.md` is the agent's original; `plan.md` is what gets built.

## Implement (Principle IV)

`/speckit-implement` does **one** unsigned milestone from `plan.md`, then waits.

- Pass/fail is the milestone's **Pass if** row.
- You sign off (or name a skip). That is written in `milestone-log.md`.
- "Do all of it" without naming skipped sign-offs is a violation.
- The agent's "it passed" is not sign-off.

## Diff verdicts

Each row, not a blanket "looks good". Grain: class names and above.

- (a) agree — same approach on that topic
- (b) disagree — both named it, different approach. Who we go with, and why
- (c) human-only — you had it, the agent did not. Keep it, or accept the exclusion?
- (d) agent-only — the agent had it, you did not. Keep it, or drop it?
