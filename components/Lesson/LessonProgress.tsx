import dynamic from "next/dynamic"
import Link from "next/link"
import { isLessonCompleted } from "../../utils/machineUtils"

const ProgressLine = dynamic(() => import("../Progress/ProgressLine"), {
  ssr: false,
})

const CompletedLesson = dynamic(() => import("../Progress/CompletedLesson"), {
  ssr: false,
})

const IncompleteLesson = dynamic(() => import("../Progress/IncompleteLesson"), {
  ssr: false,
})

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function LessonProgress({ lessons, progressService, course }) {
  return (
    <nav aria-label="Progress" className="mt-12">
      <ol className="overflow-hidden">
        {lessons.map((lesson, index) => (
          <li
            data-test={`lesson-${index}`}
            key={lesson.title}
            className={classNames(
              index !== lessons.length - 1 ? "pb-10" : "",
              "relative"
            )}
          >
            {/* Solid Line that connects the checkmarks */}
            <ProgressLine
              index={index}
              lessons={lessons}
              isCompleted={isLessonCompleted(
                progressService,
                `${course}/${lesson.slug}`
              )}
            />

            <div className="relative flex items-start group">
              {isLessonCompleted(
                progressService,
                `${course}/${lesson.slug}`
              ) && <CompletedLesson index={index} />}

              {!isLessonCompleted(
                progressService,
                `${course}/${lesson.slug}`
              ) && <IncompleteLesson index={index} />}

              {/* Lesson Title */}
              <span className="ml-4 min-w-0 flex flex-col">
                <span className="text-xs font-semibold tracking-wide uppercase">
                  <Link href={`/${course}/${lesson.slug}`}>
                    <a data-test={`lesson-progress-link-${index}`}>
                      {lesson.title}
                    </a>
                  </Link>
                </span>
              </span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}
