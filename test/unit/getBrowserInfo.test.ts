import { describe, it, expect } from 'vitest'
import { getBrowserInfo } from '../../app/utils/browser-info'

describe('getBrowserInfo', () => {
  it('should return correct info for Chrome', () => {
    const result = getBrowserInfo('Chrome')
    expect(result).toEqual({ icon: 'logos:chrome', name: 'Chrome' })
  })

  it('should return correct info for Firefox', () => {
    const result = getBrowserInfo('Firefox')
    expect(result).toEqual({ icon: 'logos:firefox', name: 'Firefox' })
  })

  it('should return correct info for Safari', () => {
    const result = getBrowserInfo('Safari')
    expect(result).toEqual({ icon: 'logos:safari', name: 'Safari' })
  })

  it('should return correct info for mobile browsers', () => {
    const mobileChrome = getBrowserInfo('Mobile Chrome')
    expect(mobileChrome).toEqual({ icon: 'logos:chrome', name: 'Chrome' })

    const mobileSafari = getBrowserInfo('Mobile Safari')
    expect(mobileSafari).toEqual({ icon: 'logos:safari', name: 'Safari' })
  })

  it('should return null for unknown browser', () => {
    const result = getBrowserInfo('UnknownBrowser')
    expect(result).toBeNull()
  })

  it('should return null for empty string', () => {
    const result = getBrowserInfo('')
    expect(result).toBeNull()
  })

  it('should be case-sensitive', () => {
    const result = getBrowserInfo('chrome')
    expect(result).toBeNull()
  })

  it('should handle all supported browsers', () => {
    const browsers = [
      'Chrome', 'Chromium', 'Safari', 'Firefox', 'Edge',
      'Opera', 'Brave', 'Vivaldi', 'DuckDuckGo Browser',
      'Android Browser', 'Mobile Chrome', 'Mobile Firefox', 'Mobile Safari'
    ]

    browsers.forEach(browser => {
      const result = getBrowserInfo(browser)
      expect(result).not.toBeNull()
      expect(result).toHaveProperty('icon')
      expect(result).toHaveProperty('name')
    })
  })
})