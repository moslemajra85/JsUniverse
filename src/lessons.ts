export type LessonStepKind = 'explain' | 'predict' | 'practice'

interface BaseLessonStep {
  readonly id: string
  readonly kind: LessonStepKind
  readonly title: string
  readonly body: string
}

export interface PredictionOption {
  readonly id: string
  readonly label: string
}

export interface PredictionStep extends BaseLessonStep {
  readonly kind: 'predict'
  readonly question: string
  readonly options: readonly PredictionOption[]
  readonly correctOptionId: string
  readonly successFeedback: string
  readonly retryFeedback: string
}

interface ExplanationStep extends BaseLessonStep {
  readonly kind: 'explain'
}

interface PracticeStep extends BaseLessonStep {
  readonly kind: 'practice'
}

export type LessonStep = ExplanationStep | PredictionStep | PracticeStep

interface LessonDefinition {
  readonly number: number
  readonly slug: string
  readonly phase: string
  readonly title: string
  readonly summary: string
  readonly canvasTitle: string
  readonly description: string
  readonly objectives: readonly string[]
  readonly steps: readonly LessonStep[]
}

export const lessonStepLabels = {
  explain: 'Understand',
  predict: 'Predict',
  practice: 'Try it',
} as const satisfies Record<LessonStepKind, string>

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
    steps: [
      {
        id: 'files-become-a-page',
        kind: 'explain',
        title: 'Three files become one experience',
        body: 'HTML describes the content, CSS describes its appearance, and JavaScript describes behavior. The browser combines their jobs into the page you can use.',
      },
      {
        id: 'predict-a-click',
        kind: 'predict',
        title: 'What happens after a click?',
        body: 'Before following an event through the browser, decide which should happen first: the click, the JavaScript listener, or the visible page update.',
        question:
          'After a person clicks a listening button, what happens before the page can visibly change?',
        options: [
          {
            id: 'listener-runs',
            label: 'The registered JavaScript event listener runs',
          },
          {
            id: 'pixels-change',
            label: 'The final pixels change without running JavaScript',
          },
          {
            id: 'html-reloads',
            label: 'The original HTML file reloads automatically',
          },
        ],
        correctOptionId: 'listener-runs',
        successFeedback:
          'Exactly. The event reaches the listener, which can update the DOM before the browser paints a visible change.',
        retryFeedback:
          'Not yet. Think about which JavaScript instruction gets a chance to request the visible change.',
      },
      {
        id: 'trace-browser-work',
        kind: 'practice',
        title: 'Trace one visible change',
        body: 'Follow a future interaction from the person’s action to the event handler, the DOM update, and the pixels that finally change on screen.',
      },
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
    steps: [
      {
        id: 'separate-name-and-value',
        kind: 'explain',
        title: 'Separate the label from what it holds',
        body: 'A variable is a meaningful name used to reach a value. The name helps people understand the code; the value is the information the program uses.',
      },
      {
        id: 'predict-reassignment',
        kind: 'predict',
        title: 'Which value survives?',
        body: 'Read a short sequence of assignments and predict the final value before asking JavaScript. The gap between prediction and result is where learning happens.',
        question:
          'If score starts at 1 and score = score + 2 runs, what value does score hold?',
        options: [
          { id: 'one', label: '1' },
          { id: 'two', label: '2' },
          { id: 'three', label: '3' },
        ],
        correctOptionId: 'three',
        successFeedback:
          'Correct. JavaScript reads the old value 1, adds 2, then assigns the result 3 back to score.',
        retryFeedback:
          'Try the right side first: read the current value, add 2, and only then assign the result.',
      },
      {
        id: 'name-application-state',
        kind: 'practice',
        title: 'Name the changing facts',
        body: 'Identify the information a small task application must remember, then choose names that explain each fact without requiring an extra comment.',
      },
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
    steps: [
      {
        id: 'function-boundary',
        kind: 'explain',
        title: 'Draw a boundary around one job',
        body: 'A focused function accepts the information needed for one job and either returns a result or performs a clearly named effect.',
      },
      {
        id: 'predict-return-value',
        kind: 'predict',
        title: 'Return or display?',
        body: 'Predict whether a function returns information to its caller or changes the visible page. Those outcomes are useful, but they are not interchangeable.',
        question:
          'A function only runs return number * 2. What does calling it with 4 do?',
        options: [
          { id: 'returns-eight', label: 'It returns the number 8' },
          {
            id: 'renders-eight',
            label: 'It automatically displays 8 on the page',
          },
          {
            id: 'changes-four',
            label: 'It changes the original number into 8',
          },
        ],
        correctOptionId: 'returns-eight',
        successFeedback:
          'Right. The caller receives 8. Displaying that value would require a separate DOM operation.',
        retryFeedback:
          'Look closely at the only instruction: return sends a result to the caller but does not update the DOM.',
      },
      {
        id: 'extract-repeated-work',
        kind: 'practice',
        title: 'Extract repeated work',
        body: 'Find repeated instructions in a small interaction and replace them with one named function whose parameters make the changing parts explicit.',
      },
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
    steps: [
      {
        id: 'dom-tree',
        kind: 'explain',
        title: 'Read the document as a tree',
        body: 'The DOM connects document nodes through parent and child relationships. JavaScript works with those live nodes rather than editing the original HTML text.',
      },
      {
        id: 'predict-detached-node',
        kind: 'predict',
        title: 'Will the new element appear?',
        body: 'Creating an element gives JavaScript a node, but it remains detached. Predict what additional operation is required before a person can see it.',
        question:
          'After document.createElement creates a task card, what makes it part of the visible document?',
        options: [
          {
            id: 'append-node',
            label: 'Append it to an element already connected to the document',
          },
          {
            id: 'rename-variable',
            label: 'Store it in a variable with a clearer name',
          },
          {
            id: 'create-again',
            label: 'Call document.createElement a second time',
          },
        ],
        correctOptionId: 'append-node',
        successFeedback:
          'Correct. Appending the detached node to a connected parent places it in the live DOM tree.',
        retryFeedback:
          'The node already exists. Think about the parent-child connection missing from the document tree.',
      },
      {
        id: 'build-task-card',
        kind: 'practice',
        title: 'Build one task card',
        body: 'Create the smallest useful task-card structure, add meaningful text, and connect it to the correct list without replacing unrelated DOM nodes.',
      },
    ],
  },
] as const satisfies readonly LessonDefinition[]

export type Lesson = (typeof lessons)[number]

export const defaultLesson = lessons[0]

export function getLessonHash(slug: Lesson['slug']) {
  return `#lesson-${slug}`
}

export function findLessonByHash(hash: string): Lesson | undefined {
  return lessons.find((lesson) => getLessonHash(lesson.slug) === hash)
}
