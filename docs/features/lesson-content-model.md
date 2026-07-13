# Lesson Content Model

## Purpose

The lesson engine turns lesson summaries, learning steps, and prediction
checkpoints into typed data rather than lesson-specific JSX. Completion is kept
outside this content model so definitions remain portable and read-only.

## Acceptance criteria

- Every lesson defines an ordered explain, predict, and practice sequence.
- Every step has a stable ID, pedagogical kind, title, and plain-text body.
- The selected lesson renders its own sequence as a semantic ordered list.
- Step kinds have visible text labels rather than color-only meaning.
- Selecting another lesson replaces the complete path without feature-specific
  rendering conditions.
- Lesson numbers and slugs are unique, and step IDs are unique across the course.
- Prediction questions define answer options, correct-answer references, and
  useful feedback.
- Semantic authoring mistakes produce actionable validation errors.
- The model introduces no content parser, arbitrary HTML, or new dependency.

## Model

```ts
type LessonStepKind = 'explain' | 'predict' | 'practice'

interface BaseLessonStep {
  readonly id: string
  readonly title: string
  readonly body: string
}

interface PredictionOption {
  readonly id: string
  readonly label: string
}

interface PredictionStep extends BaseLessonStep {
  readonly kind: 'predict'
  readonly question: string
  readonly options: readonly PredictionOption[]
  readonly correctOptionId: string
  readonly successFeedback: string
  readonly retryFeedback: string
}

interface ExplanationStep extends BaseLessonStep {
  readonly kind: 'explain'
}

interface PracticeStep extends BaseLessonStep {
  readonly kind: 'practice'
}

type LessonStep = ExplanationStep | PredictionStep | PracticeStep
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
- `lessonValidation.ts` protects relationships TypeScript cannot express, such
  as course-wide uniqueness, sequence order, and correct-answer references.
- `lessons.test.ts` keeps focused regression checks for bundled content.

## Why plain text first?

Markdown, embedded JSX, or arbitrary HTML would require parsing, sanitization,
authoring rules, and more complex testing. Current content does not need those
capabilities. Plain text is safe, portable, and sufficient to validate the
lesson-engine boundary.

## Known limitations

- Each lesson currently has exactly one three-step sequence.
- Practice steps cannot yet define code examples, media, or simulations.
- Content is trusted TypeScript rather than parsed external data.
- Completion state intentionally lives outside lesson definitions.
- Lesson content is bundled into the application.
