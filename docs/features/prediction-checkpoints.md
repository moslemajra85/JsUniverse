# Prediction Checkpoints

## Purpose

Prediction checkpoints ask learners to commit to an answer before receiving an
explanation. They turn the prediction stage of a lesson from passive text into a
small, testable interaction.

Checkpoint completion is saved in the current browser. It does not synchronize
progress across devices.

## Acceptance criteria

- Every prediction step defines a question, at least two options, one valid
  correct option, success feedback, and retry feedback.
- Options use a native radio group with a visible legend.
- The submit button remains disabled until an option is selected.
- An incorrect answer provides a useful hint without revealing or submitting a
  different answer automatically.
- Changing an answer clears old retry feedback.
- A correct answer marks the checkpoint complete and disables its options.
- Feedback is announced politely to assistive technology.
- Reset clears the selection, feedback, and completion state.
- The lesson path displays completed checkpoints independently of course position.
- Switching lessons restores completion for the selected lesson.

## State ownership

`PredictionCheckpoint` owns temporary interaction state:

- selected option;
- idle or incorrect attempt status;
- retry feedback derived from that status.

The application-level `useCheckpointProgress` hook owns completed
prediction-step IDs across lessons. `LessonPath` derives the active lesson's
total. Correct feedback is derived from parent-controlled completion. The child
reports completion and reset events; it does not calculate aggregate progress.

This boundary keeps answer mechanics reusable and isolates browser persistence
from presentation components.

## Accessibility

- A `fieldset` and `legend` name the answer group.
- Native radio inputs provide keyboard selection behavior.
- Disabled state prevents changing a completed answer accidentally.
- A polite live region announces feedback and progress without interrupting the
  learner mid-action.
- Correct and incorrect feedback use text, not color alone.
- Reset is an explicit button rather than an unlabeled icon.

## Content integrity

Tests verify that every prediction:

- has at least two options;
- has unique option IDs;
- references a correct option that actually exists.

## Known limitations

- Progress is limited to the current browser profile and origin.
- There is one prediction checkpoint per lesson.
- Incorrect-attempt counts are not recorded.
- There are no graduated hints or answer explanations beyond feedback text.
- Full browser keyboard behavior still needs future end-to-end coverage.
