import dynamic from "next/dynamic"
import Link from "next/link"

const MobileProgress = dynamic(() => import("./MobileProgress"), {
  ssr: false,
})

export default function Courses({ courses, content, progressService }) {
  return (
    <div className="relative bg-white overflow-hidden">
      {courses.map((course, index) => (
        <div key={course} data-test={`course-${index}`}>
          <div className="relative">
            <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
              <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
                <div>
                  <div className="mt-6">
                    <Link href={`/${content[course].slug}`}>
                      <a
                        data-test={`course-title`}
                        className="text-base font-extrabold tracking-tight text-gray-900"
                      >
                        {content[course].title}
                      </a>
                    </Link>
                    <MobileProgress
                      course={course}
                      content={content[course]}
                      progressService={progressService}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
