import '../styles/globals.css'
import Footer from '../components/footer'

function MyApp({ Component, pageProps }) {
  return (
    <div className="dark flex flex-col min-h-screen">
      <div className="flex-grow">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  )
}

export default MyApp