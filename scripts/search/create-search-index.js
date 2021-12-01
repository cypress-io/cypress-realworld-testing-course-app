import path from "path"
import { promises as fs } from "fs"
import { globby } from "globby"
import grayMatter from "gray-matter"
import { unslugify } from "unslugify"
;(async function () {
  const publicDir = path.join(process.cwd(), "public")
  const contentDir = path.join(process.cwd(), "content/**")
  const contentFilePattern = path.join(contentDir, "*.mdx")
  const indexFile = path.join(publicDir, "search-index.json")

  const getSlugFromPathname = (pathname) =>
    path.basename(pathname, path.extname(pathname))

  const contentFilePaths = await globby([contentFilePattern])

  if (contentFilePaths.length) {
    const files = contentFilePaths.map(
      async (filePath) => await fs.readFile(filePath, "utf8")
    )
    const index = []
    let i = 0
    for await (let file of files) {
      const { content } = grayMatter(file)
      let lessonFilePath
      const coursesFilePathRegex = new RegExp("/courses/")
      const RWEFilePathRegex = new RegExp("/real-world-examples/")

      if (coursesFilePathRegex.test(contentFilePaths[i])) {
        const pathArray = contentFilePaths[i].split("/")
        const course = pathArray.slice(-2)[0]
        const lesson = pathArray.slice(-1)[0].replace(/.mdx/, "")
        lessonFilePath = `/${course}/${lesson}`
      }

      if (RWEFilePathRegex.test(contentFilePaths[i])) {
        const pathArray = contentFilePaths[i].split("/")
        const lesson = pathArray.slice(-1)[0].replace(/.mdx/, "")
        lessonFilePath = `/real-world-examples/${lesson}`
      }

      index.push({
        // slug: getSlugFromPathname(contentFilePaths[i]),
        title: unslugify(getSlugFromPathname(contentFilePaths[i])),
        content,
        hierarchy: {
          lvl0: {
            defaultValue: "Lessons",
          },
          lvl1: unslugify(getSlugFromPathname(contentFilePaths[i])),
        },
        url: lessonFilePath,
        type: "lvl1",
      })
      i++
    }
    await fs.writeFile(indexFile, JSON.stringify(index))
    console.log(
      `Indexed ${index.length} documents from ${contentDir} to ${indexFile}`
    )
  }
})()
