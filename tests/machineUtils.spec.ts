import { expect } from "chai"
import { interpret } from "xstate"
import { progressMachine } from "../machines/progressMachine"
import * as machineUtils from "../utils/machineUtils"
import coursesJson from "../data/courses.json"

const lessonPath = "cypress-fundamentals/how-to-write-a-test"

const [sectionSlug, lessonSlug] = lessonPath.split("/")

describe("machine utils", () => {
  let progressService

  beforeEach(() => {
    progressService = interpret(progressMachine)
    progressService.start()
  })

  it("getAllLessons() - returns all lessons from a course", () => {
    const lessons = machineUtils.getAllLessons(coursesJson, lessonPath)

    expect(lessons).to.equal(coursesJson[sectionSlug].lessons)
  })

  it("findLesson() - returns a single lesson", () => {
    const lesson = machineUtils.findLesson(coursesJson, lessonPath)

    expect(lesson).to.equal(coursesJson[sectionSlug].lessons[0])
  })

  it("getChallenge() - returns a single challenge", () => {
    const lesson = machineUtils.getChallenge(coursesJson, lessonPath, 0)

    expect(lesson).to.equal(coursesJson[sectionSlug].lessons[0].challenges[0])
  })

  it("getLessonIndex() - returns the index of the lesson", () => {
    const lessonIndex = machineUtils.getLessonIndex(coursesJson, lessonPath)

    expect(lessonIndex).to.equal(
      coursesJson[sectionSlug].lessons.indexOf(
        coursesJson[sectionSlug].lessons[0]
      )
    )
  })

  it("getCourse() - returns the course", () => {
    const course = machineUtils.getCourse(coursesJson, lessonPath)

    expect(course).to.equal(coursesJson[sectionSlug])
  })

  it("isLessonCompleted() - returns true when a lesson is complete", () => {
    const answerEvent = {
      type: "SUBMIT_ANSWER",
      id: lessonPath,
      challengeIndex: 0,
      userAnswerIndex: 0,
    }
    progressService.send(answerEvent)

    expect(machineUtils.isLessonCompleted(progressService, lessonPath)).to.be
      .true
  })

  it("isLessonCompleted() - returns false when a lesson is incomplete", () => {
    const answerEvent = {
      type: "SUBMIT_ANSWER",
      id: lessonPath,
      challengeIndex: 0,
      userAnswerIndex: 1,
    }
    progressService.send(answerEvent)

    expect(machineUtils.isLessonCompleted(progressService, lessonPath)).to.be
      .false
  })
})
