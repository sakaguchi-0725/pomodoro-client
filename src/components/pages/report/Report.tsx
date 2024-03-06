import { Card } from '../../common/Card'
import { useQueryReport } from '../../../hooks/time/useQueryReport'
import { useEffect, useState } from 'react'
import { ReportParams } from '../../../types'
import { formatWeeklyReportData } from './utils/formatReportData'
import { WeeklyReportGraph } from './components/WeeklyReportGraph'
import { getEndDate, getNextStartDate } from './utils/reportDateUtils'
import useStore from '../../../store/report'

const Report = () => {
  const today = new Date()
  const [startDate, setStartDate] = useState(getNextStartDate(today))
  const [endDate, setEndDate] = useState(getEndDate(today))
  const [reportParams, setReportParams] = useState<ReportParams>({
    report_type: 'all',
    start_date: startDate,
    end_date: endDate
  })
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
        <WeeklyReportGraph
          isLoading={isLoading}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setReportParams={setReportParams}
        />
      </Card>
    </>
  )
}

export default Report

