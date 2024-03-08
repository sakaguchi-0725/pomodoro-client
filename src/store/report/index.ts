import { create } from 'zustand'
import { DailyReport, FormattedWeeklyReport } from '../../types'

type State = {
  dailyReportData: DailyReport[]
  updateDailyReport: (payload: DailyReport[]) => void,
  resetDailyReportData: () => void
  weeklyReportData: FormattedWeeklyReport[]
  addWeeklyReportData: (payload: FormattedWeeklyReport[]) => void
  resetWeeklyReportData: () => void
}

const useStore = create<State>((set) => ({
  dailyReportData: [],
  updateDailyReport: (payload) =>
    set({
      dailyReportData: payload
    }),
  resetDailyReportData: () => set({ dailyReportData: [] }),
  weeklyReportData: [],
  addWeeklyReportData: (payload) => set((state) => {
    const updatedData = payload.reduce((acc, newWeek) => {
      const existingIndex = acc.findIndex(existingWeek =>
        existingWeek.startDate === newWeek.startDate &&
        existingWeek.endDate === newWeek.endDate
      )

      if (existingIndex > -1) {
        // 既存のデータが見つかった場合、そのデータを新しいデータで更新
        acc[existingIndex] = newWeek;
      } else {
        // 既存のデータが見つからなかった場合、新しいデータを追加
        acc.push(newWeek);
      }
      return acc;
    }, [...state.weeklyReportData])

    return { weeklyReportData: updatedData }
  }),
  resetWeeklyReportData: () => set({ weeklyReportData: [] }),
}))

export default useStore