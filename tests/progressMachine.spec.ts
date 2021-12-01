import { expect } from "chai"
import { interpret } from "xstate"
import { progressMachine } from "../machines/progressMachine"
import { MultipleChoicePayload } from "common"
import { isLessonCompleted } from "../utils/machineUtils"

describe("progress machine", () => {
  let progressService
  beforeEach(() => {
    progressService = interpret(progressMachine)
    //.onTransition((state) =>
    //  console.log(state.value)
    //)

    progressService.start()
    expect(progressService.state.value).to.equal("started")
  })

  it("can save the progress", () => {
    const skippedAnswerEvent = {
      type: "SKIP_ANSWER",
      id: "cypress-fundamentals/cypress-runs-in-the-browser",
    }

    progressService.send(skippedAnswerEvent)

    expect(isLessonCompleted(progressService, skippedAnswerEvent.id)).to.be.true
  })

  it("can validate a correct multiple choice answer", () => {
    const answerEvent: MultipleChoicePayload = {
      type: "SUBMIT_ANSWER",
      id: "cypress-fundamentals/cypress-runs-in-the-browser",
      challengeIndex: 0,
      userAnswerIndex: 0,
    }
    progressService.send(answerEvent)

    expect(isLessonCompleted(progressService, answerEvent.id)).to.be.true
  })

  it("can validate an incorrect multiple choice answer", () => {
    const answerEvent: MultipleChoicePayload = {
      type: "SUBMIT_ANSWER",
      id: "cypress-fundamentals/cypress-runs-in-the-browser",
      challengeIndex: 0,
      userAnswerIndex: 1,
    }
    progressService.send(answerEvent)

    expect(isLessonCompleted(progressService, answerEvent.id)).to.be.false
  })

  it("can disable all challenges", () => {
    progressService.send({
      type: "DISABLE_CHALLENGES",
      value: true,
    })

    expect(progressService.state.context.disableChallenges).to.be.true
  })
})
