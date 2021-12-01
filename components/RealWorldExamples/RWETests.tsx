import dynamic from "next/dynamic"

const RWEProgress = dynamic(() => import("./RWEProgress"), {
  ssr: false,
})

export default function RWETests({ sections, content, progressService }) {
  return (
    <div className="relative bg-white py-32 overflow-hidden">
      {sections.map((section, index) => (
        <div key={section} data-test={`real-world-example-${index}`}>
          {index % 2 === 0 ? (
            <div className="relative">
              <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
                <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
                  <div>
                    <div className="mt-6">
                      <h2
                        data-test={`example-title`}
                        className="text-3xl font-extrabold tracking-tight text-gray-900"
                      >
                        {content[section].title}
                      </h2>
                      <p
                        data-test={`example-description`}
                        className="mt-4 text-lg text-gray-500"
                      >
                        {content[section].description}
                      </p>
                      <RWEProgress content={content[section]} />
                    </div>
                  </div>
                </div>
                <div className="mt-12 sm:mt-16 lg:mt-0">
                  <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                    <img
                      className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                      src={content[section].image}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-32">
              <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
                <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-32 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2">
                  <div>
                    <div className="mt-6">
                      <h2
                        data-test={`example-title`}
                        className="text-3xl font-extrabold tracking-tight text-gray-900"
                      >
                        {content[section].title}
                      </h2>
                      <p
                        data-test={`example-description`}
                        className="mt-4 text-lg text-gray-500"
                      >
                        {content[section].description}
                      </p>
                      <RWEProgress content={content[section]} />
                    </div>
                  </div>
                </div>
                <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-start-1">
                  <div className="pr-4 -ml-48 sm:pr-6 md:-ml-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                    <img
                      className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                      src={content[section].image}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
