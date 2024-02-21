import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Todo } from "./components/pages/Todo";
import axios from 'axios'
import { CsrfToken } from "./types";
import { Signup } from "./components/pages/auth/Signup";
import { Login } from "./components/pages/auth/Login";

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
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
