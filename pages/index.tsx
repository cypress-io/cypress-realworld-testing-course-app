import Head from "next/head"
import Layout from "../components/Layout"
import HomeHero from "../components/Home/HomeHero"
import HomeFeatures from "../components/Home/HomeFeatures"
import HomeCourses from "../components/Home/HomeCourses"
import HomeRealWorldExamples from "../components/Home/HomeRealWorldExamples"
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
        <title>Real World Testing with Cypress</title>
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
      <HomeRealWorldExamples />
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
