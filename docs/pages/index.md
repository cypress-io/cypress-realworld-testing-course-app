# Pages

All of the pages in the application and how Next.js uses some of them to generate [dynamic routes](https://nextjs.org/docs/routing/dynamic-routes).

## index.tsx

This is the index/home page of the app, i.e., `/`

## \_app.tsx

This page acts like a "layout" page and wraps all of the other pages within the app

```js{11}
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link href="https://rsms.me/inter/inter.css" rel="stylesheet" />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/themes/prism-tomorrow.min.css"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
```

The `<Component {...pageProps} />` on line `11` is where the other pages are passed into this special component and rendered.

## [section]/

This is a special directory that Next.js uses for [dynamic routes](https://nextjs.org/docs/routing/dynamic-routes). There are two pages within this directory.

1. `index.tsx` - is reponsible for rendering all of the course landing pages, i.e.,

- `/testing-your-first-application`.
- `/testing-foundations`.
- `/cypress-fundamentals`.
- `/advanced-cypress-concepts`.

2. `[slug].tsx` - is a [dynamic page](https://nextjs.org/docs/basic-features/pages) and is responsible for rendering all of the lesson pages for the courses, i.e., `/testing-your-first-application/todomvc-app-install-and-overview`.

## real-world-examples/

This is a special directory that Next.js uses for [dynamic routes](https://nextjs.org/docs/routing/dynamic-routes). There are two pages within this directory.

1. `index.tsx` - is reponsible for rendering the real world examples landing page, i.e.,

- `/real-world-examples`.

2. `[slug].tsx` - is a [dynamic page](https://nextjs.org/docs/basic-features/pages) and is responsible for rendering all of the real world example pages, i.e., `/real-world-examples/authentication-overview-and-setup`.

## getStaticProps()

[getStaticProps()](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation) is a special method from Next.js that is used to fetch the data necessary to render the page and its components.

## getStaticPaths()

[getStaticPaths()](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation) is a special method from Next.js that is used to get the lists of paths necessary to render dynamic routes.
