import { useEffect } from "react";
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from 'axios'
import { CsrfToken } from "./types";
import { Signup } from "./components/pages/auth/Signup";
import { Login } from "./components/pages/auth/Login";
import { MainLayout } from "./components/layout/MainLayout";
import Main from "./components/pages/main/Main";
import Report from "./components/pages/report/Report";

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
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainLayout children={<Main />} />} />
        <Route path="/report" element={<MainLayout children={<Report />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
