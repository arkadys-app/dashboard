import { describe, it, expect } from 'vitest'
import { cn } from '../../app/utils/ui'

describe('cn utility function', () => {
  it('should merge multiple class strings', () => {
    expect(cn('text-red-500', 'bg-blue-500')).toBe('text-red-500 bg-blue-500')
  })

  it('should handle conditional classes with objects', () => {
    expect(cn('base-class', { active: true, disabled: false })).toBe(
      'base-class active'
    )
  })

  it('should merge conflicting Tailwind classes correctly', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4')
  })

  it('should handle arrays of classes', () => {
    expect(cn(['text-sm', 'font-bold'], 'text-center')).toBe(
      'text-sm font-bold text-center'
    )
  })

  it('should filter out falsy values', () => {
    expect(cn('text-red-500', false, null, undefined, 'bg-blue-500')).toBe(
      'text-red-500 bg-blue-500'
    )
  })

  it('should handle empty input', () => {
    expect(cn()).toBe('')
  })

  it('should handle complex Tailwind merge scenarios', () => {
    expect(cn('bg-red-500 hover:bg-blue-500', 'bg-green-500')).toBe(
      'hover:bg-blue-500 bg-green-500'
    )
  })
})
