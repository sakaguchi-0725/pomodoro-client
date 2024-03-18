import { DailyReport, FormattedDailyReport, FormattedWeeklyReport, FormattedWeeklyReportItem, WeeklyReport } from "../../../../types"
import { parseISO, format, startOfWeek, endOfWeek, addDays, eachDayOfInterval } from 'date-fns'

export const formatWeeklyReportData = (data: WeeklyReport[], startDateStr: string, endDateStr: string): FormattedWeeklyReport[] => {
  const startDate = parseISO(startDateStr)
  const endDate = parseISO(endDateStr)
  
  const result: FormattedWeeklyReport[] = []

  let currentDate = startOfWeek(startDate, { weekStartsOn: 1 })
  while (currentDate <= endDate) {
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

export const formatDailyReportData = (data: DailyReport[]): FormattedDailyReport[] => {
  const aggregatedData: Record<string, number> = {};
  for (let hour = 0; hour < 24; hour++) {
    aggregatedData[`${hour}:00`] = 0;
  }

  data.forEach((item) => {
    const hour = format(parseISO(String(item.time)), 'HH:00')
    aggregatedData[hour] += item.focus_time
  })

  return Object.entries(aggregatedData).map(([time, focusTime]) => ({
    time,
    focusTime,
  }))
}