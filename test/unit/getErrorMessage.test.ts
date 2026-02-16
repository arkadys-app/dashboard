import { describe, it, expect } from 'vitest'
import { getErrorMessage } from '../../app/utils/errors'

describe('getErrorMessage', () => {
  it('should return the correct error message for INVALID_EMAIL_OR_PASSWORD', () => {
    const result = getErrorMessage('INVALID_EMAIL_OR_PASSWORD')
    expect(result).toBe("L'adresse e-mail ou le mot de passe est incorrect.")
  })

  it('should return the correct error message for USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL', () => {
    const result = getErrorMessage('USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL')
    expect(result).toBe("L'utilisateur existe déjà, utilisez une autre adresse e-mail.")
  })

  it('should return the correct error message for INVALID_PASSWORD', () => {
    const result = getErrorMessage('INVALID_PASSWORD')
    expect(result).toBe('Le mot de passe est invalide.')
  })

  it('should return the code itself when the code is not in errors object', () => {
    const result = getErrorMessage('UNKNOWN_ERROR')
    expect(result).toBe('UNKNOWN_ERROR')
  })

  it('should return undefined when no code is provided', () => {
    const result = getErrorMessage()
    expect(result).toBeUndefined()
  })

  it('should return undefined when code is an empty string', () => {
    const result = getErrorMessage('')
    expect(result).toBe('')
  })
})