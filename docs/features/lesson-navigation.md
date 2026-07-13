# Lesson Navigation

## Purpose

Lesson navigation lets a learner move among available lesson summaries without a
full page reload. The selected lesson is represented in the URL so it can be
bookmarked, shared, and restored with browser history.

## Acceptance criteria

- Every available lesson is a real link with a stable URL hash.
- The product brand returns to the first lesson through the same navigation path.
- Selecting a lesson updates its heading, summary, objectives, phase, and course
  position.
- The selected link uses `aria-current="page"` and an explicit accessible name.
- Focus moves to the lesson workspace after selection so keyboard and screen
  reader users encounter the changed content.
- The document title identifies the selected lesson.
- Opening a known lesson hash selects that lesson immediately.
- Browser history changes synchronize the visible lesson.
- An unknown lesson hash falls back to the first lesson without crashing.
- The feature adds no routing or global state dependency.

## Architecture

### Typed lesson data

`src/lessons.ts` is the current source of truth for lesson summaries. The `Lesson`
type is inferred from the data, keeping slugs and content consistent without
duplicating a separate interface.

### Navigation state

`useLessonNavigation` owns the boundary between browser state and React state. It:

1. Derives the initial lesson from `window.location.hash`.
2. Writes a stable hash when a learner selects a lesson.
3. Responds to `hashchange` and `popstate` events.
4. Updates the document title.
5. Moves focus only when the active lesson actually changes.

The hook also distinguishes the initial render from later navigation. Content
animation is enabled only after navigation, ensuring a direct link is fully
visible on first paint.

The previous slug is stored in a ref rather than a simple “mounted” flag. This
avoids moving focus during React Strict Mode's development checks, which may run
an effect more than once to reveal unsafe behavior.

### Presentation

`App` renders links and lesson content from the returned active lesson. It does
not parse URLs or attach global browser listeners directly.

## Why not add a router?

The application currently has one page and one URL variable: the lesson slug. A
router would add configuration and concepts without solving a demonstrated
problem. Revisit this decision when the product has genuinely separate pages,
nested routes, data-loading boundaries, or route-level error handling.

## Tests

DOM integration tests cover:

- semantic landmarks and bypass navigation;
- click-based lesson selection;
- URL, title, focus, progress, and `aria-current` updates;
- direct links;
- browser-history synchronization;
- unknown-hash fallback.

## Known limitations

- Lesson summaries are bundled with the application.
- Selection is not the same as lesson completion and is not persisted.
- Unknown hashes fall back visibly but remain unchanged in the address bar.
- Browser-level back and forward behavior is simulated in DOM tests; a future
  end-to-end suite should validate it in a real browser.
