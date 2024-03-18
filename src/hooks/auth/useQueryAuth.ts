import axios from "axios"
import { useError } from "../useError"
import { useQuery } from "@tanstack/react-query"

export const useQueryAuth = () => {
  const { switchErrorHandling } = useError()
  const isAuth = async () => {
    const { data } = await axios.get<{authenticated: boolean}>(
      `${import.meta.env.VITE_API_BASE_URL}/is-auth`,
      { withCredentials: true }
    )

    return data
  }

  return useQuery<{authenticated: boolean}, Error>({
    queryKey: ['isAuth'],
    queryFn: isAuth,
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