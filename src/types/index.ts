export type Task = {
  id: number
  title: string
  created_at: Date
  updated_at: Date
}

export enum TimerType {
  POMODORO = 'POMODORO',
  SHORT_BREAK = 'SHORT_BREAK',
  LONG_BREAK = 'LONG_BREAK'
}

export type Time = {
  id: number
  focus_time: number
  created_at: Date
  updated_at: Date
}

export type Report = {
  total_focus_time: number
  consecutive_days: number
  daily_report: DailyReport[]
  weekly_report: WeeklyReport[]
}

export type DailyReport = {
  time: string
  focus_time: number
}

export type WeeklyReport = {
  date: string
  focus_time: number
}

export type FormattedWeeklyReportItem = {
  dayOfWeek: string
  focusTime: number
}

export type FormattedWeeklyReport = {
  startDate: string
  endDate: string
  data: FormattedWeeklyReportItem[]
}

export type ReportParams = {
  report_type: string
  start_date: string
  end_date: string
}

export type CsrfToken = {
  csrf_token: string
}

export type Credential = {
  email: string
  password: string
}