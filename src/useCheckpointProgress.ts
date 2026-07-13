import { useCallback, useEffect, useState } from 'react'
import {
  loadCheckpointProgress,
  saveCheckpointProgress,
} from './checkpointProgressStorage'
import { lessons } from './lessons'

const validCheckpointIds: ReadonlySet<string> = new Set(
  lessons.flatMap((lesson) =>
    lesson.steps
      .filter((step) => step.kind === 'predict')
      .map((step) => step.id),
  ),
)

export function useCheckpointProgress() {
  const [initialProgress] = useState(() =>
    loadCheckpointProgress(validCheckpointIds),
  )
  const [completedStepIds, setCompletedStepIds] = useState(
    initialProgress.completedStepIds,
  )
  const [isStorageAvailable, setIsStorageAvailable] = useState(
    initialProgress.isStorageAvailable,
  )

  useEffect(() => {
    setIsStorageAvailable(saveCheckpointProgress(completedStepIds))
  }, [completedStepIds])

  const markCheckpointComplete = useCallback((stepId: string) => {
    if (!validCheckpointIds.has(stepId)) {
      return
    }

    setCompletedStepIds((current) => {
      if (current.has(stepId)) {
        return current
      }

      return new Set(current).add(stepId)
    })
  }, [])

  const resetCheckpoint = useCallback((stepId: string) => {
    setCompletedStepIds((current) => {
      if (!current.has(stepId)) {
        return current
      }

      const next = new Set(current)
      next.delete(stepId)
      return next
    })
  }, [])

  return {
    completedStepIds,
    isStorageAvailable,
    markCheckpointComplete,
    resetCheckpoint,
  }
}
