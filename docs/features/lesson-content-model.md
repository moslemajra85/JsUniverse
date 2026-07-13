# Lesson Content Model

## Purpose

The first lesson-engine slice turns lesson summaries into ordered learning paths.
Each selected lesson now renders content from typed data rather than relying on
lesson-specific JSX.

This slice is deliberately read-only. Interactive checkpoints, completion state,
hints, and persistence will be introduced only after the content boundary is
stable.

## Acceptance criteria

- Every lesson defines an ordered explain, predict, and practice sequence.
- Every step has a stable ID, pedagogical kind, title, and plain-text body.
- The selected lesson renders its own sequence as a semantic ordered list.
- Step kinds have visible text labels rather than color-only meaning.
- Selecting another lesson replaces the complete path without feature-specific
  rendering conditions.
- Lesson numbers and slugs are unique, and step IDs are unique within a lesson.
- The model introduces no content parser, arbitrary HTML, or new dependency.

## Model

```ts
type LessonStepKind = 'explain' | 'predict' | 'practice'

interface LessonStep {
  readonly id: string
  readonly kind: LessonStepKind
  readonly title: string
  readonly body: string
}
```

The sequence mirrors the product's teaching method:

1. **Explain:** establish an accurate mental model in plain language.
2. **Predict:** make the learner commit to an expectation before seeing a result.
3. **Practice:** apply the idea to a concrete engineering task.

## Responsibility boundaries

- `lessons.ts` owns content and the smallest shared content types.
- `LessonPath` owns semantic step rendering and kind presentation.
- `App` chooses the active lesson and composes the path; it does not inspect step
  kinds.
- `lessons.test.ts` protects content invariants that TypeScript cannot express,
  such as runtime uniqueness and required sequence order.

## Why plain text first?

Markdown, embedded JSX, or arbitrary HTML would require parsing, sanitization,
authoring rules, and more complex testing. Current content does not need those
capabilities. Plain text is safe, portable, and sufficient to validate the
lesson-engine boundary.

## Known limitations

- Each lesson currently has exactly one three-step sequence.
- Steps cannot contain code examples, media, simulations, or interactive inputs.
- Content validation runs in tests rather than when external content is loaded.
- Steps have no completion state.
- Lesson content is bundled into the application.
