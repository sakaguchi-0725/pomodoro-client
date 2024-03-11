import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from '../components/pages/auth/Signup'
import { Login } from '../components/pages/auth/Login'
import AuthenticatedRoutes from './auth/AuthenticatedRoutes'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signin' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/*' element={<AuthenticatedRoutes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router