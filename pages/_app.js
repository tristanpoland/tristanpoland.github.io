import '../styles/globals.css'
import Footer from '../components/footer'
import Nav from '../components/nav'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/x-icon" href="/image/favicon.ico" />
        <title>Tristan Poland - Systems Programmer, Game Dev, Cloud Engineer</title>
      </Head>
      <div className="dark flex flex-col min-h-screen">
        <div className="flex-grow">
          <Nav />
          <div className="bg-black" style={{ height: '60px' }}></div>
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default MyApp