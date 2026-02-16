import { describe, it, expect } from 'vitest'
import { isItem } from '../../app/utils/utils'

describe('isItem function', () => {
  describe('should return true for objects', () => {
    it('should return true for plain objects', () => {
      expect(isItem({})).toBe(true)
      expect(isItem({ name: 'John' })).toBe(true)
      expect(isItem({ a: 1, b: 2 })).toBe(true)
    })

    it('should return true for nested objects', () => {
      expect(isItem({ user: { name: 'Alice' } })).toBe(true)
    })

    it('should return true for arrays', () => {
      expect(isItem([])).toBe(true)
      expect(isItem([1, 2, 3])).toBe(true)
      expect(isItem(['a', 'b'])).toBe(true)
    })

    it('should return true for Date objects', () => {
      expect(isItem(new Date())).toBe(true)
    })

    it('should return true for RegExp objects', () => {
      expect(isItem(/test/)).toBe(true)
      expect(isItem(new RegExp('test'))).toBe(true)
    })

    it('should return true for Map objects', () => {
      expect(isItem(new Map())).toBe(true)
    })

    it('should return true for Set objects', () => {
      expect(isItem(new Set())).toBe(true)
    })

    it('should return true for custom class instances', () => {
      class TestClass {}
      expect(isItem(new TestClass())).toBe(true)
    })
  })

  describe('should return false for null', () => {
    it('should return false for null value', () => {
      expect(isItem(null)).toBe(false)
    })
  })

  describe('should return false for primitive types', () => {
    it('should return false for undefined', () => {
      expect(isItem(undefined)).toBe(false)
    })

    it('should return false for strings', () => {
      expect(isItem('')).toBe(false)
      expect(isItem('hello')).toBe(false)
      expect(isItem('test string')).toBe(false)
    })

    it('should return false for numbers', () => {
      expect(isItem(0)).toBe(false)
      expect(isItem(42)).toBe(false)
      expect(isItem(-1)).toBe(false)
      expect(isItem(3.14)).toBe(false)
      expect(isItem(NaN)).toBe(false)
      expect(isItem(Infinity)).toBe(false)
    })

    it('should return false for booleans', () => {
      expect(isItem(true)).toBe(false)
      expect(isItem(false)).toBe(false)
    })

    it('should return false for BigInt', () => {
      expect(isItem(BigInt(9007199254740991))).toBe(false)
    })

    it('should return false for symbols', () => {
      expect(isItem(Symbol('test'))).toBe(false)
      expect(isItem(Symbol.iterator)).toBe(false)
    })
  })

  describe('type guard behavior', () => {
    it('should narrow type correctly in TypeScript', () => {
      const value: string | object = Math.random() > 0.5 ? 'string' : {}

      if (isItem(value)) {
        expect(typeof value).toBe('object')
      } else {
        expect(typeof value).toBe('string')
      }
    })

    it('should work with union types', () => {
      const values: Array<string | number | object> = ['test', 123, {}, []]
      const objects = values.filter(isItem)

      expect(objects).toHaveLength(2)
      expect(objects).toEqual([{}, []])
    })
  })
})
