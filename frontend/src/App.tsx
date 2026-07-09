import {Navigate, Route, Routes} from 'react-router-dom'
import {Login} from "@/pages/Auth/Login.tsx";
import {Register} from "@/pages/Auth/Register.tsx";
import {Layout} from "@/components/Layout";
import {useAuthStore} from "@/stores/auth";
import {Dashboard} from "@/pages/Dashboard";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuthStore()
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

function PublicRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuthStore()
    return !isAuthenticated ? <>{children}</> : <Navigate to="/" replace />
}

function App() {
  return (
    <>
      <Layout>
          <Routes>
              <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
              <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
              <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          </Routes>
      </Layout>
    </>
  )
}

export default App
