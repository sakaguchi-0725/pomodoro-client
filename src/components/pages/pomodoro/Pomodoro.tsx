import { useEffect, useState } from 'react'
import 'react-circular-progressbar/dist/styles.css'
import { TimerType } from '../../../types'
import useStore from '../../../store/time'

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds /60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

export const Pomodoro = () => {
  const { timeSettings } = useStore()
  const getTimeSettings = useStore((state) => state.getTimeSettings)
  const [seconds, setSeconds] = useState(0)
  const [activeTimerType, setActiveTimerType] = useState(TimerType.POMODORO)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    getTimeSettings()
  }, [])

  useEffect(() => {
    switch (activeTimerType) {
      case TimerType.POMODORO:
        setSeconds(timeSettings.pomodoro * 60)
        break
      case TimerType.SHORT_BREAK:
        setSeconds(timeSettings.shortBreak * 60)
        break
      case TimerType.LONG_BREAK:
        setSeconds(timeSettings.shortBreak * 60)
        break
      default:
        setSeconds(timeSettings.pomodoro * 60)
        break
    }
  }, [activeTimerType])
  
  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1)
      }, 1000)
  
      return () => clearInterval(interval)
    }
  }, [seconds, isActive])

  return (
    <>
      <div className='p-5 w-4/5 bg-white rounded-md border border-solid border-zinc-200 text-center'>
        <div className='space-x-4'>
          <button
            className={`button ${activeTimerType === TimerType.POMODORO ? 'active' : ''}`}
            onClick={() => setActiveTimerType(TimerType.POMODORO)}>
              Pomodoro
          </button>
          <button
            className={`button ${activeTimerType === TimerType.SHORT_BREAK ? 'active' : ''}`}
            onClick={() => setActiveTimerType(TimerType.SHORT_BREAK)}>
              Short Break
          </button>
          <button
            className={`button ${activeTimerType === TimerType.LONG_BREAK ? 'active' : ''}`}
            onClick={() => setActiveTimerType(TimerType.LONG_BREAK)}>
              Long Break
          </button>
        </div>
        <h1 className='py-4' style={{ fontSize: '5rem' }}>{formatTime(seconds)}</h1>
        <button className='start-button' onClick={() => setIsActive(!isActive)}>{!isActive ? 'Start' : 'Pause'}</button>
      </div>
    </>
  )
}

<style>
  
</style>
