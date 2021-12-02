import { useActor } from "@xstate/react"

export default function NextLessonBtn({
  nextLessonPath,
  progressService,
  lessonPath,
}) {
  const [, progressSend] = useActor(progressService)

  return (
    <div data-test="complete-lesson-button" className="py-20">
      <a
        href={nextLessonPath ? nextLessonPath : "/"}
        className="mx-auto max-w-xl flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
        onClick={() => {
          progressSend({
            type: "COMPLETE_LESSON",
            id: lessonPath,
          })
        }}
      >
        {nextLessonPath ? "Next Lesson" : "Complete Course"}
      </a>
    </div>
  )
}
