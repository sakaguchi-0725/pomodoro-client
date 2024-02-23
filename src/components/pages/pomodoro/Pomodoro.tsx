import { useEffect } from 'react'
import 'react-circular-progressbar/dist/styles.css'
import { TimerType } from '../../../types'
import useStore from '../../../store/time'
import { useCowntdown } from '../../../hooks/useCountdown'
import { Card } from '../../common/Card'

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds /60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

export const Pomodoro = () => {
  const getTimeSettings = useStore((state) => state.getTimeSettings)
  const {
    seconds,
    isActive,
    activeTimerType,
    toggleIsActive,
    changeTimerType
  }= useCowntdown()

  useEffect(() => {
    getTimeSettings()
  }, [])

  return (
    <>
      <Card>
        <div className='space-x-4'>
          <button
            className={`button ${activeTimerType === TimerType.POMODORO ? 'active' : ''}`}
            onClick={() => changeTimerType(TimerType.POMODORO)}>
              Pomodoro
          </button>
          <button
            className={`button ${activeTimerType === TimerType.SHORT_BREAK ? 'active' : ''}`}
            onClick={() => changeTimerType(TimerType.SHORT_BREAK)}>
              Short Break
          </button>
          <button
            className={`button ${activeTimerType === TimerType.LONG_BREAK ? 'active' : ''}`}
            onClick={() => changeTimerType(TimerType.LONG_BREAK)}>
              Long Break
          </button>
        </div>
        <h1 className='py-4' style={{ fontSize: '5rem' }}>{formatTime(seconds)}</h1>
        <button className='start-button' onClick={() => toggleIsActive()}>{!isActive ? 'Start' : 'Pause'}</button>
      </Card>
    </>
  )
}

<style>
  
</style>
