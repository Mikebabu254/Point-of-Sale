import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './routes/pages/auth/Login.jsx'
import AdminDashboard from './routes/pages/admin/Dashboard'
import OwnerDashboard from './routes/pages/owner/Dashboard'
import POS from './routes/pages/cashier/POS'
import ProtectedRoute from './routes/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/owner"
        element={
          <ProtectedRoute role="owner">
            <OwnerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cashier"
        element={
          <ProtectedRoute role="cashier">
            <POS />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default App
