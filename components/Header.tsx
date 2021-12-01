import { Fragment } from "react"
import dynamic from "next/dynamic"
import { Popover, Transition } from "@headlessui/react"
import MobileNav from "./Mobile/MobileNav"
import Link from "next/link"
import Image from "next/image"
import coursesJson from "../data/courses.json"
import {
  BookmarkAltIcon,
  BriefcaseIcon,
  GlobeAltIcon,
  InformationCircleIcon,
  MenuIcon,
  ChatAltIcon,
  FilmIcon,
  CodeIcon,
  NewspaperIcon,
  UserGroupIcon,
  TemplateIcon,
} from "@heroicons/react/outline"
import { ChevronDownIcon } from "@heroicons/react/solid"

const Search = dynamic(() => import("./Search"), {
  ssr: false,
})

const company = [
  {
    name: "Cypress.io",
    href: "https://www.cypress.io/",
    icon: InformationCircleIcon,
  },
  { name: "Careers", href: "https://www.cypress.io/jobs", icon: BriefcaseIcon },
  {
    name: "Blog",
    href: "https://www.cypress.io/blog/",
    icon: NewspaperIcon,
  },
  {
    name: "Dashboard",
    href: "https://www.cypress.io/dashboard",
    icon: TemplateIcon,
  },
  {
    name: "Support",
    href: "https://www.cypress.io/support",
    icon: UserGroupIcon,
  },
]

const resources = [
  { name: "Docs", href: "https://docs.cypress.io/", icon: BookmarkAltIcon },
  {
    name: "Real World App",
    href: "https://github.com/cypress-io/cypress-realworld-app",
    icon: GlobeAltIcon,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/channel/UC-EOsTo2l2x39e4JmSaWNRQ",
    icon: FilmIcon,
  },
  {
    name: "Discord",
    href: "https://discord.gg/cMjUZg7",
    icon: ChatAltIcon,
  },
  {
    name: "GitHub",
    href: "https://github.com/cypress-io/cypress",
    icon: CodeIcon,
  },
]

const updates = [
  {
    id: 1,
    name: "We're Hiring",
    href: "https://www.cypress.io/jobs/",
    preview: "Want to help create something innovative? Join our team!",
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function Header({ content, courses, progressService }) {
  const coursesJsonCourses = Object.keys(coursesJson)

  return (
    <>
      <Popover className="relative bg-white hidden lg:block">
        <div
          className="absolute inset-0 shadow z-30 pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative z-20">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-5 sm:px-6 sm:py-4 lg:px-8 md:justify-start md:space-x-10">
            <div>
              <Link href="/">
                <a className="flex">
                  <span className="sr-only">Workflow</span>
                  <Image
                    className="h-8 w-auto sm:h-10"
                    src="/images/logo/cypress-logo.webp"
                    alt="Cypress Logo"
                    height={40}
                    width={120}
                  />
                </a>
              </Link>
            </div>
            <div className="md:hidden">
              <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
              <Popover.Group as="nav" className="flex space-x-10">
                <Popover>
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={classNames(
                          open ? "text-gray-900" : "text-gray-500",
                          "group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        )}
                        data-test="courses-dropdown"
                      >
                        <span>Courses</span>
                        <ChevronDownIcon
                          className={classNames(
                            open ? "text-gray-600" : "text-gray-400",
                            "ml-2 h-5 w-5 group-hover:text-gray-500"
                          )}
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 -translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 -translate-y-1"
                      >
                        <Popover.Panel className="hidden md:block absolute z-10 top-full inset-x-0 transform shadow-lg bg-white">
                          <div
                            className="max-w-7xl mx-auto grid gap-y-6 px-4 py-6 sm:grid-cols-2 sm:gap-8 sm:px-6 sm:py-8 lg:grid-cols-4 lg:px-8 lg:py-12 xl:py-16"
                            data-test="courses-dropdown-menu"
                          >
                            {coursesJsonCourses.map((course, index) => (
                              <a
                                key={coursesJson[course].slug}
                                href={`/${coursesJson[course].slug}`}
                                className="-m-3 p-3 flex flex-col justify-between rounded-lg hover:bg-gray-50"
                              >
                                <div className="flex md:h-full lg:flex-col">
                                  <div className="ml-4 md:flex-1 md:flex md:flex-col md:justify-between lg:ml-0 lg:mt-4">
                                    <div>
                                      <p className="text-base font-medium text-gray-900">
                                        {`${index + 1}. ${
                                          coursesJson[course].title
                                        }`}
                                      </p>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {coursesJson[course].description}
                                      </p>
                                    </div>
                                    <p className="mt-2 text-sm font-medium text-blue-500 lg:mt-4">
                                      Get Started{" "}
                                      <span aria-hidden="true">&rarr;</span>
                                    </p>
                                  </div>
                                </div>
                              </a>
                            ))}
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>

                <Popover>
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={classNames(
                          open ? "text-gray-900" : "text-gray-500",
                          "group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        )}
                      >
                        <span>Resources</span>
                        <ChevronDownIcon
                          className={classNames(
                            open ? "text-gray-600" : "text-gray-400",
                            "ml-2 h-5 w-5 group-hover:text-gray-500"
                          )}
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 -translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 -translate-y-1"
                      >
                        <Popover.Panel className="hidden md:block absolute z-10 top-full inset-x-0 transform shadow-lg">
                          <div className="absolute inset-0 flex">
                            <div className="bg-white w-1/2" />
                            <div className="bg-gray-50 w-1/2" />
                          </div>
                          <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2">
                            <nav className="grid gap-y-10 px-4 py-8 bg-white sm:grid-cols-2 sm:gap-x-8 sm:py-12 sm:px-6 lg:px-8 xl:pr-12">
                              <div>
                                <h3 className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                                  Cypress
                                </h3>
                                <ul role="list" className="mt-5 space-y-6">
                                  {company.map((item) => (
                                    <li key={item.name} className="flow-root">
                                      <a
                                        href={item.href}
                                        className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                                      >
                                        <item.icon
                                          className="flex-shrink-0 h-6 w-6 text-blue-500"
                                          aria-hidden="true"
                                        />
                                        <span className="ml-4">
                                          {item.name}
                                        </span>
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                                  Resources
                                </h3>
                                <ul role="list" className="mt-5 space-y-6">
                                  {resources.map((item) => (
                                    <li key={item.name} className="flow-root">
                                      <a
                                        href={item.href}
                                        className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                                      >
                                        <item.icon
                                          className="flex-shrink-0 h-6 w-6 text-blue-500"
                                          aria-hidden="true"
                                        />
                                        <span className="ml-4">
                                          {item.name}
                                        </span>
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </nav>
                            <div className="bg-gray-50 px-4 py-8 sm:py-12 sm:px-6 lg:px-8 xl:pl-12">
                              <div>
                                <ul role="list" className="mt-6 space-y-6">
                                  {updates.map((post) => (
                                    <li key={post.id} className="flow-root">
                                      <a
                                        href={post.href}
                                        className="-m-3 p-3 flex rounded-lg hover:bg-gray-100"
                                      >
                                        <div className="hidden sm:block flex-shrink-0"></div>
                                        <div className="w-0 flex-1 sm:ml-8">
                                          <h4 className="text-base font-medium text-gray-900 truncate">
                                            {post.name}
                                          </h4>
                                          <p className="mt-1 text-sm text-gray-500">
                                            {post.preview}
                                          </p>
                                        </div>
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
                <Link href="/real-world-examples">
                  <a className="text-base font-medium text-gray-500 hover:text-gray-900">
                    Real World Examples
                  </a>
                </Link>
              </Popover.Group>
              <div className="flex items-center md:ml-12">
                <Search />
              </div>
            </div>
          </div>
        </div>
      </Popover>
      <MobileNav
        content={content}
        courses={courses}
        progressService={progressService}
      />
    </>
  )
}
