---
name: speckit-plan-diff
description: Diff Dylan's plan prediction against the agent plan, take his ruling on each delta, and write the resolved plan.md. Use when the user runs /speckit-plan-diff, wants to compare prediction vs plan, or to finalize the plan after /speckit-plan.
---

# speckit-plan-diff

Implements constitution Principle III, diff half. The resolved `plan.md` is
the only plan `/speckit-tasks` and `/speckit-implement` may execute.

## Verdicts

Each row is one topic. Classify first. Then he acts on anything that is
not (a).

- **(a) agree** — roughly the same implementation approach on that topic.
- **(b) disagree** — both named the topic, different approach. Action:
  who we go with, and why.
- **(c) human-only** — he had it, the agent did not. Action: was the
  agent right to exclude it, or does the agent need to take it?
- **(d) agent-only** — the agent had it, he did not. Action: was he
  right to exclude it, or was the agent right to include it?

Do not use the old (a) right / (b) left off / (c) wrong mapping.

## Steps

1. From the estimate-log repo root, run
   `.specify/scripts/bash/check-prerequisites.sh --json --paths-only`
   and parse `FEATURE_DIR`.

2. Require all three, or stop with the missing command:
    - `spec.md` → `/speckit-specify`
    - `prediction.md` with `## Sketch` filled (uncertainties optional; blank means none) → `/speckit-predict`
    - filled `plan.md` → `/speckit-plan`

3. Read constitution Principles III, VI, VIII. Do not paste them.

4. If `FEATURE_DIR/plan.agent.md` does not exist, copy `plan.md` to
   `plan.agent.md`. Never overwrite `plan.agent.md` later. That file is the
   agent's original.

5. Diff **architecture** at class-name grain and above, not file lists and
   not below class names. Compare the prediction `## Sketch` to the agent's
   `## Human review` in `plan.agent.md` when that section is filled;
   otherwise the same claims in the rest of `plan.agent.md`.

    His sketch is a moderate-to-high-level raw plan, not a `plan.md`.
    Do not treat omitted plan-template sections, `research.md`, or
    Tailwind class lists as misses.
    Do treat extra tables, routes, services, client-side enforcement, or
    skipped server-side rules as deltas.

6. Write `FEATURE_DIR/plan-diff.md` as **Status: Awaiting rulings** with:

    | #   | Topic | Prediction | Agent plan     | Proposed           |
    | --- | ----- | ---------- | -------------- | ------------------ |
    | 1   | …     | quote him  | quote the plan | (a) (b) (c) or (d) |

    Classification rules:
    - Same topic, same approach → (a).
    - Same topic, different approach → (b). Do not file this as (c) or (d).
    - In the sketch, missing from the agent plan → (c).
    - In the agent plan, missing from the sketch → (d).
    - Every agent extra MUST appear as (d), not hidden inside (b).
    - Constitution violations in the agent plan (VI, VIII, Settled Stack)
      still appear as rows (usually (d) or (b)); he rules them.

7. Show that table. Ask him to rule **each row**: `a` / `b` / `c` / `d`.
   For every (b), (c), and (d) he MUST also say who we go with and why.
    - Reject a blanket "looks good" / "ship it" / "agent's is fine".
    - Do not finalize until every row has a classification and every
      (b)(c)(d) has the action.

8. After rulings, update `plan-diff.md`:
    - Status: **Finalized**
    - Each row's **Human ruling** (and action on (b)(c)(d))
    - **Overall**: what was agreed, what was disagreed and who won,
      what he kept that the agent omitted, what of the agent's extras
      survived
    - **Effort**: his one-word effort on the sketch (low / medium / hard)
      if he gives it; skip if he doesn't

9. Rewrite `FEATURE_DIR/plan.md` as the resolved plan:
    - Header note: resolved by `/speckit-plan-diff` on this date; original
      agent plan is `plan.agent.md`.
    - Keep what he accepted (agreed (a), and (b)(c)(d) where he went
      with that side).
    - Drop agent extras he rejected on (d).
    - Add human-only pieces he kept on (c).
    - On (b), keep the side he named.
    - Milestones MUST still have observable pass/fail (Principle IV).
    - Refresh `## Human review` last using `.specify/templates/human-review-rules.md`
      (plan.md shape) so it matches the resolved plan. Keep it the first `##`.

10. Report paths: `plan-diff.md`, resolved `plan.md`, `plan.agent.md`.
    Next command is `/speckit-tasks`.

## Stop if

- You are about to produce a one-verdict rubber stamp.
- You are about to merge the two plans without row rulings.
- You are about to pick the (b)(c)(d) action for him.
- You are about to implement.
