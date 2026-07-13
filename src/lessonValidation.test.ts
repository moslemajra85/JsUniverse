import { describe, expect, it } from 'vitest'
import { defineLessons, validateLessonContent } from './lessonValidation'
import { lessons, type LessonDefinition, type PredictionStep } from './lessons'

function createValidLesson(
  number = 1,
  slug = `lesson-${number}`,
): LessonDefinition {
  return {
    number,
    slug,
    phase: 'Foundation',
    title: `Lesson ${number}`,
    summary: 'A focused lesson summary.',
    canvasTitle: 'A focused workspace',
    description: 'A useful lesson description.',
    objectives: ['Understand one useful idea'],
    steps: [
      {
        id: `${slug}-explain`,
        kind: 'explain',
        title: 'Understand the idea',
        body: 'A plain-language explanation.',
      },
      {
        id: `${slug}-predict`,
        kind: 'predict',
        title: 'Predict the result',
        body: 'Commit to an answer before checking.',
        question: 'Which answer is correct?',
        options: [
          { id: 'correct-answer', label: 'The correct answer' },
          { id: 'other-answer', label: 'Another answer' },
        ],
        correctOptionId: 'correct-answer',
        successFeedback: 'Correct, and here is why.',
        retryFeedback: 'Try tracing the idea one step at a time.',
      },
      {
        id: `${slug}-practice`,
        kind: 'practice',
        title: 'Apply the idea',
        body: 'Use the idea in one concrete task.',
      },
    ],
  }
}

function getPredictionStep(lesson: LessonDefinition): PredictionStep {
  const predictionStep = lesson.steps.find((step) => step.kind === 'predict')

  if (!predictionStep) {
    throw new Error('The test lesson must contain a prediction step')
  }

  return predictionStep
}

describe('lesson content validation', () => {
  it('accepts the bundled lesson content', () => {
    expect(validateLessonContent(lessons)).toEqual([])
  })

  it('requires at least one lesson', () => {
    expect(validateLessonContent([])).toEqual([
      'lessons: add at least one lesson.',
    ])
  })

  it('reports duplicate course identities with both locations', () => {
    const firstLesson = createValidLesson(1, 'same-lesson')
    const secondLesson = {
      ...createValidLesson(2, 'second-lesson'),
      slug: 'same-lesson',
      steps: firstLesson.steps,
    }

    expect(validateLessonContent([firstLesson, secondLesson])).toEqual(
      expect.arrayContaining([
        'lessons[1].slug: "same-lesson" is already used at lessons[0].slug.',
        'lessons[1].steps[0].id: "same-lesson-explain" is already used at lessons[0].steps[0].id.',
        'lessons[1].steps[1].id: "same-lesson-predict" is already used at lessons[0].steps[1].id.',
        'lessons[1].steps[2].id: "same-lesson-practice" is already used at lessons[0].steps[2].id.',
      ]),
    )
  })

  it('reports missing author text and an invalid learning sequence', () => {
    const validLesson = createValidLesson()
    const invalidLesson: LessonDefinition = {
      ...validLesson,
      title: '   ',
      objectives: [],
      steps: [validLesson.steps[1], validLesson.steps[0], validLesson.steps[2]],
    }

    expect(validateLessonContent([invalidLesson])).toEqual(
      expect.arrayContaining([
        'lessons[0].title: provide non-empty text.',
        'lessons[0].objectives: add at least one learning objective.',
        'lessons[0].steps: expected "explain → predict → practice"; received "predict → explain → practice".',
      ]),
    )
  })

  it('aggregates actionable prediction-option errors', () => {
    const validLesson = createValidLesson()
    const predictionStep = getPredictionStep(validLesson)
    const invalidPrediction: PredictionStep = {
      ...predictionStep,
      question: '',
      options: [
        { id: 'same-answer', label: '   ' },
        { id: 'same-answer', label: 'Another answer' },
      ],
      correctOptionId: 'missing-answer',
    }
    const invalidLesson: LessonDefinition = {
      ...validLesson,
      steps: [validLesson.steps[0], invalidPrediction, validLesson.steps[2]],
    }

    const issues = validateLessonContent([invalidLesson])

    expect(issues).toEqual(
      expect.arrayContaining([
        'lessons[0].steps[1].question: provide non-empty text.',
        'lessons[0].steps[1].options[0].label: provide non-empty text.',
        'lessons[0].steps[1].options[1].id: "same-answer" is already used at lessons[0].steps[1].options[0].id.',
        'lessons[0].steps[1].correctOptionId: "missing-answer" does not match an option ID.',
      ]),
    )
    expect(() => defineLessons([invalidLesson])).toThrowError(
      /Lesson content validation failed with 4 issues:/,
    )

    const singleOptionPrediction: PredictionStep = {
      ...predictionStep,
      options: predictionStep.options.slice(0, 1),
    }
    const singleOptionLesson: LessonDefinition = {
      ...validLesson,
      steps: [
        validLesson.steps[0],
        singleOptionPrediction,
        validLesson.steps[2],
      ],
    }

    expect(validateLessonContent([singleOptionLesson])).toContain(
      'lessons[0].steps[1].options: add at least two answer options.',
    )
  })

  it('explains invalid numbering and identifier formats', () => {
    const invalidLesson: LessonDefinition = {
      ...createValidLesson(),
      number: 0,
      slug: 'Not URL Safe',
    }

    expect(validateLessonContent([invalidLesson])).toEqual(
      expect.arrayContaining([
        'lessons[0].number: use a positive whole number.',
        'lessons[0].slug: use a lowercase kebab-case identifier; received "Not URL Safe".',
      ]),
    )
  })
})
