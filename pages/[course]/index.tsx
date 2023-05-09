import Head from "next/head"
import Layout from "../../components/Layout"
import CourseHero from "../../components/Course/CourseHero"
import CourseContent from "../../components/Course/CourseContent"
import { progressService } from "../../machines/progressService"
import { fetchCourses } from "../../lib/fetch-courses"

export default function SectionPage({
  title,
  lessons,
  description,
  learnFeatures,
  content,
  courses,
  course,
}) {
  return (
    <Layout
      content={content}
      courses={courses}
      progressService={progressService}
    >
      <Head>
        <title>{title} | Testing Next.js Applications with Cypress</title>
        <meta name="description" content={description} />
      </Head>

      <CourseHero
        title={title}
        description={description}
        image={content[course].image}
      />
      <CourseContent
        title={title}
        lessons={lessons}
        learnFeatures={learnFeatures}
        progressService={progressService}
        course={course}
      />
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const coursesJson = await fetchCourses()
  const { title, lessons, description, learnFeatures } =
    coursesJson[params.course]
  const courses = Object.keys(coursesJson)

  return {
    props: {
      lessons,
      title,
      description,
      learnFeatures,
      content: coursesJson,
      courses,
      course: params.course,
    },
  }
}

export async function getStaticPaths() {
  const coursesJson = await fetchCourses()
  const courses = Object.keys(coursesJson)
  const paths = courses.map((course) => {
    const { title, lessons } = coursesJson[course]
    return { params: { course, lessons, title } }
  })

  return {
    paths,
    fallback: false,
  }
}
