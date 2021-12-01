type Props = {
  index: number
}

export default function IncompleteLesson({ index }: Props) {
  return (
    <>
      <span className="h-9 flex items-center" aria-hidden="true">
        <span
          data-test={`lesson-upcoming-${index}`}
          className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400"
        >
          <span className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300" />
        </span>
      </span>
    </>
  )
}
