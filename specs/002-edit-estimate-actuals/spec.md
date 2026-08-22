# Feature Specification: Edit Estimate Actuals

**Feature Branch**: `002-edit-estimate-actuals`

**Created**: 2026-08-22

**Status**: Draft

**Input**: User description: "we need a way to edit estimates. right now just clicking Edit for a given estimate row simply takes me to a page that displays the name of the requested estimate. lets take this a step further. so one important business rule for you: once an estimate has been created with its projected minutes and projected reasoning, those two things are now uneditable. they cannot be modified and are now readonly. editing a projection has only one purpose: to specify the actual amount of time it took to complete and an optional reason for why it actually took that long. so all fields except the actual minutes and actual reasoning are readonly in this edit mode (but displayed in the form for context). useful."

## Human review

Dylan reads this section only. If this is wrong, the spec is wrong.

**Ships**: From the existing estimate page, the operator records actual minutes and optional actual reasoning. Projection, name, and date stay as created.

**In**:

- Edit from the home-list control still opens the existing estimate page
- That page shows name, date, projected minutes, and projected reasoning as uneditable context
- Actual minutes (required) and actual reasoning (optional) are the only editable fields
- A valid save stores those actuals and returns the operator to the home list, which shows them in a stable order (work date, then id) so the row does not jump
- A later visit can change the actuals to a new number or reasoning; it cannot clear them or change the projection

**Out**:

- Changing name, date, projected minutes, or projected reasoning after create
- New routes, overlays, or extra stored fields
- Clearing actuals back to empty
- Create-form validation, empty-list copy, or restyling other screens as the job
- Auth, charts, tags, teams

**Branches**:

| Case    | What happens                                                                                                                                                                |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Happy   | Open an existing estimate, see locked context, enter actual minutes (and optional reasoning), save, land on the home list showing those actuals                             |
| Empty   | Save with actual minutes missing or not a real number: no store of a bogus actual; the operator can see that it did not save                                                |
| Failure | Unknown or junk id: not-found, no save                                                                                                                                      |
| Tamper  | A submit that tries to change name, date, or projection is refused. Stored projection is unchanged. The operator can tell it was refused. Read-only display is not the rule |

**Rules**:

- After create, projected minutes and projected reasoning never change.
- Edit exists to record actual minutes and optional actual reasoning only.
- Once actual minutes are stored, they can be changed to another valid number, not cleared.
- Read-only on the page is courtesy. The save step is the lock.

**Done when**:

- Edit shows the estimate’s name, date, and projection, and they cannot be changed on that page
- Saving actual minutes (reasoning optional) returns the operator to the home list showing those values in the same stable order as before the save
- A tampered submit that sends a new projection does not change the stored projection, and that refusal is visible
- A missing estimate id does not save anything
- Once actual minutes exist, a save that would blank them is refused and the stored actual stays

## Clarifications

### Session 2026-08-22

- Q: After actual minutes have been saved once, can the operator change those actuals later, or is the first save the last? → A: Actuals can be changed on a later visit. Projection stays locked. An actual cannot be cleared once specified.
- Q: After a valid save of actuals, should the operator land on the home list, or stay on that estimate’s page? → A: After a valid save, go to the home list.
- Q: After save, the edited row appeared at the bottom of the list. → A: Keep a stable home-list order (work date, then id) so a row does not jump after edit (Dylan, 2026-08-22).

## User Scenarios & Testing _(mandatory)_

The operator logs predicted vs actual minutes. Create already stored name, date, projected minutes, and projected reasoning. This feature turns the existing estimate page into the place to record what it actually took, without letting the projection be rewritten.

### User Story 1 - Record actuals on the estimate page (Priority: P1)

The operator opens an existing estimate from the home list. They see the created name, date, and projection as context. They enter actual minutes and may enter actual reasoning. They save. The home list shows those actuals.

**Why this priority**: Without this, Edit is a name on a blank page and the habit cannot close a row.

**Independent Test**: Open an estimate that has no actuals. Confirm locked context fields, two editable actual fields, save with minutes only, then with minutes and reasoning. Home list matches. Do not tamper.

**Acceptance Scenarios**:

1. **Given** an estimate exists with no actuals, **When** the operator opens it from the home list Edit control, **Then** they are on that estimate’s existing page (not a new route or overlay) and they see name, date, projected minutes, projected reasoning, actual minutes, and actual reasoning.
2. **Given** they are on that page, **When** they view the form, **Then** name, date, projected minutes, and projected reasoning are visible and not editable; actual minutes and actual reasoning are editable.
3. **Given** they enter actual minutes and omit actual reasoning, **When** they save, **Then** they land on the home list showing that actual minutes and empty actual reasoning; name, date, and projection are unchanged.
4. **Given** they enter actual minutes and actual reasoning, **When** they save, **Then** they land on the home list showing both actuals; projection is unchanged.
5. **Given** the estimate already has actuals, **When** they open it and save different valid actual minutes and/or reasoning, **Then** they land on the home list showing the new actuals and the original projection is still unchanged.
6. **Given** the estimate already has actual minutes, **When** they save with actual minutes blank or missing, **Then** the stored actual minutes stay and the operator sees that the save was refused.

---

### User Story 2 - The projection cannot be rewritten (Priority: P2)

The operator, or anything posting as the operator, cannot change name, date, projected minutes, or projected reasoning after create. A refused save is visible. The stored projection does not move.

**Why this priority**: The business rule is the point of edit. UI lock without save-step lock is not the rule.

**Independent Test**: From an estimate page, submit a change to projected minutes or reasoning (or name or date) without using the readonly display as the only barrier. Confirm the stored projection is unchanged and the operator can tell it was refused.

**Acceptance Scenarios**:

1. **Given** an estimate exists, **When** a save includes a different projected minutes or projected reasoning than stored, **Then** those stored values do not change and the operator sees that the save was refused.
2. **Given** an estimate exists, **When** a save includes a different name or date than stored, **Then** those stored values do not change and the operator sees that the save was refused.
3. **Given** the display of projection is read-only, **When** a client omits those fields or sends new values anyway, **Then** the save step still applies the lock; omitted or altered projection fields are not treated as “update to blank” or “update to the posted value.”

---

### Edge Cases

- Unknown id or non-positive / non-numeric id: not-found, no save.
- Actual minutes missing, blank, or not a real number: no bogus actual stored; operator can see it did not save.
- Actual minutes zero: allowed (a real number, including zero).
- Actual reasoning omitted: allowed; stored empty.
- Estimate already has actuals: page shows them in the editable actual fields; save updates actuals only.
- Clearing actual minutes once stored: refused visibly; stored actual minutes stay (Dylan, 2026-08-22).
- Updating actual minutes to another valid number (including zero): allowed.
- Concurrent two writers: not in play (single operator). Last write to actuals would win if it happened.
- Home list and create screens are not this feature’s restyle job.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: The home-list Edit control MUST open the existing estimate page for that row (same URL the list already uses). The feature MUST NOT add a route or overlay.
- **FR-002**: That page MUST display name, date, projected minutes, projected reasoning, actual minutes, and actual reasoning.
- **FR-003**: Name, date, projected minutes, and projected reasoning MUST NOT be editable on that page. They MUST still be shown.
- **FR-004**: Actual minutes MUST be editable and required to save. Actual reasoning MUST be editable and optional.
- **FR-005**: A valid save MUST persist actual minutes and actual reasoning (empty reasoning allowed) and MUST NOT persist any change to name, date, projected minutes, or projected reasoning.
- **FR-005a**: Once actual minutes are stored, a save that would clear them (blank, missing, or non-numeric in a way that would wipe the value) MUST be refused. The stored actual minutes MUST stay. Changing them to another valid number is allowed.
- **FR-006**: After a valid save the operator MUST land on the home list and see those actuals there. The list MUST use a stable order (work date, then id) so saving actuals does not move that row to a new place in the list.
- **FR-007**: Read-only display MUST NOT be treated as the lock. The save step MUST refuse changes to name, date, projected minutes, and projected reasoning even if posted.
- **FR-008**: A refused save (tamper of locked fields, missing/invalid actual minutes, or a save that would clear existing actuals) MUST be visible to the operator. A silent stay with no message is a failure of this requirement.
- **FR-009**: After create, stored projected minutes and projected reasoning MUST NOT change through this edit path.
- **FR-010**: An unknown estimate MUST NOT save. The operator gets the existing not-found outcome.
- **FR-011**: This feature MUST NOT add tables, columns, auth, charts, tags, teams, modals, or extra routes.

### Key Entities

- **Estimate**: Already stored at create: name, date, projected minutes, projected reasoning. This feature records actual minutes and optional actual reasoning. Projection does not change after create.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: From the home list, the operator can open an estimate, fill actual minutes, save, and see those minutes on the home list in under 2 minutes.
- **SC-002**: 100% of valid saves leave name, date, projected minutes, and projected reasoning identical to their pre-save values.
- **SC-003**: 100% of posted attempts to change projected minutes or projected reasoning leave those stored values unchanged and show a visible refusal.
- **SC-004**: 100% of saves with missing or non-numeric actual minutes store no new bogus actual and show a visible refusal. If actual minutes were already stored, 100% of those attempts leave the stored number unchanged.
- **SC-006**: After actual minutes exist, 100% of later saves with a different valid number update that number; 0% of later saves blank it out.
- **SC-005**: 100% of unknown ids result in not-found and zero writes.
- **SC-007**: After a valid save, the edited row keeps its place in the home list relative to other rows when ordered by work date, then id.

## Assumptions

- Single operator. No accounts.
- Actual minutes may be updated to another valid number after they were first saved. They MUST NOT be cleared. Projection still cannot change. (Dylan, 2026-08-22.)
- Actual minutes of zero is valid. Negative or non-numeric is not.
- After a valid save, the operator lands on the home list (Dylan, 2026-08-22).
- Home list order is work date, then id, so an edit does not send the row to the bottom (Dylan, 2026-08-22).
- No new back control on the estimate page (browser back).
- Constitution VI is the floor: lock is in the save step. This spec also locks projection from create, not only after actuals exist, and also locks name and date on this page.
- Visual treatment should match the current app well enough to use; this spec is the edit behavior, not a restyle of home or create.

## Out of Scope

- Rewriting projection, name, or date after create.
- New routes, overlays, extra fields, extra tables.
- Wiping actuals back to empty.
- Create-page validation or empty-list copy.
- Intentional restyle of home or create as this feature’s job.
- Auth, charts, tags, teams.

## Enumerated Branches (agent; human rules)

Defaults below stand unless Dylan overrules before `/speckit-predict`.

| ID  | Branch                                                          | Proposed ruling                                              |
| --- | --------------------------------------------------------------- | ------------------------------------------------------------ |
| A   | Allow changing name or date on edit                             | Reject — context only                                        |
| B   | Lock projection only after actuals exist (constitution minimum) | Reject for this feature — lock from create                   |
| C   | Actual minutes required on save                                 | Accept                                                       |
| D   | Actual reasoning optional                                       | Accept                                                       |
| E   | Allow updating actuals after first save                         | **Accept** — Dylan, 2026-08-22                               |
| F   | Allow clearing actuals                                          | **Reject** — cannot clear once specified (Dylan, 2026-08-22) |
| G   | Redirect home after valid save                                  | **Accept** — Dylan, 2026-08-22                               |
| H   | On-page back control                                            | Reject (browser back)                                        |
| I   | Concurrent two writers                                          | Not applicable                                               |
| J   | Visible refusal on lock/invalid actual                          | Accept — constitution VI; this feature is the lock           |
| K   | Stable home-list order after save                               | **Accept** — date, then id (Dylan, 2026-08-22)               |
