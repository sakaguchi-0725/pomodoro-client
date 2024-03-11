import { useEffect } from "react"
import { useQueryAuth } from "../../hooks/auth/useQueryAuth"
import { Route, Routes, useNavigate } from "react-router-dom"
import { MainLayout } from "../../components/layout/MainLayout"
import Main from "../../components/pages/main/Main"
import Report from "../../components/pages/report/Report"

const AuthenticatedRoutes = () => {
  const navigate = useNavigate()
  const { data, isFetched } = useQueryAuth()
  useEffect(() => {
    if (!data?.authenticated && isFetched) {
      navigate('/login')
    }
  }, [data, isFetched])

  return (
    <Routes>
      <Route path="/" element={<MainLayout children={<Main />} />} />
      <Route path="/report" element={<MainLayout children={<Report />} />} />
    </Routes>
  )
}

export default AuthenticatedRoutes