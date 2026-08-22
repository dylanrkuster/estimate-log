# Human review section

Dylan reads `## Human review` only. The rest of the file is for the agent.

## Placement

- Heading is exactly `## Human review`.
- It is the first `##` in the file (after the title and metadata).
- Replace the whole section on every write: from `## Human review` up to (not including) the next `##`.

## Source of truth

This section is **derived**. The rest of the same file (and, for `plan.md`, `research.md` / `data-model.md` if they exist) wins. If they disagree, rewrite Human review. Do not invent a requirement, piece, or rule that is not in those sources. Do not copy FR-ids, user-story numbers, or file trees.

If Dylan corrects Human review, that correction is a change to the artifact: update the rest of the file first, then refresh this section. Never leave Human review as a fork of the spec or plan.

## Cap

Target ≤40 lines. If over, cut prose, not a branch or a rule.

## `spec.md` shape

```markdown
## Human review

Dylan reads this section only. If this is wrong, the spec is wrong.

**Ships**: <one sentence>

**In**:

- <≤6 user-visible behaviors>

**Out**:

- <≤6 explicit non-goals>

**Branches**:

| Case    | What happens |
| ------- | ------------ |
| Happy   |              |
| Empty   |              |
| Failure |              |
| Tamper  |              |

**Rules**:

- <≤4 load-bearing rules; miss one and the feature is wrong>

**Done when**:

- <≤5 checks you can perform on the running app>
```

Omit the Concurrent row unless two writers can touch the same row. Do not put implementation (files, frameworks, function names) here.

## `plan.md` shape

```markdown
## Human review

Dylan reads this section only. If this is wrong, the plan is wrong.

**Pieces**:

| Piece | Runs                              | Can reach |
| ----- | --------------------------------- | --------- |
|       | build / request / server / client |           |

**Flow**: <4–8 lines, request in → writes → response out>

**Enforcement**: <1–3 lines; where the rules actually live>

**Milestones**:

| #   | Milestone | Pass if      |
| --- | --------- | ------------ |
| 1   |           | <observable> |

**Not doing**:

- <rejected extras>

**Watch**:

- <≤4 footguns>
```

`Runs` uses only: build, request, server, client. `Pass if` is something a human can see or a test can fail on.
