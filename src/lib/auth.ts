export function parseBasicAuth(authHeader: string): { username: string; password: string } | null {
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return null
  }

  try {
    const base64Credentials = authHeader.slice(6)
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8')
    const colonIndex = credentials.indexOf(':')
    
    if (colonIndex === -1) {
      return null
    }

    const username = credentials.slice(0, colonIndex)
    const password = credentials.slice(colonIndex + 1)
    
    return { username, password }
  } catch {
    return null
  }
}

export function validateCredentials(username: string, password: string): boolean {
  const expectedUsername = process.env.BASIC_AUTH_USER
  const expectedPassword = process.env.BASIC_AUTH_PASSWORD
  
  if (!expectedUsername || !expectedPassword) {
    return false
  }
  
  return username === expectedUsername && password === expectedPassword
}

export function checkAuthEnvironment(): boolean {
  const isProduction = process.env.NODE_ENV === 'production'
  const hasCredentials = !!(process.env.BASIC_AUTH_USER && process.env.BASIC_AUTH_PASSWORD)
  
  if (isProduction && !hasCredentials) {
    return false
  }
  
  return true
}