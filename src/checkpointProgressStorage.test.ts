import { describe, expect, it } from 'vitest'
import {
  checkpointProgressKey,
  loadCheckpointProgress,
  saveCheckpointProgress,
} from './checkpointProgressStorage'

function createMemoryStorage(initialValue?: string): Storage {
  const values = new Map<string, string>()

  if (initialValue !== undefined) {
    values.set(checkpointProgressKey, initialValue)
  }

  return {
    get length() {
      return values.size
    },
    clear() {
      values.clear()
    },
    getItem(key) {
      return values.get(key) ?? null
    },
    key(index) {
      return [...values.keys()][index] ?? null
    },
    removeItem(key) {
      values.delete(key)
    },
    setItem(key, value) {
      values.set(key, value)
    },
  }
}

describe('checkpoint progress storage', () => {
  it('loads only checkpoint IDs that still exist in lesson content', () => {
    const storage = createMemoryStorage(
      JSON.stringify({
        version: 1,
        completedStepIds: ['predict-browser-update', 'removed-checkpoint'],
      }),
    )

    const progress = loadCheckpointProgress(
      new Set(['predict-browser-update']),
      () => storage,
    )

    expect([...progress.completedStepIds]).toEqual(['predict-browser-update'])
    expect(progress.isStorageAvailable).toBe(true)
  })

  it('ignores malformed or incompatible stored data', () => {
    const malformed = createMemoryStorage('{not-json')
    const futureVersion = createMemoryStorage(
      JSON.stringify({
        version: 2,
        completedStepIds: ['predict-browser-update'],
      }),
    )

    const malformedProgress = loadCheckpointProgress(
      new Set(['predict-browser-update']),
      () => malformed,
    )

    expect(malformedProgress.completedStepIds).toEqual(new Set())
    expect(malformedProgress.isStorageAvailable).toBe(true)
    expect(
      loadCheckpointProgress(
        new Set(['predict-browser-update']),
        () => futureVersion,
      ).completedStepIds,
    ).toEqual(new Set())
  })

  it('reports unavailable storage without throwing', () => {
    const progress = loadCheckpointProgress(new Set(), () => {
      throw new DOMException('Storage is blocked', 'SecurityError')
    })

    expect(progress.completedStepIds).toEqual(new Set())
    expect(progress.isStorageAvailable).toBe(false)
    expect(
      saveCheckpointProgress(new Set(['predict-browser-update']), () => {
        throw new DOMException('Storage is blocked', 'SecurityError')
      }),
    ).toBe(false)
  })

  it('saves a versioned progress record', () => {
    const storage = createMemoryStorage()

    expect(
      saveCheckpointProgress(
        new Set(['predict-browser-update']),
        () => storage,
      ),
    ).toBe(true)
    expect(JSON.parse(storage.getItem(checkpointProgressKey) ?? '')).toEqual({
      version: 1,
      completedStepIds: ['predict-browser-update'],
    })
  })
})
