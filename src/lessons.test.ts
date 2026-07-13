import { describe, expect, it } from 'vitest'
import { lessons } from './lessons'

describe('lesson content', () => {
  it('uses unique lesson numbers and slugs', () => {
    expect(new Set(lessons.map((lesson) => lesson.number)).size).toBe(
      lessons.length,
    )
    expect(new Set(lessons.map((lesson) => lesson.slug)).size).toBe(
      lessons.length,
    )
  })

  it.each(lessons)('$title follows the initial learning sequence', (lesson) => {
    expect(lesson.steps.map((step) => step.kind)).toEqual([
      'explain',
      'predict',
      'practice',
    ])
    expect(new Set(lesson.steps.map((step) => step.id)).size).toBe(
      lesson.steps.length,
    )

    const predictionStep = lesson.steps.find((step) => step.kind === 'predict')
    expect(predictionStep).toBeDefined()

    if (!predictionStep || predictionStep.kind !== 'predict') {
      return
    }

    expect(predictionStep.options.length).toBeGreaterThanOrEqual(2)
    expect(
      new Set(predictionStep.options.map((option) => option.id)).size,
    ).toBe(predictionStep.options.length)
    expect(
      predictionStep.options.some(
        (option) => option.id === predictionStep.correctOptionId,
      ),
    ).toBe(true)
  })
})
