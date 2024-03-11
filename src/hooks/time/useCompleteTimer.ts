import { useRef } from "react";
import { TimerType } from "../../types";
import useNotification from "../useNotification";

const useCompleteTimer = () => {
  const sendNotification = useNotification()
  const audioRef = useRef(new Audio("src/assets/complete_bgm.mp3"))

  const sendCompleteNotification = (timerType: TimerType) => {
    const notificationMessage = {
      [TimerType.POMODORO]: "Pomodoro completed!",
      [TimerType.SHORT_BREAK]: "Short Break completed!",
      [TimerType.LONG_BREAK]: "Long Break completed!",
    }[timerType]

    sendNotification(notificationMessage)
    audioRef.current.play()
  }

  return sendCompleteNotification
}

export default useCompleteTimer