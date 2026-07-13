import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { PredictionCheckpoint } from './PredictionCheckpoint'
import { lessons } from './lessons'

const predictionStep = lessons[0].steps[1]

if (predictionStep.kind !== 'predict') {
  throw new Error('The test fixture must be a prediction step')
}

describe('PredictionCheckpoint', () => {
  it('requires a selection and gives retry feedback without completing', () => {
    const onComplete = vi.fn()

    render(
      <PredictionCheckpoint
        step={predictionStep}
        isComplete={false}
        onComplete={onComplete}
        onReset={vi.fn()}
      />,
    )

    const submitButton = screen.getByRole('button', {
      name: 'Check prediction',
    })
    expect(submitButton).toBeDisabled()

    fireEvent.click(
      screen.getByRole('radio', {
        name: 'The original HTML file reloads automatically',
      }),
    )
    fireEvent.click(submitButton)

    expect(screen.getByText(predictionStep.retryFeedback)).toBeInTheDocument()
    expect(onComplete).not.toHaveBeenCalled()
  })

  it('completes a correct prediction and resets safely', () => {
    const onComplete = vi.fn()
    const onReset = vi.fn()

    const view = render(
      <PredictionCheckpoint
        step={predictionStep}
        isComplete={false}
        onComplete={onComplete}
        onReset={onReset}
      />,
    )

    const correctOption = screen.getByRole('radio', {
      name: 'The registered JavaScript event listener runs',
    })
    fireEvent.click(correctOption)
    fireEvent.click(screen.getByRole('button', { name: 'Check prediction' }))

    expect(onComplete).toHaveBeenCalledOnce()

    view.rerender(
      <PredictionCheckpoint
        step={predictionStep}
        isComplete
        onComplete={onComplete}
        onReset={onReset}
      />,
    )

    expect(screen.getByText(predictionStep.successFeedback)).toBeInTheDocument()
    expect(correctOption).toBeDisabled()

    fireEvent.click(screen.getByRole('button', { name: 'Reset checkpoint' }))

    expect(onReset).toHaveBeenCalledOnce()

    view.rerender(
      <PredictionCheckpoint
        step={predictionStep}
        isComplete={false}
        onComplete={onComplete}
        onReset={onReset}
      />,
    )

    expect(correctOption).not.toBeChecked()
    expect(correctOption).not.toBeDisabled()
    expect(
      screen.getByRole('button', { name: 'Check prediction' }),
    ).toBeDisabled()
  })

  it('restores a completed checkpoint from parent progress', () => {
    render(
      <PredictionCheckpoint
        step={predictionStep}
        isComplete
        onComplete={vi.fn()}
        onReset={vi.fn()}
      />,
    )

    expect(
      screen.getByRole('radio', {
        name: 'The registered JavaScript event listener runs',
      }),
    ).toBeChecked()
    expect(screen.getByText(predictionStep.successFeedback)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Reset checkpoint' }),
    ).toBeInTheDocument()
  })
})
