import { useEffect, useRef, useState } from 'react'
import { TimerType } from '../../../../types'
import useStore from '../../../../store/time'
import { useCowntdown } from '../../../../hooks/time/useCountdown'
import { Card } from '../../../common/Card'
import { ArrowPathIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import { Modal } from '../../../common/Modal'
import { TimeSettings } from './components/TimeSettings'

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds /60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

export const Pomodoro = () => {
  const getTimeSettings = useStore((state) => state.getTimeSettings)
  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)
  const {
    seconds,
    isActive,
    activeTimerType,
    toggleIsActive,
    changeTimerType,
    resetTimer
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
        <h1 className='mt-2' style={{ fontSize: '6rem' }}>{formatTime(seconds)}</h1>
        <div className='flex justify-center items-center'>
          <button className='start-button' onClick={() => toggleIsActive()}>{!isActive ? 'Start' : 'Pause'}</button>
          <button className='ml-4 flex justify-center items-center' onClick={resetTimer}>
            <ArrowPathIcon className='w-9 h-9' />
          </button>
          <button className='ml-4 flex justify-center items-center' onClick={() => setOpen(true)}>
            <Cog6ToothIcon className='w-9 h-9' />
          </button>
        </div>
      </Card>
      <Modal open={open} setOpen={setOpen} cancelButtonRef={cancelButtonRef}>
        <TimeSettings setOpen={setOpen} cancelButtonRef={cancelButtonRef} />
      </Modal>
    </>
  )
}

<style>
  
</style>
