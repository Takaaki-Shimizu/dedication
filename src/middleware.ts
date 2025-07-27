import { NextRequest, NextResponse } from 'next/server'
import { parseBasicAuth, validateCredentials, checkAuthEnvironment } from './lib/auth'

export function middleware(request: NextRequest) {
  if (!checkAuthEnvironment()) {
    console.error('Basic auth environment variables not configured properly')
    return new NextResponse('Internal Server Error', { status: 500 })
  }

  const isDevelopment = process.env.NODE_ENV === 'development'
  const hasAuthCredentials = !!(process.env.BASIC_AUTH_USER && process.env.BASIC_AUTH_PASSWORD)
  
  if (isDevelopment && !hasAuthCredentials) {
    return NextResponse.next()
  }

  const authHeader = request.headers.get('authorization')
  
  if (!authHeader) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Portfolio Site"',
      },
    })
  }

  const credentials = parseBasicAuth(authHeader)
  
  if (!credentials) {
    return new NextResponse('Invalid authentication format', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Portfolio Site"',
      },
    })
  }

  const isValidAuth = validateCredentials(credentials.username, credentials.password)
  
  if (!isValidAuth) {
    return new NextResponse('Invalid credentials', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Portfolio Site"',
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
}