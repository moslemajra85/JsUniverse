import { PredictionCheckpoint } from './PredictionCheckpoint'
import { lessonStepLabels, type Lesson, type LessonStepKind } from './lessons'

const stepKindMarks = {
  explain: 'i',
  predict: '?',
  practice: '→',
} as const satisfies Record<LessonStepKind, string>

interface LessonPathProps {
  readonly lesson: Lesson
  readonly completedStepIds: ReadonlySet<string>
  readonly isStorageAvailable: boolean
  readonly onCheckpointComplete: (stepId: string) => void
  readonly onCheckpointReset: (stepId: string) => void
}

export function LessonPath({
  lesson,
  completedStepIds,
  isStorageAvailable,
  onCheckpointComplete,
  onCheckpointReset,
}: LessonPathProps) {
  const predictionSteps = lesson.steps.filter((step) => step.kind === 'predict')
  const completedCheckpointCount = predictionSteps.filter((step) =>
    completedStepIds.has(step.id),
  ).length

  return (
    <section className="lesson-path" aria-labelledby="lesson-path-title">
      <div className="lesson-path__heading">
        <div>
          <p className="eyebrow">Learning sequence</p>
          <h2 id="lesson-path-title">Lesson path</h2>
        </div>
        <div className="lesson-path__summary">
          <p>
            Start with the idea, make a prediction, then apply what you
            understood.
          </p>
          <p className="checkpoint-progress" role="status" aria-live="polite">
            <strong>{completedCheckpointCount}</strong> of{' '}
            {predictionSteps.length} checkpoint complete
          </p>
          <p className="checkpoint-storage-note" aria-live="polite">
            {isStorageAvailable
              ? 'Progress is saved in this browser.'
              : 'Progress is available for this session but could not be saved.'}
          </p>
        </div>
      </div>

      <ol className="step-list">
        {lesson.steps.map((step, index) => (
          <li key={step.id}>
            <article className={`lesson-step lesson-step--${step.kind}`}>
              <div className="lesson-step__meta">
                <span className="lesson-step__number" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="lesson-step__kind">
                  <StepKindMark kind={step.kind} />
                  {lessonStepLabels[step.kind]}
                </span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              {step.kind === 'predict' ? (
                <PredictionCheckpoint
                  step={step}
                  isComplete={completedStepIds.has(step.id)}
                  onComplete={() => onCheckpointComplete(step.id)}
                  onReset={() => onCheckpointReset(step.id)}
                />
              ) : null}
            </article>
          </li>
        ))}
      </ol>
    </section>
  )
}

function StepKindMark({ kind }: { kind: LessonStepKind }) {
  return (
    <span className="lesson-step__mark" aria-hidden="true">
      {stepKindMarks[kind]}
    </span>
  )
}
