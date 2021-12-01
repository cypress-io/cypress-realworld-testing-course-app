import { useActor } from "@xstate/react"

export default function LessonChallenge({ progressService }) {
  const [, progressSend] = useActor(progressService)

  const handleInputChange = (event) => {
    const target = event.target
    const value = target.type === "checkbox" ? target.checked : target.value

    progressSend({
      type: "DISABLE_CHALLENGES",
      value,
    })
  }

  return (
    <>
      <hr />
      <div className="flex items-center justify-center my-6">
        <input
          data-test="skip-challenge-input"
          name="answer"
          type="checkbox"
          className="focus:ring-blue-500 text-blue-600 border-gray-300 rounded h-4 w-4"
          checked={progressService.state.context.disableChallenges}
          onChange={handleInputChange}
        />
        <label className="ml-4 leading-6 text-gray-300">
          Disable questions on upcoming lessons
        </label>
      </div>
    </>
  )
}
