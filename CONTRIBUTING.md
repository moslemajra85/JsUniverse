# Contributing

Thank you for improving JavaScript Adventure Lab. This project values small,
well-reasoned changes that leave the application understandable and working.

## Before starting

1. Read the [product requirements](docs/product-requirements.md).
2. Check the [roadmap](docs/roadmap.md) and existing issues.
3. Write observable acceptance criteria for the proposed change.
4. Confirm that the change is the smallest useful slice of the problem.

## Local development

Setup and validation commands will be documented here after the initial stack is
selected. Until then, no dependency or runtime requirement is implied.

## Change requirements

- Follow existing naming, structure, and formatting conventions.
- Add the smallest abstraction that solves the demonstrated problem.
- Add tests proportionate to the behavior and risk.
- Preserve keyboard use, focus behavior, semantic markup, and reduced-motion
  support where relevant.
- Update documentation in the same change when behavior or setup changes.
- Never commit credentials, local environment files, or generated build output.

## Pull requests

A pull request should state:

- what problem it solves;
- why the chosen approach is appropriate;
- how reviewers can verify it;
- what tests were added or run;
- any trade-offs, limitations, or intentional follow-up work.

Keep refactoring separate from behavior changes unless the refactor is small and
necessary to implement the behavior safely.

## Commits

Use focused Conventional Commit-style messages. See the
[engineering workflow](docs/engineering-workflow.md) for types, examples, and the
complete development cycle.

