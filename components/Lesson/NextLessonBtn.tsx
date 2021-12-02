export default function NextLessonBtn({ path, isCompleted }) {
  return (
    <div
      data-test="next-lesson-button"
      className={`${isCompleted ? "" : "hidden"} py-20`}
    >
      <a
        href={path ? path : "/"}
        className="mx-auto max-w-xl flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
      >
        {path ? "Next Lesson" : "Complete Course"}
      </a>
    </div>
  )
}
