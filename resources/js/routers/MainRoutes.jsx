import React from 'react'
import { createBrowserRouter } from 'react-router-dom';
import Example from '../components/Example';
import Test from '../components/Test';
import Master from '../layout/Master';

const MainRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Master />,
        children : [
            {
                path: '/',
                element: <Test/>
            }
        ]
    }
])

export default MainRoutes;