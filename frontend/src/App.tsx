import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import {Login} from "@/pages/Login.tsx";
import {Register} from "@/pages/Register.tsx";
import {Layout} from "@/components/Layout";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Layout>
          <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
          </Routes>
      </Layout>
    </>
  )
}

export default App
