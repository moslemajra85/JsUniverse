# Delivery Roadmap

This roadmap is ordered by risk and learning value. It is not a promise of dates.
Each milestone should produce a testable, reviewable result.

## Milestone 0: Engineering foundation

- [x] Establish product requirements and contribution rules.
- [x] Select the initial stack and record the decision.
- [x] Scaffold the application without sample-feature clutter.
- [x] Add formatting, static analysis, and unit-test commands.
- [x] Add continuous integration for pull requests and the primary branch.
- [x] Document local setup and current environment requirements.

**Exit criteria:** a new contributor can install dependencies, start the app, run
all checks, and understand why the initial stack was selected.

## Milestone 1: Application shell

- [x] Create the responsive learning-workspace layout.
- [x] Add navigation between a lesson list and one lesson.
- [x] Establish accessible focus behavior and reduced-motion foundations.
- [x] Add a minimal design-token system.

**Exit criteria:** the shell is keyboard accessible, responsive, tested, and
deployable, even though the lesson content is still static.

## Milestone 2: Lesson engine

- Define the smallest lesson-content model.
- Render explanations, objectives, steps, and checkpoints.
- Support progress through a lesson and safe reset behavior.
- Validate content with useful author-facing errors.

**Exit criteria:** one static lesson can be authored as data and completed through
the UI without feature-specific conditionals.

## Milestone 3: Code workspace and isolated preview

- Add HTML, CSS, and JavaScript editing.
- Execute student work inside a sandboxed preview.
- Define and validate messages between the application and preview.
- Capture runtime errors and explain them clearly.

**Exit criteria:** student code cannot directly access the parent application,
and common failures do not require refreshing the entire product.

## Milestone 4: Exercise validation and hints

- Evaluate explicit exercise outcomes.
- Show actionable feedback rather than only pass or fail.
- Add graduated hints and track attempts locally.
- Build the first complete mini-lesson.

**Exit criteria:** a student can complete, fail, retry, request help, and reset an
exercise without losing unrelated progress.

## Milestone 5: DOM and event visualizers

- Visualize selected DOM nodes and mutations.
- Simulate event capture, target, and bubble phases.
- Synchronize visual steps with relevant source code.

**Exit criteria:** usability testing indicates that the visualizer improves
understanding rather than merely adding animation.

## Milestone 6: State management learning path

- Visualize state, actions, transitions, derived data, and rendering.
- Teach pure state updates before introducing reducer terminology.
- Add debugging and refactoring exercises.

**Exit criteria:** a learner can explain the difference between application state
and the DOM and can implement a predictable state transition.

## Milestone 7: Flagship interactive task board

- Build task management incrementally.
- Add accessible drag-and-drop for pointer, touch, and keyboard input.
- Add purposeful animations and reduced-motion behavior.
- Add persistence, undo, redo, modularization, and tests.

**Exit criteria:** a learner can complete a reduced-guidance transfer project and
explain the main architectural boundaries.

## Milestone 8: Production delivery

- Add preview deployments for pull requests if the host supports them.
- Define staging and production environments.
- Add controlled production deployment and rollback instructions.
- Add error monitoring, privacy-aware analytics, and operational documentation.

**Exit criteria:** a failed build cannot reach production, deployments are
observable, and the previous stable version can be restored.

## Feature delivery checklist

Every roadmap item is divided into the smallest useful vertical slice. Before a
slice is considered complete:

- acceptance criteria are written;
- implementation follows existing conventions;
- appropriate tests pass locally;
- accessibility and error states are considered;
- documentation reflects the resulting behavior;
- CI passes;
- the commit contains one coherent reason for change.
