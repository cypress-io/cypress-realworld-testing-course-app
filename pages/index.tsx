import Head from "next/head"
import Layout from "../components/Layout"
import HomeHero from "../components/Home/HomeHero"
import HomeFeatures from "../components/Home/HomeFeatures"
import HomeCourses from "../components/Home/HomeCourses"
import coursesJson from "../data/courses.json"
import { progressService } from "../machines/progressService"
import { fetchCourses } from "../lib/fetch-courses"

export default function Home({ content, courses }) {
  return (
    <Layout
      content={content}
      courses={courses}
      progressService={progressService}
    >
      <Head>
        <title>Testing Next.js Applications with Cypress</title>
        <meta
          name="description"
          content="Learn from top industry experts and level-up your testing knowledge - for free."
        />
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

export async function getStaticProps({ params }) {
  const content = await fetchCourses()
  const courses = Object.keys(coursesJson)
  return {
    props: {
      content,
      courses,
    },
  }
}
