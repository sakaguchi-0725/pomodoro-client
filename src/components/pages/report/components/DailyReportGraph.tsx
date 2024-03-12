import { useEffect, useState } from 'react'
import { FormattedDailyReport } from '../../../../types'
import useStore from '../../../../store/report'
import { Column } from '@ant-design/charts'

type DailyConfig = {
  data: FormattedDailyReport[]
  height: number
  xField: string
  yField: string
  point: {
    size: number
    shape: string
  }
}

export const DailyReportGraph = () => {
  const { dailyReportData } = useStore()
  const [dailyConfig, setDailyConfig] = useState<DailyConfig>({
    data: [],
    height: 400,
    xField: 'time',
    yField: 'focusTime',
    point: {
      size: 5,
      shape: 'diamond',
    },
  })

  useEffect(() => {
    console.log(dailyReportData)
    if (dailyReportData.length > 0) {
      setDailyConfig(prevConfig => ({
        ...prevConfig,
        data: dailyReportData
      }))
    }
  }, [dailyReportData])

  return (
    <Column {...dailyConfig} />
  )
}
