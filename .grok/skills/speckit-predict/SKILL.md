---
name: speckit-predict
description: Record Dylan's architecture sketch for the active Speckit feature before any agent plan exists. Use when the user runs /speckit-predict, wants to predict the plan, or needs to write the Principle III sketch.
---

# speckit-predict

Implements constitution Principle III, human half: the sketch exists on disk
before `/speckit-plan` runs.

This command records. It does not plan, critique, complete, or improve.

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

5. Take the sketch from `$ARGUMENTS` and/or Dylan's following message.
   Write it into the matching sections of `prediction.md`.
    - Preserve his wording.
    - Do not add pieces, layers, files, or rules he did not name.
    - Do not rename his pieces to "better" names.
    - Fill **Feature** and **Date** if those are still blank.
    - Leave any section he did not address as `_(unfilled)_`.

6. If any required section is still `_(unfilled)_` (Pieces, Where each runs,
   What each can reach, Data flow, Enforcement; Uncertainties may stay
   `_(unfilled)_` only if he explicitly has none — then write `None`):
    - Show the unfilled section headings.
    - Ask him to fill those only.
    - Do not offer a draft.

7. When every required section has his words, save `prediction.md`.
   Report the path. Next command is `/speckit-plan`, not `/speckit-tasks`.

## Stop if

- He asks whether the sketch is good, complete, or "what I missed":
  say that is `/speckit-plan-diff` after the agent plan. Record, don't grade.
- He asks you to generate the prediction for him: refuse. Principle I.
