import { useEffect } from "react"
import './App.css'
import axios from 'axios'
import { CsrfToken } from "./types"
import Router from "./router"

function App() {
  useEffect(() => {
    axios.defaults.withCredentials = true
    const getCsrfToken = async () => {
      const { data } = await axios.get<CsrfToken>(
        `${import.meta.env.VITE_API_BASE_URL}/csrf`
      )
      axios.defaults.headers.common['X-CSRF-Token'] = data.csrf_token
    }
    getCsrfToken()
  }, [])

  return (
    <Router />
  )
}

export default App;
