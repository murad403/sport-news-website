import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const locales = ["it", "en"]
const defaultLocale = "it"

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Ignore standard Next.js asset/image assets, favicon, etc.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname === "/favicon.ico" ||
    pathname.includes(".")
  ) {
    return
  }

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Redirect to the default locale 'it'
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip internal paths and assets
    "/((?!api|_next/static|_next/image|favicon.ico|images|.*\\..*).*)",
  ],
}
