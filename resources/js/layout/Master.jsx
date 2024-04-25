import React from 'react'
import Navbar from '../components/Navbar'
import Sidenav from '../components/Sidenav'
import { Outlet } from 'react-router-dom'

function Master() {
  return (
    <>
    <Navbar />
    <div className="flex">
        <Sidenav />
        <div className="flex-grow">
            <Outlet />
        </div>
    </div>
    </>
  )
}

export default Master