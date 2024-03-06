import { FormattedWeeklyReport, FormattedWeeklyReportItem, WeeklyReport } from "../../../../types"
import { parseISO, format, startOfWeek, endOfWeek, addDays, eachDayOfInterval } from 'date-fns'

export const formatWeeklyReportData = (data: WeeklyReport[]): FormattedWeeklyReport[] => {
  if (data.length === 0) {
    return []
  }

  const start = data.length > 0 ? startOfWeek(parseISO(data[0].date), { weekStartsOn: 1 }) : new Date()
  const end = data.length > 0 ? endOfWeek(parseISO(data[data.length - 1].date), { weekStartsOn: 1 }) : new Date()
  
  const result: FormattedWeeklyReport[] = []

  let currentDate = start
  while (currentDate <= end) {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 })
    const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 })

    const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd })
    const weekData: FormattedWeeklyReportItem[] = weekDays.map(day => {
      const dayOfWeek = format(day, 'EEE')
      const focusTime = data
        .filter(item => format(parseISO(item.date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'))
        .reduce((acc, curr) => acc + curr.focus_time, 0)

      return { dayOfWeek, focusTime }
    })

    result.push({
      startDate: format(weekStart, 'yyyy-MM-dd'),
      endDate: format(weekEnd, 'yyyy-MM-dd'),
      data: weekData
    })
    currentDate = addDays(weekEnd, 1)
  }

  return result.sort((a, b) => parseISO(b.startDate).getTime() - parseISO(a.startDate).getTime())
}