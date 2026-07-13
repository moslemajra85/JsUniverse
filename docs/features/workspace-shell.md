# Accessible Learning Workspace Shell

## Purpose

The workspace shell establishes the stable regions that future lesson, editor,
preview, and visualization features will inhabit. This feature intentionally
contains static lesson information: navigation behavior and lesson state belong
to the next independently tested slice.

## Acceptance criteria

- The page has one banner, a labeled curriculum navigation region, and one main
  lesson workspace.
- The first keyboard-focusable element lets a learner skip directly to the main
  workspace.
- The current lesson is communicated visually and with `aria-current="page"`.
- Course progress has an accessible label and a visible numeric value.
- Upcoming lessons are text rather than non-functional controls.
- The workspace remains usable on narrow screens without shrinking content below
  a 320-pixel viewport.
- Keyboard focus is clearly visible.
- Decorative motion honors the operating system's reduced-motion preference.
- The shell contains no fake editor or lesson actions.

## Responsibility boundaries

- `App` owns the current static composition and curriculum fixture.
- `LessonLabel` owns repeated lesson-label markup only; it contains no state.
- `styles.css` owns layout, tokens, responsive behavior, and motion preferences.
- The current test verifies landmarks, bypass navigation, current-page state, and
  progress semantics.

No routing or global state library is justified by this feature. Lesson selection
will introduce the smallest state boundary required by observable navigation
behavior.

## Responsive behavior

Desktop layouts use a persistent curriculum column beside the lesson workspace.
On small screens, curriculum items become a horizontally scrollable list above
the lesson. The lesson canvas and guide stack when there is insufficient width
for two useful columns.

## Known limitations

- Only one lesson is available.
- Lesson links do not switch content yet.
- Responsive behavior is validated through CSS review rather than browser-level
  visual regression tests.
- Progress is static and is not persisted.
