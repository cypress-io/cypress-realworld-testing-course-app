import Link from "next/link"

export default function HomeRealWorldExamples({}) {
  return (
    <>
      <hr />
      <div className="relative pt-16 overflow-hidden sm:pt-24 lg:pt-32">
        <div className="mx-auto max-w-md px-4 text-center sm:px-6 sm:max-w-3xl lg:px-8 lg:max-w-7xl">
          <div>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
              Over 30+ Real World Examples
            </p>
            <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
              A payment application to demonstrate real-world usage of Cypress
              testing methods, patterns, and workflows.
            </p>
          </div>
          <div className="mt-12">
            <img
              src="https://raw.githubusercontent.com/cypress-io/cypress-realworld-app/develop/public/img/rwa-readme-screenshot.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="relative bg-white pt-16 pb-32 overflow-hidden">
        <div className="max-w-lg mx-auto">
          <Link href="/real-world-examples">
            <a className="w-full bg-blue-500 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              See Examples
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}
