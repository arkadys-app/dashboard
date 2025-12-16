import { betterAuth } from 'better-auth'

let _auth: ReturnType<typeof betterAuth>

export function serverAuth() {
  if (!_auth) {
    _auth = auth
  }

  return _auth
}
