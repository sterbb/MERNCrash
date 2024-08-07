// for security like accessing user profile and such

import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";



const PrivateRoute = () => {

    const {userInfo} = useSelector((state)=> state.auth);
    // check if user is logged in, if not direct to login
  return userInfo ? <Outlet/> : <Navigate to='/login' replace/>
}

export default PrivateRoute