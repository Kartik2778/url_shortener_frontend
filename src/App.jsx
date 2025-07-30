import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { UserProvider } from './contextApi/UserContext'

const App = () => {
  return (
    <UserProvider>
      <Header/>
      <Outlet/>
      <Footer/>
    </UserProvider>
  )
}

export default App
