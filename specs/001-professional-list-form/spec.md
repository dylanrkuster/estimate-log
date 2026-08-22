# Feature Specification: Professional List and Create Form

**Feature Branch**: `001-professional-list-form`

**Created**: 2026-08-21

**Status**: Draft

**Input**: User description: "the estimate log application is visually, quite unpleasing. the application must be made to look more professional, stylistically and structurally. this should impact the home page that displayes estimates "/" (currently a plain html table) and the form used to create new estimates (currently a very basic html form with minimal styling)"

**Revision**: 2026-08-21 — Dylan ruled create-form validation and the empty-list scenario out of scope. This feature is visual display only; it MUST NOT add logic.

## Human review

Dylan reads this section only. If this is wrong, the spec is wrong.

**Ships**: Home and create look like one professional tool. Save, reject, and empty-list behavior do not change.

**In**:

- Home: product title, one primary create action, labeled columnar log, inset from the window
- Each row shows date, name, projected minutes, projected reasoning, actual minutes, actual reasoning, and a way to open that estimate
- Adjacent rows distinguishable; projected vs actual minutes aligned for a glance
- Create is still its own page: same four fields, visible labels, one distinct save
- Both screens usable at typical phone width by ordinary wrapping, not a second layout; long name/reasoning stays on the page

**Out**:

- Create validation, error copy, or any change to what save accepts or rejects
- Empty-list message or a new zero-row home flow
- An intentional redesign of the detail/edit screen as its own job
- Modals, overlays, new routes, extra fields, tables, charts, tags, auth
- Changing when a projection locks
- Dark mode, a new product identity, a distinct mobile layout, or an on-page create back control

**Branches**:

| Case    | What happens                                                                                                                               |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Happy   | Home with estimates is a scannable labeled log; create is a labeled form; a save that already worked still works and still returns to home |
| Empty   | Unchanged. No new empty-state message                                                                                                      |
| Failure | Unchanged. No new error messages. A save that already failed still fails the same way                                                      |
| Tamper  | Unchanged. Hiding or locking a field on the page is not a new rule. Save still does what it does today                                     |

**Rules**:

- Visual display only. No new create or empty-list logic.
- Same fields as today. None added, none removed.
- Create remains a separate page, not an overlay.
- Work targets home and create. Shared styling that also changes detail/edit is accepted; do not isolate those two screens with one-off tricks.

**Done when**:

- With estimates present, a new viewer can point to title, list, and create control in under 5 seconds
- Two or more rows are distinguishable; projected vs actual minutes compare at a glance
- At phone width, title, actions, and every field stay reachable (same layout wrapping, not a second design)
- A create that worked before still yields the same home-page row; a create that failed before still fails the same way, with no new messages

## Clarifications

### Session 2026-08-21

- Q: Should the visual refresh change only the home and create screens, or may a shared page frame also change how the estimate detail screen looks? → A: Target only home and create. Do not isolate them with one-off or non-standard splits. If detail/edit changes because shared styling changed, that is accepted.
- Q: Must the home and create screens stay fully usable on a typical phone-width screen, or is this a desktop-first refresh? → A: Phone-width usable via ordinary wrapping. No separate mobile design.

### Session 2026-08-22

- Q: Does the create screen need a visible way back to the home page, or is the browser’s back control enough? → A: Browser back only. Do not add an on-page back control.

## User Scenarios & Testing _(mandatory)_

The operator is a single person logging predicted vs actual minutes. This feature changes how the home log and the create-estimate screen look and are laid out. It does not change what those screens save, reject, or show when the list has no rows.

### User Story 1 - Scan the home log (Priority: P1)

The operator opens the home page to see estimates as a structured log: a product title, a way to start a new estimate, and a labeled columnar list of date, name, projected minutes, projected reasoning, actual minutes, actual reasoning, and a way to open an existing estimate.

**Why this priority**: The home page is the daily surface. If the log is not scannable, restyling the form does not help the habit.

**Independent Test**: Open the home page with at least two estimates present. Confirm title, create action, column labels, all existing fields, distinguishable rows, and an open/edit control per row. Do not use the create form.

**Acceptance Scenarios**:

1. **Given** at least two estimates exist, **When** the operator opens the home page, **Then** they see a page title, a single primary action that goes to the create-estimate screen, and a labeled columnar log of those estimates.
2. **Given** estimates exist, **When** the operator reads a row, **Then** they can see date, name, projected minutes, projected reasoning, actual minutes, actual reasoning, and a control that opens that estimate’s existing screen.
3. **Given** two adjacent rows, **When** the operator scans the list, **Then** they can tell the rows apart without tracing cell borders by eye.
4. **Given** projected and actual minutes on the same row, **When** the operator compares them, **Then** the two numbers sit in a consistent alignment so comparison is a glance, not a hunt.
5. **Given** the operator is on the home page, **When** they use the primary create action, **Then** they land on the existing create-estimate screen (a separate page, not an overlay).

---

### User Story 2 - Record a new estimate on a structured form (Priority: P2)

The operator opens the create-estimate screen and sees name, date, projected minutes, and optional projected reasoning on a form with visible labels, a clear primary submit action, and spacing that groups each label with its control. Saving uses the existing create path; this story does not add checks, messages, or fields.

**Why this priority**: Creating is the other named surface. A professional log with an amateur form still feels unfinished.

**Independent Test**: Open the create-estimate screen with no regard to home-page styling. Confirm the same four fields as today, visible labels, and one primary submit. A save that already succeeded before this feature still succeeds after it.

**Acceptance Scenarios**:

1. **Given** the operator is on the create-estimate screen, **When** they view the form, **Then** they see a page title, labeled controls for name, date, projected minutes, and projected reasoning, and one primary action to save.
2. **Given** a create that would have saved before this feature, **When** they save, **Then** the estimate still appears on the home page with the same field set as today (this is a non-regression, not new save logic).
3. **Given** the operator is on the create-estimate screen, **When** they want to leave without saving, **Then** they use the browser back control. This feature MUST NOT add an on-page back control.

---

### Edge Cases

- A row with actual minutes and reasoning still empty: show empty actuals without looking broken. Do not invent placeholder copy that changes meaning.
- A row with actual minutes present (closed estimate): list still shows projection and actual; this feature does not change lock behavior.
- Very long name or reasoning: the log stays scannable (text wraps or otherwise stays on the page; one row MUST NOT push primary columns or the create action off the viewport with no way to recover).
- Many estimates: the full list remains reachable by ordinary scrolling; this feature does not add paging, filters, or search.
- Narrow viewport (typical phone width): title, primary action, and every field remain reachable by ordinary wrapping of the same layout. This feature MUST NOT add a distinct mobile layout.
- Zero estimates: out of scope. The home page MAY look sparse; this feature MUST NOT add an empty-state message or a new empty-list flow.
- Invalid or incomplete create: out of scope. Existing save behavior (including a silent failed save) stays. This feature MUST NOT add error messages or new validation.
- Concurrent edit of the same row is not in play: this feature restyles list and create only.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: The home page MUST show a page title that names the product, a single primary action to create an estimate, and a labeled columnar log of existing estimates.
- **FR-002**: Each home-page row MUST show date, name, projected minutes, projected reasoning, actual minutes, actual reasoning, and a control that opens that estimate’s existing screen. The feature MUST NOT add or remove fields.
- **FR-003**: Consecutive home-page rows MUST be visually distinguishable from one another.
- **FR-004**: Projected minutes and actual minutes MUST share a consistent numeric alignment so a scan can compare them.
- **FR-005**: Home-page content MUST sit inset from the viewport edges inside a readable content width (not flush to the window).
- **FR-006**: The create-estimate screen MUST be a separate page at the existing create URL. The feature MUST NOT turn create into an overlay, modal, or intercepting layer on the home page.
- **FR-007**: The create-estimate screen MUST present the same fields as today: name, date, projected minutes, and projected reasoning. It MUST NOT add, remove, or reorder those fields into a different data set. It MUST NOT collect actual minutes or actual reasoning at create time.
- **FR-008**: Every create field MUST have a visible label tied to its control. The primary save action MUST be visually distinct from ordinary text links.
- **FR-009**: The create-estimate screen MUST NOT add an on-page back control. Leaving without saving uses the browser back control.
- **FR-010**: Home and create screens MUST remain usable on a typical phone-width viewport: title, primary actions, and all fields reachable without clipped-off primary controls. Usability MUST come from ordinary wrapping of the same layout. The feature MUST NOT add a distinct mobile layout.
- **FR-011**: This feature MUST NOT change create/save behavior: no new validation, no new error messages, no new empty-list message or empty-list flow. A save that succeeded or failed before this feature MUST succeed or fail the same way after it.
- **FR-012**: This feature MUST NOT add authentication, charts, tags, teams, project grouping, extra stored fields, extra tables, extra routes, or intercepting overlays.
- **FR-013**: Visual work targets the home page and the create-estimate screen. This feature MUST NOT treat the estimate detail/edit screen as a third screen to redesign. It MUST NOT add one-off isolation just to keep detail/edit from picking up shared styling. If shared styling also changes how detail/edit looks, that is accepted.

### Key Entities

- **Estimate**: One logged piece of work. Attributes the operator already uses: date, name, projected minutes, projected reasoning, actual minutes, actual reasoning. This feature does not change what an estimate is, when a projection locks, or how create is accepted or rejected.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: On first view of the home page with estimates present, a person who has not seen the app can point to the product title, the list of estimates, and the control that starts a new estimate in under 5 seconds.
- **SC-002**: With two or more estimates, a viewer can distinguish adjacent rows and compare projected vs actual minutes on a row without asking which number is which.
- **SC-003**: On a 360-pixel-wide viewport, 100% of primary controls and fields on the home page and the create-estimate screen remain reachable via ordinary wrapping of the same layout (not a second mobile structure).
- **SC-004**: After this feature, a create that was valid before still results in a home-page row with the same submitted values. Create that failed before still fails the same way, with no new messages.
- **SC-005**: The operator can complete a create they already know how to complete (open create screen, fill the same fields as today, save, see the row) in under 2 minutes.

## Assumptions

- The operator is Dylan, the single user. No accounts, roles, or permissions screens.
- “More professional, stylistically and structurally” means a clear hierarchy (title, primary action, content), inset readable width, labeled fields, and distinguishable rows — not a new product identity, illustration set, marketing site, empty state, or validation system.
- One calm light presentation. No theme switcher.
- Sort, filter, search, paging, charts, and totals are out of this feature; the existing list order stays.
- Visual work targets home and create. Ordinary shared styling is allowed. Incidental change to detail/edit from that shared styling is accepted (Dylan, 2026-08-21). One-off isolation to freeze detail/edit is not.
- Existing create behavior (success redirect to the home list; current handling of incomplete or invalid input) stays unchanged.
- Principle VIII forbids unsolicited polish. This spec is Dylan’s written request and the written justification for a bounded visual refresh of two named screens only.

## Out of Scope

- Create-form validation, error copy, and any change to what the save step accepts or rejects (Dylan, 2026-08-21).
- Empty-list message, empty-list illustration, or any new zero-row home flow (Dylan, 2026-08-21).
- Intentional redesign of the estimate detail/edit screen as its own job. Incidental change via shared styling is accepted (Dylan, 2026-08-21).
- New routes, modals, or overlays.
- Schema growth (tables or columns).
- Auth, charts, tags, teams, project grouping, polish beyond the two named screens.
- A distinct mobile layout (Dylan, 2026-08-21: phone-width via ordinary wrapping only).
- An on-page back control on the create screen (Dylan, 2026-08-22: browser back only).
- Changing the lock rule (projection locked once an actual exists).
- Copy rewrites of product purpose beyond labels needed for visual hierarchy (page title, field labels).

## Enumerated Branches (agent; human rules)

Rulings in **bold** were given by Dylan on 2026-08-21. Other rows are still proposed defaults.

| ID  | Branch                                                  | Ruling                                                                                                              | Notes                                 |
| --- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| A   | Add charts, totals, tags, or extra columns              | Reject (proposed)                                                                                                   | Constitution VIII                     |
| B   | Restyle the estimate detail/edit screen in this feature | **Target home and create; incidental shared-style change to edit is accepted. Do not isolate with one-off tricks.** | Dylan, 2026-08-21                     |
| C   | Turn create into a modal or overlay on home             | Reject (proposed)                                                                                                   | Constitution VIII                     |
| D   | Visible errors on rejected create                       | **Reject**                                                                                                          | Out of scope; no new validation logic |
| E   | Invalid-date test on create                             | **Reject**                                                                                                          | Out of scope; no new validation logic |
| F   | Phone-width usability                                   | **Ordinary wrapping of the same layout. No separate mobile design.**                                                | Dylan, 2026-08-21                     |
| G   | Dark mode / custom brand palette                        | Reject; one light presentation (proposed)                                                                           |                                       |
| H   | Truncate long reasoning on the list vs wrap             | **Wrap with the same layout; no extra expand widget.**                                                              | Follows F                             |
| I   | Concurrent edit of one row                              | Not applicable                                                                                                      | Visual-only feature                   |
| J   | Auth / permission model for tamper                      | Not applicable                                                                                                      | Visual-only feature                   |
| K   | Written empty state when the home list has zero rows    | **Reject**                                                                                                          | Out of scope; no new empty-list logic |
| L   | On-page back control on create                          | **Reject. Browser back only.**                                                                                      | Dylan, 2026-08-22                     |
