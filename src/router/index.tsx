import { Route, Routes } from 'react-router-dom'
import { Signup } from '../components/pages/auth/Signup'
import { Login } from '../components/pages/auth/Login'
import { MainLayout } from '../components/layout/MainLayout'
import Main from '../components/pages/main/Main'
import Report from '../components/pages/report/Report'
import Page404 from '../components/pages/Page404'

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path="/" element={<MainLayout children={<Main />} />} />
      <Route path="/report" element={<MainLayout children={<Report />} />} />
      <Route path='*' element={<Page404 />} />
    </Routes>
  )
}

export default Router