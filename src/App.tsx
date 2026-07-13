const curriculumLessons = [
  {
    number: 1,
    title: 'Meet the browser',
    status: 'current',
  },
  {
    number: 2,
    title: 'Values and variables',
    status: 'upcoming',
  },
  {
    number: 3,
    title: 'Functions with a purpose',
    status: 'upcoming',
  },
  {
    number: 4,
    title: 'Build the DOM',
    status: 'upcoming',
  },
] as const

export function App() {
  return (
    <>
      <a className="skip-link" href="#lesson-workspace">
        Skip to lesson workspace
      </a>

      <div className="app-shell">
        <header className="topbar" id="top">
          <a
            className="brand"
            href="#top"
            aria-label="JavaScript Adventure Lab home"
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
              aria-label="Foundation path progress: 1 of 8 lessons"
              max="8"
              value="1"
            />
            <span className="course-progress__value">1 / 8</span>
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
                {curriculumLessons.map((lesson) => (
                  <li key={lesson.number}>
                    {lesson.status === 'current' ? (
                      <a
                        className="lesson-link lesson-link--current"
                        href="#lesson-workspace"
                        aria-current="page"
                        aria-label={`${lesson.title}, current lesson`}
                      >
                        <LessonLabel lesson={lesson} />
                      </a>
                    ) : (
                      <span className="lesson-link lesson-link--upcoming">
                        <LessonLabel lesson={lesson} />
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>

            <p className="curriculum-note">
              New lessons unlock as the learning engine grows.
            </p>
          </aside>

          <main
            className="lesson-workspace"
            id="lesson-workspace"
            tabIndex={-1}
          >
            <div className="lesson-header">
              <div>
                <p className="eyebrow">Lesson 01 · Orientation</p>
                <h1>Meet the browser</h1>
                <p className="lesson-header__summary">
                  Learn what happens between writing JavaScript and seeing a
                  page respond.
                </p>
              </div>

              <span className="lesson-status">
                <span aria-hidden="true" /> Foundation
              </span>
            </div>

            <div className="lesson-grid">
              <section className="lesson-canvas" aria-labelledby="canvas-title">
                <div className="panel-heading">
                  <span className="panel-heading__index" aria-hidden="true">
                    01
                  </span>
                  <div>
                    <p className="eyebrow">Your workspace</p>
                    <h2 id="canvas-title">A place to see JavaScript think</h2>
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
                  Future lessons will place explanations, editable code, and a
                  live browser preview here. This shell establishes where each
                  learning tool belongs before behavior is introduced.
                </p>
              </section>

              <aside className="lesson-guide" aria-labelledby="guide-title">
                <p className="eyebrow">Lesson guide</p>
                <h2 id="guide-title">What you will understand</h2>
                <ul className="objective-list">
                  <li>What the browser does with HTML, CSS, and JavaScript</li>
                  <li>Why the DOM is different from the HTML source</li>
                  <li>How an event can cause visible change</li>
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

type Lesson = (typeof curriculumLessons)[number]

function LessonLabel({ lesson }: { lesson: Lesson }) {
  return (
    <>
      <span className="lesson-link__number" aria-hidden="true">
        {String(lesson.number).padStart(2, '0')}
      </span>
      <span className="lesson-link__content">
        <span className="lesson-link__title">{lesson.title}</span>
        <span className="lesson-link__status">
          {lesson.status === 'current' ? 'Current lesson' : 'Coming next'}
        </span>
      </span>
    </>
  )
}
