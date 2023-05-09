import dynamic from "next/dynamic"
import Head from "next/head"
import Header from "./Header"

const Footer = dynamic(() => import("./Footer"), {
  ssr: false,
})

export default function Layout({
  children,
  content,
  courses,
  progressService,
}) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header
        content={content}
        courses={courses}
        progressService={progressService}
      />
      {children}
      <Footer />
    </>
  )
}
