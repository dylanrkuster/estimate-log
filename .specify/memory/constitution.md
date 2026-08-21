<!--
Sync Impact Report
- Version change: 1.0.0 → 1.0.1 (PATCH)
- Modified principles: none renamed or redefined
  - III. Human Sketch Before Agent Plan: wording only — names the
    repo commands and artifacts that ratify the existing sequence
    (spec → human sketch → agent plan → diff)
- Added sections: none
- Removed sections: none
- Follow-up TODOs: none
-->

# estimate-log Constitution

estimate-log is a single-user Next.js App Router app. Its job is to log
predicted minutes against actual minutes. The pipeline around the app is the
August 2026 deliverable. The app is a habit with one business rule: once an
actual exists, the projection is locked.

**Human** means Dylan Kuster, sole operator and sole ratifier. **Agent** means
any coding assistant working in this repository.

**Gated work** is any change that alters user-visible behavior, routes, server
actions, validation, the Prisma schema, migrations, or persisted data.
Typo, comment, and formatting-only changes are not gated. Ceremony scales
with task size; it MUST NOT scale away on gated work.

**Closed estimate** means a row whose `actualMinutes` is non-null.

## Core Principles

### I. Cyborg, Not Delegation

The human decides. The agent enumerates branches, attacks plans with questions,
and implements only after a diff against the human's sketch.

- The agent MUST list decision branches and ask attacking questions before
  proposing implementation of gated work.
- The agent MUST NOT write application code for gated work until a spoken or
  written diff against the human's sketch has run (Principle III).
- The agent MUST NOT implement a change because it would be helpful, convenient,
  related, or "while we are here."
- If the human says "just build it" (or equivalent), the agent MUST name the
  skipped gate step in the session before continuing. A nameless skip is a
  violation even if the human asked for it.
- "The plan looked right" is not evidence that the human decided. If a session
  would end with the human having approved a plan he could not have drawn, the
  agent MUST stop and re-diff until he can restate the pieces, where they run,
  and what they can reach.

Rationale: A working diff the human could not have drawn is delegation.

Check: plan (branches and questions present); session (sketch before agent
plan; named skip if any); diff (no extra files beyond the agreed plan).

### II. Spec First; The Spec Outlives the Chat

For gated work the human drafts a short spec. The agent expands the branch
space. The human rules on each branch. That adjudicated spec is written down
on the feature branch and is what the audit checks against.

- The human's draft MUST cover happy path, empty, failure, and
  tamper/permission. It MUST cover concurrent edit when two writers can touch
  the same row.
- The agent MUST enumerate unstated branches. Enumeration is the agent's job.
  Adjudication is the human's. The agent MUST NOT decide a branch for him.
- The adjudicated spec MUST exist on the feature branch as a spec file, the
  merge description, or a committed note before implementation of gated work.
- Audit (Principle IV) MUST check the diff against that written spec.
- The agent MUST NOT treat chat scrollback as the spec.
- The agent MUST NOT start gated implementation with no written spec on the
  branch.

Rationale: A spec that dies with the chat cannot be audited.

Check: spec (required cases present; each enumerated branch ruled); plan
(points at the branch artifact); diff (audit uses that artifact, not memory).

### III. Human Sketch Before Agent Plan

After the spec is agreed, the human writes the architecture in prose. Only then
does the agent reveal its plan. The two are diffed out loud.

- The human's sketch MUST name the pieces, where each runs (build / request /
  server / client), what each can reach, and how data flows.
- The agent MUST NOT generate or implement a plan before that sketch exists.
- The agent MUST NOT present its plan first "to save time."
- The agent MUST diff the two plans out loud. The only legal outcomes are:
  (a) he had it; (b) he missed a piece, which MUST be named; (c) the agent's
  plan is worse — he overrules.
- A diff with only one possible verdict (rubber-stamp "looks good") MUST NOT
  be treated as complete.
- Ceremony MUST scale to the task: a one-line copy change is not a five-step
  ritual. Gated features MUST still run spec → human sketch → agent plan →
  spoken diff. That sequence MUST NOT be scaled away.

For gated work in this repo, that sequence is ratified by these commands
and artifacts (paths under `specs/<feature>/`):

- After `spec.md` is agreed, `/speckit-predict` writes `prediction.md`.
  The agent records the human's sketch. It MUST NOT draft, complete, or
  improve it.
- Then `/speckit-plan`. It MUST refuse if `prediction.md` is missing or
  still has `_(unfilled)_` required sections. It MUST NOT read the
  prediction body.
- Then `/speckit-plan-diff`. The diff MUST be of architecture, not file
  lists. Each delta MUST receive one of the three legal verdicts above,
  including "agent plan is worse." A blanket "looks good" is not a ruling.
  On finalize: `plan.agent.md` is the original agent plan; `plan.md` is
  the resolved plan; `plan-diff.md` Status is Finalized.
- `/speckit-tasks` and `/speckit-implement` MUST refuse unless
  `plan-diff.md` is Finalized. They MUST execute the resolved `plan.md`,
  not `plan.agent.md`.

Rationale: A diff with only one possible verdict trains deference.

Check: `prediction.md` filled before `/speckit-plan`; plan command does
not read the prediction body; `plan-diff.md` Finalized with a verdict
per delta; `plan.agent.md` original and `plan.md` resolved; tasks and
implement refuse until that status.

### IV. Milestones, Then Audit for Drift

Implement one milestone at a time. After implementation, audit the diff — not
a summary of the diff.

- Each milestone MUST have an observable pass/fail defined before that
  milestone's work starts.
- The agent MUST NOT start the next milestone while the current pass/fail is
  unmet, unless the human names that skip (Principle I).
- On a broken milestone the agent MUST surface the failure and work the cause
  with the human. The agent MUST NOT apply a silent fix.
- After implementation, a separate audit of the actual diff MUST answer:
  (1) does it do what the spec said?
  (2) what did it do that the spec did not ask for?
  Question 2 MUST be answered with a named list of extras, or the word none.
- The agent MUST NOT substitute a summary of the diff for that audit.
- Gated work MUST NOT merge until the audit has run and the human has
  accepted it.

Rationale: Question 2 is the one that finds problems; summaries hide extras.

Check: plan (milestones with pass/fail); session (no silent fixes); diff
(audit answers 1 and 2 against the written spec before merge).

### V. Branch Per Gated Feature

A branch is how a bad agent direction gets thrown away. The spec travels with
the branch.

- Each gated feature MUST live on one branch named for the spec.
- The written spec MUST be on that branch (Principle II).
- Merge to `main` MUST happen only after the audit in Principle IV.
- The agent MUST NOT land gated work as commits on `main`.
- The agent MUST NOT mix two gated features on one branch unless the human
  names that exception on the branch.

Rationale: Work on `main` cannot be thrown away without rewriting history.

Check: plan (branch name matches the spec); diff (gated commits are not on
`main`; spec artifact is on the branch; merge comes after audit).

### VI. The UI Is Not a Security Boundary

Business rules are enforced in server actions (or equivalent server-side code).
Read-only inputs are courtesy. A client can POST anything.

- Every business rule MUST be enforced in the server action (or equivalent
  server-side code) that performs the mutation. Disabled, read-only, hidden,
  or omitted inputs MUST NOT be treated as enforcement.
- Once an estimate is closed (`actualMinutes` is non-null), the action MUST
  refuse any change to `projectedMinutes` or `projectedReasoning`. Refusal
  MUST be observable to the user. The action MUST NOT accept a projected
  change after close because the UI did not send the field.
- Invalid input MUST be observable to the user (error payload, error message,
  or re-rendered form showing the error). Validation MUST NOT be a silent
  `return`, a success redirect, or a swallowed exception.
- Date checks MUST use an invalid-date test (`Number.isNaN(date.getTime())`
  or equivalent). The agent MUST NOT use `if (!date)` as a date check.
  `new Date("garbage")` is truthy and MUST be treated as invalid.

Rationale: The browser is not a security boundary; the action is.

Check: spec (tamper case for closed-estimate projection edits; invalid dates);
diff (server action refuses those cases and returns an observable error;
no truthiness date checks).

### VII. Tests Constrain the Agent

Tests are derived from the spec, not from the code. Honest current state:
this repo has no test script and no tests.

- Until a test runner and a CI test row exist, gated verification MUST be the
  milestone pass/fail from Principle IV. That is sufficient. The agent MUST
  NOT block gated work on TDD-before-implementation while no runner exists.
- Once a test runner exists, every gated feature MUST merge with at least one
  test written from the spec that would fail if the feature regressed.
- Tests MUST encode the spec's accepted branches. The agent MUST NOT write
  tests that snapshot whatever the implementation happened to do.
- There is no coverage target. The agent MUST NOT add coverage machinery or
  a percentage gate unless Dylan amends this principle.
- When a test talks to data and Postgres is available, the test MUST use real
  Postgres. The agent MUST NOT mock the database as the default.

Rationale: Tests that mirror the code cannot constrain the agent that wrote it.

Check: spec (accepted branches are the test source); plan (no TDD gate while
runner is absent; no coverage target); diff (after a runner exists, at least
one spec-derived failing-on-regression test; no mock-Postgres default).

### VIII. Smallest Thing That Ships

August does not grow a schema. Use the framework directly.

- Persistence MUST stay on one table: `estimates`.
- Navigation MUST be routes, not modals: `/` (list), `/estimates/new` (create),
  `/estimates/[id]` (view and edit).
- Mutations MUST use Next.js server actions (or equivalent App Router
  server-side code) talking to Prisma. The agent MUST NOT add an API layer,
  GraphQL, or a repository/service stack unless Dylan accepts a written
  justification first.
- The agent MUST NOT add auth, charts, tags, teams, polish-as-a-feature,
  project grouping, extra tables, extra columns, or intercepting-route
  overlays as August work.
- The agent MUST NOT introduce Kubernetes, microservices, GraphQL, new
  hosting, or other infrastructure because a template or agent default
  suggested it.
- The agent MUST NOT treat every feature as a library, MUST NOT require a
  CLI for every module, and MUST NOT add a second persistence model "in
  case we need it."
- Any added complexity (new package, table, column, route pattern, or
  infrastructure) MUST have a written justification the human accepts
  before implementation. Unjustified complexity in a plan or diff is a stop.

Rationale: The deliverable is the pipeline around one habit, not a product.

Check: spec and plan (no extra tables/routes/infra); diff (still one
`estimates` table; still the three routes; no modal overlay; no new stack).

### IX. Practice Like Client Work

Branching, a written feature definition, and verification that would survive
handing this repo to someone else in eight months.

- Gated work MUST use a named branch (V), a written spec (II), and an audit
  (IV). Chat is not a substitute for any of the three.
- Secrets MUST live in the environment or the host's secret store. The agent
  MUST NOT commit secrets, credentialed `.env` files, or service tokens.
- Before applying a Prisma migration to any database that has rows, the agent
  MUST read the generated SQL. If it DROPs a column or table and ADDs a
  replacement (Prisma's usual rename), the agent MUST stop and surface it.
  The agent MUST NOT apply that migration as a silent reshape.
- When tests exist, they MUST prefer real Postgres over mocks (Principle VII).

Rationale: Habits practiced here are the habits that ship to a client.

Check: plan (branch + spec + verification named); diff (no secrets; migration
SQL reviewed; no DROP+ADD against a populated database).

## Settled Stack

Do not relitigate. A plan or spec that proposes replacing any of the following
MUST stop and surface the conflict unless Dylan has amended this constitution.

- Next.js App Router and TypeScript. React 19.
- Prisma, with Postgres on Railway.
- Production URL: `estimates.dylankuster.com`.
- Routes over modals, as listed in Principle VIII.
- Server actions for mutations.

The agent MUST use this stack directly. The agent MUST NOT swap the framework,
ORM, database, host, or interaction model because a template defaulted to
something else.

## Scope

This constitution governs the estimate-log repository only.

- Course-along code in other folders is out of scope. The agent MUST NOT
  import those folders' conventions, structure, or stack as requirements here.
- Work that is not gated (typo, comment, formatting-only) MAY skip the
  ceremony of Principles II–IV. It remains subject to Principles VI, VIII,
  IX, Settled Stack, and this Scope section.
- If it is unclear whether a change is gated, treat it as gated.

## Governance

This constitution supersedes agent convenience, Speckit template defaults, and
"helpful" extra work.

Dylan Kuster is the sole ratifier. Amendments require a dated written rationale
from Dylan and a version bump on this file:

- MAJOR: a principle is removed or redefined.
- MINOR: a principle is added.
- PATCH: wording or clarification only.

The agent MUST NOT amend this file without that rationale.

Compliance is checked twice. If a plan or a diff violates a principle, the
agent MUST stop and surface the violation. The agent MUST NOT patch around it
(rename the extra work, hide it in a "refactor," or claim an exception the
human did not name).

At plan time the agent MUST confirm:

- written spec on the branch (II)
- `prediction.md` exists with required sections filled before
  `/speckit-plan`; the plan command MUST NOT read the prediction body (III)
- `plan-diff.md` is Finalized with one of the three legal verdicts per
  delta, not a blanket "looks good" (III)
- no stack, schema, or scope violation (VIII, Settled Stack, Scope)

At audit time the agent MUST confirm:

- spec vs diff, question 1 (IV)
- extras vs spec, question 2, named list or none (IV)
- close-lock and observable validation if actions changed (VI)
- secrets absent; migration SQL safe (IX)
- after a test runner exists: at least one spec-derived regression test (VII)

Rejected Speckit template articles. These MUST NOT re-enter through plan
templates, agent habit, or "best practice":

- Library-First: every feature is a library.
- CLI Interface: every module exposes a CLI.
- TDD-before-implementation: no application code before a failing test,
  including while this repo has no test runner.

**Version**: 1.0.1 | **Ratified**: 2026-08-21 | **Last Amended**: 2026-08-21
