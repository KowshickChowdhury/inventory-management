import React from 'react'
import { createBrowserRouter } from 'react-router-dom';
import Example from '../components/Example';
import Test from '../components/Test';

const MainRoutes = createBrowserRouter([
    {path: "/", element: <Test /> }
])

export default MainRoutes;