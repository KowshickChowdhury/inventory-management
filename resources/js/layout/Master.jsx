import React from 'react'
import Navbar from '../components/Navbar'
import Sidenav from '../components/Sidenav'
import { Outlet } from 'react-router-dom'

function Master() {
  return (
    <>
    <Navbar />
    <div>
        <Outlet/>
    </div>
    </>
  )
}

export default Master