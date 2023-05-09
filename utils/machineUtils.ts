import { find, findIndex, get, gte } from "lodash/fp"

export const getAllLessons = (coursesJson: object, lessonPath) => {
  const [sectionSlug] = lessonPath.split("/")
  const course = getCourse(coursesJson, sectionSlug)
  return get("lessons", course)
}

export const findLesson = (coursesJson: object, lessonPath: string) => {
  const [, lessonSlug] = lessonPath.split("/")
  const lessons = getAllLessons(coursesJson, lessonPath)
  return find({ slug: lessonSlug }, lessons)
}

export const getChallenge = (
  coursesJson: object,
  lessonPath: string,
  challengeIndex: number
) => {
  const lesson = findLesson(coursesJson, lessonPath)
  return lesson.challenges[challengeIndex]
}

export const getLessonIndex = (coursesJson: object, lessonPath: string) => {
  const [, lessonSlug] = lessonPath.split("/")
  const lessons = getAllLessons(coursesJson, lessonPath)
  return findIndex({ slug: lessonSlug }, lessons)
}

export const getCourse = (coursesJson: object, lessonPath: string) => {
  const [sectionSlug] = lessonPath.split("/")
  return coursesJson[sectionSlug]
}

export const isLessonCompleted = (progressService, lessonPath) => {
  return gte(
    findIndex(
      { id: lessonPath, status: "completed" },
      progressService.state.context.lessons
    ),
    0
  )
}

export const isSectionCompleted = (sectionsCompleted, sectionSlug) => {
  return sectionsCompleted.includes(sectionSlug)
}
