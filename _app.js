import '../styles/globals.css'
import Head from 'next/head'

export default function MyApp({Component, pageProps}){
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div dir="rtl" lang="ar">
        <Component {...pageProps} />
      </div>
    </>
  )
}
