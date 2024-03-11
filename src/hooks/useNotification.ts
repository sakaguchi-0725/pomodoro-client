import { useEffect, useState } from "react"

const useNotification = () => {
  const [isPermissionGranted, setIsPermissionGranted] = useState(false)

  useEffect(() => {
    if (!("Notification" in window)) {
      console.log("このブラウザは通知をサポートしていません")
      return
    }

    if (Notification.permission === 'granted') {
      setIsPermissionGranted(true)
    } else if (Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        setIsPermissionGranted(permission === 'granted')
      })
    }
  }, [])

  const sendNotification = (title: string, options?: NotificationOptions) => {
    if (isPermissionGranted) {
      new Notification(title, options)
    }
  }

  return sendNotification
}

export default useNotification