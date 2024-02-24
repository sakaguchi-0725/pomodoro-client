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
  const [pomodoroCount, setPomodoroCount] = useState(0)

  useEffect(() => {
    setSeconds(getTimeInSeconds(activeTimerType, timeSettings))
  }, [activeTimerType, timeSettings])

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined = undefined

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => Math.max(prevSeconds - 1, 0))
      }, 1000)
    } else if (seconds === 0 && isActive) {
      clearInterval(interval)
      switch (activeTimerType) {
        case TimerType.POMODORO:
          setPomodoroCount(count => count === 2 ? 0 : count + 1)
          setActiveTimerType(pomodoroCount === 2 ? TimerType.LONG_BREAK : TimerType.SHORT_BREAK)
          break
        case TimerType.SHORT_BREAK:
        case TimerType.LONG_BREAK:
          setActiveTimerType(TimerType.POMODORO)
          break
      }
      setIsActive(timeSettings.isAutoTimer)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isActive, seconds])

  const toggleIsActive = () => setIsActive(!isActive)

  const changeTimerType = (type: TimerType) => setActiveTimerType(type)

  const resetTimer = () => {
    setSeconds(getTimeInSeconds(activeTimerType, timeSettings))
    setIsActive(false)
  }

  return { seconds, isActive, activeTimerType, toggleIsActive, changeTimerType, resetTimer }
}

