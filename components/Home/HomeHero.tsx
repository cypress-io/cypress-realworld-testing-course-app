import { CheckIcon } from "@heroicons/react/outline"

const features = [
  {
    name: "4 Courses",
    description: "",
  },
  {
    name: "25+ Lessons",
    description: "",
  },
  {
    name: "30+ Real World Examples",
    description: "",
  },
  {
    name: "Free and Open Source",
    description: "",
  },
]

export default function HomeHero() {
  return (
    <div className="">
      <div className="relative overflow-hidden">
        <main>
          <div className="pt-10 bg-white sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
            <div className="mx-auto max-w-7xl lg:px-8">
              <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                  <div className="lg:py-24">
                    <h1
                      data-test="hero-heading"
                      className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl"
                    >
                      <span className="block text-gray-900">
                        Real World Testing
                      </span>
                      <span className="block text-gray-900">with Cypress</span>
                    </h1>
                    <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                      Learn from top industry experts and level-up your testing
                      knowledge.
                    </p>

                    {/* Features */}
                    <div className="mt-12">
                      <dl className="">
                        {features.map((feature) => (
                          <div key={feature.name} className="relative mb-6">
                            <dt>
                              <CheckIcon
                                className="absolute h-6 w-6 text-blue-500"
                                aria-hidden="true"
                              />
                              <p className="ml-9 text-lg leading-6 font-medium text-gray-500">
                                {feature.name}
                              </p>
                            </dt>
                            <dd className="mt-2 ml-9 text-base text-gray-500">
                              {feature.description}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>

                    <div className="mt-10 sm:mt-12">
                      <form
                        action="#"
                        className="sm:max-w-xl sm:mx-auto lg:mx-0"
                      >
                        <div className="sm:flex">
                          <div className="min-w-0 flex-1">
                            <label htmlFor="email" className="sr-only">
                              Subscribe for Updates
                            </label>
                            <input
                              id="email"
                              type="email"
                              placeholder="Subscribe for Updates"
                              className="block w-full px-4 py-3 rounded-md border-2text-base text-gray-900 placeholder-gray-500"
                            />
                          </div>
                          <div className="mt-3 sm:mt-0 sm:ml-3">
                            <button
                              type="submit"
                              className="block w-full py-3 px-4 rounded-md shadow bg-blue-500 text-white font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900"
                            >
                              Subscribe
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
                  <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                    <img
                      className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                      src="/images/home/hero.png"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
