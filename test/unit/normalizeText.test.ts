import { describe, it, expect } from 'vitest'
import { normalizeText } from '../../app/utils/utils'

describe('normalizeText function', () => {
  it('should normalize basic text', () => {
    expect(normalizeText('Hello World')).toBe('hello world')
    expect(normalizeText('Simple Text')).toBe('simple text')
  })

  it('should remove accents and diacritics', () => {
    expect(normalizeText('café')).toBe('cafe')
    expect(normalizeText('naïve')).toBe('naive')
    expect(normalizeText('José')).toBe('jose')
    expect(normalizeText('résumé')).toBe('resume')
  })

  it('should handle special characters', () => {
    expect(normalizeText('hello@world')).toBe('hello world')
    expect(normalizeText('test#123')).toBe('test 123')
    expect(normalizeText('foo & bar')).toBe('foo and bar')
  })

  it('should handle multiple spaces and trim', () => {
    expect(normalizeText('hello   world')).toBe('hello world')
    expect(normalizeText('  text  ')).toBe('text')
  })

  it('should handle uppercase text', () => {
    expect(normalizeText('UPPERCASE')).toBe('uppercase')
    expect(normalizeText('MiXeD CaSe')).toBe('mi xe d ca se')
  })

  it('should handle empty and whitespace strings', () => {
    expect(normalizeText('')).toBe('')
    expect(normalizeText('   ')).toBe('')
  })

  it('should handle numbers', () => {
    expect(normalizeText('test 123')).toBe('test 123')
    expect(normalizeText('2024')).toBe('2024')
  })
})