# Product Requirements

## 1. Product goal

Help a beginner develop the mental models and practical skills required to build
maintainable interactive applications with modern vanilla JavaScript.

The product should not optimize only for lesson completion. Its real measure of
success is whether a student can transfer what they learned to a new application
without being given every step.

## 2. Target learner

The initial learner:

- understands basic HTML and CSS, or can learn the minimum prerequisites;
- has little or inconsistent JavaScript experience;
- is unfamiliar with browser internals and application architecture;
- benefits from visual explanations and immediate feedback;
- wants professional practices rather than disconnected syntax exercises.

The writing style should be friendly and concrete without being patronizing.
Every new term follows this pattern:

1. Give a plain-language explanation.
2. Show the concept visually or through behavior.
3. Name the correct technical term.
4. Use the term consistently afterward.

## 3. Core learning loop

Every substantial lesson should use this sequence:

1. **Context:** explain the problem and why it matters.
2. **Prediction:** ask what the student expects to happen.
3. **Simulation:** let the student manipulate the concept.
4. **Construction:** ask the student to write real code.
5. **Observation:** visualize the browser or application behavior.
6. **Debugging:** diagnose an intentional or natural failure.
7. **Refactoring:** improve clarity, structure, accessibility, or performance.
8. **Transfer:** apply the concept in a less-guided task.

## 4. Initial product scope

### 4.1 Learning workspace

The workspace will eventually provide synchronized areas for:

- lesson instructions;
- editable HTML, CSS, and JavaScript;
- application preview;
- test and validation feedback;
- DOM, event, or state visualization when relevant;
- hints that become progressively more explicit.

### 4.2 Curriculum areas

The first curriculum will cover:

- JavaScript values, control flow, functions, objects, arrays, and modules;
- DOM selection, creation, updates, and removal;
- browser events, propagation, delegation, forms, and keyboard interaction;
- explicit state, actions, derived data, rendering, and persistence;
- drag-and-drop using pointer, keyboard, and appropriate browser APIs;
- CSS transitions, keyframes, the Web Animations API, and performance basics;
- decomposition, module boundaries, naming, error handling, and testing.

### 4.3 Browser behavior visualizers

The long-term product may visualize:

- the DOM tree and DOM mutations;
- event capturing, targeting, and bubbling;
- state transitions and the actions that caused them;
- the relationship between state changes and rendering;
- animation timelines and frames;
- task decomposition and module responsibilities.

These visualizers must support learning goals. They should be collapsible and
must not prevent a student from working directly with code.

## 5. Flagship project

Students will build an animated task board through progressive milestones. This
single project connects DOM work, events, state, persistence, animation,
accessibility, architecture, and testing.

The task board must eventually support:

- creating, editing, deleting, filtering, and searching tasks;
- moving tasks between columns;
- mouse, touch, and keyboard interaction;
- clear visual feedback and reduced-motion preferences;
- explicit application state and predictable state transitions;
- local persistence;
- undo and redo;
- focused modules and automated tests.

## 6. Functional requirements for the first usable release

The first usable release should allow a student to:

- open a lesson and understand its objective;
- edit starter code;
- run code in an isolated preview;
- receive clear success or failure feedback;
- reset an exercise safely;
- request graduated hints;
- retain lesson progress;
- complete one coherent mini-project.

Exact acceptance criteria will be defined separately for each feature before
implementation.

## 7. Non-functional requirements

### Accessibility

- Core workflows must be usable with a keyboard.
- Focus must remain visible and predictable.
- Color must not be the only way information is communicated.
- Animations must honor reduced-motion preferences.
- Semantic HTML and appropriate accessible names are required.

### Performance

- Typing and preview feedback should feel immediate on a typical student laptop.
- Visualizations must not make the editor unusable.
- Animation should favor `transform` and `opacity` where appropriate.
- Concrete performance budgets will be recorded after the first working slice.

### Security

- Student code must not execute with access to the parent application's DOM.
- Communication with the code preview must use an explicit, validated protocol.
- Secrets must never be embedded in client-side code or committed to Git.
- Dependencies and deployment permissions should use least privilege.

### Reliability and maintainability

- State transitions and lesson validation must be deterministic where possible.
- User-facing failures must provide a recovery path.
- Behavior changes require proportionate automated tests.
- Architecture decisions with long-term consequences must be recorded.

## 8. Out of scope for the initial release

- Framework-specific courses;
- multiplayer editing;
- a complete learning-management system;
- unrestricted AI code generation;
- a full JavaScript debugger or execution engine;
- hundreds of lessons;
- native mobile applications;
- decorative 3D experiences.

These features may be reconsidered only after the core learning loop is validated.

## 9. Product success measures

Initial evidence should include:

- lesson completion and exercise retry rates;
- where students request hints or abandon an exercise;
- whether students can complete a transfer exercise with reduced guidance;
- accessibility and usability findings from observed learner sessions;
- application error rate and preview startup reliability.

Completion rate alone is insufficient because it can reward overly easy lessons.

## 10. Open decisions

- Exact age range and prerequisite level;
- whether accounts are required for the earliest prototype;
- technology stack and hosting platform;
- how lesson content is authored and versioned;
- how much code instrumentation the first release needs;
- privacy boundaries for student code and learning analytics.

Open decisions should be resolved as late as responsibly possible, with evidence
from the feature currently being built.
