# Engineering Workflow

## Why work in small slices?

A small change is easier to understand, test, review, revert, and learn from. A
commit should represent one coherent engineering decision, not simply everything
that happened during a day.

## Branch strategy

Use a short-lived branch for each feature or fix:

```bash
git switch -c docs/project-foundation
```

Later examples might be:

```text
feature/application-shell
feature/lesson-navigation
fix/preview-error-recovery
docs/local-setup
```

The repository currently uses `master`. Before enabling branch protection and CI,
we should decide whether to retain it or rename it to `main`. Documentation uses
“primary branch” until that decision is made.

## The feature cycle

### 1. Define the behavior

Write acceptance criteria before implementation. Good criteria describe observable
behavior:

```text
Given a keyboard user is on a task card,
when they initiate move mode and choose another column,
then the card moves and focus remains on that card.
```

Avoid criteria tied only to implementation details such as component names.

### 2. Identify the smallest useful slice

Do not implement creation, editing, deletion, drag-and-drop, animation, and
persistence in one branch. A useful sequence would be:

1. Render tasks from static data.
2. Add a task to in-memory state.
3. Validate task input.
4. Delete a task.
5. Move a task using keyboard controls.
6. Add pointer interaction.
7. Animate a successful move.
8. Persist the state.

Each slice should leave the application working.

### 3. Implement and test together

Choose the test level based on risk:

- **Unit test:** isolated transformations, reducers, validators, and utilities.
- **Component/integration test:** DOM behavior involving several modules.
- **End-to-end test:** a critical workflow that requires a real browser.

Do not test internal implementation merely to increase coverage. Test behavior
that would matter if it broke.

### 4. Run the local quality checks

The exact commands will be added when the stack is selected. The expected set is:

```text
format check
static analysis or linting
type checking, if used
unit and integration tests
production build
focused end-to-end tests, when justified
```

### 5. Review the change

Before committing:

```bash
git status --short
git diff
git diff --check
```

Check for accidental files, secrets, debug logging, unexplained dependencies,
missing error states, and documentation that no longer matches behavior.

### 6. Commit at a meaningful boundary

Commit when the slice is coherent and verified. Do not commit knowingly broken
behavior merely because files have changed.

Use Conventional Commit-style messages:

```text
<type>(<optional scope>): <imperative summary>
```

Common types:

- `feat`: user-visible behavior;
- `fix`: correction to broken behavior;
- `test`: tests without a behavior change;
- `docs`: documentation only;
- `refactor`: internal restructuring with equivalent behavior;
- `build`: build system or dependency changes;
- `ci`: continuous-integration or deployment automation;
- `chore`: necessary maintenance that fits no better type.

Good examples:

```text
docs: define product scope and delivery workflow
feat(lessons): render lesson objectives and steps
fix(preview): recover after student code throws an error
test(state): cover invalid task transitions
ci: verify pull requests with tests and build
```

The summary should be imperative, specific, lowercase, and normally no longer
than 72 characters. Add a body when the reason or trade-off is not obvious:

```text
feat(preview): isolate student code in a sandboxed frame

Prevent exercises from accessing the learning application's DOM. Define a
validated message boundary for runtime results and errors.
```

### 7. Push and review

After local checks and the commit:

```bash
git push -u origin <branch-name>
```

Open a pull request. The pull request explains:

- the problem;
- the chosen solution and important trade-offs;
- how it was tested;
- screenshots or recordings for visual behavior;
- known limitations or follow-up work.

Merge only after required CI checks pass and review concerns are resolved.

## When to make separate commits

Separate changes when they have different reasons or could reasonably be reverted
independently. Examples:

- project scaffolding and the first product feature;
- a behavior change and a broad unrelated refactor;
- dependency upgrades and application behavior;
- CI configuration and deployment configuration.

Tests directly proving a feature normally belong in the same commit as that
feature. Documentation directly describing the feature normally belongs there too.

## Definition of done

A feature is done when:

- its acceptance criteria are satisfied;
- relevant automated tests pass;
- local quality checks pass;
- accessibility and failure behavior have been considered;
- documentation is current;
- no secrets or unrelated changes are included;
- CI passes on the pull request;
- review is complete.

