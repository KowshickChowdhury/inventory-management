import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidenav from "../components/Sidenav";

const Auth = () => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

  return token ?
  <>
  <Navbar />
  <div className="flex">
      <Sidenav />
      <div className="flex-grow">
          <Outlet />
      </div>
  </div>
  </>
    : <Navigate to="/login" />;
};

export default Auth;