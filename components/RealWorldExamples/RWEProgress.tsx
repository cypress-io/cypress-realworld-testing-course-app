export default function RWEProgress({ content }) {
  return (
    <nav aria-label="Progress" className="mt-12">
      <ol className="overflow-hidden">
        {content?.lessons.map((lesson, index) => (
          <li
            data-test={`lesson-${index}`}
            key={lesson.title}
            className="pb-10"
          >
            <div className="relative flex items-start group">
              <span className="min-w-0 flex flex-col">
                <a
                  href={`/real-world-examples/${lesson.slug}`}
                  data-test={`real-world-lesson-${index}`}
                  className="text-xs font-semibold tracking-wide uppercase text-gray-900"
                >
                  {lesson.title}
                </a>

                <span className="text-sm text-gray-500">
                  {lesson.description}
                </span>
              </span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}
