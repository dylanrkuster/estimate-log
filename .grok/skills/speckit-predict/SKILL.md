---
name: speckit-predict
description: Record Dylan's architecture sketch for the active Speckit feature before any agent plan exists. Use when the user runs /speckit-predict, wants to predict the plan, or needs to write the Principle III sketch.
---

# speckit-predict

Implements constitution Principle III, human half: the sketch exists on disk
before `/speckit-plan` runs.

This command records. It does not plan, critique, complete, or improve.

Dylan writes a moderate-to-high-level raw plan of what should happen to
implement the agreed spec. That is the whole command. Uncertainties are
optional; blank means none. He is not writing `plan.md`. Grain: no lower
than class names. Section headings live in `.specify/templates/prediction.md`.

## Steps

1. From the estimate-log repo root, run
   `.specify/scripts/bash/check-prerequisites.sh --json --paths-only`
   and parse `FEATURE_DIR` and `FEATURE_SPEC`.
   If that fails or `FEATURE_SPEC` is missing, stop:
   run `/speckit-specify` first.

2. Read `.specify/memory/constitution.md` Principle III. Do not restate it.

3. **Contamination check.** If `FEATURE_DIR/plan.md` exists and is a filled
   agent plan (not the unfilled Speckit plan template) **and**
   `FEATURE_DIR/prediction.md` is missing:
    - Stop.
    - The plan was generated without a sketch. It is invalid under Principle III.
    - Tell Dylan to set that `plan.md` aside without reading it (rename is
      fine), then re-run `/speckit-predict`.
    - Do not summarize `plan.md`.

4. If `FEATURE_DIR/prediction.md` does not exist, copy
   `.specify/templates/prediction.md` to `FEATURE_DIR/prediction.md`.
   If it exists with older headings (`## Pieces`, `## Where each runs`,
   `## What each can reach`, `## Data flow`, `## Enforcement`), rewrite it
   to the current template shape and move his existing words into
   `## Sketch`. Do not add topics he did not write.

5. Take the sketch from `$ARGUMENTS` and/or Dylan's following message.
   Write it into `## Sketch` (and `## Uncertainties` only if he named any).
    - Preserve his wording.
    - Do not add pieces, layers, files, or rules he did not name.
    - Do not rename his words to "better" names.
    - Do not require where it runs, what it can reach, data flow, or
      enforcement. Do not ask for those.
    - Fill **Feature** and **Date** if those are still blank.
    - If he did not write uncertainties, leave `## Uncertainties` as
      `_(unfilled)_` and treat that as None.

6. If `## Sketch` is still `_(unfilled)_`:
    - Ask him for the raw plan.
    - Do not offer a draft. Do not list required topics.
      Otherwise save `prediction.md`.
      Report the path. Next command is `/speckit-plan`, not `/speckit-tasks`.
      What he got right, wrong, or left off is `/speckit-plan-diff`.

## Stop if

- He asks whether the sketch is good, complete, or "what I missed":
  say that is `/speckit-plan-diff` after the agent plan. Record, don't grade.
- He asks you to generate the prediction for him: refuse. Principle I.
- He asks for a per-piece breakdown or a `plan.md`-shaped sketch: refuse.
  Record the raw plan.
