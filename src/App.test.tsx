import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from './App'

describe('App', () => {
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

  it('announces the current lesson in the curriculum', () => {
    render(<App />)

    expect(
      screen.getByRole('link', {
        name: 'Meet the browser, current lesson',
      }),
    ).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('progressbar')).toHaveAttribute('value', '1')
  })
})
