import fs from "fs"
import matter from "gray-matter"
import { MDXRemoteSerializeResult } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import Head from "next/head"
import dynamic from "next/dynamic"
import path from "path"
import { find, findIndex } from "lodash/fp"
import { useActor } from "@xstate/react"
import rehypeSlug from "rehype-slug"
import rehypePrism from "@mapbox/rehype-prism"
import { progressService } from "../../machines/progressService"
import Layout from "../../components/Layout"
import LessonLayout from "../../components/Lesson/LessonLayout"
import MCChallenge from "../../components/Lesson/MultipleChoiceChallenge"
import { fetchCourses } from "../../lib/fetch-courses"
import {
  LessonTableOfContents,
  MultipleChoiceChallenge,
} from "../../types/common"
import {
  CONTENT_PATH,
  allContentFilePaths,
  getToCForMarkdown,
} from "../../utils/mdxUtils"
import { isLessonCompleted } from "../../utils/machineUtils"

const NextLessonBtn = dynamic(
  () => import("../../components/Lesson/NextLessonBtn"),
  {
    ssr: false,
  }
)

const CompleteLessonBtn = dynamic(
  () => import("../../components/Lesson/CompleteLessonBtn"),
  {
    ssr: false,
  }
)

const SkipChallenge = dynamic(
  () => import("../../components/Lesson/SkipChallenge"),
  {
    ssr: false,
  }
)

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  //a: CustomLink,
  // It also works with dynamically-imported components, which is especially
  // useful for conditionally loading components for certain routes.
  // See the notes in README.md for more details.
  //TestComponent: dynamic(() => import('../../components/TestComponent')),
  Head,
}

type Props = {
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  frontMatter: {
    [key: string]: any
  }
  toc: LessonTableOfContents[]
  lessonData: {
    title: string
    slug: string
    description: string
    status: string
    videoURL: string
    challenges: MultipleChoiceChallenge[]
  }
  sectionLessons: []
  nextLesson: string
  sectionTitle: string
  lessonPath: string
  coursesJson: object
  courses: []
  course: string
}

export default function LessonPage({
  source,
  toc,
  lessonData,
  sectionLessons,
  nextLesson,
  sectionTitle,
  lessonPath,
  coursesJson,
  courses,
  course,
}: Props) {
  useActor(progressService)

  return (
    <Layout
      content={coursesJson}
      courses={courses}
      progressService={progressService}
    >
      <Head>
        <title>
          {lessonData.title} | Testing Next.js Applications with Cypress
        </title>
        <meta name="description" content={lessonData.description} />
      </Head>

      <LessonLayout
        toc={toc}
        source={source}
        components={components}
        sectionLessons={sectionLessons}
        sectionTitle={sectionTitle}
        progressService={progressService}
        lessonPath={lessonPath}
        lessonData={lessonData}
        course={course}
      />

      {(!lessonData.challenges ||
        progressService.state.context.disableChallenges) && (
        <CompleteLessonBtn
          progressService={progressService}
          nextLessonPath={nextLesson}
          lessonPath={lessonPath}
        />
      )}

      {lessonData.challenges &&
        progressService.state.context.disableChallenges == false && (
          <>
            <MCChallenge
              progressService={progressService}
              lessonData={lessonData}
              lessonPath={lessonPath}
            />

            <NextLessonBtn
              path={nextLesson}
              isCompleted={isLessonCompleted(progressService, lessonPath)}
            />
          </>
        )}

      {lessonData.challenges && (
        <SkipChallenge progressService={progressService} />
      )}
    </Layout>
  )
}

export const getStaticProps = async ({ params }) => {
  const coursesJson = await fetchCourses()
  const courses = Object.keys(coursesJson)
  const contentFilePath = path.join(
    CONTENT_PATH,
    `${params.course}/${params.slug}.mdx`
  )
  const source = fs.readFileSync(contentFilePath)
  const { content, data } = matter(source)
  const toc: LessonTableOfContents[] = getToCForMarkdown(content)
  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      // @ts-ignore
      rehypePlugins: [rehypeSlug, rehypePrism],
    },
    scope: data,
  })
  const lessonData = find(
    { slug: params.slug },
    coursesJson[params.course].lessons
  )
  const { title, lessons } = coursesJson[params.course]
  const nextLessonIndex = findIndex({ slug: params.slug }, lessons) + 1
  let nextLesson

  if (nextLessonIndex < lessons.length) {
    nextLesson = lessons[nextLessonIndex].slug
  } else {
    nextLesson = null
  }

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      toc,
      lessonData,
      sectionLessons: lessons,
      nextLesson,
      sectionTitle: title,
      lessonPath: `${params.course}/${params.slug}`,
      coursesJson,
      courses,
      course: params.course,
    },
  }
}

export const getStaticPaths = async () => {
  const paths = allContentFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((filePath) => {
      const [course, slug] = filePath.split("/")
      return { params: { slug, course } }
    })

  return {
    paths,
    fallback: false,
  }
}
