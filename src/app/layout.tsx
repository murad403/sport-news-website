import type { Metadata } from "next"
import "./globals.css"
import TopBar from "@/components/layout/TopBar"
import Header from "@/components/layout/Header"
import Navigation from "@/components/layout/Navigation"
import BreakingNewsTicker from "@/components/layout/BreakingNewsTicker"
import Footer from "@/components/layout/Footer"

export const metadata: Metadata = {
  title: "SportsPulse | Professional Sports News Platform",
  description: "Real-time soccer results, Formula 1 updates, tennis coverage, basketball rankings, transfers and stats on SportsPulse.",
  metadataBase: new URL("https://sportspulse-news.vercel.app"),
  openGraph: {
    title: "SportsPulse | Professional Sports News Platform",
    description: "Real-time soccer results, Formula 1 updates, tennis coverage, basketball rankings, transfers and stats.",
    siteName: "SportsPulse",
    locale: "en_US",
    type: "website"
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
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
    </html>
  )
}
