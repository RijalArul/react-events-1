import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './features/login'
import './App.css'
import DashboardPage from './features/dashboard'
import PublicRoutes from './Routes/PublicRoutes'
import PrivateRoutes from './Routes/PrivateRoutes'
function App () {
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path='/login'
            element={
              <PublicRoutes>
                <LoginPage />
              </PublicRoutes>
            }
          />
          <Route
            path='/'
            element={
              <PrivateRoutes>
                <DashboardPage />
              </PrivateRoutes>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
