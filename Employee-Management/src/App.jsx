import React from 'react'
import AuthProvider, { useAuth } from './context/AuthContext'
import Login from './components/Auth/Login'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'

const AppContent = () => {
  const { loggedUser } = useAuth()

  if (!loggedUser) return <Login />
  if (loggedUser.role === 'admin') return <AdminDashboard />
  return <EmployeeDashboard />
}

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
)

export default App
