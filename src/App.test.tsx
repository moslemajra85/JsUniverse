import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from './App'

describe('App', () => {
  it('introduces the product and its learning approach', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { level: 1, name: 'See JavaScript think.' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /understand the browser/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(3)
  })
})
