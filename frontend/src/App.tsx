import { Route, Routes } from 'react-router-dom'
import {Login} from "@/pages/Login.tsx";
import {Register} from "@/pages/Register.tsx";
import {Layout} from "@/components/Layout";

function App() {
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
