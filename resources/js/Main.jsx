import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import MainRoutes from './routers/MainRoutes';
import { RouterProvider } from 'react-router-dom';
import GuestRoutes from './routers/GuestRoutes';

function Main() {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    if (localStorage.token != undefined){
      setAuth(true);
    }
  }, [])
  return (
    <>
        {auth ?
        <RouterProvider router={MainRoutes} />
        :
        <RouterProvider router={GuestRoutes} />
        }
    </>
  )
}

export default Main;

if (document.getElementById('root')) {
    const Index = ReactDOM.createRoot(document.getElementById("root"));

    Index.render(
        <React.StrictMode>
            <Main/>
        </React.StrictMode>
    )
}