import { CheckIcon } from "@heroicons/react/solid"

type Props = {
  index: number
}

export default function CompletedLesson({ index }: Props) {
  return (
    <>
      <span className="h-9 flex items-center">
        <span
          data-test={`lesson-complete-${index}`}
          className="relative z-10 w-8 h-8 flex items-center justify-center bg-blue-600 rounded-full group-hover:bg-blue-800"
        >
          <CheckIcon className="w-5 h-5 text-white" aria-hidden="true" />
        </span>
      </span>
    </>
  )
}
