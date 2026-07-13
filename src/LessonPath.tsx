import { lessonStepLabels, type Lesson, type LessonStepKind } from './lessons'

const stepKindMarks = {
  explain: 'i',
  predict: '?',
  practice: '→',
} as const satisfies Record<LessonStepKind, string>

export function LessonPath({ lesson }: { lesson: Lesson }) {
  return (
    <section className="lesson-path" aria-labelledby="lesson-path-title">
      <div className="lesson-path__heading">
        <div>
          <p className="eyebrow">Learning sequence</p>
          <h2 id="lesson-path-title">Lesson path</h2>
        </div>
        <p>
          Start with the idea, make a prediction, then apply what you
          understood.
        </p>
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
