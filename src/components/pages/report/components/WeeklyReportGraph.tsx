import React, { SetStateAction, useEffect, useState } from 'react'
import { FormattedWeeklyReportItem, ReportParams } from '../../../../types'
import { Column } from '@ant-design/charts'
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/outline'
import { getEndDate, getNextEndDate, getNextStartDate, getStartDate } from '../utils/reportDateUtils'
import { addDays } from 'date-fns'
import useStore from '../../../../store/report'

type WeeklyReportGraphProps = {
  isLoading: boolean
  startDate: string
  endDate: string
  setStartDate: React.Dispatch<SetStateAction<string>>
  setEndDate: React.Dispatch<SetStateAction<string>>
  setReportParams: React.Dispatch<SetStateAction<ReportParams>>
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

export const WeeklyReportGraph: React.FC<WeeklyReportGraphProps> = ({ isLoading, startDate, endDate, setStartDate, setEndDate, setReportParams }) => {
  const { weeklyReportData } = useStore()
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
    if (weeklyReportData.length > 0 && currentWeekIndex < weeklyReportData.length) {
      const currentWeekData = weeklyReportData[currentWeekIndex].data
      setWeeklyConfig(prevConfig => ({
        ...prevConfig,
        data: currentWeekData
      }))
    }
  }, [weeklyReportData, currentWeekIndex])

  // 追加レポート取得時にcurrentIndexをインクリメントする
  useEffect(() => {
    // 初期表示時はcurrentWeekIndexがインクリメントされないようにする
    if (currentWeekIndex !== 0) {
      setCurrentWeekIndex(currentWeekIndex + 1)
    }
  }, [weeklyReportData.length])

  useEffect(() => {
    setReportParams({
      report_type: 'weekly',
      start_date: startDate,
      end_date: endDate
    })
  }, [startDate, endDate])

  const handlePrev = () => {
    if (currentWeekIndex < weeklyReportData.length - 1) {
      setCurrentWeekIndex(currentWeekIndex + 1)
    } else {
      const currentStartDate = new Date(startDate)
      setStartDate(getNextStartDate(addDays(currentStartDate, -1)))
      setEndDate(getEndDate(addDays(currentStartDate, -1)))
    }
  }

  const handleNext = () => {
    if (currentWeekIndex > 0) {
      setCurrentWeekIndex(currentWeekIndex - 1)
    } else {
      const currentEndDate = new Date(endDate)
      setStartDate(getStartDate(addDays(currentEndDate, 1)))
      setEndDate(getNextEndDate(addDays(currentEndDate, 1)))
    }
  }
  
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
        ) : (
          <>
            <Column {...weeklyConfig} />
            <div className='flex justify-center items-center mt-5'>
              <button
                onClick={() => handlePrev()}
                className='bg-slate-200 hover:bg-slate-300 rounded-xl rounded-xl cursor-pointer'
              >
                <ChevronDoubleLeftIcon className='w-9 text-slate-600 p-2' />
              </button>
              <h2 className='text-slate-600 text-center mx-8'>
                {
                  weeklyReportData[currentWeekIndex]
                    ? `${weeklyReportData[currentWeekIndex].startDate} 〜 ${weeklyReportData[currentWeekIndex].endDate}`
                    : 'No Data'
                }
              </h2>
              <button
                onClick={handleNext}
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
        )
      }
    </>
  )
}
