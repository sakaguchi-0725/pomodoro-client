import axios from "axios"
import { useError } from "../useError"
import { Time } from "../../types"
import { useQuery } from "@tanstack/react-query"

export const useQueryTimes = () => {
  const { switchErrorHandling } = useError()
  const getTimes = async () => {
    const { data } = await axios.get<Time[]>(
      `${import.meta.env.VITE_API_BASE_URL}/times`,
      { withCredentials: true }
    )
    return data
  }

  return useQuery<Time[], Error>({
    queryKey: ['times'],
    queryFn: getTimes,
    staleTime: Infinity,
    onError: (err: any) => {
      if (err.response.data.message) {
        switchErrorHandling(err.response.data.message)
      } else {
        switchErrorHandling(err.response.data)
      }
    },
  })
}