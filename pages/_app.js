import '../styles/globals.css'
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

// FAVICON INSTRUCTIES:
// Genereer favicons op https://realfavicongenerator.net
// Upload een 512x512 PNG van het LekkageFix logo (blauwe druppel op groen)
// Download het pakket en zet de bestanden in /public:
//   - favicon.ico
//   - favicon-16x16.png
//   - favicon-32x32.png
//   - apple-touch-icon.png        (180x180 — voor iPhone homescreen)
//   - android-chrome-192x192.png  (voor Android homescreen)
//   - android-chrome-512x512.png  (voor Android splash screen)
//   - site.webmanifest
//
// Voeg dit toe aan elke <Head> in je pagina's (of centraal via _document.jsx):
// <link rel="icon" href="/favicon.ico" />
// <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
// <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
// <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
// <link rel="manifest" href="/site.webmanifest" />
// <meta name="theme-color" content="#145c38" />
//
// App icons = de iconen die gebruikers zien als ze jouw site
// opslaan op hun telefoon homescreen (Android/iOS)
