import { useEffect, useState } from "react"
import useStore from "../store/time"
import { TimerType } from "../types"

export const useCowntdown = () => {
  const { timeSettings } = useStore()
  const [seconds, setSeconds] = useState(0)
  const [activeTimerType, setActiveTimerType] = useState(TimerType.POMODORO)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const timeInSeconds = {
      [TimerType.POMODORO]: timeSettings.pomodoro * 60,
      [TimerType.SHORT_BREAK]: timeSettings.shortBreak * 60,
      [TimerType.LONG_BREAK]: timeSettings.longBreak * 60
    }[activeTimerType]

    setSeconds(timeInSeconds)
  }, [activeTimerType, timeSettings])

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined = undefined

    if (isActive) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => Math.max(prevSeconds - 1, 0))
      }, 1000)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isActive])

  const toggleIsActive = () => setIsActive(!isActive)

  const changeTimerType = (type: TimerType) => setActiveTimerType(type)

  return { seconds, isActive, activeTimerType, toggleIsActive, changeTimerType }
}

