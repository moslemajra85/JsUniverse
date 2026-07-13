const checkpointProgressKey = 'javascript-adventure-lab:checkpoint-progress'
const currentVersion = 1

interface StoredCheckpointProgress {
  readonly version: typeof currentVersion
  readonly completedStepIds: readonly string[]
}

export interface LoadedCheckpointProgress {
  readonly completedStepIds: ReadonlySet<string>
  readonly isStorageAvailable: boolean
}

type StorageProvider = () => Storage

function isStoredCheckpointProgress(
  value: unknown,
): value is StoredCheckpointProgress {
  if (!value || typeof value !== 'object') {
    return false
  }

  const candidate = value as Record<string, unknown>

  return (
    candidate.version === currentVersion &&
    Array.isArray(candidate.completedStepIds) &&
    candidate.completedStepIds.every((stepId) => typeof stepId === 'string')
  )
}

export function loadCheckpointProgress(
  validStepIds: ReadonlySet<string>,
  getStorage: StorageProvider = () => window.localStorage,
): LoadedCheckpointProgress {
  let storedValue: string | null

  try {
    storedValue = getStorage().getItem(checkpointProgressKey)
  } catch {
    return {
      completedStepIds: new Set(),
      isStorageAvailable: false,
    }
  }

  if (!storedValue) {
    return {
      completedStepIds: new Set(),
      isStorageAvailable: true,
    }
  }

  let parsedValue: unknown

  try {
    parsedValue = JSON.parse(storedValue)
  } catch {
    parsedValue = null
  }

  if (!isStoredCheckpointProgress(parsedValue)) {
    return {
      completedStepIds: new Set(),
      isStorageAvailable: true,
    }
  }

  return {
    completedStepIds: new Set(
      parsedValue.completedStepIds.filter((stepId) => validStepIds.has(stepId)),
    ),
    isStorageAvailable: true,
  }
}

export function saveCheckpointProgress(
  completedStepIds: ReadonlySet<string>,
  getStorage: StorageProvider = () => window.localStorage,
) {
  const progress: StoredCheckpointProgress = {
    version: currentVersion,
    completedStepIds: [...completedStepIds],
  }

  try {
    getStorage().setItem(checkpointProgressKey, JSON.stringify(progress))
    return true
  } catch {
    return false
  }
}

export { checkpointProgressKey }
