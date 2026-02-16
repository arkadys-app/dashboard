import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { getAge } from '../../app/utils/utils'

describe('getAge function', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-02-09'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('exact age calculations', () => {
    it('should calculate age for someone born exactly 25 years ago', () => {
      expect(getAge('2001-02-09')).toBe(25)
    })

    it('should calculate age for someone born exactly 18 years ago', () => {
      expect(getAge('2008-02-09')).toBe(18)
    })

    it('should calculate age for someone born exactly 1 year ago', () => {
      expect(getAge('2025-02-09')).toBe(1)
    })

    it('should return 0 for someone born today', () => {
      expect(getAge('2026-02-09')).toBe(0)
    })
  })

  describe('birthday not yet occurred this year', () => {
    it('should not count the current year if birthday is later in the year', () => {
      expect(getAge('2000-03-15')).toBe(25)
    })

    it('should not count the current year if birthday is in December', () => {
      expect(getAge('2000-12-25')).toBe(25)
    })

    it('should not count the current year if birthday is tomorrow', () => {
      expect(getAge('2000-02-10')).toBe(25)
    })

    it('should not count the current year if same month but later day', () => {
      expect(getAge('2000-02-20')).toBe(25)
    })
  })

  describe('birthday already occurred this year', () => {
    it('should count the current year if birthday was earlier this year', () => {
      expect(getAge('2000-01-15')).toBe(26)
    })

    it('should count the current year if birthday was on January 1st', () => {
      expect(getAge('2000-01-01')).toBe(26)
    })

    it('should count the current year if birthday was yesterday', () => {
      expect(getAge('2000-02-08')).toBe(26)
    })

    it('should count the current year if same month but earlier day', () => {
      expect(getAge('2000-02-01')).toBe(26)
    })
  })

  describe('edge cases with months', () => {
    it('should handle birthday in the same month but before today', () => {
      expect(getAge('2000-02-05')).toBe(26)
    })

    it('should handle birthday in the same month but after today', () => {
      expect(getAge('2000-02-15')).toBe(25)
    })

    it('should handle birthday on the same day and month', () => {
      expect(getAge('2000-02-09')).toBe(26)
    })
  })

  describe('leap year handling', () => {
    it('should handle leap year birthdays', () => {
      expect(getAge('2000-02-29')).toBe(25)
    })

    it('should calculate age correctly for leap year birthday when current year is not leap year', () => {
      vi.setSystemTime(new Date('2025-03-01'))
      expect(getAge('2000-02-29')).toBe(25)
    })
  })

  describe('different date formats', () => {
    it('should handle ISO format dates', () => {
      expect(getAge('2000-06-15T00:00:00.000Z')).toBe(25)
    })

    it('should handle date strings with time', () => {
      expect(getAge('2000-02-09T14:30:00')).toBe(26)
    })

    it('should handle slash-separated dates', () => {
      expect(getAge('2000/02/09')).toBe(26)
    })
  })

  describe('very young and very old ages', () => {
    it('should calculate age for newborns (less than 1 year old)', () => {
      expect(getAge('2025-06-15')).toBe(0)
    })

    it('should calculate age for elderly people', () => {
      expect(getAge('1926-02-09')).toBe(100)
      expect(getAge('1920-01-01')).toBe(106)
    })

    it('should handle people born over 100 years ago', () => {
      expect(getAge('1900-02-09')).toBe(126)
    })
  })

  describe('month boundary cases', () => {
    it('should handle end of month correctly', () => {
      vi.setSystemTime(new Date('2026-01-31'))
      expect(getAge('2000-01-31')).toBe(26)
      expect(getAge('2000-02-01')).toBe(25)
    })

    it('should handle beginning of month correctly', () => {
      vi.setSystemTime(new Date('2026-03-01'))
      expect(getAge('2000-02-28')).toBe(26)
      expect(getAge('2000-03-01')).toBe(26)
      expect(getAge('2000-03-02')).toBe(25)
    })
  })

  describe('year transitions', () => {
    it('should calculate correctly at the end of the year', () => {
      vi.setSystemTime(new Date('2026-12-31'))
      expect(getAge('2000-12-31')).toBe(26)
      expect(getAge('2000-12-30')).toBe(26)
      expect(getAge('2001-01-01')).toBe(25)
    })

    it('should calculate correctly at the beginning of the year', () => {
      vi.setSystemTime(new Date('2026-01-01'))
      expect(getAge('2000-01-01')).toBe(26)
      expect(getAge('2000-01-02')).toBe(25)
      expect(getAge('1999-12-31')).toBe(26)
    })
  })

  describe('realistic scenarios', () => {
    it('should calculate age for adult born in 1990', () => {
      expect(getAge('1990-05-20')).toBe(35)
    })

    it('should calculate age for teenager born in 2010', () => {
      expect(getAge('2010-11-10')).toBe(15)
    })

    it('should calculate age for child born in 2020', () => {
      expect(getAge('2020-01-15')).toBe(6)
    })
  })
})
