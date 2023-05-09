import { Fragment } from "react"
import { Popover, Transition } from "@headlessui/react"
import MobileNav from "./Mobile/MobileNav"
import Link from "next/link"
import coursesJson from "../data/courses.json"
import { MenuIcon } from "@heroicons/react/outline"
import { ChevronDownIcon, CodeIcon } from "@heroicons/react/solid"

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
                  <CodeIcon className="h-8 w-auto sm:h-10 text-blue-500" />
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
              </Popover.Group>
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
