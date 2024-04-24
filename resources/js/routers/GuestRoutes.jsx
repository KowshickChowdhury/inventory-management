import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Login from '../components/Login'
import Signup from '../components/Signup'

const GuestRoutes = createBrowserRouter([
    {path : "/", element: <Login />},
    {path : "/signup", element: <Signup />}
])

export default GuestRoutes