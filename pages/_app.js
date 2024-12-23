import '../styles/globals.css'
import Footer from '../components/footer'
import Nav from '../components/nav'

function MyApp({ Component, pageProps }) {
  return (
    <div className="dark flex flex-col min-h-screen">
      <div className="flex-grow">
      <Nav />
      <div className="bg-black" style={{ height: '60px' }}></div>
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  )
}

export default MyApp