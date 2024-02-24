import { useMutation } from "@tanstack/react-query"
import { useError } from "./useError"
import useStore from "../store/time"
import { Time } from "../types"
import axios from "axios"

export const useMutateTime = () => {
  const { switchErrorHandling } = useError()
  const resetEditedTime = useStore((state) => state.resetEditedTime)

  const storeTimeMutation = useMutation(
    (time: Omit<Time, 'id' | 'created_at' | 'updated_at'>) =>
      axios.post<Time>(`${import.meta.env.VITE_API_BASE_URL}/times`, time),
    {
      onSuccess: () => {
        resetEditedTime()
      },
      onError: (err: any) => {
        if (err.response.data.message) {
          switchErrorHandling(err.response.data.message)
        } else {
          switchErrorHandling(err.response.data)
        }
      },
    }
  )

  return { storeTimeMutation }
}