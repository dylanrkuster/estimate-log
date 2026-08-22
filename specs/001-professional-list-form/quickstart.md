# Quickstart: Professional List and Create Form

Verification is visual and behavioral. There is no test script (constitution VII).

## Prerequisites

- Repo on branch `001-professional-list-form`
- `npm install` already done
- Local app can read/write the existing Postgres (`npm run dev`)

## Run

```bash
npm run dev
```

Open the local origin the dev server prints.

## Checks (pass/fail)

1. **Home, estimates present**: Product title, a single primary control to create, and a labeled columnar log of date, name, projected minutes, projected reasoning, actual minutes, actual reasoning, and a way to open each estimate. Adjacent rows distinguishable. Projected vs actual minutes aligned. Content inset from the window. A new viewer can point to title, list, and create control in under 5 seconds.
2. **Create screen**: Separate page (not an overlay). Same four fields as today, each labeled. One visually distinct save. No on-page back control.
3. **Valid create**: Fill the same fields that already saved before this feature. Submit. Land on home with a row that matches what was submitted. Actuals empty. No new success/error copy.
4. **Invalid create (non-regression)**: Submit the same incomplete/invalid input that failed before. It still fails the same way. No new error message.
5. **Empty list (non-regression)**: If there are zero rows, the page may look sparse. No new empty-state message.
6. **Phone width**: Resize to 360px wide. Title, primary actions, and every field stay reachable by wrapping. Not a second layout.
7. **Detail/edit**: Opening an estimate still works. That screen is not a redesign target. Shared chrome may look different; that is accepted.

## Out of this guide

Schema, migrations, auth, charts, tests.
