import { addHours, parseISO } from 'date-fns'
import { format, zonedTimeToUtc } from 'date-fns-tz'

export const formatDate = (value: string | Date, formatString?: string) => {
  if (!value) return value
  if (typeof value === 'string') {
    const parsedDate = parseISO(value)
    const znDate = zonedTimeToUtc(parsedDate, 'America/Sao_Paulo')
    const addedDate = addHours(znDate, 3)
    return format(addedDate, formatString || 'dd/MM/yyyy')
  }

  return format(value, formatString || 'dd/MM/yyyy')
}
