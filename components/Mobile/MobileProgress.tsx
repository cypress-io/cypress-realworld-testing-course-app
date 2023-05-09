import { CheckIcon } from "@heroicons/react/solid"
import { isLessonCompleted } from "../../utils/machineUtils"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function LessonSteps({ course, content, progressService }) {
  return (
    <nav aria-label="Progress" className="mt-4">
      <ol className="overflow-hidden">
        {content?.lessons.map((lesson, index) => (
          <li
            data-test={`lesson-${index}`}
            key={lesson.title}
            className={classNames(
              index !== content?.lessons.length - 1 ? "pb-4" : "",
              "relative"
            )}
          >
            {/* Solid Line that connects the checkmarks */}
            {index !== content?.lessons.length - 1 ? (
              <div
                className={`-ml-px absolute mt-0.5 top-4 left-2 w-0.5 h-full ${
                  isLessonCompleted(progressService, `${course}/${lesson.slug}`)
                    ? "bg-blue-600"
                    : "bg-gray-300"
                }`}
                aria-hidden="true"
              />
            ) : null}

            <div className="relative flex items-center group">
              {/* "completed" */}

              {isLessonCompleted(
                progressService,
                `${course}/${lesson.slug}`
              ) && (
                <span className="h-9 flex items-center">
                  <span
                    data-test={`lesson-complete-${index}`}
                    className="relative z-10 w-4 h-4 flex items-center justify-center bg-blue-600 rounded-full group-hover:bg-blue-800"
                  >
                    <CheckIcon
                      className="w-5 h-5 text-white"
                      aria-hidden="true"
                    />
                  </span>
                </span>
              )}

              {/* "upcoming" */}
              {!isLessonCompleted(
                progressService,
                `${course}/${lesson.slug}`
              ) && (
                <span className="h-9 flex items-center" aria-hidden="true">
                  <span
                    data-test={`lesson-upcoming-${index}`}
                    className="relative z-10 w-4 h-4 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400"
                  >
                    <span className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300" />
                  </span>
                </span>
              )}

              {/* Lesson Title */}
              <span className="ml-4 min-w-0 flex flex-col">
                <span className="text-xs font-semibold tracking-wide uppercase">
                  <a href={`${course}/${lesson.slug}`}>{lesson.title}</a>
                </span>
              </span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}
