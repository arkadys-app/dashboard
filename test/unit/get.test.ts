import { describe, it, expect } from 'vitest'
import { get } from '../../app/utils/utils'

describe('`get` function', () => {
	describe('accessing top-level properties', () => {
		it('should return the value of a top-level property', () => {
			const obj = {
				name: 'Yanis',
				age: 25
			}

			expect(get(obj, 'name')).toBe('Yanis')
			expect(get(obj, 'age')).toBe(25)
		})

		it('should return undefined for non-existent properties', () => {
			const obj = {
				name: 'Yanis'
			}

			expect(get(obj, 'age')).toBeUndefined()
		})
	})

	describe('accessing nested properties', () => {
		it('should return the value of a nested property', () => {
			const obj = {
				user: {
					profile: {
						name: 'Yanis',
						age: 25
					}
				}
			}

			expect(get(obj, 'user.profile.name')).toBe('Yanis')
			expect(get(obj, 'user.profile.age')).toBe(25)
		})

		it('should handle multiple levels of nesting', () => {
			const obj = {
				a: {
					b: {
						c: {
							d: 'deep'
						}
					}
				}
			}

			expect(get(obj, 'a.b.c.d')).toBe('deep')
		})
	})

	describe('default value', () => {
		it('should return the default value if the property does not exist', () => {
			const obj = {
				name: 'Yanis'
			}

			expect(get(obj, 'age', 30)).toBe(30)
		})

		it('should return the default value for non-existent nested properties', () => {
			const obj = {
				user: {
					profile: {
						name: 'Yanis'
					}
				}
			}

			expect(get(obj, 'user.profile.age', 30)).toBe(30)
		})

		it('should return value of the property if it exists even if a default value is provided', () => {
			const obj = {
				name: 'Yanis',
				age: 25
			}

			expect(get(obj, 'age', 30)).toBe(25)
		})
	})
})