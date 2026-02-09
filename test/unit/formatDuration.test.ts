import { describe, it, expect } from 'vitest'
import { formatDuration } from '../../app/utils/utils'

describe('formatDuration function', () => {
  describe('minutes only format', () => {
    it('should format seconds as minutes when less than 1 hour', () => {
      expect(formatDuration(60)).toBe('1 min')
      expect(formatDuration(300)).toBe('5 min')
      expect(formatDuration(1800)).toBe('30 min')
      expect(formatDuration(3540)).toBe('59 min')
    })

    it('should return 0 min for 0 seconds', () => {
      expect(formatDuration(0)).toBe('0 min')
    })

    it('should handle seconds that don\'t divide evenly into minutes', () => {
      expect(formatDuration(90)).toBe('1 min')
      expect(formatDuration(150)).toBe('2 min')
      expect(formatDuration(3599)).toBe('59 min')
    })
  })

  describe('hours and minutes format', () => {
    it('should format as hours with padded minutes when 1 hour or more', () => {
      expect(formatDuration(3600)).toBe('1h00')
      expect(formatDuration(3660)).toBe('1h01')
      expect(formatDuration(7200)).toBe('2h00')
      expect(formatDuration(7380)).toBe('2h03')
    })

    it('should pad minutes with leading zero when less than 10', () => {
      expect(formatDuration(3720)).toBe('1h02')
      expect(formatDuration(7260)).toBe('2h01')
      expect(formatDuration(10860)).toBe('3h01')
    })

    it('should not pad minutes when 10 or more', () => {
      expect(formatDuration(4200)).toBe('1h10')
      expect(formatDuration(5400)).toBe('1h30')
      expect(formatDuration(9000)).toBe('2h30')
    })

    it('should handle large hour values', () => {
      expect(formatDuration(36000)).toBe('10h00')
      expect(formatDuration(86400)).toBe('24h00')
      expect(formatDuration(90000)).toBe('25h00')
    })
  })

  describe('edge cases', () => {
    it('should handle exactly 1 hour', () => {
      expect(formatDuration(3600)).toBe('1h00')
    })

    it('should handle 1 second before 1 hour', () => {
      expect(formatDuration(3599)).toBe('59 min')
    })

    it('should round down partial minutes', () => {
      expect(formatDuration(119)).toBe('1 min')
      expect(formatDuration(3659)).toBe('1h00')
    })
  })
})