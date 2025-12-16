import { CalendarDate } from '@internationalized/date'
import slugify from '@sindresorhus/slugify'

import type { AcceptableValue } from 'reka-ui'

export function get(
  object: Record<string, any>,
  key: string,
  defaultValue?: any
): any {
  return key.split('.').reduce((o, k) => (o || {})[k], object) ?? defaultValue
}

export function isItem<T>(
  item: T
): item is Exclude<T, Exclude<AcceptableValue, Record<string, any>>> {
  return typeof item === 'object' && item !== null
}

export function getAge(birthdate: string) {
  const birth = new Date(birthdate)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }

  return age
}

export function formatDuration(seconds: number) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  return hours > 0
    ? `${hours}h${minutes.toString().padStart(2, '0')}`
    : `${minutes} min`
}

export function toCalendarDate(dateString: string) {
  const date = new Date(dateString)

  return new CalendarDate(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  )
}

export function normalizeText(text: string) {
  return slugify(text, { separator: ' ' })
}

export function omit<Data extends object, Keys extends keyof Data>(
  data: Data,
  keys: Keys[]
): Omit<Data, Keys> {
  const result = { ...data }

  for (const key of keys) {
    delete result[key]
  }

  return result as Omit<Data, Keys>
}
