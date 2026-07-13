import { useCallback, useEffect, useRef, useState } from 'react'
import {
  defaultLesson,
  findLessonByHash,
  getLessonHash,
  type Lesson,
} from './lessons'

function getLessonFromLocation() {
  return findLessonByHash(window.location.hash) ?? defaultLesson
}

export function useLessonNavigation() {
  const [activeLesson, setActiveLesson] = useState(getLessonFromLocation)
  const [hasNavigated, setHasNavigated] = useState(false)
  const lessonWorkspaceRef = useRef<HTMLElement>(null)
  const previousLessonSlug = useRef(activeLesson.slug)

  useEffect(() => {
    const synchronizeWithLocation = () => {
      setActiveLesson(getLessonFromLocation())
      setHasNavigated(true)
    }

    window.addEventListener('hashchange', synchronizeWithLocation)
    window.addEventListener('popstate', synchronizeWithLocation)

    return () => {
      window.removeEventListener('hashchange', synchronizeWithLocation)
      window.removeEventListener('popstate', synchronizeWithLocation)
    }
  }, [])

  useEffect(() => {
    document.title = `${activeLesson.title} | JavaScript Adventure Lab`

    if (previousLessonSlug.current !== activeLesson.slug) {
      lessonWorkspaceRef.current?.focus()
    }

    previousLessonSlug.current = activeLesson.slug
  }, [activeLesson])

  const navigateToLesson = useCallback(
    (lesson: Lesson) => {
      const lessonHash = getLessonHash(lesson.slug)

      if (lesson.slug === activeLesson.slug) {
        if (window.location.hash !== lessonHash) {
          window.history.pushState(null, '', lessonHash)
        }

        lessonWorkspaceRef.current?.focus()
        return
      }

      window.history.pushState(null, '', lessonHash)
      setActiveLesson(lesson)
      setHasNavigated(true)
    },
    [activeLesson.slug],
  )

  return {
    activeLesson,
    hasNavigated,
    lessonWorkspaceRef,
    navigateToLesson,
  }
}
