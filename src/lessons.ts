export const lessons = [
  {
    number: 1,
    slug: 'meet-the-browser',
    phase: 'Orientation',
    title: 'Meet the browser',
    summary:
      'Learn what happens between writing JavaScript and seeing a page respond.',
    canvasTitle: 'A place to see JavaScript think',
    description:
      'The browser turns files into an interactive document. This lesson will connect the code you write to the visible result and the browser work in between.',
    objectives: [
      'What the browser does with HTML, CSS, and JavaScript',
      'Why the DOM is different from the HTML source',
      'How an event can cause visible change',
    ],
  },
  {
    number: 2,
    slug: 'values-and-variables',
    phase: 'JavaScript language',
    title: 'Values and variables',
    summary:
      'Give information a clear name, inspect it, and change it without losing track of meaning.',
    canvasTitle: 'Names make invisible values easier to follow',
    description:
      'Variables let an application remember useful information. This lesson will compare values, names, reassignment, and constants through visible state changes.',
    objectives: [
      'How a value differs from the variable that refers to it',
      'When to use const and when reassignment is appropriate',
      'How clear names reduce debugging effort',
    ],
  },
  {
    number: 3,
    slug: 'functions-with-a-purpose',
    phase: 'JavaScript language',
    title: 'Functions with a purpose',
    summary:
      'Package one meaningful job into a reusable instruction with clear inputs and outputs.',
    canvasTitle: 'Turn a repeated action into one named idea',
    description:
      'Functions create boundaries around behavior. This lesson will make parameters, return values, side effects, and focused responsibility concrete.',
    objectives: [
      'How parameters carry information into a function',
      'Why returning a value is different from changing the page',
      'How one clear responsibility improves reuse and testing',
    ],
  },
  {
    number: 4,
    slug: 'build-the-dom',
    phase: 'Browser APIs',
    title: 'Build the DOM',
    summary:
      'Create, connect, and update page elements while watching the document tree change.',
    canvasTitle: 'Shape the page as a tree of connected nodes',
    description:
      'The DOM is the browser’s live representation of the document. This lesson will show how element creation and updates change that tree.',
    objectives: [
      'How elements, text, and attributes appear in the DOM tree',
      'Why creating a node does not automatically display it',
      'How to update the smallest necessary part of the document',
    ],
  },
] as const

export type Lesson = (typeof lessons)[number]

export const defaultLesson = lessons[0]

export function getLessonHash(slug: Lesson['slug']) {
  return `#lesson-${slug}`
}

export function findLessonByHash(hash: string): Lesson | undefined {
  return lessons.find((lesson) => getLessonHash(lesson.slug) === hash)
}
