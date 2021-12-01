import path from "path"
import fs from "fs"
import slugify from "slugify"
import realWorldExamples from "../data/real-world-examples.json"

Object.keys(realWorldExamples).forEach((section) => {
  let { slug, title, lessons } = realWorldExamples[section]
  slug = slugify(title, { lower: true })

  lessons.forEach((lesson) => {
    lesson.slug = slugify(lesson.title, { lower: true })
  })
})

fs.writeFileSync(
  path.join(process.cwd(), "real-world-examples.json"),
  JSON.stringify(realWorldExamples, null, 2)
)
