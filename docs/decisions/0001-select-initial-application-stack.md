# ADR 0001: Select the Initial Application Stack

- Status: accepted
- Date: 2026-07-13

## Context

JavaScript Adventure Lab needs a maintainable interface for lesson navigation,
editing, previews, feedback, visualizations, and student progress. The code that
powers the learning platform is separate from the vanilla JavaScript that a
student writes inside an isolated exercise environment.

The initial stack should provide fast feedback, strong type checking, accessible
component composition, and uncomplicated static deployment. It should not add a
server framework, global state library, CSS framework, or animation library before
a concrete requirement justifies one.

## Decision

Use:

- React for the learning-platform interface;
- TypeScript with strict checking for application code;
- Vite for local development and production builds;
- plain CSS with custom properties for the initial visual system;
- Oxlint and Prettier for static analysis and formatting;
- Vitest and Testing Library for unit and DOM integration tests;
- Playwright later, when a critical real-browser workflow exists;
- GitHub Actions for continuous integration in a separate milestone.

The project supports Node.js 22.12 or newer. The version is documented in
`.nvmrc`, `package.json`, and eventually the CI workflow.

Student exercises will use real vanilla JavaScript and browser APIs. React will
not be injected into student code or presented as a prerequisite for understanding
the DOM and state-management fundamentals.

## Alternatives considered

### Build the entire platform with vanilla JavaScript

This would align the platform implementation with the subject being taught and
remove a runtime dependency. However, the product is expected to develop many
coordinated interface states. Building and maintaining those platform mechanics
would consume effort that does not directly improve the student's vanilla
JavaScript experience.

### Use Next.js

Next.js provides routing, server rendering, and server-side capabilities. The
first milestones do not require those capabilities, and adopting them now would
introduce deployment and rendering decisions before their requirements exist.

### Add a global state-management library

No current feature demonstrates the need for one. React's local state and focused
domain functions are sufficient for the foundation. This decision can be revisited
if cross-feature state coordination becomes difficult.

### Add a component or CSS framework

A third-party design system would speed up generic interface construction but
could constrain the product's visual identity and add abstractions that the team
must learn. A small token-based CSS foundation is sufficient until repeated UI
patterns emerge.

## Consequences

- The team must keep the platform architecture distinct from the vanilla
  JavaScript curriculum.
- TypeScript makes some changes more explicit but adds a compilation step.
- Vite enables quick local feedback and static deployment, but does not provide a
  backend or account system.
- Avoiding early state, style, and animation libraries keeps the dependency
  surface small but requires us to establish focused conventions as features grow.
- A future backend can be added behind an explicit boundary when accounts,
  synchronized progress, or authoring workflows require it.
