import { create } from "zustand"

type EditedTime = {
  id: number
  focusTime: number
}

type TimeSettings = {
  pomodoro: number
  shortBreak: number
  longBreak: number
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
  timeSettings: { pomodoro: 25, shortBreak: 5, longBreak: 10 },
  resetEditedTime: () => set({ editedTime: { id: 0, focusTime: 0 } }),
  getTimeSettings: () => {
    const getSetting = (key: string, defaultValue: number) => {
      const value = localStorage.getItem(key)
      return value !== null ? Number(value) : defaultValue
    }

    const pomodoro = getSetting('pomodoro', 25)
    const shortBreak = getSetting('shortBreak', 5)
    const longBreak = getSetting('longBreak', 10)

    set({ timeSettings: { pomodoro, shortBreak, longBreak } })
  },
  setTimeSettings: (payload: TimeSettings) => {
    localStorage.setItem('pomodoro', String(payload.pomodoro))
    localStorage.setItem('shortBreak', String(payload.shortBreak))
    localStorage.setItem('longBreak', String(payload.longBreak))

    set({
      timeSettings: payload,
    })
  },
}))

export default useStore