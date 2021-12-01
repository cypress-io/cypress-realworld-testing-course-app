import path from "path"
import fs from "fs"
import realWorldExamples from "../data/real-world-examples.json"

const sections = Object.keys(realWorldExamples)

sections.map((section) => {
  const { lessons } = realWorldExamples[section]
  lessons.map((lesson) => {
    const fileData = `---
title: ${lesson.title}
---
# ${lesson.title}

## SubHeader
${lesson.description}

## Another SubHeader
${lesson.description}`

    fs.writeFile(
      path.join(
        process.cwd(),
        `/content/real-world-examples/${section}/${lesson.slug}.mdx`
      ),
      fileData,
      (err) => {
        if (err) {
          console.error(err)
          return
        }
      }
    )
  })
})
