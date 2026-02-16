import { describe, it, expect } from 'vitest'
import { omit } from '../../app/utils/utils'

describe('omit function', () => {
  it('should omit a single key from object', () => {
    const obj = { name: 'Yanis', age: 30, city: 'Paris' }
    const result = omit(obj, ['age'])

    expect(result).toEqual({ name: 'Yanis', city: 'Paris' })
    expect(result).not.toHaveProperty('age')
  })

  it('should omit multiple keys from object', () => {
    const obj = { name: 'Kurt', age: 25, city: 'Nice', country: 'France' }
    const result = omit(obj, ['age', 'country'])

    expect(result).toEqual({ name: 'Kurt', city: 'Nice' })
    expect(result).not.toHaveProperty('age')
    expect(result).not.toHaveProperty('country')
  })

  it('should return a copy when omitting no keys', () => {
    const obj = { name: 'David', age: 22 }
    const result = omit(obj, [])

    expect(result).toEqual(obj)
    expect(result).not.toBe(obj)
  })

  it('should not mutate the original object', () => {
    const obj = { name: 'Pauline', age: 35, city: 'Paris' }
    const original = { ...obj }

    omit(obj, ['age'])

    expect(obj).toEqual(original)
  })

  it('should handle empty object', () => {
    const obj = {}
    const result = omit(obj, [])

    expect(result).toEqual({})
  })

  it('should handle objects with different value types', () => {
    const obj = {
      string: 'text',
      number: 42,
      boolean: true,
      array: [1, 2, 3],
      object: { nested: 'value' },
      nullValue: null,
      undefinedValue: undefined
    }

    const result = omit(obj, ['number', 'array', 'nullValue'])

    expect(result).toEqual({
      string: 'text',
      boolean: true,
      object: { nested: 'value' },
      undefinedValue: undefined
    })
  })

  it('should omit all keys when all are specified', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const result = omit(obj, ['a', 'b', 'c'])

    expect(result).toEqual({})
  })

  it('should preserve nested objects and arrays by reference', () => {
    const nested = { deep: 'value' }
    const arr = [1, 2, 3]
    const obj = { nested, arr, remove: 'this' }

    const result = omit(obj, ['remove'])

    expect(result.nested).toBe(nested)
    expect(result.arr).toBe(arr)
  })
})
