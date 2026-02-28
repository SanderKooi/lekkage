import '../styles/global.css'
import CookieBanner from '../components/CookieBanner'
import WhatsAppButton from '../components/WhatsAppButton'
import StickyContact from '../components/StickyContact'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <CookieBanner />
      <WhatsAppButton />
      <StickyContact />
    </>
  )
}
