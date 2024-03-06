import React, { useEffect, useState } from 'react'
import { FormattedWeeklyReport, FormattedWeeklyReportItem } from '../../../../types'
import { Column } from '@ant-design/charts'
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/outline'

type WeeklyReportGraphProps = {
  weeklyReport: FormattedWeeklyReport[]
  isLoading: boolean
}

type WeeklyConfig = {
  data: FormattedWeeklyReportItem[]
  height: number
  xField: string
  yField: string
  point: {
    size: number
    shape: string
  }
}

export const WeeklyReportGraph: React.FC<WeeklyReportGraphProps> = ({ weeklyReport, isLoading }) => {
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0)
  const [weeklyConfig, setWeeklyConfig] = useState<WeeklyConfig>({
    data: [],
    height: 400,
    xField: 'dayOfWeek',
    yField: 'focusTime',
    point: {
      size: 5,
      shape: 'diamond',
    },
  })

  useEffect(() => {
    if (weeklyReport.length > 0 && currentWeekIndex < weeklyReport.length) {
      const currentWeekData = weeklyReport[currentWeekIndex].data
      setWeeklyConfig(prevConfig => ({
        ...prevConfig,
        data: currentWeekData
      }))
    }
  }, [weeklyReport, currentWeekIndex])

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
        ) : (
          <>
            {weeklyReport.length > 0 ? (
              <>
                <Column {...weeklyConfig} />
                <div className='flex justify-center items-center mt-5'>
                  <button
                    onClick={() => {
                      setCurrentWeekIndex(prevIndex => Math.min(weeklyReport.length - 1, prevIndex + 1))
                    }}
                    className='bg-slate-200 hover:bg-slate-300 rounded-xl rounded-xl cursor-pointer'
                  >
                    <ChevronDoubleLeftIcon className='w-9 text-slate-600 p-2' />
                  </button>
                  <h2 className='text-slate-600 text-center mx-8'>{weeklyReport[currentWeekIndex].startDate} 〜 {weeklyReport[currentWeekIndex].endDate}</h2>
                  <button
                    onClick={() => {
                      if (currentWeekIndex > 0) {
                        setCurrentWeekIndex(currentWeekIndex - 1)
                      }
                    }}
                    disabled={currentWeekIndex === 0}
                    className={`${
                      currentWeekIndex === 0
                        ? 'opacity-60 cursor-not-allowed'
                        : 'bg-slate-200 hover:bg-slate-300 cursor-pointer rounded-xl'
                      }`}
                  >
                    <ChevronDoubleRightIcon className='w-9 text-slate-600  p-2' />
                  </button>
                </div>
              </>
            ) : (
              <div>
                <p>No data</p>
              </div>
            )}
          </>
        )
      }
    </>
  )
}
