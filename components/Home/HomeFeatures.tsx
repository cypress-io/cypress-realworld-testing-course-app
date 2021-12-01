import {
  LightBulbIcon,
  BeakerIcon,
  TerminalIcon,
  DatabaseIcon,
  CodeIcon,
  AdjustmentsIcon,
} from "@heroicons/react/outline"

const features = [
  {
    name: "Prepare your Testing Mindset",
    icon: LightBulbIcon,
    description:
      "Build a healthy mental model before testing your applications.",
  },
  {
    name: "Learn What to Test",
    icon: BeakerIcon,
    description: "Prioritize what parts of your application to test.",
  },
  {
    name: "Debug Failing Tests Efficiently",
    icon: TerminalIcon,
    description:
      "Learn various tips, methods and techniques to help you better debug your failing tests",
  },
  {
    name: "Learn Database Initialization & Seeding",
    icon: DatabaseIcon,
    description:
      "Get practical guidance on how to create the data you need for your tests.",
  },
  {
    name: "Understand Different Testing Types",
    icon: CodeIcon,
    description:
      "Learn the difference between unit, integration and end-to-end tests.",
  },
  {
    name: "Apply your Knowledge",
    icon: AdjustmentsIcon,
    description:
      "Practice how to test different apps in the real world, from simple to complex.",
  },
]

export default function HomeFeatures() {
  return (
    <div className="features relative bg-white py-16 sm:py-24 lg:py-16">
      <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
        <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
          What you&apos;ll learn
        </p>
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                        <feature.icon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      {feature.name}
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
