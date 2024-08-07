import React from 'react'
import HomeScreen from './screens/HomeScreen'
import { Route, createBrowserRouter,createRoutesFromElements, RouterProvider} from "react-router-dom";
import MainLayout from './layout/MainLayout';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';



const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements( 
      <Route path="/" element={<MainLayout />}>

        <Route index element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen/>} />
        <Route path="/register" element={<RegisterScreen/>} />

        {/*Private Route / Check first if user is logged in */}
        <Route path="" element={<PrivateRoute/>}>
          <Route path="/profile" element={<ProfileScreen/>} />
        </Route>
   
      </Route>
    )
  )

  
  return <RouterProvider router = {router}/>
}

export default App