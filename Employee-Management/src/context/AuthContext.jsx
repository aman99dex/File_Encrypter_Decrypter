import React, { createContext, useContext, useEffect, useState } from 'react'
import { getAdmin, getLocalStorage, setLocalStorage } from '../utils/localStorage'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null)
  const [loggedUser, setLoggedUser] = useState(null)

  useEffect(() => {
    const employees = getLocalStorage()
    setUserData(employees)

    const saved = localStorage.getItem('loggedUser')
    if (saved) {
      const parsed = JSON.parse(saved)
      // Re-hydrate employee from latest localStorage so tasks are current
      if (parsed.role === 'employee') {
        const fresh = employees.find(e => e.id === parsed.id)
        setLoggedUser(fresh || parsed)
      } else {
        setLoggedUser(parsed)
      }
    }
  }, [])

  useEffect(() => {
    if (!userData) return
    setLocalStorage(userData)
    // Keep logged-in employee's data in sync
    if (loggedUser?.role === 'employee') {
      const updated = userData.find(e => e.id === loggedUser.id)
      if (updated && JSON.stringify(updated) !== JSON.stringify(loggedUser)) {
        setLoggedUser(updated)
        localStorage.setItem('loggedUser', JSON.stringify(updated))
      }
    }
  }, [userData])

  const login = (email, password) => {
    const admin = getAdmin()
    if (email === admin.email && password === admin.password) {
      setLoggedUser(admin)
      localStorage.setItem('loggedUser', JSON.stringify(admin))
      return admin
    }
    const employee = userData?.find(e => e.email === email && e.password === password)
    if (employee) {
      setLoggedUser(employee)
      localStorage.setItem('loggedUser', JSON.stringify(employee))
      return employee
    }
    return null
  }

  const logout = () => {
    setLoggedUser(null)
    localStorage.removeItem('loggedUser')
  }

  return (
    <AuthContext.Provider value={{ userData, setUserData, loggedUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
