import { useNavigate } from "react-router-dom"
import useStore from "../store"
import { CsrfToken } from "../types"
import axios from "axios"

export const useError = () => {
  const navigate = useNavigate()
  const resetEditedTask = useStore((state) => state.resetEditedTask)

  const getCsrfToken = async () => {
    const { data } = await axios.get<CsrfToken>(
      `${import.meta.env.VITE_API_BASE_URL}/csrf`
    )
    axios.defaults.headers.common['X-CSRF-TOKEN'] = data.csrf_token
  }

  const switchErrorHandling = (msg: string) => {
    switch (msg) {
      case 'invalid csrf token':
        getCsrfToken()
        alert('もう一度試してください。問題が続く場合は、ページを更新してください。')
        break
      case 'invalid or expired jwt':
        alert('セッションがタイムアウトしました。もう一度ログインしてください。')
        resetEditedTask()
        navigate('/login')
        break
      case 'missing or malformed jwt':
        alert('セッション情報が無効です。もう一度ログインしてください。')
        resetEditedTask()
        navigate('/login')
        break
      case 'duplicated key not allowed':
        alert('このメールアドレスは、既に使用されています。他のアドレスを使用してください。')
        break
      case 'crypto/bcrypt: hashedPassword is not the hash of the given password':
        alert('パスワードが間違っています。')
        break
      case 'record not found':
        alert('メールアドレスが間違っています。')
        break
      default:
        alert(msg)
    }
  }

  return { switchErrorHandling }
}