/**
 * App — compone los 8 bloques del sitio en el orden oficial (CRO §2.0):
 *   0 Navbar · 1 Hero · 2 Tradición · 3 Kit · 4 Cómo funciona · 5 Comprar
 *   6 Victoria + Mail Club · 7 Cierre.
 *
 * El proveedor de idioma envuelve todo: cualquier componente puede llamar a
 * `useLang()` y cambiar ES/EN/FR en caliente sin recargar.
 */
import { LanguageProvider } from './i18n/LanguageContext'
import Navbar from './components/Navbar'
import CheckoutNotice from './components/CheckoutNotice'
import Hero from './components/Hero'
import Tradition from './components/Tradition'
import KitContents from './components/KitContents'
import HowItWorks from './components/HowItWorks'
import BuySection from './components/BuySection'
import FooterMailClub from './components/FooterMailClub'
import SiteFooter from './components/SiteFooter'

export default function App() {
  return (
    <LanguageProvider>
      <Navbar />
      {/* Vuelta de Stripe: pago confirmado / pendiente / cancelado. */}
      <CheckoutNotice />
      <main id="contenido" className="overflow-x-clip">
        <Hero />
        <Tradition />
        <KitContents />
        <HowItWorks />
        <BuySection />
        <FooterMailClub />
      </main>
      <SiteFooter />
    </LanguageProvider>
  )
}
