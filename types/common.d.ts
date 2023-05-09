export type LessonTableOfContents = {
  content: string
  slug: string
  lvl: number
  current?: boolean
}

export interface ChallengeAnswer {
  id: string
  answeredCorrectly?: boolean
  skipped?: boolean
}
export interface EventPayload {
  type: string
  id: string
  challengeIndex: number
}

export interface MultipleChoicePayload extends EventPayload {
  userAnswerIndex: number
}

export interface ProgressContext {
  sectionsCompleted: string[]
  lessons: object[]
  disableChallenges: boolean
}

export interface Challenge {
  challengeType: string
  question: string
}

export interface MultipleChoiceChallenge extends Challenge {
  answers: []
  correctAnswerIndex: string
}
