---
name: speckit-plan-diff
description: Diff Dylan's plan prediction against the agent plan, take his ruling on each delta, and write the resolved plan.md. Use when the user runs /speckit-plan-diff, wants to compare prediction vs plan, or to finalize the plan after /speckit-plan.
---

# speckit-plan-diff

Implements constitution Principle III, diff half. The resolved `plan.md` is
the only plan `/speckit-tasks` and `/speckit-implement` may execute.

## Steps

1. From the estimate-log repo root, run
   `.specify/scripts/bash/check-prerequisites.sh --json --paths-only`
   and parse `FEATURE_DIR`.

2. Require all three, or stop with the missing command:
    - `spec.md` → `/speckit-specify`
    - `prediction.md` with no `_(unfilled)_` in required sections → `/speckit-predict`
    - filled `plan.md` → `/speckit-plan`

3. Read constitution Principles III, VI, VIII. Do not paste them.

4. If `FEATURE_DIR/plan.agent.md` does not exist, copy `plan.md` to
   `plan.agent.md`. Never overwrite `plan.agent.md` later. That file is the
   agent's original.

5. Diff **architecture**, not file lists. Compare prediction sections
   (pieces, where each runs, what each can reach, data flow, enforcement)
   to the same claims in `plan.agent.md` (and `data-model.md` / `research.md`
   only when they assert a piece, a runtime, a reach, or a rule).

    Do not treat "he didn't name `research.md`" as a miss.
    Do treat extra tables, routes, services, client-side enforcement, or
    skipped server-side rules as deltas.

6. Write `FEATURE_DIR/plan-diff.md` as **Status: Awaiting rulings** with:

    | #   | Topic | Prediction | Agent plan     | Proposed verdict                |
    | --- | ----- | ---------- | -------------- | ------------------------------- |
    | 1   | …     | quote him  | quote the plan | one of the three legal verdicts |

    Legal verdicts, constitution Principle III:
    - (a) he had it
    - (b) he missed: _name the piece exactly_
    - (c) agent plan is worse — he overrules

    Rules for the proposed column:
    - Every extra in the agent plan that he did not predict MUST appear.
    - At least one row MUST be eligible for (c) if the agent added a piece,
      layer, or scope he did not have. Do not hide extras inside (b).
    - Constitution violations in the agent plan (VI, VIII, Settled Stack)
      default to proposed (c), still his to rule.
    - A table with only (a) and (b) and no extras is allowed only if the
      agent plan added no piece he omitted.

7. Show that table. Ask him to rule **each row**: `a` / `b` / `c` (or
   `both-wrong` with a sentence).
    - Reject a blanket "looks good" / "ship it" / "agent's is fine".
    - Do not finalize until every row has his ruling.

8. After rulings, update `plan-diff.md`:
    - Status: **Finalized**
    - Each row's **Human ruling**
    - **Overall verdict**: (a), (b) with the named misses, and/or (c) with
      what he overruled
    - **Effort**: his one-word effort on the sketch (low / medium / hard)
      if he gives it; skip if he doesn't

9. Rewrite `FEATURE_DIR/plan.md` as the resolved plan:
    - Header note: resolved by `/speckit-plan-diff` on this date; original
      agent plan is `plan.agent.md`.
    - Keep agent detail he accepted.
    - Remove extras he overruled.
    - Add pieces he had that the agent missed, when he ruled those better.
    - Milestones MUST still have observable pass/fail (Principle IV).

10. Report paths: `plan-diff.md`, resolved `plan.md`, `plan.agent.md`.
    Next command is `/speckit-tasks`.

## Stop if

- You are about to produce a one-verdict rubber stamp.
- You are about to merge the two plans without row rulings.
- You are about to implement.
