const browserInfo = {
  Chrome: { icon: 'logos:chrome', name: 'Chrome' },
  Chromium: { icon: 'simple-icons:googlechrome', name: 'Chromium' },
  Safari: { icon: 'logos:safari', name: 'Safari' },
  Firefox: { icon: 'logos:firefox', name: 'Firefox' },
  Edge: { icon: 'logos:microsoft-edge', name: 'Edge' },
  Opera: { icon: 'logos:opera', name: 'Opera' },
  Brave: { icon: 'logos:brave', name: 'Brave' },
  Vivaldi: { icon: 'logos:vivaldi-icon', name: 'Vivaldi' },
  'DuckDuckGo Browser': {
    icon: 'logos:duckduckgo',
    name: 'DuckDuckGo Browser'
  },
  'Android Browser': { icon: 'logos:android-icon', name: 'Android Browser' },
  'Mobile Chrome': { icon: 'logos:chrome', name: 'Chrome' },
  'Mobile Firefox': { icon: 'logos:firefox', name: 'Firefox' },
  'Mobile Safari': { icon: 'logos:safari', name: 'Safari' }
} as const

type BrowserInfo = (typeof browserInfo)[keyof typeof browserInfo]

export function getBrowserInfo(key: string): BrowserInfo | null {
  return (browserInfo as Record<string, BrowserInfo>)[key] ?? null
}
