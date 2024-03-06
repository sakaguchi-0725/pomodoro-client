import { format, startOfWeek, endOfDay, subWeeks } from 'date-fns'

export const getStartDate = (date: Date): string => {
  return format(date, 'yyyy-MM-dd')
}

export const getNextStartDate = (date: Date): string => {
  const threeWeekBefore = subWeeks(date, 3)
  const lastMonday = startOfWeek(threeWeekBefore, { weekStartsOn: 1 })

  return format(lastMonday, 'yyyy-MM-dd')
}

export const getEndDate = (date: Date): string => {
  return format(endOfDay(date), 'yyyy-MM-dd')
}

export const getNextEndDate = (date: Date): string => {
  const threeWeekAfter = subWeeks(date, -4)
  const lastSunday = startOfWeek(threeWeekAfter, { weekStartsOn: 0 })

  return format(lastSunday, 'yyyy-MM-dd')
}