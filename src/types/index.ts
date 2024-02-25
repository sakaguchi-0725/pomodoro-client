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
  task_id: number | null
  created_at: Date
  updated_at: Date
}

export type CsrfToken = {
  csrf_token: string
}

export type Credential = {
  email: string
  password: string
}