import { fireEvent, render, screen, within } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { App } from './App'

describe('App', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    window.history.replaceState(null, '', '/')
    window.localStorage.clear()
  })

  it('provides accessible landmarks for the learning workspace', () => {
    render(<App />)

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(
      screen.getByRole('navigation', { name: 'JavaScript foundations' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('main')).toHaveAttribute('id', 'lesson-workspace')
    expect(
      screen.getByRole('heading', { level: 1, name: 'Meet the browser' }),
    ).toBeInTheDocument()
  })

  it('lets keyboard users bypass repeated navigation', () => {
    render(<App />)

    expect(
      screen.getByRole('link', { name: 'Skip to lesson workspace' }),
    ).toHaveAttribute('href', '#lesson-workspace')
  })

  it('selects a lesson and moves focus to its content', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('link', { name: 'Values and variables' }))

    expect(window.location.hash).toBe('#lesson-values-and-variables')
    expect(
      screen.getByRole('heading', { level: 1, name: 'Values and variables' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', {
        name: 'Values and variables, current lesson',
      }),
    ).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('main')).toHaveFocus()
    expect(document.title).toBe(
      'Values and variables | JavaScript Adventure Lab',
    )
    expect(screen.getByRole('progressbar')).toHaveAttribute('value', '2')
  })

  it('writes a stable URL when selecting the default lesson', () => {
    render(<App />)

    fireEvent.click(
      screen.getByRole('link', { name: 'Meet the browser, current lesson' }),
    )

    expect(window.location.hash).toBe('#lesson-meet-the-browser')
    expect(screen.getByRole('main')).toHaveFocus()
  })

  it('renders the selected lesson path from structured content', () => {
    render(<App />)

    const initialPath = screen.getByRole('region', { name: 'Lesson path' })
    expect(within(initialPath).getAllByRole('listitem')).toHaveLength(3)
    expect(
      within(initialPath).getByRole('heading', {
        level: 3,
        name: 'Three files become one experience',
      }),
    ).toBeInTheDocument()

    fireEvent.click(screen.getByRole('link', { name: 'Build the DOM' }))

    const updatedPath = screen.getByRole('region', { name: 'Lesson path' })
    expect(
      within(updatedPath).getByRole('heading', {
        level: 3,
        name: 'Read the document as a tree',
      }),
    ).toBeInTheDocument()
    expect(
      within(updatedPath).queryByText('Three files become one experience'),
    ).not.toBeInTheDocument()
  })

  it('updates checkpoint progress after a correct prediction', () => {
    render(<App />)

    expect(screen.getByRole('status')).toHaveTextContent(
      '0 of 1 checkpoint complete',
    )

    fireEvent.click(
      screen.getByRole('radio', {
        name: 'The registered JavaScript event listener runs',
      }),
    )
    fireEvent.click(screen.getByRole('button', { name: 'Check prediction' }))

    expect(screen.getByRole('status')).toHaveTextContent(
      '1 of 1 checkpoint complete',
    )
  })

  it('restores completed checkpoint progress after remounting', () => {
    const firstVisit = render(<App />)

    fireEvent.click(
      screen.getByRole('radio', {
        name: 'The registered JavaScript event listener runs',
      }),
    )
    fireEvent.click(screen.getByRole('button', { name: 'Check prediction' }))

    firstVisit.unmount()
    const restoredVisit = render(<App />)

    expect(screen.getByRole('status')).toHaveTextContent(
      '1 of 1 checkpoint complete',
    )
    expect(
      screen.getByRole('button', { name: 'Reset checkpoint' }),
    ).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Reset checkpoint' }))
    expect(screen.getByRole('status')).toHaveTextContent(
      '0 of 1 checkpoint complete',
    )

    restoredVisit.unmount()
    render(<App />)

    expect(screen.getByRole('status')).toHaveTextContent(
      '0 of 1 checkpoint complete',
    )
  })

  it('keeps checkpoints usable when browser storage is unavailable', async () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('Storage is blocked', 'SecurityError')
    })

    render(<App />)

    expect(
      await screen.findByText(
        'Progress is available for this session but could not be saved.',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Check prediction' }),
    ).toBeDisabled()
  })

  it('keeps progress for each lesson without mixing their totals', () => {
    render(<App />)

    fireEvent.click(
      screen.getByRole('radio', {
        name: 'The registered JavaScript event listener runs',
      }),
    )
    fireEvent.click(screen.getByRole('button', { name: 'Check prediction' }))

    fireEvent.click(screen.getByRole('link', { name: 'Values and variables' }))
    expect(screen.getByRole('status')).toHaveTextContent(
      '0 of 1 checkpoint complete',
    )

    fireEvent.click(screen.getByRole('link', { name: 'Meet the browser' }))
    expect(screen.getByRole('status')).toHaveTextContent(
      '1 of 1 checkpoint complete',
    )
  })

  it('opens a directly linked lesson from the URL hash', () => {
    window.history.replaceState(null, '', '#lesson-build-the-dom')

    render(<App />)

    expect(
      screen.getByRole('heading', { level: 1, name: 'Build the DOM' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Build the DOM, current lesson' }),
    ).toHaveAttribute('aria-current', 'page')
  })

  it('synchronizes lesson content when browser history changes', () => {
    render(<App />)

    window.history.pushState(null, '', '#lesson-functions-with-a-purpose')
    fireEvent(window, new PopStateEvent('popstate'))

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Functions with a purpose',
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole('main')).toHaveFocus()
  })

  it('falls back safely when a lesson hash is unknown', () => {
    window.history.replaceState(null, '', '#lesson-not-real')

    render(<App />)

    expect(
      screen.getByRole('heading', { level: 1, name: 'Meet the browser' }),
    ).toBeInTheDocument()
  })
})
