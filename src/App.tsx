const learningPrinciples = [
  {
    title: 'See it happen',
    description:
      'Watch events, state changes, and DOM updates instead of treating the browser as a black box.',
  },
  {
    title: 'Build real things',
    description:
      'Turn each concept into part of an interactive application using genuine browser APIs.',
  },
  {
    title: 'Learn from failure',
    description:
      'Predict, test, debug, and refactor so that understanding survives beyond one exercise.',
  },
]

export function App() {
  return (
    <main className="page-shell">
      <section className="hero" aria-labelledby="page-title">
        <p className="eyebrow">JavaScript Adventure Lab</p>
        <h1 id="page-title">See JavaScript think.</h1>
        <p className="hero__summary">
          An interactive learning environment for mastering modern vanilla
          JavaScript, the DOM, application state, and purposeful animation.
        </p>
        <p className="status" role="status">
          Application foundation ready
        </p>
      </section>

      <section className="principles" aria-labelledby="principles-title">
        <div className="section-heading">
          <p className="eyebrow">How learning works</p>
          <h2 id="principles-title">
            Understand the browser, not just syntax.
          </h2>
        </div>

        <div className="principles__grid">
          {learningPrinciples.map((principle, index) => (
            <article className="principle-card" key={principle.title}>
              <span className="principle-card__number" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
