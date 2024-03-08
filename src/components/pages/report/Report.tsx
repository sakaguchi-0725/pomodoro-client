import { Card } from '../../common/Card'
import { useQueryReport } from '../../../hooks/time/useQueryReport'
import { useEffect, useState } from 'react'
import { ReportParams } from '../../../types'
import { formatWeeklyReportData } from './utils/formatReportData'
import { WeeklyReportGraph } from './components/WeeklyReportGraph'
import { getEndDate, getNextStartDate } from './utils/reportDateUtils'
import useStore from '../../../store/report'
import { DailyReportGraph } from './components/DailyReportGraph'

enum ReportGraphType {
  daily = "DAILY",
  weekly = "WEEKLY"
}

const Report = () => {
  const today = new Date()
  const [reportGraphType, setReportGraphType] = useState<ReportGraphType>(ReportGraphType.daily)
  const [startDate, setStartDate] = useState(getNextStartDate(today))
  const [endDate, setEndDate] = useState(getEndDate(today))
  const [reportParams, setReportParams] = useState<ReportParams>({
    report_type: 'all',
    start_date: startDate,
    end_date: endDate
  })

  const getClassName = (type: ReportGraphType) => {
    if (type === reportGraphType) {
      return "inline-block p-4 text-blue-600 bg-gray-100 rounded-lg active"
    } else {
      return "inline-block p-4 rounded-lg hover:text-gray-600 hover:bg-gray-50"
    }
  }

  const addWeeklyReportData = useStore((state) => state.addWeeklyReportData)
  
  const { data, isLoading } = useQueryReport(reportParams)
  useEffect(() => {
    if (!isLoading) {
      if (data?.weekly_report) {
        const formattedData = formatWeeklyReportData(data.weekly_report, startDate, endDate)
        addWeeklyReportData(formattedData)
      } else {
        const formattedData = formatWeeklyReportData([], startDate, endDate)
        addWeeklyReportData(formattedData)
      }
    }
  }, [data])

  return (
    <>
      <Card>
        <div className='flex justify-center w-full items-center'>
          <div className='w-1/2 border-r'>
            <p className='pb-2 text-sm text-slate-800'>Total Focus Time</p>
            <h1 className='text-3xl text-slate-500 font-semibold'>{ data?.total_focus_time ? data?.total_focus_time : 0 } min</h1>
          </div>
          <div className='w-1/2'>
            <p className='pb-2 text-sm text-slate-800'>Consecutive Days</p>
            <h1 className='text-3xl text-slate-500 font-semibold'>{ data?.total_focus_time ? data?.consecutive_days : 0 } days</h1>
          </div>
        </div>
      </Card>
      <Card>
        <div className='flex justify-center text-sm font-medium text-center text-gray-500 mb-5'>
          <button
            className={`${getClassName(ReportGraphType.daily)} me-2`}
            onClick={() => setReportGraphType(ReportGraphType.daily)}
          >
            Daily Report
          </button>
          <button
            className={getClassName(ReportGraphType.weekly)}
            onClick={() => setReportGraphType(ReportGraphType.weekly)}
          >
            Weekly Report
          </button>
        </div>
        {reportGraphType === ReportGraphType.daily ? (
          <DailyReportGraph />
        ) : (
          <WeeklyReportGraph
          isLoading={isLoading}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setReportParams={setReportParams}
        />
        )}
      </Card>
    </>
  )
}

export default Report

