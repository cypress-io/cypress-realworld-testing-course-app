import Head from "next/head"
import Layout from "../components/Layout"
import HomeHero from "../components/Home/HomeHero"
import HomeFeatures from "../components/Home/HomeFeatures"
import HomeCourses from "../components/Home/HomeCourses"
import coursesJson from "../data/courses.json"
import realWorldExamples from "../data/real-world-examples.json"
import { progressService } from "../machines/progressService"

export default function Home({ content, courses }) {
  return (
    <Layout
      content={content}
      courses={courses}
      progressService={progressService}
    >
      <Head>
        <title>Testing Next.js Applications with Cypress</title>
      </Head>

      <HomeHero />
      <HomeFeatures />
      <HomeCourses
        courses={courses}
        content={content}
        progressService={progressService}
      />
    </Layout>
  )
}

export const getStaticProps = async ({ params }) => {
  const courses = Object.keys(coursesJson)
  return {
    props: {
      content: coursesJson,
      courses,
      realWorldExamples,
    },
  }
}
