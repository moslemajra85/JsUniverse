# JavaScript Adventure Lab

[![Continuous Integration](https://github.com/moslemajra85/JsUniverse/actions/workflows/ci.yml/badge.svg)](https://github.com/moslemajra85/JsUniverse/actions/workflows/ci.yml)

JavaScript Adventure Lab is an interactive learning environment for mastering
modern vanilla JavaScript, the DOM, state management, application architecture,
drag-and-drop interactions, and purposeful web animation.

The product is designed for intelligent beginners. It explains new terminology
in plain language, then introduces the precise engineering vocabulary students
will encounter in professional work.

## Current status

The project has a runnable React and TypeScript application foundation with
continuous integration. Product features have not been implemented yet. The next
milestone is the accessible learning-workspace shell.

## Local development

Requirements:

- Node.js 22.12 or newer;
- npm 10 or newer.

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Run all local quality checks:

```bash
npm run format:check
npm run lint
npm run typecheck
npm test
npm run build
```

## Product principles

- Make invisible browser behavior visible.
- Teach one concept at a time without removing technical depth.
- Ask students to predict, experiment, code, debug, and refactor.
- Teach the problem before introducing a pattern or abstraction.
- Prefer real browser APIs over hidden magic.
- Treat accessibility, testing, and maintainability as core engineering skills.
- Use animation to explain change or provide feedback, not as decoration.

## Documentation

- [Product requirements](docs/product-requirements.md)
- [Delivery roadmap](docs/roadmap.md)
- [Engineering workflow](docs/engineering-workflow.md)
- [CI/CD guide](docs/ci-cd.md)
- [Contributing guide](CONTRIBUTING.md)
- [Architecture decisions](docs/decisions/README.md)

## Planned first learning path

The first complete path will teach students to build an animated task board:

1. Render task cards from data.
2. Add and validate tasks.
3. Manage application state explicitly.
4. Filter and search tasks.
5. Move cards using drag-and-drop.
6. Add purposeful, accessible animation.
7. Persist work locally.
8. Add undo and redo.
9. Refactor the application into focused modules.
10. Test important behavior.

## Working agreement

Development proceeds in small, reviewable slices. Each behavior change must
include appropriate tests and documentation before it is committed. A feature
is not complete merely because it works on one developer's machine.

See the [engineering workflow](docs/engineering-workflow.md) for the exact
feature, test, commit, and push cycle.
