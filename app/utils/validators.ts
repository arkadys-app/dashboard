import type { DateValue } from 'reka-ui'
import * as z from 'zod'

export const LoginSchema = z.object({
  email: z
    .string()
    .nonempty('Veuillez saisir votre adresse e-mail.')
    .email('Adresse e-mail invalide.'),
  password: z.string().nonempty('Veuillez saisir votre mot de passe.')
})

export const SignUpSchema = z.object({
  firstname: z.string().nonempty('Veuillez saisir votre prénom.'),
  lastname: z.string().nonempty('Veuillez saisir votre nom de famille.'),
  email: z
    .string()
    .nonempty('Veuillez saisir votre adresse email.')
    .email('Adresse e-mail invalide.'),
  password: z
    .string()
    .nonempty('Veuillez saisir votre mot de passe.')
    .min(8, 'Le mot de passe doit comporter 8 caractères ou plus.')
})

export const AddChildSchema = z.object({
  firstname: z.string().nonempty("Veuillez saisir le prénom de l'enfant."),
  birthdate: z.preprocess(
    (arg) => {
      if (arg !== null && typeof arg === 'object' && 'toString' in arg) {
        return (arg as DateValue).toString()
      }

      return arg
    },
    z.coerce.date({
      invalid_type_error: 'Date invalide.',
      required_error: 'Veuillez saisir la date de naissance.'
    })
  )
})
