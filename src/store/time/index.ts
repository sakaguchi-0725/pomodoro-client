import { create } from "zustand"

type EditedTime = {
  id: number
  focusTime: number
}

export type TimeSettings = {
  pomodoro: number
  shortBreak: number
  longBreak: number
  isAutoTimer: boolean
  longBreakInterval: number
}

type State = {
  editedTime: EditedTime
  timeSettings: TimeSettings
  resetEditedTime: () => void
  getTimeSettings: () => void
  setTimeSettings: (payload: TimeSettings) => void
}

const useStore = create<State>((set) => ({
  editedTime: { id: 0, focusTime: 0 },
  timeSettings: {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 10,
    isAutoTimer: true,
    longBreakInterval: 3
  },
  resetEditedTime: () => set({ editedTime: { id: 0, focusTime: 0 } }),
  getTimeSettings: () => {
    const getSetting = (key: string, defaultValue: number) => {
      const value = localStorage.getItem(key)
      return value !== null ? Number(value) : defaultValue
    }

    const pomodoro = getSetting('pomodoro', 25)
    const shortBreak = getSetting('shortBreak', 5)
    const longBreak = getSetting('longBreak', 10)
    const isAutoTimerValue = localStorage.getItem('isAutoTimer')
    const isAutoTimer = isAutoTimerValue !== null ? isAutoTimerValue === '1' : true
    const longBreakInterval = getSetting('longBreakInterval', 3)

    set({ timeSettings: { pomodoro, shortBreak, longBreak, isAutoTimer, longBreakInterval } })
  },
  setTimeSettings: (payload: TimeSettings) => {
    localStorage.setItem('pomodoro', String(payload.pomodoro))
    localStorage.setItem('shortBreak', String(payload.shortBreak))
    localStorage.setItem('longBreak', String(payload.longBreak))
    localStorage.setItem('isAutoTimer', !payload.isAutoTimer ? '0' : '1')
    localStorage.setItem('longBreakInterval', String(payload.longBreakInterval))

    set({
      timeSettings: payload,
    })
  },
}))

export default useStore