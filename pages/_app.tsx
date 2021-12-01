import "tailwindcss/tailwind.css"
import "../styles/global.css"
import Head from "next/head"
import { useEffect } from "react"
import * as FullStory from "@fullstory/browser"

function MyApp({ Component, pageProps }) {
  // @ts-ignore
  if (typeof window !== "undefined" && !window.Cypress) {
    // eslint-disable-next-line
    useEffect(() => {
      FullStory.init({ orgId: process.env.NEXT_PUBLIC_FULL_STORY_ORG_ID })
    }, [])
  }

  return (
    <>
      <Head>
        <link href="https://rsms.me/inter/inter.css" rel="stylesheet" />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/themes/prism-tomorrow.min.css"
          rel="stylesheet"
        />
        <link
          rel="preconnect"
          href="https://8V1MWQUQBN-dsn.algolia.net"
          crossOrigin=""
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
