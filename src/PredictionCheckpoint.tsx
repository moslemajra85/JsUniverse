import { useState, type FormEvent } from 'react'
import type { PredictionStep } from './lessons'

type AttemptStatus = 'idle' | 'incorrect' | 'correct'

interface PredictionCheckpointProps {
  readonly step: PredictionStep
  readonly onComplete: () => void
  readonly onReset: () => void
}

export function PredictionCheckpoint({
  step,
  onComplete,
  onReset,
}: PredictionCheckpointProps) {
  const [selectedOptionId, setSelectedOptionId] = useState('')
  const [status, setStatus] = useState<AttemptStatus>('idle')
  const isComplete = status === 'correct'
  const questionId = `${step.id}-question`

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!selectedOptionId) {
      return
    }

    if (selectedOptionId === step.correctOptionId) {
      setStatus('correct')
      onComplete()
      return
    }

    setStatus('incorrect')
  }

  function handleReset() {
    setSelectedOptionId('')
    setStatus('idle')
    onReset()
  }

  const feedback =
    status === 'correct'
      ? step.successFeedback
      : status === 'incorrect'
        ? step.retryFeedback
        : ''

  return (
    <form className="checkpoint" onSubmit={handleSubmit}>
      <fieldset disabled={isComplete}>
        <legend id={questionId}>{step.question}</legend>
        <div className="checkpoint__options">
          {step.options.map((option) => (
            <label
              className={`checkpoint-option${
                selectedOptionId === option.id
                  ? ' checkpoint-option--selected'
                  : ''
              }`}
              key={option.id}
            >
              <input
                type="radio"
                name={`checkpoint-${step.id}`}
                value={option.id}
                checked={selectedOptionId === option.id}
                onChange={() => {
                  setSelectedOptionId(option.id)
                  if (status === 'incorrect') {
                    setStatus('idle')
                  }
                }}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="checkpoint__footer">
        {isComplete ? (
          <button
            type="button"
            className="checkpoint__reset"
            onClick={handleReset}
          >
            Reset checkpoint
          </button>
        ) : (
          <button
            type="submit"
            className="checkpoint__submit"
            disabled={!selectedOptionId}
          >
            Check prediction
          </button>
        )}

        <p
          className={`checkpoint__feedback checkpoint__feedback--${status}`}
          aria-live="polite"
        >
          {feedback}
        </p>
      </div>
    </form>
  )
}
