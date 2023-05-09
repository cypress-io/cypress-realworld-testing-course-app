import Link from "next/link"
import { HomeIcon } from "@heroicons/react/solid"

const pages = [
  { name: "Projects", href: "#", current: false },
  { name: "Project Nero", href: "#", current: true },
]

export default function Breadcrumbs({ lessonPath, sectionTitle, lessonData }) {
  const [sectionSlug] = lessonPath.split("/")

  return (
    <nav
      className="bg-white border-b border-gray-200 flex"
      aria-label="Breadcrumb"
    >
      <ol
        role="list"
        className="max-w-screen-xl w-full mx-auto px-4 flex space-x-4 sm:px-6 lg:px-8"
      >
        <li className="flex">
          <div className="flex items-center">
            <Link href="/">
              <a className="text-gray-400 hover:text-gray-500">
                <HomeIcon
                  className="flex-shrink-0 h-5 w-5"
                  aria-hidden="true"
                />
                <span className="sr-only">Home</span>
              </a>
            </Link>
          </div>
        </li>

        {/* Course */}
        <li className="flex">
          <div className="flex items-center">
            <svg
              className="flex-shrink-0 w-6 h-full text-gray-200"
              viewBox="0 0 24 44"
              preserveAspectRatio="none"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
            </svg>
            <Link href={`/${sectionSlug}`}>
              <a className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                {sectionTitle}
              </a>
            </Link>
          </div>
        </li>

        {/* Lesson */}
        <li className="flex">
          <div className="flex items-center">
            <svg
              className="flex-shrink-0 w-6 h-full text-gray-200"
              viewBox="0 0 24 44"
              preserveAspectRatio="none"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
            </svg>
            <p className="ml-4 text-sm font-medium text-gray-500">
              {lessonData.title}
            </p>
          </div>
        </li>
      </ol>
    </nav>
  )
}
