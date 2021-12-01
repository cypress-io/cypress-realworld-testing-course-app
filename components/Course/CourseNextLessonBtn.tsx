import Link from "next/link"
import { isLessonCompleted } from "../../utils/machineUtils"

export default function CourseNextLessonBtn({
  lessons,
  progressService,
  course,
}) {
  const incompleLessons = lessons
    .map((lesson) => {
      if (!isLessonCompleted(progressService, `${course}/${lesson.slug}`)) {
        return lesson.slug
      }
    })
    .filter((lesson) => lesson !== undefined)

  const buttonText = () => {
    if (!incompleLessons.length) {
      return "Course Completed"
    }

    if (incompleLessons.length === lessons.length) {
      return "Start Course"
    } else {
      return "Next Lesson"
    }
  }

  const buttonURL = () => {
    if (!incompleLessons.length) {
      return "/"
    } else {
      return `${course}/${incompleLessons[0]}`
    }
  }

  return (
    <div className="py-20">
      <Link href={buttonURL()}>
        <a
          data-test="next-lesson-button"
          className="mx-auto max-w-xl flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 md:py-4 md:text-lg md:px-10"
        >
          {buttonText()}
        </a>
      </Link>
    </div>
  )
}
