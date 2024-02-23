import { useEffect, useState } from "react"
import useStore, { TimeSettings } from "../store/time"
import { TimerType } from "../types"

const getTimeInSeconds = (timerType: TimerType, settings: TimeSettings) => {
  return {
    [TimerType.POMODORO]: settings.pomodoro * 60,
    [TimerType.SHORT_BREAK]: settings.shortBreak * 60,
    [TimerType.LONG_BREAK]: settings.longBreak * 60
  }[timerType]
}

export const useCowntdown = () => {
  const { timeSettings } = useStore()
  const [seconds, setSeconds] = useState(0)
  const [activeTimerType, setActiveTimerType] = useState(TimerType.POMODORO)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    setSeconds(getTimeInSeconds(activeTimerType, timeSettings))
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

  const resetTimer = () => setSeconds(getTimeInSeconds(activeTimerType, timeSettings))

  return { seconds, isActive, activeTimerType, toggleIsActive, changeTimerType, resetTimer }
}

