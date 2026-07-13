import { defaultLesson, getLessonHash, lessons, type Lesson } from './lessons'
import { useLessonNavigation } from './useLessonNavigation'

export function App() {
  const { activeLesson, hasNavigated, lessonWorkspaceRef, navigateToLesson } =
    useLessonNavigation()

  return (
    <>
      <a className="skip-link" href="#lesson-workspace">
        Skip to lesson workspace
      </a>

      <div className="app-shell">
        <header className="topbar" id="top">
          <a
            className="brand"
            href={getLessonHash(defaultLesson.slug)}
            aria-label="JavaScript Adventure Lab home"
            onClick={(event) => {
              event.preventDefault()
              navigateToLesson(defaultLesson)
            }}
          >
            <span className="brand__mark" aria-hidden="true">
              <span>{'{ }'}</span>
            </span>
            <span className="brand__name">
              JavaScript <strong>Adventure Lab</strong>
            </span>
          </a>

          <div className="course-progress">
            <span className="course-progress__label">Foundation path</span>
            <progress
              aria-label={`Viewing lesson ${activeLesson.number} of 8`}
              max="8"
              value={activeLesson.number}
            />
            <span className="course-progress__value">
              {activeLesson.number} / 8
            </span>
          </div>
        </header>

        <div className="workspace-layout">
          <aside className="curriculum-panel">
            <nav aria-labelledby="curriculum-title">
              <div className="curriculum-panel__heading">
                <p className="eyebrow">Learning path</p>
                <h2 id="curriculum-title">JavaScript foundations</h2>
              </div>

              <ol className="lesson-list">
                {lessons.map((lesson) => {
                  const isCurrent = lesson.slug === activeLesson.slug

                  return (
                    <li key={lesson.number}>
                      <a
                        className={`lesson-link${
                          isCurrent ? ' lesson-link--current' : ''
                        }`}
                        href={getLessonHash(lesson.slug)}
                        aria-current={isCurrent ? 'page' : undefined}
                        aria-label={
                          isCurrent
                            ? `${lesson.title}, current lesson`
                            : lesson.title
                        }
                        onClick={(event) => {
                          event.preventDefault()
                          navigateToLesson(lesson)
                        }}
                      >
                        <LessonLabel lesson={lesson} isCurrent={isCurrent} />
                      </a>
                    </li>
                  )
                })}
              </ol>
            </nav>

            <p className="curriculum-note">
              Choose a lesson to preview its learning goal.
            </p>
          </aside>

          <main
            className={`lesson-workspace${
              hasNavigated ? ' lesson-workspace--transitioning' : ''
            }`}
            id="lesson-workspace"
            key={activeLesson.slug}
            ref={lessonWorkspaceRef}
            tabIndex={-1}
          >
            <div className="lesson-header">
              <div>
                <p className="eyebrow">
                  Lesson {String(activeLesson.number).padStart(2, '0')} ·{' '}
                  {activeLesson.phase}
                </p>
                <h1>{activeLesson.title}</h1>
                <p className="lesson-header__summary">{activeLesson.summary}</p>
              </div>

              <span className="lesson-status">
                <span aria-hidden="true" /> {activeLesson.phase}
              </span>
            </div>

            <div className="lesson-grid">
              <section className="lesson-canvas" aria-labelledby="canvas-title">
                <div className="panel-heading">
                  <span className="panel-heading__index" aria-hidden="true">
                    {String(activeLesson.number).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="eyebrow">Your workspace</p>
                    <h2 id="canvas-title">{activeLesson.canvasTitle}</h2>
                  </div>
                </div>

                <div className="browser-preview" aria-hidden="true">
                  <div className="browser-preview__bar">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="browser-preview__content">
                    <span className="code-token code-token--wide" />
                    <span className="code-token" />
                    <span className="code-token code-token--accent" />
                    <span className="preview-node">DOM</span>
                  </div>
                </div>

                <p className="lesson-canvas__description">
                  {activeLesson.description}
                </p>
              </section>

              <aside className="lesson-guide" aria-labelledby="guide-title">
                <p className="eyebrow">Lesson guide</p>
                <h2 id="guide-title">What you will understand</h2>
                <ul className="objective-list">
                  {activeLesson.objectives.map((objective) => (
                    <li key={objective}>{objective}</li>
                  ))}
                </ul>

                <div className="mentor-note">
                  <span className="mentor-note__icon" aria-hidden="true">
                    ?
                  </span>
                  <div>
                    <h3>Plain words first</h3>
                    <p>
                      Every new term will start with a simple explanation, then
                      gain its professional name.
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

function LessonLabel({
  lesson,
  isCurrent,
}: {
  lesson: Lesson
  isCurrent: boolean
}) {
  return (
    <>
      <span className="lesson-link__number" aria-hidden="true">
        {String(lesson.number).padStart(2, '0')}
      </span>
      <span className="lesson-link__content">
        <span className="lesson-link__title">{lesson.title}</span>
        <span className="lesson-link__status">
          {isCurrent ? 'Current lesson' : 'Available lesson'}
        </span>
      </span>
    </>
  )
}
