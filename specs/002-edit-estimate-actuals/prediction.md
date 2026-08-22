# Plan prediction

**Feature**: Edit Estimate Actuals
**Spec**: spec.md
**Author**: Dylan
**Date**: 2026-08-22

This file is the human's sketch (constitution Principle III).
A moderate-to-high-level raw plan of what should happen to implement the
agreed spec. It is not `plan.md`. Grain: no lower than class names.
The agent records what Dylan writes. The agent does not fill, complete,
improve, or grade it.

## Sketch

The routing from the home page ("/") to a given estimate's edit page
("/estimates/[id]") will not change. The page corresponding to that edit
route will get its html restructured to mirror that of the create form,
but with all fields pre-filled with the estimate's current values, and
only the "Actual Minutes" and "Actual Reasoning" fields made editable. A
save button will be exposed somewhere on the page. After the user has
completed their edits to the actuals, they will hit save. A new server
action within the component will receive the modified form data and go
thru some validation (both of the edited values and of the edited values
compared to the current state of the given estimate). The server action
should validate that the values provided to the actual inputs are valid
(for example actual minutes should be numeric, non negative, and no
greater than some reasonable maximum), the actual reasoning should not
exceed some reasonable maximum length. Then the server action must
compare the state of the form's other values (name, date, projected
minutes, projected reasoning) and compare that against the state
represented by that estimate in the server (grab the current state of
the given estimate from the server in that server action) to make sure
what is provided in the form matches what exists in the server. If any
validation fails at any point, the server action returns an error state
and that error state is picked up by the edit page and re-rendered with
said error state displayed somewhere. If everything is valid, the server
action continues by updating the given record in the db with the
modified actualminutes and actual reasoning. On successful save, the
user is rerouted back to the home page, where the table of estimates now
shows the edited state of the estimate.

## Uncertainties

_(unfilled)_
