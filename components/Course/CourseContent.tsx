import dynamic from "next/dynamic"
import { CheckIcon } from "@heroicons/react/outline"
import CourseProgress from "./CourseProgress"

const CourseNextLessonBtn = dynamic(() => import("./CourseNextLessonBtn"), {
  ssr: false,
})

export default function CourseContent({
  title,
  lessons,
  learnFeatures,
  progressService,
  course,
}) {
  const stats = [{ label: "Lessons", value: lessons.length }]

  return (
    <>
      <hr />
      <div className="py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 space-y-8 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
            <div className="relative z-10">
              <h2 className="text-base font-semibold tracking-wide uppercase">
                {title}
              </h2>
              <div className="mt-10 flex text-base max-w-prose mx-auto lg:max-w-none">
                <CourseProgress
                  course={course}
                  lessons={lessons}
                  progressService={progressService}
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="mt-12 relative text-base max-w-prose mx-auto lg:mt-0 lg:max-w-none">
              <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0">
                {/* Content area */}
                <div className="">
                  <h2 className="text-3xl text-gray-900 font-extrabold tracking-tight sm:text-4xl">
                    What You Will Learn
                  </h2>

                  {/* Features */}
                  <div className="mt-12">
                    <dl className="">
                      {learnFeatures.map((feature, index) => (
                        <div key={index} className="relative mb-6">
                          <dt>
                            <CheckIcon
                              className="absolute h-6 w-6 text-blue-500"
                              aria-hidden="true"
                            />
                            <p className="ml-9 text-lg leading-6 font-medium text-gray-600">
                              {feature}
                            </p>
                          </dt>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>

                {/* Stats course */}
                <div className="mt-10">
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-8">
                    {stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="border-t-2 border-gray-100 pt-6"
                      >
                        <dt className="text-base font-medium text-gray-500">
                          {stat.label}
                        </dt>
                        <dd className="text-3xl font-extrabold tracking-tight text-gray-900">
                          {stat.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <CourseNextLessonBtn
                  lessons={lessons}
                  progressService={progressService}
                  course={course}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
