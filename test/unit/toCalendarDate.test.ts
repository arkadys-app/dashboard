import { describe, it, expect } from 'vitest'
import { CalendarDate } from '@internationalized/date' // Adjust import if needed
import { toCalendarDate } from '../../app/utils/utils'

describe('toCalendarDate function', () => {
  it('should convert date string to CalendarDate', () => {
    const result = toCalendarDate('2024-06-15')

    expect(result).toBeInstanceOf(CalendarDate)
    expect(result.year).toBe(2024)
    expect(result.month).toBe(6)
    expect(result.day).toBe(15)
  })

  it('should handle first day of the month', () => {
    const result = toCalendarDate('2023-01-01')

    expect(result.year).toBe(2023)
    expect(result.month).toBe(1)
    expect(result.day).toBe(1)
  })

  it('should handle last day of the month', () => {
    const result = toCalendarDate('2023-12-31')

    expect(result.year).toBe(2023)
    expect(result.month).toBe(12)
    expect(result.day).toBe(31)
  })

  it('should handle ISO format with time', () => {
    const result = toCalendarDate('2024-03-20T14:30:00')

    expect(result.year).toBe(2024)
    expect(result.month).toBe(3)
    expect(result.day).toBe(20)
  })
})