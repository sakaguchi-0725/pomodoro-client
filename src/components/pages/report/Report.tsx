import { Card } from '../../common/Card'
import { useQueryReport } from '../../../hooks/time/useQueryReport'
import { useEffect, useState } from 'react'
import { FormattedWeeklyReport, ReportParams } from '../../../types'
import { format, startOfWeek, endOfDay, subWeeks } from 'date-fns'
import { formatWeeklyReportData } from './utils/formatReportData'
import { WeeklyReportGraph } from './components/WeeklyReportGraph'

const getStartDate = (): string => {
  const threeWeekBefore = subWeeks(new Date(), 3)
  const lastMonday = startOfWeek(threeWeekBefore, { weekStartsOn: 1 })

  return format(lastMonday, 'yyyy-MM-dd')
}

const getEndDate = (): string => {
  return format(endOfDay(new Date()), 'yyyy-MM-dd')
}

const Report = () => {
  const startDate = getStartDate()
  const endDate = getEndDate()
  const reportParams: ReportParams = {
    report_type: 'all',
    start_date: startDate,
    end_date: endDate
  }
  const [weeklyReport, setWeeklyReport] = useState<FormattedWeeklyReport[]>([])
  const { data, isLoading } = useQueryReport(reportParams)
  useEffect(() => {
    if (data?.weekly_report) {
      const formattedData = formatWeeklyReportData(data.weekly_report)
      setWeeklyReport(formattedData)
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
        <WeeklyReportGraph weeklyReport={weeklyReport} isLoading={isLoading} />
      </Card>
    </>
  )
}

export default Report

