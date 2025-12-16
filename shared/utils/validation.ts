import { CalendarDate } from '@internationalized/date'
import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.email('Adresse e-mail invalide'),
  password: z
    .string('Mot de passe requis')
    .min(8, 'Doit comporter au moins 8 caractères')
})

export const SignUpSchema = z.object({
  firstname: z
    .string('Prénom requis')
    .min(3, 'Doit comporter au moins 3 caractères'),
  lastname: z
    .string('Nom requis')
    .min(3, 'Doit comporter au moins 3 caractères'),
  email: z.email('Adresse e-mail invalide'),
  password: z
    .string('Mot de passe requis')
    .min(8, 'Doit comporter au moins 8 caractères')
})

export const EditUserSchema = z.object({
  firstname: z
    .string('Prénom requis')
    .min(3, 'Doit comporter au moins 3 caractères'),
  lastname: z
    .string('Nom requis')
    .min(3, 'Doit comporter au moins 3 caractères')
})

export const ChangePasswordSchema = z
  .object({
    oldPassword: z.string('Mot de passe actuel requis'),
    newPassword: z
      .string('Nouveau mot de passe requis')
      .min(8, 'Doit comporter au moins 8 caractères'),
    confirmNewPassword: z.string(
      'Confirmation du nouveau mot de passe requise'
    ),
    revokeOtherSessions: z.boolean().optional()
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    error: 'Les nouveaux mots de passe ne correspondent pas',
    path: ['confirmNewPassword']
  })

export const DeleteAccountSchema = z.object({
  confirmation: z
    .string('Confirmation requise')
    .refine((val) => val === 'Supprimer', {
      message: 'Vous devez saisir "Supprimer" pour confirmer.'
    }),
  password: z.string('Mot de passe requis')
})

export const ChildSchemaClient = z.object({
  firstname: z
    .string('Le prénom est requis')
    .min(3, 'Doit comporter au moins 3 caractères'),
  birthdate: z.custom<CalendarDate>((value) => value instanceof CalendarDate, {
    message: 'La date de naissance est requise'
  })
})

export const ChildSchemaServer = z.object({
  firstname: z
    .string('Le prénom est requis')
    .min(3, 'Doit comporter au moins 3 caractères'),
  birthdate: z.coerce
    .date('La date de naissance est requise')
    .max(new Date(), 'La date de naissance ne peut pas être dans le futur')
})

export const WordlistSchemaClient = z.object({
  name: z.string('Nom requis').min(3, 'Doit comporter au moins 3 caractères'),
  description: z.string().optional(),
  game: z.string('Jeu requis'),
  wordlist: z.string('Liste de mots requise').refine(
    (val) => {
      const word = val
        .split('\n')
        .map((word) => word.trim())
        .filter((word) => word.length > 0)

      return word.length >= 4
    },
    { error: 'La liste doit comporter au moins 4 mots' }
  )
})

export const WordlistSchemaServer = z.object({
  name: z.string('Nom requis').min(3, 'Doit comporter au moins 3 caractères'),
  description: z.string().optional(),
  gameId: z.string('Jeu requis'),
  words: z
    .array(z.string('Mot requis'))
    .min(4, 'La liste doit comporter au moins 4 mots')
})

export const ToggleWordlistSchema = z.object({
  state: z.boolean('État requis')
})
