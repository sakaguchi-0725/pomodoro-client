import axios from "axios"
import { useError } from "../useError"
import { Report, ReportParams } from "../../types"
import { useQuery } from "@tanstack/react-query"

export const useQueryReport = (params: ReportParams) => {
  const { switchErrorHandling } = useError()
  const queryKey: [string, ReportParams] = ['report', params]
  const getReport = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/times/report`, {
        params: params,
        withCredentials: true
      },
    )
    
    return data
  }

  return useQuery<Report, Error>({
    queryKey,
    queryFn: getReport,
    staleTime: Infinity,
    onError: (err: any) => {
      if (err.response.data.message) {
        switchErrorHandling(err.response.data.message)
      } else {
        switchErrorHandling(err.response.data)
      }
    }
  })
}