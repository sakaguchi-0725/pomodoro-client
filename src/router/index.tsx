import { Route, Routes } from 'react-router-dom'
import { Signup } from '../components/pages/auth/Signup'
import { Login } from '../components/pages/auth/Login'
import { MainLayout } from '../components/layout/MainLayout'
import Main from '../components/pages/main/Main'
import Report from '../components/pages/report/Report'

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path='/signin' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path="/" element={<MainLayout children={<Main />} />} />
      <Route path="/report" element={<MainLayout children={<Report />} />} />
    </Routes>
  )
}

export default Router