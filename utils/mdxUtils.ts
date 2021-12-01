import fs from "fs"
import path from "path"
import glob from "glob"
import toc from "markdown-toc-unlazy"
import { LessonTableOfContents } from "../types/common"

export const CONTENT_PATH = path.join(process.cwd(), "content/courses")
export const REAL_WORLD_EXAMPLES_PATH = path.join(
  process.cwd(),
  "content/real-world-examples"
)

export const contentFilePaths = fs
  .readdirSync(CONTENT_PATH)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path))

export const realWorldExamplesFilePaths = fs
  .readdirSync(REAL_WORLD_EXAMPLES_PATH)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path))

export const allContentFilePaths = glob
  .sync("content/courses/**/*")
  .filter((path) => /\.mdx?$/.test(path))
  .map((path) => path.replace(/^content\/courses\//, ""))

export const allRealWorldExamplesFilePaths = glob
  .sync("content/real-world-examples/**/*")
  .filter((path) => /\.mdx?$/.test(path))
  .map((path) => path.replace(/^content\/real-world-examples\//, ""))

export const getRealWorldExamplePath = (filePath: string) => {
  return glob.sync(filePath)
}

export const getToCForMarkdown = (markdown): LessonTableOfContents[] =>
  toc(markdown).json
