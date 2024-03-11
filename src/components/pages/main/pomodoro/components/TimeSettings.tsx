import { Dialog } from '@headlessui/react'
import React, { useState } from 'react'
import { ToggleSwitch } from '../../../../common/ToggleSwitch'
import useStore from '../../../../../store/time'

type TimeSettingsProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  cancelButtonRef: React.RefObject<HTMLButtonElement>
}

export const TimeSettings: React.FC<TimeSettingsProps> = ({ setOpen, cancelButtonRef }) => {
  const { timeSettings } = useStore()
  const setTimeSettings = useStore((state) => state.setTimeSettings)
  const resetEditedTime = useStore((state) => state.resetEditedTime)
  const [pomodoro, setPomodoro] = useState(timeSettings.pomodoro)
  const [shortBreak, setShortBreak] = useState(timeSettings.shortBreak)
  const [longBreak, setLongBreak] = useState(timeSettings.longBreak)
  const [longBreakInterval, setLongBreakInterval] = useState(timeSettings.longBreakInterval)
  const [isChecked, setIsChecked] = useState(timeSettings.isAutoTimer)

  const handleClick = () => {
    setTimeSettings({
      pomodoro,
      shortBreak,
      longBreak,
      isAutoTimer: isChecked,
      longBreakInterval
    })
    setOpen(false)
    resetEditedTime()
  }

  return (
    <>
      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <Dialog.Title as="h3" className="text-base font-semibold text-xl text-slate-800">
              Settings
            </Dialog.Title>
            <div className="mt-4 flex space-x-4">
              <div className='flex flex-col'>
                <label className='text-slate-500 text-sm' htmlFor='pomodoro'>Pomodoro</label>
                <input
                  id='pomodoro'
                  type="text"
                  className="border border-gray-300 p-2 rounded w-full"
                  value={pomodoro}
                  onChange={(e) => setPomodoro(e.target.value ? Number(e.target.value) : 0)}
                />
              </div>
              <div className='flex flex-col'>
                <label className='text-slate-500 text-sm' htmlFor='shortBreak'>Short Break</label>
                <input
                  id='shortBreak'
                  type="text"
                  className="border border-gray-300 p-2 rounded w-full"
                  value={shortBreak}
                  onChange={(e) => setShortBreak(e.target.value ? Number(e.target.value) : 0)}
                />
              </div>
              <div className='flex flex-col'>
                <label className='text-slate-500 text-sm' htmlFor='longBreak'>Long Break</label>
                <input
                  id='longBreak'
                  type="text"
                  className="border border-gray-300 p-2 rounded w-full"
                  value={longBreak}
                  onChange={(e) => setLongBreak(e.target.value ? Number(e.target.value) : 0)}
                />
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <p className='text-slate-500 text-md'>Auto Start Timer</p>
              <ToggleSwitch isChecked={isChecked} setIsChecked={setIsChecked} />
            </div>
            <div className='mt-4 flex justify-between items-center'>
              <p className='text-slate-500 text-md'>Long Break interval</p>
              <input
                id='longBreakInterval'
                type="text"
                className='border border-gray-300 p-2 rounded w-1/6'
                value={longBreakInterval}
                onChange={(e) => setLongBreakInterval(e.target.value ? Number(e.target.value) : 0)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
          onClick={handleClick}
        >
          Accept
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          onClick={() => {
            setOpen(false)
            resetEditedTime()
          }}
          ref={cancelButtonRef}
        >
          Cancel
        </button>
      </div>
    </>
  )
}

