import type { Metadata } from "next"
import "../globals.css"
import TopBar from "@/components/layout/TopBar"
import Header from "@/components/layout/Header"
import Navigation from "@/components/layout/Navigation"
import BreakingNewsTicker from "@/components/layout/BreakingNewsTicker"
import Footer from "@/components/layout/Footer"
import ReduxWrapper from "@/components/wrapper/ReduxWrapper"

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const isIt = lang === "it"

  const title = isIt
    ? "LA | TRIBUNA SPORTIVA  "
    : "LA | TRIBUNA SPORTIVA"

  const description = isIt
    ? "Risultati calcistici in tempo reale, aggiornamenti Formula 1, tennis, basket, calciomercato e statistiche su LA | TRIBUNA SPORTIVA."
    : "Real-time soccer results, Formula 1 updates, tennis coverage, basketball rankings, transfers and stats on LA | TRIBUNA SPORTIVA."

  return {
    title,
    description,
    metadataBase: new URL("https://sportspulse-news.vercel.app"),
    openGraph: {
      title,
      description,
      siteName: "SportsPulse",
      locale: isIt ? "it_IT" : "en_US",
      type: "website"
    }
  }
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  return (
    <html lang={lang || "it"} className="h-full scroll-smooth">
      <ReduxWrapper>
        <body className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 font-sans antialiased">
          <TopBar />
          <Header />
          <Navigation />
          <BreakingNewsTicker />

          {/* Main Content Area */}
          <main className="grow w-full max-w-5xl mx-auto px-4 py-6">
            {children}
          </main>

          <Footer />
        </body>
      </ReduxWrapper>
    </html>
  )
}
