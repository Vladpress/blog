import Head from 'next/head'

export default function MainLayout ({ children, title = 'Blog' }) {
    
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content="next, ssr, typeScript, react, redux" />
        <meta name="description" content="Little blog with posts" />
        <meta charSet="utf-8" />
      </Head>
      <main>
        {children}
      </main>     
    </>
  )
}