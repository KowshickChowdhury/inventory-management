import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Login from '../components/Login'
import Signup from '../components/Signup'

const GuestRoutes = createBrowserRouter([
    {path : "/signup", element: <Signup />},
    {path : "/login", element: <Login />}
])

export default GuestRoutes