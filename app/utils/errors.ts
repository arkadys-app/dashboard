const errors = {
  INVALID_EMAIL_OR_PASSWORD:
    "L'adresse e-mail ou le mot de passe est incorrect.",
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL:
    "L'utilisateur existe déjà, utilisez une autre adresse e-mail.",
  INVALID_PASSWORD: 'Le mot de passe est invalide.'
} as const

export function getErrorMessage(code?: string) {
  return code && code in errors ? errors[code as keyof typeof errors] : code
}
