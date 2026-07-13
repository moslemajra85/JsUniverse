import type { LessonDefinition } from './lessons'

const identifierPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const expectedStepKinds = ['explain', 'predict', 'practice'] as const

function addRequiredTextIssue(value: string, path: string, issues: string[]) {
  if (!value.trim()) {
    issues.push(`${path}: provide non-empty text.`)
  }
}

function addIdentifierIssue(value: string, path: string, issues: string[]) {
  if (!identifierPattern.test(value)) {
    issues.push(
      `${path}: use a lowercase kebab-case identifier; received ${JSON.stringify(value)}.`,
    )
  }
}

function addDuplicateIssue<Value extends string | number>(
  value: Value,
  path: string,
  firstPathByValue: Map<Value, string>,
  issues: string[],
) {
  const firstPath = firstPathByValue.get(value)

  if (firstPath) {
    issues.push(
      `${path}: ${JSON.stringify(value)} is already used at ${firstPath}.`,
    )
    return
  }

  firstPathByValue.set(value, path)
}

export function validateLessonContent(
  definitions: readonly LessonDefinition[],
): readonly string[] {
  const issues: string[] = []
  const lessonNumberPaths = new Map<number, string>()
  const lessonSlugPaths = new Map<string, string>()
  const stepIdPaths = new Map<string, string>()

  if (definitions.length === 0) {
    issues.push('lessons: add at least one lesson.')
  }

  definitions.forEach((lesson, lessonIndex) => {
    const lessonPath = `lessons[${lessonIndex}]`
    const numberPath = `${lessonPath}.number`
    const slugPath = `${lessonPath}.slug`

    if (!Number.isInteger(lesson.number) || lesson.number < 1) {
      issues.push(`${numberPath}: use a positive whole number.`)
    } else if (lesson.number !== lessonIndex + 1) {
      issues.push(
        `${numberPath}: expected ${lessonIndex + 1} to match its course position; received ${lesson.number}.`,
      )
    }

    addDuplicateIssue(lesson.number, numberPath, lessonNumberPaths, issues)
    addIdentifierIssue(lesson.slug, slugPath, issues)
    addDuplicateIssue(lesson.slug, slugPath, lessonSlugPaths, issues)

    addRequiredTextIssue(lesson.phase, `${lessonPath}.phase`, issues)
    addRequiredTextIssue(lesson.title, `${lessonPath}.title`, issues)
    addRequiredTextIssue(lesson.summary, `${lessonPath}.summary`, issues)
    addRequiredTextIssue(
      lesson.canvasTitle,
      `${lessonPath}.canvasTitle`,
      issues,
    )
    addRequiredTextIssue(
      lesson.description,
      `${lessonPath}.description`,
      issues,
    )

    if (lesson.objectives.length === 0) {
      issues.push(
        `${lessonPath}.objectives: add at least one learning objective.`,
      )
    }

    const objectivePaths = new Map<string, string>()
    lesson.objectives.forEach((objective, objectiveIndex) => {
      const objectivePath = `${lessonPath}.objectives[${objectiveIndex}]`
      addRequiredTextIssue(objective, objectivePath, issues)
      addDuplicateIssue(objective, objectivePath, objectivePaths, issues)
    })

    const receivedStepKinds = lesson.steps.map((step) => step.kind)
    const hasExpectedSequence =
      receivedStepKinds.length === expectedStepKinds.length &&
      expectedStepKinds.every(
        (expectedKind, stepIndex) =>
          receivedStepKinds[stepIndex] === expectedKind,
      )

    if (!hasExpectedSequence) {
      issues.push(
        `${lessonPath}.steps: expected "${expectedStepKinds.join(' → ')}"; received "${receivedStepKinds.join(' → ')}".`,
      )
    }

    lesson.steps.forEach((step, stepIndex) => {
      const stepPath = `${lessonPath}.steps[${stepIndex}]`
      const stepIdPath = `${stepPath}.id`

      addIdentifierIssue(step.id, stepIdPath, issues)
      addDuplicateIssue(step.id, stepIdPath, stepIdPaths, issues)
      addRequiredTextIssue(step.title, `${stepPath}.title`, issues)
      addRequiredTextIssue(step.body, `${stepPath}.body`, issues)

      if (step.kind !== 'predict') {
        return
      }

      addRequiredTextIssue(step.question, `${stepPath}.question`, issues)
      addRequiredTextIssue(
        step.successFeedback,
        `${stepPath}.successFeedback`,
        issues,
      )
      addRequiredTextIssue(
        step.retryFeedback,
        `${stepPath}.retryFeedback`,
        issues,
      )

      if (step.options.length < 2) {
        issues.push(`${stepPath}.options: add at least two answer options.`)
      }

      const optionIdPaths = new Map<string, string>()
      step.options.forEach((option, optionIndex) => {
        const optionPath = `${stepPath}.options[${optionIndex}]`
        const optionIdPath = `${optionPath}.id`

        addIdentifierIssue(option.id, optionIdPath, issues)
        addDuplicateIssue(option.id, optionIdPath, optionIdPaths, issues)
        addRequiredTextIssue(option.label, `${optionPath}.label`, issues)
      })

      if (!step.options.some((option) => option.id === step.correctOptionId)) {
        issues.push(
          `${stepPath}.correctOptionId: ${JSON.stringify(step.correctOptionId)} does not match an option ID.`,
        )
      }
    })
  })

  return issues
}

export function defineLessons<
  const Definitions extends readonly LessonDefinition[],
>(definitions: Definitions): Definitions {
  const issues = validateLessonContent(definitions)

  if (issues.length > 0) {
    throw new Error(
      `Lesson content validation failed with ${issues.length} ${
        issues.length === 1 ? 'issue' : 'issues'
      }:\n${issues.map((issue) => `- ${issue}`).join('\n')}`,
    )
  }

  return definitions
}
